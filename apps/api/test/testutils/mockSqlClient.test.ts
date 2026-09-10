import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import { SqlClient, Statement } from "effect/unstable/sql";
import * as MockClient from "./mockSqlClient";

describe("MockSqlClient", () => {
	it.effect("provides the same callable client and clears history without changing configuration", () => {
		const config: MockClient.MockClientConfig = {
			compiler: Statement.makeCompilerSqlite(),
			execute: () => Effect.succeed([{ id: 1 }]),
		};
		return Effect.gen(function* () {
			const sql = yield* SqlClient.SqlClient;
			const mock = yield* MockClient.MockClient;
			expect(mock).toBe(sql);
			expect(mock.safe).toBe(mock);
			expect(mock.withoutTransforms()).toBe(mock);
			expect(mock[MockClient.TypeId]).toBe(MockClient.TypeId);
			expect(mock.config).toBe(config);
			expect(yield* mock`SELECT 1`).toEqual([{ id: 1 }]);
			expect(yield* mock.calls).toHaveLength(1);
			yield* mock.clearCalls;
			expect(yield* mock.calls).toEqual([]);
			expect(yield* sql`SELECT 2`).toEqual([{ id: 1 }]);
			expect(yield* mock.calls).toEqual([{ sql: "SELECT 2", params: [] }]);
		}).pipe(Effect.provide(MockClient.layer(config)));
	});
	it.effect("executes lazily and lets the responder inspect bound parameters", () =>
		Effect.gen(function* () {
			const sql = yield* SqlClient.SqlClient;
			const mock = yield* MockClient.MockClient;
			const input = "x'; DROP TABLE posts; --";
			const statement = sql`SELECT title FROM posts WHERE title = ${input}`;
			expect(yield* mock.calls).toEqual([]);
			expect(yield* statement).toEqual([{ title: input }]);
			expect(yield* statement.unprepared).toEqual([{ title: input }]);
			const calls = yield* mock.calls;
			expect(calls).toHaveLength(2);
			expect(calls[0]).toEqual({ sql: "SELECT title FROM posts WHERE title = ?", params: [input] });
		}).pipe(
			Effect.provide(
				MockClient.layer({
					compiler: Statement.makeCompilerSqlite(),
					execute: ({ params }) => Effect.succeed([{ title: params[0] }]),
				}),
			),
		),
	);

	it.effect("allocates fresh call history for each layer build", () => {
		const layer = MockClient.layer({ compiler: Statement.makeCompilerSqlite(), execute: () => Effect.succeed([]) });
		const query = Effect.gen(function* () {
			const sql = yield* SqlClient.SqlClient;
			const mock = yield* MockClient.MockClient;
			yield* sql`SELECT 1`;
			return yield* mock.calls;
		}).pipe(Effect.provide(layer));
		return Effect.gen(function* () {
			expect(yield* query).toHaveLength(1);
			expect(yield* query).toHaveLength(1);
		});
	});
});
