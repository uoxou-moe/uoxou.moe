import { MenuIcon } from "lucide-react";
import { Link } from "react-router";
import logo from "~/assets/logo.svg";
import { styleContainer, styleHamburgerButton, styleHamburgerContainer, styleHeader, styleLogo, styleNav, styleNavItem, styleNavLink, styleNavUl } from "~/components/Header.css";

export function Header() {
	return (
		<header className={`${styleHeader}`}>
			<div className={`${styleContainer}`}>
				<img className={`${styleLogo}`} src={logo} alt="Logo" />
				<nav className={`${styleNav}`}>
					<ul className={`${styleNavUl}`}>
						<li className={`${styleNavItem}`}>
							<Link className={`${styleNavLink}`} to="/">Home</Link>
						</li>
						<li className={`${styleNavItem}`}>
							<Link className={`${styleNavLink}`} to="/about">About</Link>
						</li>
						<li className={`${styleNavItem}`}>
							<Link className={`${styleNavLink}`} to="/contact">Contact</Link>
						</li>
					</ul>
				</nav>
				<div className={`${styleHamburgerContainer}`}>
					<button className={`${styleHamburgerButton}`} onClick={() => alert("Button Clicked!")}>
						<MenuIcon />
					</button>
				</div>
			</div>
		</header>
	);
}
