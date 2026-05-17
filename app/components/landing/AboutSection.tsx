import type { ComponentPropsWithRef, JSX } from "react";
import { AboutCard } from "~/components/landing/AboutCard";
import { Section } from "~/components/landing/Section";

export function AboutSection({ ...props }: Omit<ComponentPropsWithRef<typeof Section>, "children">): JSX.Element {
	return (
		<Section {...props}>
			<Section.Title>
				こんなことができます

				<Section.TitleShadow>
					Services
				</Section.TitleShadow>
			</Section.Title>

			<Section.Content>
				<p className="text-base text-eyelash-600">
					私たちは、技術と創造力を駆使して、革新的なプロジェクトを生み出すことができます。フロントエンドからバックエンドまで、幅広い技術スタックを活用して、ユーザーにとって魅力的で使いやすいアプリケーションを開発します。
				</p>
				<div className="w-full h-140 flex flex-row mt-8">
					<div className="relative w-1/4">
						<AboutCard className="absolute top-0 left-1/2 transform -translate-x-1/2">
							<AboutCard.Number>
								1
							</AboutCard.Number>
							<AboutCard.Title>
								Web開発
							</AboutCard.Title>
							<AboutCard.Description>
								<p>
									ホームページ作成、ウェブアプリの開発など<span className="pre">•*¨*•.¸¸♪✧</span>
								</p>
								<p>
									なんでもご相談ください！
								</p>
							</AboutCard.Description>
						</AboutCard>
					</div>
					<div className="relative w-1/4">
						<AboutCard className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
							<AboutCard.Number>
								2
							</AboutCard.Number>
							<AboutCard.Title>
								短歌✕IT
							</AboutCard.Title>
							<AboutCard.Description>
								<p>
									現代短歌を趣味とするメンバーがいます。
								</p>
								<p>
									技術の力で、現代短歌をもっと盛り上げたい<span className="pre">(ㅅ´ ˘ `)✧.｡.:*</span>
								</p>
							</AboutCard.Description>
						</AboutCard>
					</div>
					<div className="relative w-1/4">
						<AboutCard className="absolute top-0 left-1/2 transform -translate-x-1/2">
							<AboutCard.Number>
								3
							</AboutCard.Number>
							<AboutCard.Title>
								システム開発
							</AboutCard.Title>
							<AboutCard.Description>
								<p>
									業務の効率化のためのシステム開発や、スマホアプリの開発など、幅広く対応可能です！
								</p>
							</AboutCard.Description>
						</AboutCard>
					</div>
					<div className="relative w-1/4">
						<AboutCard className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
							<AboutCard.Number>
								4
							</AboutCard.Number>
							<AboutCard.Title>
								改善・改修
							</AboutCard.Title>
							<AboutCard.Description>
								<p>
									ウェブアプリの改善や、既存システムの改修なども！
								</p>
								<p>
									特に、UIやUXの改善には自信があります<span className="pre">✧*｡٩(ˊᗜˋ*)و✧*｡</span>
								</p>
							</AboutCard.Description>
						</AboutCard>
					</div>
				</div>
			</Section.Content>
		</Section>
	);
}
