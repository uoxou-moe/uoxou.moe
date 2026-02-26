import { Application, useExtend, useTick } from "@pixi/react";
import Matter from "matter-js";
import { Container, Text } from "pixi.js";
import { useEffect, useRef, useState, type JSX } from "react";
import { H, SectionSContent } from "shirayuki-twinkle";
import { Button } from "~/components/common/Button";
import { styleButtonsContainer, styleContainer, styleContentSection, styleIntro, styleMessage, styleTitle } from "./HeroSection.css";

export function HeroSection(): JSX.Element {
	return (
		<div className={`${styleContainer}`}>
			<BackgroundCanvas />
			<UsagiCanvas />

			<SectionSContent className={`${styleContentSection}`}>
				<p className={`${styleIntro}`}>ようこそ、不思議の国へ。 We are</p>

				<H className={`${styleTitle}`}>UoxoU.moe</H>

				<p className={`${styleMessage}`}>
					Webのこと、短歌のこと。<br />
					技術の力でどんなことでも叶えます。
				</p>

				<div className={`${styleButtonsContainer}`}>
					<Button>
						私たちについて
					</Button>

					<Button variant="secondary">
						これまでの成果
					</Button>
				</div>
			</SectionSContent>
		</div>
	);
}

function UsagiCanvas(): JSX.Element {
	const [dimension, setDimension] = useState({ width: 0, height: 0 });
	const ref = useRef<HTMLDivElement>(null);
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
	useExtend({ Container, });

	return (
		<div ref={ref} style={{ inset: 0, marginInline: "auto", position: "absolute", maxWidth: "1200px", overflowX: "visible", }} >
			<Application resizeTo={ref} backgroundAlpha={0} antialias onInit={(app) => {
				setDimension({ width: app.renderer.width, height: app.renderer.height });

				app.stage.eventMode = "static";
				app.stage.on("globalmousemove", (event) => {
					const { x, y } = event.global;
					setMousePos({ x, y });
				});
			}}>
				<pixiContainer
					x={Math.sin(mousePos.x / dimension.width) * -20}
					y={Math.sin(mousePos.y / dimension.height) * -20}
				>
					<UsachanText x={dimension.width - 960} y={dimension.height - 140} />

					<UsagiStar x={dimension.width - 400} y={dimension.height - 400} rotDirec={1} />
					<UsagiStar x={dimension.width - 150} y={dimension.height - 170} rotDirec={-1} />
					<UsagiStar x={dimension.width - 1000} y={dimension.height - 160} rotDirec={1} />
				</pixiContainer>
			</Application>
		</div >
	);
}

function UsachanText({ x, y }: { x: number, y: number }): JSX.Element {
	const [beamText, setBeamText] = useState("˚ ｡✩⑅⋆=͟͟͞͞ =͟͟͞͞ ");
	const [usachanPos, setUsachanPos] = useState({ x: 0, y: 0 });
	const timerRef = useRef(0);
	useExtend({ Container, Text, });

	const segmenter = new Intl.Segmenter();

	useTick((ticker) => {
		// sin関数で左右に揺れる動き（左寄りにオフセット）
		const t = performance.now() / 1000;
		const px = Math.sin(t * 2) * 15 - 5;
		setUsachanPos({ x: px, y: 0 });

		timerRef.current += ticker.deltaMS;
		if (timerRef.current < 60) return;
		timerRef.current = 0;

		setBeamText((prev) => {
			const graphemes = [...segmenter.segment(prev)].map(s => s.segment);
			const first = graphemes.shift()!;
			graphemes.push(first);
			return graphemes.join("");
		});
	});

	return (
		<pixiContainer
			anchor={0.5}
			x={x}
			y={y}
			angle={-20}
		>
			<pixiText
				text={`${beamText}`}
				style={{ fill: 0x514440, fontSize: 96, fontFamily: "Noto Sans JP", }}
			/>
			<pixiText
				text="  ⊂ ₍ᐢ.ˬ.⑅ᐢ₎"
				style={{ fill: 0x514440, fontSize: 96, fontFamily: "Noto Sans JP", }}
				x={usachanPos.x + 500}
				y={usachanPos.y}
			/>
		</pixiContainer>
	);
}

function UsagiStar({ x, y, rotDirec }: { x: number, y: number, rotDirec?: number }): JSX.Element {
	const textRef = useRef<Text>(null);
	const rotSpeedRef = useRef(0);
	const timerRef = useRef(4);
	const intervalRef = useRef(0);

	const IMPULSE_STRENGTH = 0.08; // 回転加速の強さ（rad/frame）
	const FRICTION = 0.995;         // 毎フレームの減衰率（1に近いほどゆっくり減速）

	useTick((ticker) => {
		if (!textRef.current) return;

		timerRef.current += ticker.deltaMS / 1000;

		// 一定間隔で回転インパルスを与える
		if (timerRef.current >= intervalRef.current) {
			rotSpeedRef.current += IMPULSE_STRENGTH * (rotDirec ?? 1);
			timerRef.current = 0;
			intervalRef.current = 2 * (0.5 + Math.random());
		}

		// 摩擦で徐々に減速
		rotSpeedRef.current *= FRICTION;

		// 回転を適用
		textRef.current.rotation += rotSpeedRef.current;
	});

	return (
		<pixiText
			ref={textRef}
			text="☆"
			style={{ fill: 0x514440, fontSize: 80, fontFamily: "Noto Sans JP", }}
			x={x}
			y={y}
			anchor={0.5}
		/>
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

			function createMobile(xOffset: number, length: number, ornamentChar: string, ornamentAngle: number, ornamentSize: number = 48) {
				xOffset = app.renderer.width - xOffset;
				var group = Matter.Body.nextGroup(true);

				const container = Matter.Composite.create();
				const rope = Matter.Composites.stack(xOffset, 10, 1, length, 0, 0, (x: number, y: number) => {
					return Matter.Bodies.rectangle(x, y, 5, 6, {
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
						.moveTo(0, -3.2)
						.lineTo(0, 3.2)
						.stroke({
							width: 3,
							color: 0xFFC1E3,
						});
					ropeDash.eventMode = "static";
					ropeDash.on("pointerover", (e) => {
						Matter.Body.applyForce(body, body.position, {
							x: e.movementX * 0.01,
							y: (Math.random() - 0.5) * 0.02,
							// y: -0.05,
						});
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
					length: 3,
				});

				Matter.Composite.add(container, rope);

				const text = Matter.Bodies.rectangle(xOffset + (Math.random() * 60 - 30), 20, 30, 30, {
					collisionFilter: { group },
				});

				const textGraphic = new Text({
					text: ornamentChar,
					style: {
						fontSize: ornamentSize,
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
					textGraphic.angle += ornamentAngle;
				});

				Matter.Composite.add(container, text);
				Matter.Composite.add(container, Matter.Constraint.create({
					bodyA: text,
					bodyB: rope.bodies[length - 1],
					pointA: { x: 0, y: -4 },
					pointB: { x: 0, y: 2.5 },
					stiffness: 0.1,
					length: 5,
				}));

				Matter.World.add(engine.current.world, Matter.Constraint.create({
					bodyA: rope.bodies[0],
					pointA: { x: 0, y: -2.5 },
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

			createMobile(120, 11, "☆", -15);
			createMobile(250, 22, "⁺☽", 25, 80);
			createMobile(320, 16, "✩", 15);
			createMobile(540, 7, "✩", -30, 60);
			createMobile(620, 13, "✧*", 18);
		})();

		return () => {
			Matter.World.clear(engine.current.world, false);
			Matter.Engine.clear(engine.current);
		};
	}, []);

	return (
		<div ref={ref} style={{ inset: 0, marginInline: "auto", position: "absolute", maxWidth: "1400px", overflowX: "visible", }}></div>
	);
}
