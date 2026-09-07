# API workspace

フロントとは独立したCloudflare Workerです。Effect 4 RCのHttpApiでHTTP/JSON APIを提供します。フロントはルートのReact Router・Effect 3のままで、サーバーのコードやSchemaをimportしません。

## 開発

リポジトリのルートで実行します。

```sh
npm ci
npm run dev:api
```

APIは `http://localhost:8787` で起動します。別ターミナルで `npm run dev` を実行するとフロントも起動できます。

| パス | 内容 |
| --- | --- |
| `/api/health` | `{"status":"ok"}`。プロセスの応答確認で、DB疎通は含みません。 |
| `/api/docs` | Swagger UI |
| `/api/openapi.json` | API定義から生成するOpenAPI |

ブラウザからの呼び出し例です。

```ts
const response = await fetch("http://localhost:8787/api/health");
if (!response.ok) throw new Error(`API error: ${response.status}`);
const health = await response.json();
```

`wrangler.jsonc` の `ALLOWED_ORIGIN` は、ブラウザからの読み取りを許可するフロントのoriginです。初期値は `http://localhost:5173`。開発ポートを変更した場合や本番公開時には、実際のフロントURLに変更します。末尾の `/` は付けません。CORSは認証ではなく、サーバー間のHTTPリクエストは引き続き利用可能です。

## 検証

```sh
npm run typecheck:api
npm run build:api
```

型チェック時にWorkerの型を生成します。ビルドはWranglerのdry runであり、デプロイしません。

## 構成

- `src/api.ts`: API定義と入出力Schema。
- `src/server.ts`: HttpApiBuilderでハンドラーとLayerを組み立て、HttpRouterでFetchハンドラーに変換。
- `src/worker.ts`: Workerの入口とCORS。現在は環境依存のないランタイムを遅延生成・再利用。
- `src/database.ts`: D1バインディングからD1ClientとSqlClientのLayerを生成する準備。

EffectとD1ドライバーは `4.0.0-rc.112` に固定しています。更新時は互換性を確認して一緒に更新してください。ルートのEffect 3や `@effect/platform` のAPIとは混在させません。

次は実際のD1を作成・バインドし、マイグレーションと記事Repositoryを追加します。D1接続Layerはまだサーバーへ提供していません。接続時はリクエストの `env.DB` とランタイムのライフサイクルを合わせ、別環境のバインディングを誤って共有しない設計にします。記事CRUD・認証・本番デプロイは別の実装段階です。
