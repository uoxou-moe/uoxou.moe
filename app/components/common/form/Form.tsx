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
		<FormPrimitive.Field {...props} className={cn("flex flex-col gap-2 group", className)} />
	);
}

export function FormLabel({ className, ...props }: { className?: string } & ComponentPropsWithRef<typeof FormPrimitive.Label>): JSX.Element {
	return (
		<FormPrimitive.Label {...props} className={cn(`
			text-sm text-eyelash-700 font-semibold
			group-has-required:after:content-['必須'] group-has-required:after:text-xs group-has-required:after:align-top group-has-required:after:mx-1 group-has-required:after:text-red-500
		`, className)} />
	);
}

export function FormTextInput({ className, ...props }: { className?: string } & ComponentPropsWithRef<typeof FormPrimitive.Control>): JSX.Element {
	return (
		<FormPrimitive.Control {...props} className={cn(`
			w-full h-10 rounded-md bg-fluffy-100 border border-fluffy-500 shadow-fluffy-300 shadow-[inset_0_2px_0] px-4 py-2 text-sm
			focus:ring-2 focus:ring-fluffy-700 focus:outline-none focus:ring-offset-2
			data-invalid:border-red-500
		`, className)} />
	);
}

export function FormTextArea({ className, ...props }: { className?: string } & ComponentPropsWithRef<"textarea">): JSX.Element {
	return (
		<FormPrimitive.Control className={cn(`
			w-full rounded-md bg-fluffy-100 border border-fluffy-500 shadow-fluffy-300 shadow-[inset_0_2px_0] px-4 py-2 text-sm
			focus:ring-2 focus:ring-fluffy-700 focus:outline-none focus:ring-offset-2
			data-invalid:border-red-500
		`, className)} asChild>
			<textarea {...props} />
		</FormPrimitive.Control>
	);
}

Form.Field = FormField;
Form.Label = FormLabel;
Form.TextInput = FormTextInput;
Form.TextArea = FormTextArea;
