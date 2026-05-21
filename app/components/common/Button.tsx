import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import type { ComponentPropsWithRef } from "react";
import { cn } from "~/utils/cn";

const variants = cva(
	"w-fit h-10 inline-flex items-center justify-center px-6 rounded-md border transition-all duration-150 ease-in-out text-base shadow-[0_2px_0] -translate-y-0.5 active:translate-y-0 active:shadow-[0_0_0] disabled:translate-y-0 disabled:shadow-[0_0_0] disabled:opacity-60 disabled:pointer-events-none disabled:cursor-not-allowed",
	{
		variants: {
			variant: {
				primary: "bg-fluffy-50 text-eyelash-700 border-fluffy-300 shadow-fluffy-300 hover:bg-fluffy-100 hover:border-fluffy-400 hover:shadow-fluffy-400 hover:text-fluffy-800",
				secondary: "bg-fluffy-600 text-eyelash-50 border-fluffy-700 shadow-fluffy-700 hover:bg-fluffy-700 hover:border-fluffy-800 hover:shadow-fluffy-800",
			},
		},
		defaultVariants: {
			variant: "primary",
		},
	}
);

export function Button({ className, asChild = false, ...props }: { variant?: "primary" | "secondary", asChild?: boolean } & ComponentPropsWithRef<"button"> & VariantProps<typeof variants>) {
	const Comp = asChild ? Slot.Root : "button";

	return (
		<Comp
			{...props}
			className={cn(
				variants({ variant: props.variant }),
				className
			)}
		/>
	);
}
