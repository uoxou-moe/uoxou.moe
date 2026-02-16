import { globalStyle } from "@vanilla-extract/css";
import { theme } from "./theme.css";

globalStyle("*", {
	margin: 0,
	padding: 0,
	boxSizing: "border-box",
});

globalStyle("html, body", {
	height: "100%",
	fontFamily: "Lexend Variable, Noto Sans JP, sans-serif",
	backgroundColor: theme.flavor.strawberry.base,
});
