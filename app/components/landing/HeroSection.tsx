import { lazy, Suspense, type ComponentPropsWithRef, type JSX } from "react";
import { Link } from "react-router";
import { H, SectionSContent } from "shirayuki-twinkle";
import { Button } from "~/components/common/Button";
import { cn } from "~/utils/cn";

const BackgroundCanvas = lazy(() => import("./HeroSectionCanvas").then(mod => ({ default: mod.BackgroundCanvas })));
const UsagiCanvas = lazy(() => import("./HeroSectionCanvas").then(mod => ({ default: mod.UsagiCanvas })));

export function HeroSection({ className, ...props }: ComponentPropsWithRef<"div">): JSX.Element {
	return (
		<div {...props} className={cn("relative h-[calc(100vh-70px)] w-full bg-fluffy-50", className)}>
			<Suspense fallback={<div style={{ position: "absolute", inset: 0 }} />}>
				<BackgroundCanvas />
				<UsagiCanvas />
			</Suspense>

			<SectionSContent className="relative z-10 mx-auto flex h-full w-full max-w-278 flex-col gap-6 px-4 pt-40">
				<p className="text-xl text-eyelash-700">ようこそ、不思議の国へ。 We are</p>

				<H className="text-[6rem] font-normal leading-none text-eyelash-700 max-md:text-6xl">꒰ UoxoU ꒱</H>

				<p className="text-xl text-eyelash-700">
					Webのこと、短歌のこと。<br />
					技術の力でどんなことでも叶えます。
				</p>

				<div className="flex gap-3">
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
