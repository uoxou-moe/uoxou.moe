import type { ComponentPropsWithRef } from "react";
import { styleButton } from "./Button.css";
import {Slot} from "radix-ui"

export function Button({ variant = "primary", asChild = false, ...props }: { variant?: "primary" | "secondary", asChild?: boolean } & ComponentPropsWithRef<"button">) {
	const Comp = asChild ? Slot.Root : "button";
	
	return (
		<Comp {...props} className={`${props.className} ${styleButton({ variant })}`} />
	);
}
