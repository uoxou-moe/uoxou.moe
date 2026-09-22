import { LabelTag } from "~/components/common/LabelTag";
import { UserLabel } from "~/components/common/UserLabel";

export default function BlogExample() {
	return (
		<article className="container mx-auto py-4">
			<header className="flex flex-col gap-2 py-4">
				<ul className="flex flex-wrap gap-2 ml-auto">
					<li>
						<LabelTag>フロントエンド</LabelTag>
					</li>
					<li>
						<LabelTag>React</LabelTag>
					</li>
				</ul>

				<h1 className="text-eyelash-700 text-3xl font-bold">ブログの例</h1>

				<UserLabel className="ml-auto">
					<UserLabel.Icon>
						<UserLabel.IconImage src="/images/user-icon.png" alt="User Icon" />
					</UserLabel.Icon>
					<UserLabel.Name>Zemelua</UserLabel.Name>
				</UserLabel>
			</header>

			<section className="prose w-full">
				<p>これはブログの例です。ここにブログの内容が表示されます。</p>
			</section>
		</article>
	);
}
