import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Footer() {
	const location = useLocation();

	const handleHomeClick = () => {
		if (location.pathname === "/") {
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	};
	return (
		<div className="bg-[rgb(10,15,44)] w-full p-15 text-white  ">
			<div className="flex justify-between items-center gap-4">
				<Link to="/" onClick={handleHomeClick}>
					<div className="text-2xl font-bold transition-transform duration-300 hover:scale-105 ">YeaMovie</div>
				</Link>
				<div className="flex gap-3 text-sm font-roboto items-center">
					<Link to="/" onClick={handleHomeClick}>
						<button className="text-[10px] hover:underline cursor-pointer">Главная</button>
					</Link>
					<Link to="/popular/movie">
						<button className="text-[10px] hover:underline cursor-pointer">Популярные фильмы</button>
					</Link>
					<Link to="/popular/tv-series">
						<button className="text-[10px] hover:underline cursor-pointer">Популярные сериалы</button>
					</Link>
				</div>
			</div>
		</div>
	);
}
