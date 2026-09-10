# API workspace

フロントとは独立したCloudflare Workerです。Effect 4 RCのHttpApiでHTTP/JSON APIを提供します。フロントはルートのReact Router・Effect 3のままで、サーバーのコードやSchemaをimportしません。

## 開発

リポジトリのルートで実行します。

```sh
npm ci
npm run dev:api
```

APIは `http://localhost:8787` で起動します。別ターミナルで `npm run dev` を実行するとフロントも起動できます。

| パス                | 内容                                                          |
| ------------------- | ------------------------------------------------------------- |
| `/api/health`       | `{"status":"ok"}`。プロセスの応答確認で、DB疎通は含みません。 |
| `/api/docs`         | Swagger UI                                                    |
| `/api/openapi.json` | API定義から生成するOpenAPI                                    |

ブラウザからの呼び出し例です。

```ts
const response = await fetch("http://localhost:8787/api/health");
if (!response.ok) throw new Error(`API error: ${response.status}`);
const health = await response.json();
```

`wrangler.jsonc` の `ALLOWED_ORIGIN` は、ブラウザからの読み取りを許可するフロントのoriginです。初期値は `http://localhost:5173`。開発ポートを変更した場合や本番公開時には、実際のフロントURLに変更します。末尾の `/` は付けません。CORSは認証ではなく、サーバー間のHTTPリクエストは引き続き利用可能です。

## 検証

API workspaceのコード整形にはoxfmt、Lintにはoxlintを使います。ルートから以下を実行できます。

```sh
npm run lint:api
npm run format:api
npm run format:check:api
```

Lintの自動修正は `npm run lint:fix --workspace @uoxou/api`。設定はこのworkspaceの `.oxlintrc.json` と `.oxfmtrc.json` に置き、生成物・依存パッケージは対象から除外します。
整形とLintはAPI workspaceのみを対象とし、型チェックは別途実行します。

```sh
npm run typecheck:api
npm run build:api
```

型チェック時にWorkerの型を生成します。ビルドはWranglerのdry runであり、デプロイしません。

## 構成

ソースとテストのファイル名はcamelCaseに統一します（例: `listPublishedPosts.ts`、`listPublishedPosts.test.ts`）。設定ファイルなどツール固有の名前はそのまま使います。

### 公開記事一覧のユースケース

ユースケースのサービスと入出力Schemaは `src/usecases/`、実装Layerは `src/usecases/interactors/`、共通ドメインエンティティは `src/domain/` に配置します。テストは `src` と同じ階層の `test/` に配置します。
`ListPublishedPosts` サービスが一覧取得の要求を定義し、`ListPublishedPostsLive` が実装を提供します。
実装Layerの構築時にRepositoryを注入するため、ハンドラーはユースケースのサービスだけに依存できます。
ハンドラーのテストでは `Effect.provideService(ListPublishedPosts, fake)` でユースケースを差し替え、ユースケースのテストでは実装LayerにRepositoryのテスト用実装を渡します。
入力は `{ limit?: number, offset?: number }`（省略時20件・0件目、最大100件）。
サービスは `ListPublishedPostsInput` 型の引数を受け取り、全項目を省略する場合は `{}` を渡します。
HTTP側はクエリ文字列の数値変換などを担当します。Interactorは受け取った具体的な入力型に対してSchema検証を行い、整数・件数上限などの条件を保証します。不正入力ではRepositoryを呼び出しません。
返り値は `{ posts: [{ id, slug, title, publishedAt }], nextOffset: number | null }` です。
本文は一覧に含めず、次ページがなければ `nextOffset` は `null` になります。
ブランドはドメインエンティティの `PublishedPostSummary` に付けます。`src/domain/post.ts` はHandler・Usecase・Repository実装のどのレイヤーからも参照可能で、ドメイン側は各レイヤーに依存しません。
Input・Query・Resultは通常の構造型とし、Resultにはブランド付きエンティティの配列を含めます。
Repository実装は記事Schemaで検証して返し、Interactorは最終結果のSchema検証に成功した値を返します。出力検証の失敗は `DataAccessError` に変換します。
入力は呼び出しやすい通常の具体型を維持し、Interactor内で検証します。ブランドはSchemaに定義した条件を表し、公開状態の絞り込みなどSchema外の条件やJSON通信先での検証までは保証しません。

`src/usecases/repositories/listPublishedPostsRepository.ts` の `ListPublishedPostsRepository` は、ユースケースが必要とする要求として定義します。
戻り値・失敗・取得条件をユースケース側が所有し、D1などの外側の実装がこの契約を満たします。
要求は操作ごとに分け、サービスの値にはその操作を行う関数を直接渡します。作成・詳細取得などは別のサービスとして定義し、必要な操作だけをユースケースの依存に含めます。
`Context.Service` で要求をEffectの依存型に表し、実行時に `Layer` や `Effect.provideService` で実装を渡します。
ユースケースはD1やSQLの実装をimportしません。
Repositoryは公開状態で絞り込み、公開日時の降順・同日時ならIDの降順で取得する契約です。
ユースケースでは次ページの有無を判定するため1件多く要求します。
Repositoryの入力は通常型の `ListPublishedPostsQuery` です。Interactorがデフォルト値を適用し、追加1件を含む検索条件をSchemaで検証してから渡します。`limit`（1〜101）と `offset` は必須です。
Repositoryは検証済みの `PublishedPostSummary` の配列を返します。0件は空配列とし、ページ情報の組み立てはInteractorが担当します。
offset方式では閲覧中の公開・削除によってページ間の重複や抜けが起きる可能性があります。
契約が返すエラーは `src/usecases/errors/applicationError.ts` のアプリケーションエラーに統一します。
ユースケースは `ApplicationError`（`ValidationError | DataAccessError`）、Repositoryは必要な `DataAccessError` だけを返します。
InteractorはSchemaの検証失敗を `ValidationError` に変換し、今後のD1アダプターはDB固有の失敗を `DataAccessError` に変換します。
元のエラーは内部診断用の `cause` として保持します。HTTPレスポンスにはそのままシリアライズせず、ハンドラー側で公開する情報とステータスを決めます。

現段階ではユースケースとRepositoryのインターフェースのみです。D1実装・HTTPルート・エラーのHTTPステータス変換は次の段階で追加します。
`npm test --workspace @uoxou/api` でユースケースを検証できます。公開・下書きのDB側の絞り込みは、D1実装時に統合テストで確認します。

- `src/api.ts`: API定義と入出力Schema。
- `src/server.ts`: HttpApiBuilderでハンドラーとLayerを組み立て、HttpRouterでFetchハンドラーに変換。
- `src/worker.ts`: Workerの入口とCORS。現在は環境依存のないランタイムを遅延生成・再利用。
- `src/database.ts`: D1バインディングからD1ClientとSqlClientのLayerを生成する準備。

EffectとD1ドライバーは `4.0.0-rc.112` に固定しています。更新時は互換性を確認して一緒に更新してください。ルートのEffect 3や `@effect/platform` のAPIとは混在させません。

次は実際のD1を作成・バインドし、マイグレーションと記事Repositoryを追加します。D1接続Layerはまだサーバーへ提供していません。接続時はリクエストの `env.DB` とランタイムのライフサイクルを合わせ、別環境のバインディングを誤って共有しない設計にします。記事CRUD・認証・本番デプロイは別の実装段階です。
