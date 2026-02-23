import { Outlet } from "react-router";
import { Header } from "~/components/Header";
import { styleCommonLayout } from "~/layouts/CommonLayout.css";

export default function CommonLayout() {
	return (
		<div className={`${styleCommonLayout}`}>
			<Header />
			<main>
				<Outlet />
			</main>
		</div>
	);
}
