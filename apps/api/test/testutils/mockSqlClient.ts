import { Context, Effect, Layer, Ref, Stream, type Scope } from "effect";
import { Reactivity } from "effect/unstable/reactivity";
import { SqlClient, type Statement, type SqlConnection, type SqlError } from "effect/unstable/sql";

export const TypeId = "~@effect/sql-mock/MockClient";
export type TypeId = typeof TypeId;

export interface Query {
	readonly sql: string;
	readonly params: ReadonlyArray<unknown>;
}

export interface MockClientConfig {
	readonly compiler: Statement.Compiler;
	readonly execute: (query: Query) => Effect.Effect<ReadonlyArray<SqlConnection.Row>, SqlError.SqlError>;
}

export interface MockClient extends SqlClient.SqlClient {
	readonly [TypeId]: TypeId;
	readonly config: MockClientConfig;
	readonly calls: Effect.Effect<ReadonlyArray<Query>>;
	readonly clearCalls: Effect.Effect<void>;
}

export const MockClient = Context.Service<MockClient>("@effect/sql-mock/MockClient");

export const make = (config: MockClientConfig): Effect.Effect<MockClient, never, Scope.Scope | Reactivity.Reactivity> =>
	Effect.gen(function* () {
		const calls = yield* Ref.make<ReadonlyArray<Query>>([]);
		const run = Effect.fn("MockClient.execute")(function* (sql: string, params: ReadonlyArray<unknown>) {
			const query = { sql, params: [...params] };
			yield* Ref.update(calls, (previous) => [...previous, query]);
			return yield* config.execute(query);
		});
		const execute: SqlConnection.Connection["execute"] = (sql, params, transformRows) =>
			run(sql, params).pipe(Effect.map((rows) => (transformRows ? transformRows(rows) : rows)));
		const connection: SqlConnection.Connection = {
			execute,
			executeRaw: run,
			executeUnprepared: execute,
			executeValues: () => Effect.die("MockClient does not support values queries"),
			executeValuesUnprepared: () => Effect.die("MockClient does not support values queries"),
			executeStream: () => Stream.die("MockClient does not support streaming"),
		};
		const client = yield* SqlClient.make({
			acquirer: Effect.succeed(connection),
			transactionAcquirer: Effect.die("MockClient does not simulate transactions"),
			compiler: config.compiler,
			spanAttributes: [],
		});
		return Object.assign(client, {
			[TypeId]: TypeId as TypeId,
			config,
			calls: Ref.get(calls),
			clearCalls: Ref.set(calls, []),
		}) as MockClient;
	});

export const layer = (config: MockClientConfig): Layer.Layer<MockClient | SqlClient.SqlClient> =>
	Layer.effectContext(
		Effect.map(make(config), (client) =>
			Context.make(MockClient, client).pipe(Context.add(SqlClient.SqlClient, client)),
		),
	).pipe(Layer.provide(Reactivity.layer));
