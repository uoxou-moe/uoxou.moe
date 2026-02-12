import Matter from "matter-js";
import type { Graphics } from "pixi.js";
import { useEffect, useRef, type JSX } from "react";
import { styleContainer } from "./HeroSection.css";

export function HeroSection(): JSX.Element {
	return (
		<div className={`${styleContainer}`}>
			<BackgroundCanvas />
		</div>
	);
}

function BackgroundCanvas(): JSX.Element {
	// const { world, createBody, createDynamicBody, bodies } = usePlanckWorld();
	const engine = useRef(Matter.Engine.create({
	}));
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const runner = (async () => {
			const { Application, Graphics } = await import("pixi.js");
			const SCALE = 10;

			const app = new Application();

			await app.init({ resizeTo: ref.current!, backgroundColor: 0x000000, antialias: true });

			ref.current!.appendChild(app.canvas);

			var ground = Matter.Bodies.rectangle(10, 100, 80, 10, { isStatic: true });
			Matter.World.add(engine.current.world, ground);

			const groundGraphic = new Graphics();
			groundGraphic.position.set(10, 100);
			groundGraphic.moveTo(-40.0 * SCALE, 0);
			groundGraphic.lineTo(40.0 * SCALE, 0);
			groundGraphic.stroke(0xffffff);
			app.stage.addChild(groundGraphic);

			var y = 25.0;
			var xOffset = 15.0;
			var prevBody = ground;
			for (var i = 0; i < 30; ++i) {
				var body = Matter.Bodies.rectangle(20 + i, 2, 1.2, 0.25, {
					isStatic: false,
				});
				const constraint = Matter.Constraint.create({
					bodyA: prevBody,
					bodyB: body,
					pointA: { x: xOffset + i, y: y },
					pointB: { x: 0, y: 0 },
					length: 0.01,
					damping: 0.01,
					stiffness: 0.05,
				})
				Matter.World.add(engine.current.world, body);
				// Matter.World.add(engine.current.world, constraint);

				const rect = new Graphics();
				rect.rect(-0.6 * SCALE, (-0.125 * SCALE), 1.2 * SCALE, 0.25 * SCALE);
				rect.stroke(0xffffff);
				app.stage.addChild(rect);

				body.plugin = {
					graphic: rect,
				}

				prevBody = body;
			}

			app.ticker.add((ticker) => {
				engine.current.world.bodies.forEach((body) => {
					const graphic = body.plugin?.graphic as Graphics | undefined;
					const pos = body.position;

					if (graphic) {
						graphic.position.set(pos.x * SCALE, (pos.y * SCALE));
						graphic.rotation = body.angle;
					}
				});
			});

			Matter.Events.on(engine.current, "afterUpdate", (b) => {
				console.log("after update", b);
			});

			return Matter.Runner.run(engine.current);
		})();

		return () => {
			engine.current && Matter.World.clear(engine.current.world, false);
			runner.then((runner) => { Matter.Runner.stop(runner); });
		};
	}, []);

	return (
		<div ref={ref} style={{ width: "100%", height: "100%" }}></div>
	);
}