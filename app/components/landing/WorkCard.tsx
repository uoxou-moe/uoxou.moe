import clsx from "clsx";
import { Slot } from "radix-ui";
import type { ComponentPropsWithRef, JSX } from "react";

export function WorkCard({ asChild, ...props }: { asChild?: boolean } & ComponentPropsWithRef<"div">): JSX.Element {
	const Comp = asChild ? Slot.Root : "div";

	return (
		<Comp {...props} className={clsx(props.className, "w-72 h-72 bg-fluffy-100 border border-fluffy-500 rounded-lg flex flex-col gap-1 p-2 shadow-fluffy-500 shadow-[0_4px_0]")} />
	);
}

function WorkCardCover({ asChild, ...props }: { asChild?: boolean } & ComponentPropsWithRef<"img">): JSX.Element {
	const Comp = asChild ? Slot.Root : "img";

	return (
		<Comp
			{...props}
			className={clsx(props.className, "w-full h-42 rounded-lg border border-fluffy-500 bg-fluffy-50")}
		/>
	);
}

function WorkCardLabel({ asChild, ...props }: { asChild?: boolean } & ComponentPropsWithRef<"div">): JSX.Element {
	const Comp = asChild ? Slot.Root : "div";

	return (
		<Comp {...props} className={clsx(props.className, "w-full h-full flex flex-col px-2")} />
	);
}

function WorkCardTitle({ asChild, ...props }: { asChild?: boolean } & ComponentPropsWithRef<"h3">): JSX.Element {
	const Comp = asChild ? Slot.Root : "h3";

	return (
		<Comp {...props} className={clsx(props.className, "text-lg font-semibold text-eyelash-700 flex flex-row items-center gap-2")} >
			<span className="text-2xl">✧</span>
			{props.children}
			<span className="text-2xl">✧</span>
		</Comp>
	);
}

function WorkCardDescription({ asChild, ...props }: { asChild?: boolean } & ComponentPropsWithRef<"p">): JSX.Element {
	const Comp = asChild ? Slot.Root : "p";

	return (
		<Comp {...props} className={clsx(props.className, "text-sm text-eyelash-500")} />
	);
}

WorkCard.Cover = WorkCardCover;
WorkCard.Label = WorkCardLabel;
WorkCard.Title = WorkCardTitle;
WorkCard.Description = WorkCardDescription;
