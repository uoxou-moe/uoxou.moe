import { useForm } from "@tanstack/react-form";
import { Schema } from "effect";
import { standardSchemaV1 } from "effect/Schema";
import { Button } from "~/components/common/Button";
import { Form } from "~/components/common/form/Form";
import { Main } from "~/components/Main";
import type { Route } from "./+types/home";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "💌お問い合わせ ✧ UoxoU.moe" },
		{ name: "description", content: "お問い合わせページ" },
	];
}

const ContactForm = Schema.Struct({
	name: Schema.String.pipe(
		Schema.filter((str) => str.trim().length > 0, { message: () => "お名前を入力してください。" }),
	),
	email: Schema.String.pipe(
		Schema.filter((str) => str.trim().length > 0, { message: () => "メールアドレスを入力してください。" }),
		Schema.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, {
			message: () => "有効なメールアドレスを入力してください。",
		}),
	),
	tel: Schema.optional(Schema.String),
	details: Schema.String.pipe(
		Schema.filter((str) => str.trim().length > 0, { message: () => "お問い合わせ内容を入力してください。" })
	),
});

type ContactForm = Schema.Schema.Type<typeof ContactForm>;

export default function Home() {
	const form = useForm({
		validators: {
			onBlur: standardSchemaV1(ContactForm),
		},
		defaultValues: {
			name: "",
			email: "",
			tel: "",
			details: "",
		} as ContactForm,
		onSubmit: async ({ value }) => {
			const body = new URLSearchParams();

			body.append(import.meta.env.VITE_FORM_ENTRY_NAME, value.name);
			body.append(import.meta.env.VITE_FORM_ENTRY_EMAIL, value.email);
			body.append(import.meta.env.VITE_FORM_ENTRY_TEL, value.tel ?? "");
			body.append(import.meta.env.VITE_FORM_ENTRY_DETAILS, value.details);

			const response = await fetch(import.meta.env.VITE_FORM_ACTION, {
				method: "POST",
				mode: "no-cors",
				headers: {
					"Content-Type":
						"application/x-www-form-urlencoded",
				},
				body,
			});

			if (!response.ok && response.type !== "opaque") {
				throw new Error(`フォームの送信に失敗しました: ${response.statusText}`);
			}
		}
	});

	const [result, setResult] = useState<string | null>(null);

	return (
		<Main>
			<div className="flex flex-row gap-2 items-end">
				<Main.Title>お問い合わせ</Main.Title>

				{result && (
					<div className="text-sm text-green-500">
						{result}
					</div>
				)}
			</div>

			<Main.Content>
				<Form onSubmit={async (e) => {
					e.preventDefault();
					try {
						await form.handleSubmit();
						setResult("送信が完了しました。");
					} catch (error) {
						setResult("送信中にエラーが発生しました。時間を置いて再度お試しください。");
					} finally {
						form.reset();
					}
				}}>
					<form.Field name="name">
						{(field) => (
							<Form.Field>
								<Form.Label htmlFor={field.name}>お名前</Form.Label>
								<Form.TextInput
									id={field.name}
									name={field.name}
									type="text"
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									required
									autoComplete="name"
									aria-invalid={field.state.meta.errorMap.onBlur ? "true" : "false"}
								/>
								{
									field.state.meta.errorMap.onBlur && (
										<Form.Message>
											{
												Object.values(field.state.meta.errorMap.onBlur)
													.flat()
													.map(issue => issue.message)
													.join(", ")
											}
										</Form.Message>
									)
								}
							</Form.Field>
						)}
					</form.Field>

					<form.Field name="email">
						{(field) => (
							<Form.Field>
								<Form.Label htmlFor={field.name}>メールアドレス</Form.Label>
								<Form.TextInput
									id={field.name}
									name={field.name}
									type="email"
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									required
									autoComplete="email"
									aria-invalid={field.state.meta.errorMap.onBlur ? "true" : "false"}
								/>
								{
									field.state.meta.errorMap.onBlur && (
										<Form.Message>
											{
												Object.values(field.state.meta.errorMap.onBlur)
													.map(issue => issue.message)
													.join(", ")
											}
										</Form.Message>
									)
								}
							</Form.Field>
						)}
					</form.Field>

					<form.Field name="tel">
						{(field) => (
							<Form.Field>
								<Form.Label htmlFor={field.name}>電話番号</Form.Label>
								<Form.TextInput
									id={field.name}
									name={field.name}
									type="tel"
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									autoComplete="tel"
									aria-invalid={field.state.meta.errorMap.onBlur ? "true" : "false"}
								/>
								{
									field.state.meta.errorMap.onBlur && (
										<Form.Message>
											{
												Object.values(field.state.meta.errorMap.onBlur)
													.flat()
													.map(issue => issue.message)
													.join(", ")
											}
										</Form.Message>
									)
								}
							</Form.Field>
						)}
					</form.Field>

					<form.Field name="details">
						{(field) => (
							<Form.Field>
								<Form.Label htmlFor={field.name}>お問い合わせ内容</Form.Label>
								<Form.TextArea
									id={field.name}
									name={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									required
									rows={10}
									aria-invalid={field.state.meta.errorMap.onBlur ? "true" : "false"}
								/>
							</Form.Field>
						)}
					</form.Field>

					<form.Subscribe selector={(state) => [state.isSubmitting, state.canSubmit]}>
						{([isSubmitting, canSubmit]) => (
							<Button className="self-end" type="submit" variant="secondary" disabled={!canSubmit || isSubmitting}>
								{isSubmitting ? "送信中⋯" : "送信する"}
							</Button>
						)}
					</form.Subscribe>
				</Form>
			</Main.Content>
		</Main >
	);
}

