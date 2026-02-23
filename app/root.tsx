import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import "~/styles/global.css";
import type { Route } from "./+types/root";
import "./app.css";

import "@fontsource-variable/lexend";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

// ── Demo Mode ────────────────────────────────────────────

const RUNE_CHARS =
  "ᚠᚡᚢᚣᚤᚥᚦᚧᚨᚩᚪᚫᚬᚭᚮᚯᚰᚱᚲᚳᚴᚵᚶᚷᚸᚹᚺᚻᚼᚽᚾᚿᛀᛁᛂᛃᛄᛅᛆᛇᛈᛉᛊᛋᛌᛍᛎᛏᛐᛑᛒᛓᛔᛕᛖᛗᛘᛙᛚᛛᛜᛝᛞᛟᛠᛡᛢᛣᛤᛥᛦᛧᛨᛩᛪ";

function getRandomRune(): string {
  return RUNE_CHARS[Math.floor(Math.random() * RUNE_CHARS.length)];
}

interface OriginalEntry {
  text: string;
  wrapper: HTMLSpanElement;
  parent: Node;
  node: Node;
}

function replaceTextWithRunes(
  node: Node,
  originalList: OriginalEntry[],
) {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent;
    if (text && text.trim().length > 0) {
      const wrapper = document.createElement("span");
      wrapper.setAttribute("data-demo-rune", "true");
      wrapper.style.filter = "blur(0.6px)";
      wrapper.style.letterSpacing = "0.15em";
      wrapper.style.userSelect = "none";
      wrapper.style.transition = "filter 0.4s ease";
      wrapper.textContent = text.replace(/\S/g, () => getRandomRune());

      const parent = node.parentNode;
      if (parent) {
        parent.replaceChild(wrapper, node);
        originalList.push({ text, wrapper, parent, node });
      }
    }
    return;
  }
  if (node instanceof HTMLElement && node.hasAttribute("data-demo-btn")) return;
  if (node instanceof HTMLElement) {
    const tag = node.tagName.toLowerCase();
    if (tag === "script" || tag === "style") return;
  }
  for (const child of Array.from(node.childNodes)) {
    replaceTextWithRunes(child, originalList);
  }
}

function restoreOriginalText(originalList: OriginalEntry[]) {
  for (const { text, wrapper, parent, node } of originalList) {
    node.textContent = text;
    if (wrapper.parentNode === parent) {
      parent.replaceChild(node, wrapper);
    }
  }
  originalList.length = 0;
}

const DEMO_BLUR_STYLE = `
  [data-demo-rune] {
    display: inline;
  }
`;

const btnBase: CSSProperties = {
  position: "fixed",
  bottom: "1.5rem",
  right: "1.5rem",
  zIndex: 9999,
  padding: "0.6rem 1.2rem",
  borderRadius: "999px",
  cursor: "pointer",
  fontFamily: "inherit",
  fontSize: "0.85rem",
  fontWeight: 600,
  letterSpacing: "0.02em",
  transition: "all 0.25s ease",
};

const btnOff: CSSProperties = {
  ...btnBase,
  border: "none",
  backgroundColor: "#FF99CC",
  color: "#fff",
  boxShadow: "0 2px 12px rgba(255,153,204,0.35)",
};

const btnOn: CSSProperties = {
  ...btnBase,
  border: "2px solid #FF99CC",
  backgroundColor: "rgba(255,255,255,0.9)",
  color: "#FF99CC",
  boxShadow: "0 2px 12px rgba(255,153,204,0.25)",
};

// ── Layout ───────────────────────────────────────────────

export function Layout({ children }: { children: React.ReactNode }) {
  const [demoMode, setDemoMode] = useState(true);
  const originalTextList = useRef<OriginalEntry[]>([]);

  const toggleDemo = useCallback(() => {
    setDemoMode((prev) => !prev);
  }, []);

  useEffect(() => {
    if (demoMode) {
      document.documentElement.setAttribute("data-demo-mode", "true");
      const timer = setTimeout(() => {
        replaceTextWithRunes(document.body, originalTextList.current);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      document.documentElement.removeAttribute("data-demo-mode");
      restoreOriginalText(originalTextList.current);
    }
  }, [demoMode]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <style dangerouslySetInnerHTML={{ __html: DEMO_BLUR_STYLE }} />
      </head>
      <body>
        {children}
        <button
          data-demo-btn
          style={demoMode ? btnOn : btnOff}
          onClick={toggleDemo}
          type="button"
        >
          {demoMode ? "✦ Demo OFF" : "✦ Demo"}
        </button>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
