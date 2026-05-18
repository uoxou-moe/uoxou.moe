import { Main } from "~/components/Main";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "💌お問い合わせ ✧ UoxoU.moe" },
		{ name: "description", content: "お問い合わせページ" },
	];
}

export default function Home() {
	return (
		<Main>
			<Main.Title>お問い合わせ</Main.Title>
		</Main>
	);
}
