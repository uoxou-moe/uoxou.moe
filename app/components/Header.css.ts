import { style } from "@vanilla-extract/css";
import { theme } from "~/styles/theme.css";

export const styleHeader = style({
	height: "64px",
	display: "flex",
	alignItems: "center",
	backgroundColor: theme.flavor.strawberry.base,
	fontFamily: "Segoe UI, sans-serif",
	color: theme.flavor.chocolate.fg
});

export const styleContainer = style({
	width: "100%",
	maxWidth: "1280px",
	height: "100%",
	paddingInline: "24px",
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "flex-start",
	gap: "24px",
	padding: "0 16px",
	margin: "0 auto",
});

export const styleLogo = style({
	height: "32px",
	width: "auto",
});

export const styleNav = style({
	marginInlineStart: "auto",
	height: "100%",
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "center",
});

export const styleNavUl = style({
	width: "fit-content",
	height: "100%",
	listStyle: "none",
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "center",
	gap: "16px",
});

export const styleNavItem = style({
	height: "100%",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
});

export const styleNavLink = style({
	width: "100%",
	height: "100%",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	textDecoration: "none",
	color: "currentcolor",
	fontSize: "16px",
	fontWeight: "500",
	outline: "none",
	transition: "color 0.15s ease",

	":hover": {
		color: theme.flavor.strawberry.fg,
	},
});

export const styleHamburgerContainer = style({
	height: "100%",
	width: "fit-content",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
});

export const styleHamburgerButton = style({
	height: "fit-content",
	width: "fit-content",
	padding: "8px",
	backgroundColor: theme.flavor.strawberry.subtle,
	borderRadius: "8px",
	borderWidth: "1px",
	borderStyle: "solid",
	borderColor: theme.flavor.strawberry.primary,
	color: theme.flavor.chocolate.fg,
	outline: "none",
	boxShadow: `${theme.flavor.strawberry.primary} 0px 2px`,
	transition: "all 0.2s ease-in-out",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	cursor: "pointer",

	selectors: {
		"&:hover": {
			backgroundColor: theme.flavor.strawberry.muted,
			borderColor: theme.flavor.strawberry.primary,
			outline: "none",
		},
		"&:active": {
			backgroundColor: theme.flavor.strawberry.emphasaized,
			borderColor: theme.flavor.strawberry.primary,
			boxShadow: `${theme.flavor.strawberry.muted}`,
			translate: "0px 2px",
			outline: "none",
		},
	}
});
