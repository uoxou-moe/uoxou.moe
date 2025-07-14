import { createGlobalTheme } from "@vanilla-extract/css";

export const flavors = createGlobalTheme(":root", {
	strawberry: {
		50: "#FFF8FC",
		100: "#FFEAF5",
		200: "#FFDEEF",
		300: "#FFD1EA",
		400: "#FFBFE1",
		500: "#FFC1E3",
		600: "#FF99CC",
		700: "#FF6BAF",
		800: "#FF3F93",
		900: "#FF1D7F"
	},
	ramune: {
		50: "#F2FBFF",
		100: "#E3F5FF",
		200: "#D0EEFF",
		300: "#B8E6FF",
		400: "#9FD9FA",
		500: "#AEE2FF",
		600: "#7ECFF5",
		700: "#4EB8E8",
		800: "#2F9FD2",
		900: "#1789BC"
	},
	chocolate: {
		50: "#FFFCFA",
		100: "#FAF6F3",
		200: "#F1ECE9",
		300: "#E3DCD8",
		400: "#D1C6C1",
		500: "#B7A8A3",
		600: "#8D7E79",
		700: "#6E5F5A",
		800: "#514440",
		900: "#382E2B"
	}
});

const flavor = {
	strawberry: {
		50: "#FFF3F9",
		100: "#FFEAF5",
		200: "#FFDEEF",
		300: "#FFD1EA",
		400: "#FFBFE1",
		500: "#FFC1E3",
		600: "#FF99CC",
		700: "#FF6BAF",
		800: "#FF3F93",
		900: "#FF1D7F",
		primary: "#FFC1E3",
		secondary: "#FFE5F1",
		tertiary: "#FFB1DA",
	},
	chocolate: {
		primary: "#444444",
		secondary: "#666666",
	},
} as const;

export const theme = createGlobalTheme(":root", {
	flavor: {
		text: {
			primary: flavor.chocolate.primary,
			secondary: flavor.chocolate.secondary,
		},
		button: {
			primary: flavors.strawberry[100],
			hover: flavors.strawberry[200],
			active: flavors.strawberry[300],
		},
		strawberry: {
			primary: flavors.strawberry[500],
			subtle: flavors.strawberry[100],
			muted: flavors.strawberry[200],
			emphasaized: flavors.strawberry[300],
			base: flavors.strawberry[50],
			solid: flavors.strawberry[600],
			fg: flavors.strawberry[800],
		},
		ramune: {
			primary: flavors.ramune[500],
			subtle: flavors.ramune[100],
			muted: flavors.ramune[200],
			emphasaized: flavors.ramune[300],
			base: flavors.ramune[50],
			solid: flavors.ramune[600],
			fg: flavors.ramune[800],
		},
		chocolate: {
			primary: flavor.chocolate.primary,
			subtle: flavors.chocolate[100],
			muted: flavors.chocolate[200],
			emphasaized: flavors.chocolate[300],
			base: flavors.chocolate[50],
			solid: flavors.chocolate[600],
			fg: flavors.chocolate[800],
		},
	},
	size: {
		small: "1rem",
		medium: "2.5rem",
	}
});

