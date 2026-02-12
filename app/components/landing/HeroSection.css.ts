import { style } from "@vanilla-extract/css";
import { theme } from "~/styles/theme.css";

export const styleContainer = style({
	width: "100%",
	height: "calc(100vh - 64px)",
	backgroundColor: theme.flavor.strawberry.base,
});