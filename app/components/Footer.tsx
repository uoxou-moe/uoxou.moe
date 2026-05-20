import { SiGithub, SiX } from "@icons-pack/react-simple-icons";
import { LucideExternalLink } from "lucide-react";
import type { JSX } from "react";

export function Footer(): JSX.Element {
	return (
		<footer className="w-[calc(100%-1rem)] mx-2 px-8 py-8 bg-white border-t border-x border-fluffy-300/50 rounded-t-xl shadow-fluffy-300 shadow-[0_1px_2px]">
			<div className="w-full max-w-278 mx-auto mb-4 text-sm text-eyelash-500">
				꒰ UoxoU ꒱
				<dl className="w-fit grid grid-cols-[auto_1fr] items-center justify-center gap-x-4 text-center">
					<dt>
						<SiX className="inline-block" size="0.9rem" />
					</dt>
					<dd className="flex">
						<a href="https://twitter.com/uoxou_moe" target="_blank" rel="noopener noreferrer">
							@uoxou_moe
							<LucideExternalLink className="inline-block ml-1" size="1rem" />
						</a>
					</dd>
					<dt>
						<SiGithub className="inline-block" size="1.0rem" />
					</dt>
					<dd className="flex">
						<a href="https://github.com/uoxou-moe" target="_blank" rel="noopener noreferrer">
							uoxou-moe
							<LucideExternalLink className="inline-block ml-1" size="1rem" />
						</a>
					</dd>
				</dl>
			</div>

			<div className="w-full max-w-278 mx-auto text-center text-sm text-eyelash-500">
				&copy; {new Date().getFullYear()} UoxoU. 🥕 All rights and carrots reserved.
			</div>
		</footer>
	);
}
