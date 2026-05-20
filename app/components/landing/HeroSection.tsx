import { lazy, Suspense, type JSX } from "react";
import { Link } from "react-router";
import { H, SectionSContent } from "shirayuki-twinkle";
import { Button } from "~/components/common/Button";
import { styleButtonsContainer, styleContainer, styleContentSection, styleIntro, styleMessage, styleTitle } from "./HeroSection.css";

const BackgroundCanvas = lazy(() => import("./HeroSectionCanvas").then(mod => ({ default: mod.BackgroundCanvas })));
const UsagiCanvas = lazy(() => import("./HeroSectionCanvas").then(mod => ({ default: mod.UsagiCanvas })));

export function HeroSection({ ...props }: React.ComponentPropsWithRef<"div">): JSX.Element {
	return (
		<div {...props} className={`${styleContainer}`}>
			<Suspense fallback={<div style={{ position: "absolute", inset: 0 }} />}>
				<BackgroundCanvas />
				<UsagiCanvas />
			</Suspense>

			<SectionSContent className={`${styleContentSection}`}>
				<p className={`${styleIntro}`}>ようこそ、不思議の国へ。 We are</p>

				<H className={`${styleTitle}`}>꒰ UoxoU ꒱</H>

				<p className={`${styleMessage}`}>
					Webのこと、短歌のこと。<br />
					技術の力でどんなことでも叶えます。
				</p>

				<div className={`${styleButtonsContainer}`}>
					<Button asChild>
						<Link to={"#services"}>
							こんなことができます
						</Link>
					</Button>

					<Button variant="secondary" asChild>
						<Link to={"#works"}>
							これまでの実績
						</Link>
					</Button>
				</div>
			</SectionSContent>
		</div>
	);
}
