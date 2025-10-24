import React from "react";
import { useParams } from "react-router-dom";
import useFetchMovieId from "../../Hooks/useFetchMovieId";

export default function MoviePage() {
	const { id } = useParams();
	const { movie, loading, error } = useFetchMovieId(id);

	if (loading) return <p>Загрузка...</p>;
	if (error) return <p>Ошибка: {error}</p>;
	if (!movie) return null;
	console.log(movie);
	return (
		<>
			<div className="space-y-6 p-4 m-5  bg-gray-900 rounded-2xl shadow-gray-700 shadow-xl">
				{/* Основная информация */}
				<div className="flex flex-col sm:flex-row items-start gap-6">
					<img
						src={movie.poster?.previewUrl}
						alt={movie.name}
						className="w-32 sm:w-40 md:w-48 rounded-lg object-cover"
					/>

					<div className="flex-1 text-white space-y-2">
						<h2 className="text-xl md:text-2xl font-bold">
							{movie.name} ({movie.year})
						</h2>
						{movie.alternativeName && (
							<p className="text-gray-400 text-sm">
								Альтернативные названия: {movie.alternativeName}
							</p>
						)}
						{movie.slogan && (
							<p className="italic text-gray-300">"{movie.slogan}"</p>
						)}
						<p className="text-yellow-400 font-semibold">
							Рейтинг:{" "}
							{movie.rating?.kp?.toFixed(1) || movie.rating?.imdb || "N/A"}
						</p>
						<p className="text-gray-300 text-sm md:text-base">
							{movie.description || "Описание отсутствует"}
						</p>
						<p className="text-gray-400 text-sm">
							Жанр: {movie.genres.map((g) => g.name).join(", ") || "N/A"}
						</p>
						<p className="text-gray-400 text-sm">
							Страна: {movie.countries.map((c) => c.name).join(", ") || "N/A"}
						</p>
						<p className="text-gray-400 text-sm">
							Длительность: {movie.movieLength} мин
						</p>
						<p className="text-gray-400 text-sm">
							Возрастной рейтинг: {movie.ageRating}+
						</p>
					</div>
				</div>

				{/* Актеры */}
				{movie.persons.filter((p) => p.profession === "актеры").length > 0 && (
					<div>
						<h3 className="text-white font-semibold mb-2">Актеры:</h3>
						<div className="flex gap-4 overflow-x-auto pb-2">
							{movie.persons
								.filter((p) => p.profession === "актеры")
								.map((actor) => (
									<div
										key={actor.id}
										className="text-center text-white w-24 flex-shrink-0"
									>
										<img
											src={actor.photo}
											alt={actor.name}
											className="rounded-lg mb-1"
										/>
										<p className="text-sm">{actor.name}</p>
										<p className="text-xs text-gray-400">{actor.description}</p>
									</div>
								))}
						</div>
					</div>
				)}

				{/* Режиссеры, сценаристы, продюсеры */}
				<div className="text-gray-400 text-sm space-y-1">
					<p>
						Режиссер:{" "}
						{movie.persons
							.filter((p) => p.profession === "режиссеры")
							.map((p) => p.name)
							.join(", ")}
					</p>
					<p>
						Сценарист:{" "}
						{movie.persons
							.filter((p) => p.profession === "сценаристы")
							.map((p) => p.name)
							.join(", ")}
					</p>
					<p>
						Продюсеры:{" "}
						{movie.persons
							.filter((p) => p.profession === "продюсеры")
							.map((p) => p.name)
							.join(", ")}
					</p>
				</div>

				{/* Трейлеры */}
				{movie.videos?.trailers?.length > 0 && (
					<div className="mt-4">
						<h3 className="text-white font-semibold mb-2">Трейлеры:</h3>
						{movie.videos.trailers.map((t, i) => (
							<iframe
								key={i}
								className="w-full h-64 mb-4"
								src={t.url}
								title={t.name}
								frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							></iframe>
						))}
					</div>
				)}

				{/* Бюджет и сборы */}
				<div className="text-gray-400 text-sm space-y-1">
					{movie.budget?.value && (
						<p>
							Бюджет: {movie.budget.value} {movie.budget.currency}
						</p>
					)}

					{movie.fees?.russia?.value && (
						<p>
							Сборы: <br />
							Россия {movie.fees.russia.value} {movie.fees.russia.currency}
						</p>
					)}

					{movie.fees?.usa?.value && (
						<p>
							США {movie.fees.usa.value} {movie.fees.usa.currency}
						</p>
					)}

					{movie.fees?.world?.value && (
						<p>
							Мир {movie.fees.world.value} {movie.fees.world.currency}
						</p>
					)}
				</div>
			</div>
		</>
	);
}
