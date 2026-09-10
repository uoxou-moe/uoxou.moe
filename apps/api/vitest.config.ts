import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Do not load the frontend's React Router / Cloudflare Vite plugins.
export default defineConfig({
	test: {
		include: ["test/**/*.test.ts"],
		alias: { "~": fileURLToPath(new URL("./src", import.meta.url)) },
	},
});
