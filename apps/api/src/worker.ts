import { makeServer } from "./server";

// No request-specific bindings or user state are captured by this runtime.
let server: ReturnType<typeof makeServer> | undefined;

export default {
	async fetch(request, env) {
		const origin = request.headers.get("Origin");
		const allowed = origin !== null && origin === env.ALLOWED_ORIGIN;
		let response: Response;
		if (request.method === "OPTIONS") {
			const method = request.headers.get("Access-Control-Request-Method");
			response = new Response(null, {
				status: allowed && (method === "GET" || method === "HEAD") ? 204 : 403,
			});
		} else {
			server ??= makeServer();
			response = await server.handler(request);
		}
		const headers = new Headers(response.headers);
		headers.append("Vary", "Origin");
		if (allowed) {
			headers.set("Access-Control-Allow-Origin", origin);
			headers.set("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");
			headers.set("Access-Control-Allow-Headers", "Range");
			headers.set("Access-Control-Expose-Headers", "Accept-Ranges, Content-Range");
		}
		return new Response(response.body, { status: response.status, headers });
	},
} satisfies ExportedHandler<Env>;
