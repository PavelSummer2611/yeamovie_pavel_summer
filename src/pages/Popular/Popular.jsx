import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Popular() {
	const { category } = useParams();
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const navigate = useNavigate();
	const limit = 5;

	useEffect(() => {
		setLoading(true);
		fetch(
			`https://api.kinopoisk.dev/v1.4/movie?page=${page}&limit=${limit}&notNullFields=top250&type=${category}&year=2020-2025`,
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
				setTotalPages(Math.ceil(json.total / limit));
				console.log(json.total);
			})
			.catch((err) => {
				console.error(err);
				setError(err.message);
				setLoading(false);
			});
	}, [category, page]);

	const watchMovie = (id) => {
		navigate(`/movie/${id}`);
	};

	if (loading) return <div className="text-white p-4">Загрузка фильмов...</div>;
	if (error) return <div className="text-red p-4">Ошибка: {error}</div>;

	const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

	return (
		<div className="space-y-6">
			<h1 className="text-xl pt-4 pl-2 text-center">
				{" "}
				Все популярные{" "}
				{
					{
						movie: "фильмы",
						"tv-series": "сериалы",
						anime: "аниме",
					}[category]
				}
			</h1>

			<div className="flex flex-wrap justify-center items-center gap-2 text-white">
				<button
					onClick={() => setPage((p) => Math.max(p - 1, 1))}
					className="bg-pink-800 rounded-full px-3 py-1 text-sm hover:bg-pink-700 transition-colors cursor-pointer shadow-lg shadow-gray-700"
					disabled={page === 1}
				>
					Назад
				</button>

				{pages.map((num) => (
					<button
						key={num}
						onClick={() => setPage(num)}
						className={`px-3 py-1 rounded-full text-sm transition-colors cursor-pointer shadow-lg shadow-gray-700 ${
							num === page
								? "bg-pink-600 text-white font-semibold"
								: "bg-gray-700 hover:bg-gray-600"
						}`}
					>
						{num}
					</button>
				))}

				<button
					onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
					className="bg-pink-800 rounded-full px-3 py-1 text-sm hover:bg-pink-700 transition-colors cursor-pointer shadow-lg shadow-gray-700"
					disabled={page === totalPages}
				>
					Вперед
				</button>
			</div>

			{data?.map((movie) => (
				<div
					key={movie.id}
					className="flex items-start gap-6 p-4 bg-gray-900 mr-2 ml-2 rounded-2xl shadow-lg shadow-gray-700 hover:shadow-xl 
                              hover:scale-[1.01] transition-all duration-300 ease-out"
				>
					{movie.poster?.previewUrl && (
						<img
							src={movie.poster?.previewUrl}
							alt={movie.name}
							className="w-24 sm:w-32 md:w-40 rounded-lg object-cover"
						/>
					)}

					<div className="flex-1 text-white space-y-1">
						<h2 className="text-lg md:text-xl font-bold">
							{movie.name} ({movie.year})
						</h2>
						{movie.rating?.kp.toFixed(1) > 0 ? (
							<p className="text-yellow-400 font-semibold">
								Рейтинг:{" "}
								{movie.rating?.kp.toFixed(1) || movie.rating?.imdb || "N/A"}
							</p>
						) : null}
						<p className="text-gray-300 text-sm md:text-base">
							{movie.shortDescription || "Описание отсутствует"}
						</p>
						<p className="text-gray-400 text-sm">
							Жанр: {movie.genres.map((g) => g.name).join(", ") || "N/A"}
						</p>
						<p className="text-gray-400 text-sm">
							Страна: {movie.countries.map((c) => c.name).join(", ") || "N/A"}
						</p>
						<button
							onClick={() => watchMovie(movie.id)}
							className="bg-pink-800 rounded-full px-6 py-1 mt-5 font-roboto text-sm font-normal 
                                 hover:bg-pink-700 transition-colors cursor-pointer"
						>
							Подробно
						</button>
					</div>
				</div>
			))}

			<div className="flex flex-wrap justify-center items-center gap-2 text-white mb-5">
				<button
					onClick={() => setPage((p) => Math.max(p - 1, 1))}
					className="bg-pink-800 rounded-full px-3 py-1 text-sm hover:bg-pink-700 transition-colors cursor-pointer shadow-lg shadow-gray-700"
					disabled={page === 1}
				>
					Назад
				</button>

				{pages.map((num) => (
					<button
						key={num}
						onClick={() => setPage(num)}
						className={`px-3 py-1 rounded-full text-sm transition-colors cursor-pointer shadow-lg shadow-gray-700 ${
							num === page
								? "bg-pink-600 text-white font-semibold"
								: "bg-gray-700 hover:bg-gray-600"
						}`}
					>
						{num}
					</button>
				))}

				<button
					onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
					className="bg-pink-800 rounded-full px-3 py-1 text-sm hover:bg-pink-700 transition-colors cursor-pointer shadow-lg shadow-gray-700"
					disabled={page === totalPages}
				>
					Вперед
				</button>
			</div>
		</div>
	);
}
