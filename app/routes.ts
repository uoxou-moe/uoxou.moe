import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("layouts/CommonLayout.tsx", [
    index("routes/home.tsx"),
    route("contact", "routes/contact.tsx"),
    route("blog/example/", "routes/blog/example.tsx"),
  ]),
] satisfies RouteConfig;
