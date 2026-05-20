import { Outlet } from "react-router";
import { Footer } from "~/components/Footer";
import { Header } from "~/components/Header";

export default function CommonLayout() {
	return (
		<div className="w-full min-h-screen flex flex-col">
			<Header />
			<main className="flex-1">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}
