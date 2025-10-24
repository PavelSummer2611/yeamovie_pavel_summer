import React from "react";
import { useNavigate } from "react-router-dom";

export default function PopularMovieCard({ movie }) {
	const navigate = useNavigate();

	const watchMovie = (id) => {
		navigate(`/movie/${id}`);
	};

	return (
		<div
			onClick={() => watchMovie(movie.id)}
			className="flex flex-col justify-between "
		>
			<div
				className="relative w-full aspect-square flex items-center
            justify-center overflow-hidden rounded-lg group"
			>
				<img
					className="object-cover w-full h-full"
					src={movie.poster?.url}
					alt={movie.name}
				/>
				<button
					onClick={(e) => {
						e.stopPropagation();
						watchMovie(movie.id);
					}}
					className="absolute cursor-pointer inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-70 transition-opacity duration-300"
				>
					Подробно
				</button>
			</div>
			<div
				onClick={() => watchMovie(movie.id)}
				className="cursor-pointer mt-2 text-sm font-roboto font-normal"
			>
				{movie.name}
			</div>
			<div className="flex justify-between">
				<div className="text-gray-500 text-sm">({movie.year}г.)</div>
				<div className="text-yellow-600 text-sm">
					{movie.rating?.kp?.toFixed(1)}
				</div>
			</div>
		</div>
	);
}
