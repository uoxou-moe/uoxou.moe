import Matter from "matter-js";
import { useEffect, useRef, type JSX } from "react";
import { H, SectionSContent } from "shirayuki-twinkle";
import { styleContainer, styleContentSection, styleIntro, styleMessage, styleTitle } from "./HeroSection.css";

export function HeroSection(): JSX.Element {
	return (
		<div className={`${styleContainer}`}>
			<BackgroundCanvas />

			<SectionSContent className={`${styleContentSection}`}>
				<p className={`${styleIntro}`}>ようこそ、不思議の国へ。 We are</p>

				<H className={`${styleTitle}`}>UoxoU.moe</H>

				<p className={`${styleMessage}`}>
					Webのこと、短歌のこと。<br />
					技術の力でどんなことでも叶えます。
				</p>
			</SectionSContent>
		</div>
	);
}

function BackgroundCanvas(): JSX.Element {
	const engine = useRef(Matter.Engine.create({}));
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		(async () => {
			const { Application, Graphics, Text, } = await import("pixi.js");

			const app = new Application();

			await app.init({ resizeTo: ref.current!, backgroundAlpha: 0, antialias: true });

			ref.current!.appendChild(app.canvas);

			function createMobile(xOffset: number, length: number, ornamentChar: string = "✧") {
				xOffset = app.renderer.width - xOffset;
				var group = Matter.Body.nextGroup(true);

				const container = Matter.Composite.create();
				const rope = Matter.Composites.stack(xOffset, 10, 1, length, 0, 0, (x: number, y: number) => {
					return Matter.Bodies.rectangle(x, y, 5, 10, {
						density: 0.005,
						frictionAir: 0.05,
						collisionFilter: { group },
						chamfer: {
							radius: 5,
						}
					});
				});

				rope.bodies.forEach((body) => {
					const ropeDash = new Graphics({})
						.moveTo(0, -5)
						.lineTo(0, 5)
						.stroke({
							width: 3,
							color: 0xFFC1E3,
						});
					app.stage.addChild(ropeDash);

					body.plugin = {
						graphic: ropeDash,
					}

					Matter.Events.on(engine.current, "afterUpdate", () => {
						const { x, y } = body.position;
						ropeDash.position.set(x, y);
						ropeDash.rotation = body.angle;
					});
				});

				Matter.Composites.chain(rope, 0, .5, 0, -.5, {
					stiffness: 0.8,
					length: 5,
				});

				Matter.Composite.add(container, rope);

				const text = Matter.Bodies.rectangle(xOffset + (Math.random() * 60 - 30), 20, 40, 40, {
					collisionFilter: { group },
				});

				const textGraphic = new Text({
					text: ornamentChar,
					style: {
						fontSize: 60,
						fill: 0x514440,
						fontFamily: "Noto Sans JP",
					}
				});
				textGraphic.anchor.set(0.5);
				app.stage.addChild(textGraphic);

				Matter.Events.on(engine.current, "afterUpdate", () => {
					const { x, y } = text.position;
					textGraphic.position.set(x, y);
					textGraphic.rotation = text.angle;
				});

				Matter.Composite.add(container, text);
				Matter.Composite.add(container, Matter.Constraint.create({
					bodyA: text,
					bodyB: rope.bodies[length - 1],
					pointA: { x: 0, y: -19 },
					pointB: { x: 0, y: 4.5 },
					stiffness: 0.1,
					length: 5,
				}));

				Matter.World.add(engine.current.world, Matter.Constraint.create({
					bodyA: rope.bodies[0],
					pointA: { x: 0, y: -4.5 },
					pointB: { x: xOffset, y: 0 },
					stiffness: 0.99,
					length: 1,
				}));

				Matter.World.add(engine.current.world, container);
			}

			const FIXED = 1000 / 240; // ms
			let accumulator = 0;
			const timeScale = 2.4;

			app.ticker.add((ticker) => {
				accumulator += ticker.deltaMS * timeScale;

				while (accumulator >= FIXED) {
					Matter.Engine.update(engine.current, FIXED);
					accumulator -= FIXED;
				}
			});


			createMobile(60, 10, "☆");
			createMobile(120, 15);
		})();

		return () => {
			Matter.World.clear(engine.current.world, false);
			Matter.Engine.clear(engine.current);
		};
	}, []);

	return (
		<div ref={ref} style={{ inset: 0, position: "absolute", }}></div>
	);
}
