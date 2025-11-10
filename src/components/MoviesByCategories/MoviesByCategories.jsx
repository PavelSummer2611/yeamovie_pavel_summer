import React, { useCallback, useEffect, useMemo, useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import { getMoviesByFilters } from "../../services/movieApi";
import MovieSlider from "./MovieSlider";

export default function MoviesByCategories() {
	const [movies, setMovies] = useState([]);
	const [filters, setFilters] = useState({
		genre: "",
		year: "",
		country: "",
		rating: "",
	});

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchMovies = async () => {
			setLoading(true);
			setError("");
			try {
				const res = await getMoviesByFilters(filters);
				setMovies(res);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchMovies();
	}, [filters]);

	const handleFilterChange = useCallback((key, value) => {
		setFilters((prev) => ({ ...prev, [key]: value }));
	}, []);

	const filterOptions = useMemo(
		() => [
			{
				key: "genre",
				placeholder: "Жанр",
				options: [
					"Ужасы",
					"Комедия",
					"Драма",
					"Фантастика",
					"Боевик",
					"Мелодрама",
				],
			},
			{
				key: "year",
				placeholder: "Год",
				options: ["2025", "2024", "2023", "2022", "2021"],
			},
			{
				key: "country",
				placeholder: "Страна",
				options: ["США", "Россия", "Франция", "Япония", "Корея"],
			},
			{
				key: "rating",
				placeholder: "Рейтинг",
				options: ["9-10", "8-10", "7-10", "6-10", "5-10"],
			},
		],
		[]
	);

	return (
		<div className=" m-10 text-black font-roboto ">
			<div
				className="px-4 py-2 bg-[rgb(10,15,44)] 
         rounded-full text-white inline-block mb-4 shadow-lg shadow-gray-700"
			>
				Фильмы по категориям
			</div>

			<div className="flex gap-2 mb-4">
				{filterOptions.map((f) => (
					<Dropdown
						key={f.key}
						placeholder={f.placeholder}
						options={f.options}
						onSelect={(value) => handleFilterChange(f.key, value)}
					/>
				))}
			</div>

			{loading && <div className="text-gray-500">Загрузка фильмов...</div>}
			{error && <div className="text-red-500">{error}</div>}

			<div className="bg-[rgb(10,15,44)] text-white font-roboto p-4 rounded-2xl  shadow-lg shadow-gray-700">
				<MovieSlider movies={movies} />
			</div>
		</div>
	);
}
