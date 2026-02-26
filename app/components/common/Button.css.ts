import { recipe } from "@vanilla-extract/recipes";
import { theme } from "~/styles/theme.css";

export const styleButton = recipe({
	base: {
		width: "fit-content", height: 40,
		display: "inline-flex", alignItems: "center", justifyContent: "center",
		paddingInline: 24,
		borderRadius: 8, borderWidth: 1, borderStyle: "solid",
		transition: "all 0.15s ease-in-out",
		fontSize: "1.0rem",
	},
	variants: {
		variant: {
			primary: {
				backgroundColor: theme.flavor.strawberry.base,
				color: theme.flavor.chocolate.fg,
				borderColor: theme.flavor.strawberry.primary,
				boxShadow: `0 2px 0 ${theme.flavor.strawberry.primary}`,
			},
			secondary: {
				backgroundColor: theme.flavor.strawberry.solid,
				color: "white",
				borderColor: theme.flavor.strawberry.impact,
				boxShadow: `0 2px 0 ${theme.flavor.strawberry.impact}`,
			},
		},
	},
	defaultVariants: {
		variant: "primary",
	},
});
