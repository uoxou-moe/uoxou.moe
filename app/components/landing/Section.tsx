import type { ComponentPropsWithRef, JSX } from "react";
import { cn } from "~/utils/cn";

export function Section({ className, ...props }: { className?: string } & ComponentPropsWithRef<"section">): JSX.Element {
	return (
		<section {...props} className={cn("w-full max-w-278 mx-auto px-4 py-16 flex flex-col gap-6", className)} />
	);
}

function SectionTitle({ className, children, ...props }: { className?: string } & ComponentPropsWithRef<"h2">): JSX.Element {
	return (
		<h2 {...props} className={cn("text-4xl text-eyelash-700 font-decol relative", className)}>
			<span className="whitespace-pre mr-2 text-3xl">:✧˖(ෆ˘͈ ᵕ˘͈)</span>
			{children}
			<span className="whitespace-pre ml-2 text-3xl">(˘͈ᵕ ˘͈ෆ)✧˖°:</span>
		</h2>
	);
}

function SectionTitleShadow({ className, ...props }: { className?: string } & ComponentPropsWithRef<"span">): JSX.Element {
	return (
		<span {...props} className={cn("font-[Lexend_Variable] absolute -left-8 -bottom-4 text-8xl text-fluffy-900/10 -z-10", className)} />
	);
}

function SectionContent({ className, ...props }: { className?: string } & ComponentPropsWithRef<"div">): JSX.Element {
	return (
		<div {...props} className={cn("w-full", className)} />
	);
}

Section.Title = SectionTitle;
Section.TitleShadow = SectionTitleShadow;
Section.Content = SectionContent;
