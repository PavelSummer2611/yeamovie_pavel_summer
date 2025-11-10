import React from "react";
import { Link, useLocation } from "react-router-dom";
import FooterNavLink from "./FooterNavLink";

export default function Footer() {
	const location = useLocation();

	const handleHomeClick = () => {
		if (location.pathname === "/") {
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	};
	return (
		<footer className="bg-[rgb(10,15,44)] w-full p-15 text-white  ">
			<div className="flex justify-between items-center gap-4">
				<Link to="/" onClick={handleHomeClick}>
					<div className="text-2xl font-bold transition-transform duration-300 hover:scale-105 ">
						YeaMovie
					</div>
				</Link>
				<nav className="flex gap-3 text-sm font-roboto items-center">
					<FooterNavLink to="/" onClick={handleHomeClick}>
						Главная
					</FooterNavLink>
					<FooterNavLink to="/popular/movie">Популярные фильмы</FooterNavLink>
					<FooterNavLink to="/popular/tv-series">
						Популярные сериалы
					</FooterNavLink>
				</nav>
			</div>
		</footer>
	);
}
