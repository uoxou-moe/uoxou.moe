import { AboutSection } from "~/components/landing/AboutSection";
import { HeroSection } from "~/components/landing/HeroSection";
import { MembersSection } from "~/components/landing/MembersSection";
import { WorksSection } from "~/components/landing/WorksSection";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "New React Router App" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export default function Home() {
	return (
		<>
			<HeroSection />
			<AboutSection id="services" />
			<WorksSection id="works" />
			<MembersSection id="members" />
		</>
	);
}
