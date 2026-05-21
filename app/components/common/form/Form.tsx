import { Form as FormPrimitive } from "radix-ui";
import type { ComponentPropsWithRef, JSX } from "react";
import { cn } from "~/utils/cn";

export function Form({ className, ...props }: { className?: string } & ComponentPropsWithRef<"form">): JSX.Element {
	return (
		<form {...props} className={cn("w-full max-w-2xl mx-auto flex flex-col gap-6", className)} />
	);
}

export function FormField({ className, ...props }: { className?: string } & ComponentPropsWithRef<"div">): JSX.Element {
	return (
		<div {...props} className={cn("flex flex-col gap-2 group", className)} />
	);
}

export function FormLabel({ className, ...props }: { className?: string } & ComponentPropsWithRef<"label">): JSX.Element {
	return (
		<label {...props} className={cn(`
			text-sm text-eyelash-700 font-semibold
			group-has-required:after:content-['必須'] group-has-required:after:text-xs group-has-required:after:align-top group-has-required:after:mx-1 group-has-required:after:text-red-500
		`, className)} />
	);
}

export function FormTextInput({ className, ...props }: { className?: string } & ComponentPropsWithRef<"input">): JSX.Element {
	return (
		<input {...props} className={cn(`
			w-full h-10 rounded-md bg-fluffy-100 border border-fluffy-500 shadow-fluffy-300 shadow-[inset_0_2px_0] px-4 py-2 text-sm text-eyelash-800
			focus:ring-2 focus:ring-fluffy-700 focus:outline-none focus:ring-offset-2
			aria-invalid:border-red-500
		`, className)} />
	);
}

export function FormTextArea({ className, ...props }: { className?: string } & ComponentPropsWithRef<"textarea">): JSX.Element {
	return (
		<textarea {...props} className={cn(`
			w-full rounded-md bg-fluffy-100 border border-fluffy-500 shadow-fluffy-300 shadow-[inset_0_2px_0] px-4 py-2 text-sm text-eyelash-800
			focus:ring-2 focus:ring-fluffy-700 focus:outline-none focus:ring-offset-2
			aria-invalid:border-red-500
		`, className)} />
	);
}

export function FormMessage({ className, ...props }: { className?: string } & ComponentPropsWithRef<"div">): JSX.Element {
	return (
		<div {...props} className={cn(`
			text-sm text-red-500
		`, className)} />
	);
}

Form.Field = FormField;
Form.Label = FormLabel;
Form.TextInput = FormTextInput;
Form.TextArea = FormTextArea;
Form.Message = FormMessage;
