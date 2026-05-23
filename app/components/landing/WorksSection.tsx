import type { ComponentPropsWithRef, JSX } from "react";
import flavorCover from "~/assets/flavor-cover.png";
import nicomadoCover from "~/assets/nicomado-cover.svg";
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
				<div className="w-full flex flex-row justify-center gap-8 max-md:flex-col max-md:items-center">
					<WorkCard asChild>
						<a className="hover:bg-fluffy-200 active:bg-fluffy-300 active:translate-y-1 active:shadow-none transition-all" href="https://x.com/flavor_tanka" target="_blank" rel="noopener noreferrer">
							<WorkCard.Cover className="bg-white" src={flavorCover} alt="短歌アプリ「Flavor」のロゴアイコン。" />
							<WorkCard.Label>
								<WorkCard.Title>短歌アプリ「Flavor」</WorkCard.Title>
								<WorkCard.Description>
									あなたの好きな短歌に必ず出会える、短歌配信アプリです。
								</WorkCard.Description>
							</WorkCard.Label>
						</a>
					</WorkCard>

					<WorkCard asChild>
						<a className="hover:bg-fluffy-200 active:bg-fluffy-300 active:translate-y-1 active:shadow-none transition-all" href="https://nicomado.com" target="_blank" rel="noopener noreferrer">
							<WorkCard.Cover src={nicomadoCover} alt="「nicomado」のロゴアイコン。" />
							<WorkCard.Label>
								<WorkCard.Title>nicomado</WorkCard.Title>
								<WorkCard.Description>
									複数の異なるプラットフォームの動画・配信を同時に視聴できるウェブアプリです。
								</WorkCard.Description>
							</WorkCard.Label>
						</a>
					</WorkCard>
				</div>
			</Section.Content>
		</Section>
	);
}
