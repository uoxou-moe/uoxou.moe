import { Avatar, mergeProps, useRender } from "@base-ui/react";
import type { ComponentProps } from "react";
import { cn } from "~/utils/cn";

export function UserLabel({ render, className, children, ...otherProps }: useRender.ComponentProps<"div">) {
	const element = useRender({
		defaultTagName: "div",
		render,
		props: mergeProps<"div">(
			{
				className: cn(
					"relative w-max p-2 flex items-center gap-3 rounded-md rounded-l-4xl overflow-clip",
					"bg-fluffy-100 border border-fluffy-400 shadow-fluffy-400 shadow-[0_2px_0]",
					"transition duration-200 ease-in-out hover:bg-fluffy-200 active:bg-fluffy-300 active:shadow-[0_0_0] active:translate-y-0.5",
					className,
				),
				children: (
					<>
						{children}
						{/* <div className="@container-size absolute top-0 right-0 h-full w-full">
							<div className="bg-fluffy-500 absolute right-[-14cqh] -bottom-1/4 h-1/2 w-[28cqh] [border-shape:polygon(50%_0,100%_50%,50%_100%,0_50%)]" />
							<div className="bg-fluffy-300 absolute right-[-14cqh] bottom-1/4 h-1/2 w-[28cqh] [border-shape:polygon(50%_0,100%_50%,50%_100%,0_50%)]" />
							<div className="bg-fluffy-300 absolute right-[14cqh] -bottom-1/4 h-1/2 w-[28cqh] [border-shape:polygon(50%_0,100%_50%,50%_100%,0_50%)]" />
							<div className="bg-fluffy-200 absolute right-[-14cqh] bottom-3/4 h-1/2 w-[28cqh] [border-shape:polygon(50%_0,100%_50%,50%_100%,0_50%)]" />
							<div className="bg-fluffy-200 absolute right-[14cqh] bottom-1/4 h-1/2 w-[28cqh] [border-shape:polygon(50%_0,100%_50%,50%_100%,0_50%)]" />
							<div className="bg-fluffy-200 absolute right-[42cqh] -bottom-1/4 h-1/2 w-[28cqh] [border-shape:polygon(50%_0,100%_50%,50%_100%,0_50%)]" />
						</div> */}

						<div className="absolute left-5.5 h-full w-1">
							<div className="bg-fluffy-400 absolute top-0.5 size-1 rounded-full" />
							<div className="bg-fluffy-400 absolute bottom-0.5 size-1 rounded-full" />
						</div>

						<div className="absolute left-5.5 h-full w-1 -rotate-90">
							<div className="bg-fluffy-400 absolute top-0.5 size-1 rounded-full" />
						</div>

						<div className="absolute left-5.5 h-full w-1 -rotate-45">
							<div className="bg-fluffy-400 absolute top-0.5 size-1 rounded-full" />
						</div>

						<div className="absolute left-5.5 h-full w-1 -rotate-135">
							<div className="bg-fluffy-400 absolute top-0.5 size-1 rounded-full" />
						</div>
					</>
				),
			},
			otherProps,
		),
	});

	return element;
}

function Icon({ className, ...props }: ComponentProps<typeof Avatar.Root>) {
	return (
		<Avatar.Root
			{...props}
			className={cn("bg-fluffy-200 border-fluffy-400 size-8 rounded-full border", className)}
		/>
	);
}

function IconImage({ className, ...props }: ComponentProps<typeof Avatar.Image>) {
	return <Avatar.Image {...props} className={cn("", className)} />;
}

function Name({ render, className, ...otherProps }: useRender.ComponentProps<"span">) {
	const element = useRender({
		defaultTagName: "span",
		render,
		props: mergeProps<"span">(
			{
				className: cn("", className),
			},
			otherProps,
		),
	});

	return element;
}

UserLabel.Icon = Icon;
UserLabel.IconImage = IconImage;
UserLabel.Name = Name;
