import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
	layout("layouts/CommonLayout.tsx", [
		index("routes/home.tsx"),
		route("contact", "routes/contact.tsx"),
	])
] satisfies RouteConfig;
