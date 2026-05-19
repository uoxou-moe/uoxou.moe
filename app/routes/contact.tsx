import { useForm } from "@tanstack/react-form";
import { Schema } from "effect";
import { standardSchemaV1 } from "effect/Schema";
import { Form } from "~/components/common/form/Form";
import { Main } from "~/components/Main";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "💌お問い合わせ ✧ UoxoU.moe" },
		{ name: "description", content: "お問い合わせページ" },
	];
}

const ContactForm = Schema.Struct({
	name: Schema.NonEmptyString,
	email: Schema.NonEmptyString,
	tel: Schema.optional(Schema.NonEmptyString),
	details: Schema.NonEmptyString,
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
			tel: undefined,
			details: "",
		} as ContactForm,
	});

	return (
		<Main>
			<Main.Title>お問い合わせ</Main.Title>

			<Main.Content>
				<Form method="post" action="/contact">
					<form.Field name="name">
						{(field) => (
							<Form.Field name={field.name}>
								<Form.Label>お名前</Form.Label>
								<Form.TextInput
									type="text"
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									required
									autoComplete="name"
								/>
							</Form.Field>
						)}
					</form.Field>

					<form.Field name="email">
						{(field) => (
							<Form.Field name={field.name}>
								<Form.Label>メールアドレス</Form.Label>
								<Form.TextInput
									type="email"
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									required
									autoComplete="email"
								/>
							</Form.Field>
						)}
					</form.Field>

					<form.Field name="tel">
						{(field) => (
							<Form.Field name={field.name}>
								<Form.Label>電話番号</Form.Label>
								<Form.TextInput
									type="tel"
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									autoComplete="tel"
								/>
							</Form.Field>
						)}
					</form.Field>

					<form.Field name="details">
						{(field) => (
							<Form.Field name={field.name}>
								<Form.Label>お問い合わせ内容</Form.Label>
								<Form.TextArea
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									required
									rows={10}
								/>
							</Form.Field>
						)}
					</form.Field>
				</Form>
			</Main.Content>
		</Main>
	);
}

