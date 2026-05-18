import type { ComponentPropsWithRef, JSX } from "react";
import { cn } from "~/utils/cn";

export function Main({ className, ...props }: { className?: string } & ComponentPropsWithRef<"div">): JSX.Element {
	return (
		<div {...props} className={cn("w-full max-w-278 mx-auto px-4 py-16 flex flex-col gap-6", className)} />
	);
}

function MainTitle({ className, children, ...props }: { className?: string } & ComponentPropsWithRef<"h1">): JSX.Element {
	return (
		<h1 {...props} className={cn("text-5xl text-eyelash-700 font-decol relative", className)}>
			<span className="whitespace-pre mr-2 text-4xl">:✧˖(ෆ˘͈ ᵕ˘͈)</span>
			{children}
			<span className="whitespace-pre ml-2 text-4xl">(˘͈ᵕ ˘͈ෆ)✧˖°:</span>
		</h1>
	);
}

Main.Title = MainTitle;
