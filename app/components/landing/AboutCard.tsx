import { Slot } from "radix-ui";
import type { JSX } from "react";
import { cn } from "~/utils/cn";

export function AboutCard({ asChild, ...props }: { asChild?: boolean; } & React.ComponentPropsWithoutRef<"div">): JSX.Element {
	const Comp = asChild ? Slot.Root : "div";

	return (
		<Comp {...props} className={cn("w-80 h-80 rounded-full bg-fluffy-100 border border-fluffy-300 shadow-[0_4px_0] shadow-fluffy-300 flex flex-col items-center gap-2", props.className,)}>
			{/* <div className="absolute size-6 top-4 left-1/2 transform -translate-x-1/2 rounded-full bg-fluffy-50 border border-fluffy-300 shadow-fluffy-300 shadow-[inset_0_4px_0]" /> */}

			{props.children}
		</Comp>
	);
}

function AboutCardNumber({ asChild, ...props }: { asChild?: boolean; } & React.ComponentPropsWithoutRef<"div">): JSX.Element {
	const Comp = asChild ? Slot.Root : "div";

	return (
		<Comp {...props} className={cn("size-12 h-12 shrink-0 mt-4 rounded-full bg-fluffy-600 flex items-center justify-center text-white text-2xl font-bold", props.className)} />
	);
}

function AboutCardTitle({ asChild, ...props }: { asChild?: boolean; } & React.ComponentPropsWithoutRef<"div">): JSX.Element {
	const Comp = asChild ? Slot.Root : "h3";

	return (
		<Comp {...props} className={cn("flex items-center justify-center h-20 shrink-0 text-center text-4xl text-eyelash-700 font-semibold", props.className)} />
	);
}

function AboutCardDescription({ asChild, ...props }: { asChild?: boolean; } & React.ComponentPropsWithoutRef<"p">): JSX.Element {
	const Comp = asChild ? Slot.Root : "div";

	return (
		<Comp {...props} className={cn(`absolute inset-0 text-center text-base text-eyelash-600 flex-1
			before:content-[''] before:float-left before:w-1/2 before:h-80 before:[shape-outside:radial-gradient(farthest-side_at_right,transparent_calc(100%-8px),#fff_0)]`, props.className)}>
			<i className="float-right w-1/2 h-80 [shape-outside:radial-gradient(farthest-side_at_left,transparent_calc(100%-8px),#fff_0)]" />
			<div className="mt-40">
				{props.children}
			</div>
		</Comp>
	);
}

AboutCard.Number = AboutCardNumber;
AboutCard.Title = AboutCardTitle;
AboutCard.Description = AboutCardDescription;
