import React, { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import PopularMovieCard from "../PopularMovieCard/PopularMovieCard";
import { useNavigate } from "react-router-dom";

export default function PopularMovies() {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [popularCategory, setPopularCategory] = useState("movie");

	const navigate = useNavigate();

	useEffect(() => {
		fetch(
			"https://api.kinopoisk.dev/v1.4/movie?page=1&limit=8&notNullFields=top250&type=" +
				`${popularCategory}` +
				"&year=2020-2025",
			{
				headers: {
					"X-API-KEY": import.meta.env.VITE_KP_TOKEN,
				},
			}
		)
			.then((res) => res.json())
			.then((json) => {
				setData(json.docs);
				setLoading(false);
			})
			.catch((err) => {
				console.error(err);
				setError(err.message);
				setLoading(false);
			});
	}, [popularCategory]);

	const buttonClass = (tabName) =>
		`rounded-full px-4 py-2 font-roboto font-normal text-sm transition-colors cursor-pointer shadow-lg shadow-gray-700 ${
			popularCategory === tabName
				? "bg-[rgb(10,15,44)] text-white"
				: "hover:bg-[rgb(10,15,44)] hover:text-white"
		}`;

	if (loading) {
		return <div className="text-white p-4">Загрузка фильмов...</div>;
	}

	if (error) {
		return <div className="text-red p-4">Ошибка: {error}</div>;
	}
	return (
		<div className="m-10 text-black font-roboto mb-15">
			<div className="gap-3 flex ">
				<button
					className={buttonClass("movie")}
					onClick={() => setPopularCategory("movie")}
				>
					Популярные фильмы
				</button>
				<button
					className={buttonClass("tv-series")}
					onClick={() => setPopularCategory("tv-series")}
				>
					Популярные сериалы
				</button>
				<button
					className={buttonClass("anime")}
					onClick={() => setPopularCategory("anime")}
				>
					Популярные аниме
				</button>
			</div>
			<div className="flex justify-end items-center gap-2 mb-3 ">
				<button
					className="text-sm cursor-pointer"
					onClick={() => navigate(`/popular/${popularCategory}`)}
				>
					Смотреть все
				</button>
				<MdKeyboardArrowRight className="cursor-pointer" />
			</div>
			<div
				className="bg-[rgb(10,15,44)] text-white font-roboto p-4 rounded-2xl grid grid-cols-4 grid-rows-2 gap-4 shadow-lg shadow-gray-700"
			>
				{data.map((movie) => (
					<PopularMovieCard key={movie.id} movie={movie} />
				))}
			</div>
		</div>
	);
}
