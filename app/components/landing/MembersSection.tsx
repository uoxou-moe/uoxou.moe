import type { ComponentPropsWithRef, JSX } from "react";
import tomatokun from "~/assets/tomatokun-toumei.png";
import { Section } from "~/components/landing/Section";
import { MemberCard } from "./MemberCard";

export function MembersSection({ ...props }: Omit<ComponentPropsWithRef<typeof Section>, "children">): JSX.Element {
	return (
		<Section {...props}>
			<Section.Title>
				メンバー

				<Section.TitleShadow>Members</Section.TitleShadow>
			</Section.Title>

			<Section.Content>
				<div className="w-full flex flex-row justify-center gap-8">
					<MemberCard>
						<MemberCard.Icon>
							<span>⩌   ̫ ⩌</span>
						</MemberCard.Icon>

						<MemberCard.Content>
							<MemberCard.Name>
								Zemelua ／ 緑川すに
							</MemberCard.Name>

							<MemberCard.Bio>
								<p>
									フロントエンド、Web デザイン、ネイティブアプリ開発など。
								</p>
								<p>
									UI/UXとアクセシビリティに関心があります。
								</p>
								<p>
									現代短歌が趣味。
								</p>
							</MemberCard.Bio>
						</MemberCard.Content>
					</MemberCard>

					<MemberCard>
						<MemberCard.Icon>
							<img src={tomatokun} alt="メンバー2" />
						</MemberCard.Icon>

						<MemberCard.Content>
							<MemberCard.Name>
								supurazako
							</MemberCard.Name>

							<MemberCard.Bio>
								<p>
									アプリケーション開発や、ネットワーク・脆弱性調査に関心があります。
									堅実で拡張しやすいシステム開発を目指しています。
								</p>
								<p>
									好きなもの：Go・WebRTC
								</p>
							</MemberCard.Bio>
						</MemberCard.Content>
					</MemberCard>

				</div>
			</Section.Content>
		</Section>
	);
}
