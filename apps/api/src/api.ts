import { Schema } from "effect";
import { HttpApi, HttpApiEndpoint, HttpApiGroup } from "effect/unstable/httpapi";

const SystemApi = HttpApiGroup.make("system").add(
	HttpApiEndpoint.get("health", "/api/health", {
		success: Schema.Struct({ status: Schema.Literal("ok") }),
	}),
);

// This contract belongs to the API workspace; the frontend only uses HTTP/JSON.
export const Api = HttpApi.make("uoxou-api").add(SystemApi);
