import { clsx } from "clsx";
import { AspectRatio, Slot } from "radix-ui";
import type { JSX } from "react";
import { cn } from "~/utils/cn";

export function MemberCard({ asChild, children, ...props }: { asChild?: boolean } & React.ComponentPropsWithRef<"div">): JSX.Element {
	const Comp = asChild ? Slot.Root : "div";

	return (
		<Comp {...props} className="relative w-71.5 h-105 rounded-t-[143px] rounded-b-xl border border-fluffy-300 bg-fluffy-100 shadow-fluffy-300 shadow-[0_4px_0] p-8 flex flex-col gap-4">
			<div className="absolute bottom-2 right-2 text-eyelash-700 text-2xl -rotate-25 whitespace-pre">
				౨ৎ︎
			</div>

			{children}
		</Comp>
	);
}

function MemberCardIcon({ asChild, ...props }: { asChild?: boolean } & React.ComponentPropsWithRef<"div">): JSX.Element {
	const Comp = asChild ? Slot.Root : "div";

	return (
		<AspectRatio.Root ratio={1 / 1}>
			<Comp {...props} className={cn("w-full h-full rounded-full border border-fluffy-300 bg-fluffy-50 flex items-center justify-center text-[70px] font-sans text-[#FF99CC] whitespace-pre", props.className)} />
		</AspectRatio.Root>
	);
}

function MemberCardContent({ asChild, ...props }: { asChild?: boolean } & React.ComponentPropsWithRef<"div">): JSX.Element {
	const Comp = asChild ? Slot.Root : "div";

	return (
		<Comp {...props} className={cn(props.className, "flex flex-col gap-1")} />
	);
}

function MemberCardName({ asChild, ...props }: { asChild?: boolean } & React.ComponentPropsWithRef<"h3">): JSX.Element {
	const Comp = asChild ? Slot.Root : "h3";

	return (
		<Comp {...props} className={clsx(props.className, "text-lg font-medium text-eyelash-700")} />
	);
}

function MemberCardBio({ asChild, ...props }: { asChild?: boolean } & React.ComponentPropsWithRef<"div">): JSX.Element {
	const Comp = asChild ? Slot.Root : "div";

	return (
		<Comp {...props} className={clsx(props.className, "text-sm text-eyelash-600")} />
	);
}

MemberCard.Icon = MemberCardIcon;
MemberCard.Content = MemberCardContent;
MemberCard.Name = MemberCardName;
MemberCard.Bio = MemberCardBio;
