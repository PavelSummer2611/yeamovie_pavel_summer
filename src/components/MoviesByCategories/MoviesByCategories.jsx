import React, { useEffect, useState } from "react";
import PopularMovieCard from "../PopularMovieCard/PopularMovieCard";
import Dropdown from "../Dropdown/Dropdown";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function MoviesByCategories() {
	const [movies, setMovies] = useState([]);
	const [genre, setGenre] = useState("");
	const [year, setYear] = useState("");
	const [country, setCountry] = useState("");
	const [rating, setRating] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const BASE_URL = "https://api.kinopoisk.dev/v1.4/movie";

	const buildUrl = () => {
		const params = new URLSearchParams({
			lists: "top250",
			page: "1",
			limit: "16",
		});

		if (year) params.append("year", year);
		if (rating) params.append("rating.kp", rating);
		if (genre) params.append("genres.name", genre.toLowerCase());
		if (country) params.append("countries.name", country);

		return `${BASE_URL}?${params.toString()}`;
	};

	useEffect(() => {
		const fetchMovies = async () => {
			try {
				setLoading(true);
				setError("");

				const url = buildUrl();

				const response = await fetch(url, {
					headers: {
						"X-API-KEY": import.meta.env.VITE_KP_TOKEN,
					},
				});

				if (!response.ok) {
					throw new Error("Ошибка при загрузке фильмов");
				}

				const data = await response.json();

				setMovies(data.docs || []);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchMovies();
	}, [genre, year, country, rating]);

	return (
		<div className=" m-10 text-black font-roboto ">
			<div
				className="px-4 py-2 bg-[rgb(10,15,44)] 
         rounded-full text-white inline-block mb-4 shadow-lg shadow-gray-700"
			>
				Фильмы по категориям
			</div>
			<div className="flex gap-2 mb-4">
				<Dropdown
					placeholder="Жанр"
					options={[
						"Ужасы",
						"Комедия",
						"Драма",
						"Фантастика",
						"Боевик",
						"Мелодрама",
					]}
					onSelect={setGenre}
				/>
				<Dropdown
					placeholder="Год"
					options={["2025", "2024", "2023", "2022", "2021"]}
					onSelect={setYear}
				/>
				<Dropdown
					placeholder="Страна"
					options={["США", "Россия", "Франция", "Япония", "Корея"]}
					onSelect={setCountry}
				/>
				<Dropdown
					placeholder="Рейтинг"
					options={["9-10", "8-10", "7-10", "6-10", "5-10"]}
					onSelect={setRating}
				/>
			</div>

			{loading && <div className="text-gray-500">Загрузка фильмов...</div>}
			{error && <div className="text-red-500">{error}</div>}

			<div
				className="bg-[rgb(10,15,44)] text-white font-roboto p-4
			                  rounded-2xl  shadow-lg shadow-gray-700"
			>
				{!loading && movies.length > 0 ? (
					<>
						<Swiper
							modules={[Pagination, Mousewheel]}
							slidesPerView={4}
							slidesPerGroup={4}
							spaceBetween={20}
							pagination={{ clickable: true }}
							style={{ padding: "20px 0 40px 0" }}
							mousewheel={true}
						>
							{movies.map((movie) => (
								<SwiperSlide key={movie.id}>
									<PopularMovieCard movie={movie} />
								</SwiperSlide>
							))}
						</Swiper>

						<style>
							{`.swiper-pagination-bullet {
															background-color: #888 !important; 
															opacity: 0.6;
					 			}
					 			.swiper-pagination-bullet-active {
															background-color: #4caf50 !important; 
															opacity: 1;
					 			}
				  `}
						</style>
					</>
				) : !loading ? (
					<div className="text-center text-gray-500">Ничего не найдено 😕</div>
				) : null}
			</div>
		</div>
	);
}
