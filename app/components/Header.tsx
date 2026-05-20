import { cva } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import { Link, NavLink } from "react-router";
import { cn } from "~/utils/cn";
import { Button } from "./common/Button";

export function Header() {
	return (
		<header className="z-10 flex w-[100%-1rem] mx-2 h-16 items-center border-b border-x border-fluffy-300 bg-white font-sans text-eyelash-700 rounded-b-xl shadow-fluffy-300/50 shadow-[0_2px_2px] overflow-visible">
			<div className="mx-auto flex h-full w-full max-w-7xl items-center gap-6 px-4 md:px-6">
				{/* <img className={`${styleLogo}`} src={logo} alt="Logo" /> */}
				<nav className="ml-auto flex h-full items-center">
					<ul className="flex h-full w-fit list-none items-center justify-center gap-4">
						<li className="flex h-full items-center justify-center">
							<HeaderNavItem to="/" end>ホーム</HeaderNavItem>
						</li>
						<li className="flex h-full items-center justify-center">
							<Link className="flex h-full w-full items-center justify-center text-[0.9375rem] font-medium text-current no-underline transition-colors hover:text-fluffy-800 focus-visible:outline-none focus-visible:text-fluffy-800" to="/#services">
								こんなことができます
							</Link>
						</li>
						<li className="flex h-full items-center justify-center">
							<Link className="flex h-full w-full items-center justify-center text-[0.9375rem] font-medium text-current no-underline transition-colors hover:text-fluffy-800 focus-visible:outline-none focus-visible:text-fluffy-800" to="/#works">
								これまでの実績
							</Link>
						</li>
						<li className="flex h-full items-center justify-center">
							<Link className="flex h-full w-full items-center justify-center text-[0.9375rem] font-medium text-current no-underline transition-colors hover:text-fluffy-800 focus-visible:outline-none focus-visible:text-fluffy-800" to="/#members">
								メンバー
							</Link>
						</li>
						<li className="flex h-full items-center justify-center">
							<Button asChild className="bg-fluffy-100 border-fluffy-400 shadow-fluffy-400 text-[0.9375rem] font-medium [&.active]:text-fluffy-800">
								<NavLink to="/contact">💌お問い合わせ</NavLink>
							</Button>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
}

const navItemVariants = cva(
	"flex h-full w-full items-center justify-center text-[0.9375rem] font-medium text-current no-underline transition-colors hover:text-fluffy-800 focus-visible:outline-none focus-visible:text-fluffy-800",
	{
		variants: {
			active: {
				true: "text-fluffy-800",
				false: "",
			},
		},
		defaultVariants: {
			active: false,
		},
	}
);

function HeaderNavItem({ className, ...props }: ComponentPropsWithoutRef<typeof NavLink>) {
	return (
		<NavLink {...props} className={(state) => cn(navItemVariants({ active: state.isActive }), className)} />
	);
}
