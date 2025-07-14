import { globalStyle } from "@vanilla-extract/css";
import { theme } from "./theme.css";

globalStyle("*", {
	margin: 0,
	padding: 0,
	boxSizing: "border-box",
});

globalStyle("html, body", {
	height: "100%",
	fontFamily: "Segoe UI, sans-serif",
	backgroundColor: theme.flavor.strawberry.base,
});
