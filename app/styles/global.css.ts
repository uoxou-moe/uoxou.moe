import { globalStyle } from "@vanilla-extract/css";
import { theme } from "./theme.css";

globalStyle("html, body", {
	height: "100%",
	backgroundColor: theme.flavor.strawberry.base,
});

globalStyle("body, button", {
	fontFamily: "Lexend Variable, Noto Sans JP, sans-serif",
});
