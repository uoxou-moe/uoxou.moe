import type { ComponentPropsWithRef, JSX } from "react";
import { Section } from "~/components/landing/Section";
import { WorkCard } from "./WorkCard";

export function WorksSection({ ...props }: Omit<ComponentPropsWithRef<typeof Section>, "children">): JSX.Element {
	return (
		<Section {...props}>
			<Section.Title>
				これまでの実績

				<Section.TitleShadow>Works</Section.TitleShadow>
			</Section.Title>

			<Section.Content>
				<div className="w-full flex flex-row justify-center gap-8">
					<WorkCard>
						<WorkCard.Cover src="https://picsum.photos/320/240" alt="Work 1" />
						<WorkCard.Label>
							<WorkCard.Title>短歌アプリ「Flavor」</WorkCard.Title>
							<WorkCard.Description>
								短歌を作成・共有できるアプリ。React NativeとFirebaseを使用して開発。
							</WorkCard.Description>
						</WorkCard.Label>
					</WorkCard>

					<WorkCard>
						<WorkCard.Cover src="https://picsum.photos/320/240" alt="Work 2" />
						<WorkCard.Label>
							<WorkCard.Title>nicomado</WorkCard.Title>
							<WorkCard.Description>
								複数の異なるプラットフォームの動画・配信を同時に視聴できるウェブアプリです。
							</WorkCard.Description>
						</WorkCard.Label>
					</WorkCard>
				</div>
			</Section.Content>
		</Section>
	);
}
