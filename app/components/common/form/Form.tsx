import { Form as FormPrimitive } from "radix-ui";
import type { ComponentPropsWithRef, JSX } from "react";
import { cn } from "~/utils/cn";

export function Form({ className, ...props }: { className?: string } & ComponentPropsWithRef<typeof FormPrimitive.Root>): JSX.Element {
	return (
		<FormPrimitive.Root {...props} className={cn("w-full max-w-2xl mx-auto flex flex-col gap-6", className)} />
	);
}

export function FormField({ className, ...props }: { className?: string } & ComponentPropsWithRef<typeof FormPrimitive.Field>): JSX.Element {
	return (
		<FormPrimitive.Field {...props} className={cn("flex flex-col gap-4", className)} />
	);
}