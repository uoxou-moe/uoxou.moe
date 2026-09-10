import { Effect, Layer } from "effect";
import { HttpRouter, HttpServer } from "effect/unstable/http";
import { HttpApiBuilder, HttpApiSwagger } from "effect/unstable/httpapi";
import { Api } from "./api";

const SystemLive = HttpApiBuilder.group(Api, "system", (handlers) =>
	handlers.handle("health", () => Effect.succeed({ status: "ok" as const })),
);

const Routes = Layer.mergeAll(
	HttpApiBuilder.layer(Api, { openapiPath: "/api/openapi.json" }).pipe(Layer.provide(SystemLive)),
	HttpApiSwagger.layer(Api, { path: "/api/docs" }),
).pipe(Layer.provide(HttpServer.layerServices));

export const makeServer = () => HttpRouter.toWebHandler(Routes);
