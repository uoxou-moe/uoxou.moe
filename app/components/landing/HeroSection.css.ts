import { style } from "@vanilla-extract/css";
import { theme } from "~/styles/theme.css";

export const styleContainer = style({
	width: "100%",
	height: "calc(100vh - 64px)",
	position: "relative",
	backgroundColor: theme.flavor.strawberry.base,
});

export const styleContentSection = style({
	width: "100%",
	height: "100%",
	maxWidth: "1112px",
	paddingInline: "16px",
	paddingTop: 160,
	marginInline: "auto",
	position: "relative",
	zIndex: 1,
});

export const styleIntro = style({
	fontSize: "1.25rem",
	color: theme.flavor.chocolate.fg,
});

export const styleTitle = style({
	fontSize: "6.0rem",
	fontWeight: 400,
	lineHeight: 1,
	color: theme.flavor.chocolate.fg,
	marginBottom: 24,
});

export const styleMessage = style({
	fontSize: "1.25rem",
	color: theme.flavor.chocolate.fg,
});
