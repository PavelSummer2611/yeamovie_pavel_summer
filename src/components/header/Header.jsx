import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { BiCameraMovie } from "react-icons/bi";

export default function Header() {
	const [query, setQuery] = useState("");
	const navigate = useNavigate();

	const handleSearch = async () => {
		if (!query.trim()) return;

		try {
			const response = await fetch(
				`https://api.kinopoisk.dev/v1.4/movie/search?page=1&limit=10&query=${encodeURIComponent(
					query
				)}`,
				{
					headers: {
						"X-API-KEY": import.meta.env.VITE_KP_TOKEN,
					},
				}
			);

			const data = await response.json();
			console.log(data)
			navigate("/search_results", { state: { results: data.docs, query } });
		} catch (error) {
			console.error("Ошибка при поиске:", error);
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") handleSearch();
	};

	return (
		<div className="bg-[rgb(10,15,44)] w-full p-5 text-white  ">
			<div className="flex flex-col items-center gap-4">
				<BiCameraMovie />
				<Link to="/" className="text-2xl font-bold transition-transform duration-300 hover:scale-105">
					YeaMovie
				</Link>
				<div className="relative w-60">
					<input
						type="search"
						name="search"
						onChange={(e) => setQuery(e.target.value)}
						onKeyDown={handleKeyDown}
						placeholder="Поиск..."
						className="w-full bg-white text-gray-700 rounded-full px-4 py-2 pr-10" 
					/>
					<FiSearch
						onClick={() => handleSearch()}
						className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
					/>
				</div>
			</div>
		</div>
	);
}
