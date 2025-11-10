import React, { useCallback, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { BiCameraMovie } from "react-icons/bi";
import { searchMovies } from "../../services/movieApi";

export default function Header() {
	const [query, setQuery] = useState("");
	const navigate = useNavigate();

	const handleSearch = useCallback(async () => {
		if (!query.trim()) return;

		try {
			const results = await searchMovies(query);
			navigate("/search_results", { state: { results, query } });
		} catch (error) {
			console.error("Ошибка при поиске:", error);
		}
	}, [query, navigate]);

	const handleKeyDown = (e) => {
		if (e.key === "Enter") handleSearch();
	};

	return (
		<div className="bg-[rgb(10,15,44)] w-full p-5 text-white  ">
			<div className="flex flex-col items-center gap-4">
				<BiCameraMovie />
				<Link
					to="/"
					className="text-2xl font-bold transition-transform duration-300 hover:scale-105"
				>
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
						className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
					/>
				</div>
			</div>
		</div>
	);
}
