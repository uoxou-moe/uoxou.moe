import { mergeProps, useRender } from "@base-ui/react";
import { lazy, Suspense } from "react";

const TagRibbon = lazy(() => import("./TagRibbon"));

export function LabelTag(props: useRender.ComponentProps<"span">) {
	const { render, children, ...otherProps } = props;

	const element = useRender({
		defaultTagName: "span",
		render,
		props: mergeProps<"span">(
			{
				className: "block relative isolate overflow-visible ml-6 mt-1 mb-4 text-sm",
				children: (
					<>
						{
							<Suspense fallback={null}>
								<TagRibbon />
							</Suspense>
						}
						<div className="bg-fluffy-400 absolute top-1/2 left-3 size-1 -translate-y-1/2 rounded-full" />
						<span
							aria-hidden="true"
							className="bg-fluffy-100 border-fluffy-400 shadow-fluffy-400 pointer-events-none -z-10 flex h-8 w-max items-center rounded-md border p-2 pl-[calc(var(--spacing)*2+16px)] shadow-[0_2px_0] [border-shape:polygon(round_6px,12px_0,100%_0,100%_100%,12px_100%,0_50%)]"
						>
							＃{children}
						</span>
					</>
				),
			},
			otherProps,
		),
	});

	return element;
}
