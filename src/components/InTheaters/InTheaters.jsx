import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMovieById } from "../../services/movieApi";

export default function InTheaters() {
	const [movie, setMovie] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	const movieId = 1290942;

	useEffect(() => {
		const fetchMovie = async () => {
			try {
				const data = await getMovieById(movieId);
				setMovie(data);
			} catch (error) {
				console.error("Ошибка при загрузке данных:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchMovie();
	}, []);

	const watchMovie = (id) => {
		navigate(`/movie/${id}`);
	};

	if (loading) {
		return <div className="text-white p-4">Загрузка...</div>;
	}

	if (!movie) {
		return <div className="text-red-400 p-4">Ошибка загрузки данных</div>;
	}

	return (
		<section
			className="bg-[rgb(10,15,44)] m-10 text-white font-roboto p-4 
      flex-row justify-between rounded-2xl sm:flex shadow-lg shadow-gray-700"
		>
			<div className="flex flex-col justify-between basis-1/3 lg:basis-2/3 pr-6">
				<div className="text-md mb-4">В Кинотеатрах</div>

				<div>
					<div className="py-3 text-3xl">{movie.name}</div>
					<div className="text-xl">{movie.year}</div>
					<p className="font-roboto py-3">{movie.description}</p>
					<button
						onClick={() => {
							watchMovie(movie.id);
						}}
						className="bg-pink-800 rounded-full px-6 py-1 mt-5 font-roboto text-sm font-normal 
            hover:bg-pink-700 transition-colors cursor-pointer mb-5"
					>
						Подробно
					</button>
				</div>
			</div>

			<div className=" flex items-center lg:basis-1/3 rounded-2xl ">
				<img
					src={movie.poster?.url}
					alt={movie.name}
					className="w-auto h-auto max-h-[500px]  rounded-2xl min-w-[100px]"
				/>
			</div>
		</section>
	);
}
