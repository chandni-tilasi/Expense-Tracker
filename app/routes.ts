import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("add", "routes/add.tsx"),
  route("edit/:id", "routes/edit.$id.tsx"),
] satisfies RouteConfig;
