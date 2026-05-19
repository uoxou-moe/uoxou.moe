import type { ComponentPropsWithRef, JSX } from "react";
import { cn } from "~/utils/cn";

export function Main({ className, ...props }: { className?: string } & ComponentPropsWithRef<"div">): JSX.Element {
	return (
		<div {...props} className={cn("w-full max-w-278 mx-auto px-4 py-16 flex flex-col gap-8", className)} />
	);
}

function MainTitle({ className, children, ...props }: { className?: string } & ComponentPropsWithRef<"h1">): JSX.Element {
	return (
		<h1 {...props} className={cn("text-3xl text-eyelash-800 font-decol relative after:content-['‧₊˚✧']", className)}>
			{children}
		</h1>
	);
}

function MainContent({ className, ...props }: { className?: string } & ComponentPropsWithRef<"div">): JSX.Element {
	return (
		<div {...props} className={cn("text-lg text-eyelash-600", className)} />
	);
}

Main.Title = MainTitle;
Main.Content = MainContent;
