import { Application, useExtend, useTick } from "@pixi/react";
import { Container, FillPattern, Graphics, Texture, type Ticker } from "pixi.js";
import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

type Motion = { angle: number; velocity: number; tail: number; reduced: boolean };
const ribbonColor = 0x514440;
const t = createPencilPattern(96);
const restingRotation = -0.08;
// The pivot sits 10px inside the tag, where its concealed hole would be.
const canvasSize = 120;
const ribbonPivot = { x: canvasSize / 2, y: canvasSize / 2 };

function drawBow(g: Graphics) {
	g.clear();
	// Unequal, relaxed loops drawn as flat artwork beneath the raised tag.
	g.moveTo(0, 0)
		.bezierCurveTo(-10, -9, -25, -27, -32, -19)
		.bezierCurveTo(-40, -8, -17, -5, 0, 0)
		.closePath()
		.stroke({ color: ribbonColor, width: 1.9, cap: "round", join: "round", fill: t, textureSpace: "local" });
	g.moveTo(-1, 1)
		.bezierCurveTo(-15, -3, -37, 0, -30, 10)
		.bezierCurveTo(-24, 18, -9, 6, -1, 1)
		.closePath()
		.stroke({ color: ribbonColor, width: 1.9, cap: "round", join: "round", fill: t, textureSpace: "local" });
	g.roundRect(-2, -2, 4, 5, 1.5).stroke({ color: ribbonColor, width: 1.7, fill: t, textureSpace: "local" });
}

function drawTails(g: Graphics) {
	g.clear();
	// Narrow outlined strips, with unequal lengths and matching V-cut ends.
	g.moveTo(-2, 1)
		.bezierCurveTo(-10, 13, -26, 14, -26, 29)
		.lineTo(-22, 26)
		.lineTo(-19, 29)
		.bezierCurveTo(-22, 17, -6, 14, 2, 1)
		.closePath()
		.stroke({ color: ribbonColor, width: 1.6, cap: "round", join: "round", fill: t, textureSpace: "local" });
	g.moveTo(0, 2)
		.bezierCurveTo(-5, 16, -16, 23, -10, 36)
		.quadraticCurveTo(-8, 40, -5, 41)
		.lineTo(-6, 36)
		.lineTo(-1, 37)
		.bezierCurveTo(-14, 31, -3, 19, 3, 1)
		.closePath()
		.stroke({ color: ribbonColor, width: 1.6, cap: "round", join: "round", fill: t, textureSpace: "local" });
}

function Ribbon({ motion }: { motion: RefObject<Motion> }) {
	useExtend({ Container, Graphics });
	const bow = useRef<Container>(null);
	const tails = useRef<Graphics>(null);
	const tick = useCallback(
		(ticker: Ticker) => {
			const m = motion.current;
			// Cap elapsed time after a background tab resumes; integrate in small steps.
			let remaining = Math.min(ticker.deltaMS / 1000, 0.05);
			while (remaining > 0) {
				const dt = Math.min(remaining, 1 / 120);
				m.velocity += (-100 * m.angle - 9 * m.velocity) * dt;
				m.angle += m.velocity * dt;
				m.tail += (m.angle - m.tail) * (1 - Math.exp(-14 * dt));
				remaining -= dt;
			}
			if (m.reduced || Math.abs(m.angle) + Math.abs(m.velocity) + Math.abs(m.tail) < 0.0001) {
				m.angle = m.velocity = m.tail = 0;
			}
			if (bow.current) bow.current.rotation = restingRotation + m.angle;
			if (tails.current) tails.current.rotation = (m.tail - m.angle) * 0.9;
		},
		[motion],
	);
	useTick(tick);
	return (
		<pixiContainer ref={bow} x={ribbonPivot.x} y={ribbonPivot.y} rotation={restingRotation} eventMode="none">
			<pixiGraphics ref={tails} draw={drawTails} />
			<pixiGraphics draw={drawBow} />
		</pixiContainer>
	);
}

export default function TagRibbon() {
	const motion = useRef<Motion>({ angle: 0, velocity: 0, tail: 0, reduced: true });
	const lastPointer = useRef<number | null>(null);
	const [resolution] = useState(() => Math.min(window.devicePixelRatio || 1, 2));
	useEffect(() => {
		const query = window.matchMedia("(prefers-reduced-motion: reduce)");
		const update = () => {
			motion.current.reduced = query.matches;
		};
		update();
		query.addEventListener("change", update);
		return () => query.removeEventListener("change", update);
	}, []);
	const nudge = (impulse: number) => {
		if (!motion.current.reduced) {
			motion.current.velocity = Math.max(-2.5, Math.min(2.5, motion.current.velocity + impulse));
		}
	};
	return (
		<span
			aria-hidden="true"
			className="absolute top-1/2 -z-20 block select-none [&_canvas]:block"
			style={{
				left: 10 - ribbonPivot.x,
				width: canvasSize,
				height: canvasSize,
				transform: `translateY(-${ribbonPivot.y}px)`,
			}}
			onPointerEnter={(event) => {
				lastPointer.current = event.clientX;
				nudge(1.8);
			}}
			onPointerMove={(event) => {
				if (lastPointer.current !== null) nudge((event.clientX - lastPointer.current) * 0.07);
				lastPointer.current = event.clientX;
			}}
			onPointerLeave={() => {
				lastPointer.current = null;
			}}
			onPointerDown={() => nudge(-2)}
		>
			<Application
				key={canvasSize}
				width={canvasSize}
				height={canvasSize}
				backgroundAlpha={0}
				antialias
				autoDensity
				resolution={resolution}
			>
				<Ribbon motion={motion} />
			</Application>
		</span>
	);
}

function createPencilPattern(size = 48) {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext("2d");

    if (!ctx) {
        throw new Error("2D canvas context is not available");
    }

    const r = (ribbonColor >> 16) & 0xff;
    const g = (ribbonColor >> 8) & 0xff;
    const b = ribbonColor & 0xff;

    const image = ctx.createImageData(size, size);

    for (let i = 0; i < image.data.length; i += 4) {
        const noise = Math.random();

        // テクスチャ自体をリボンの色にする
        image.data[i] = r;
        image.data[i + 1] = g;
        image.data[i + 2] = b;

        // 鉛筆の濃淡
        let alpha = 0.58 + noise * 0.38;

        // 紙目っぽい抜け
        if (Math.random() < 0.08) {
            alpha *= 0.25;
        }

        image.data[i + 3] = Math.round(alpha * 255);
    }

    ctx.putImageData(image, 0, 0);

    // 鉛筆の擦れ
    ctx.lineCap = "round";

    for (let i = 0; i < 25; i++) {
        const x = Math.random() * size;
        const y = Math.random() * size;
        const length = 3 + Math.random() * 10;

        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${
            0.1 + Math.random() * 0.2
        })`;

        ctx.lineWidth = 0.3 + Math.random() * 0.5;

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(
            x + length,
            y + (Math.random() - 0.5) * 1.5,
        );
        ctx.stroke();
    }

    const texture = Texture.from(canvas);

    return new FillPattern(texture, "repeat");
}
