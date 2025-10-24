import React, { useEffect, useState } from "react";

export default function useFetchMovieId(movieId) {
	const [movie, setMovie] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!movieId) return;

		const fetchMovie = async () => {
			setLoading(true);
			try {
				const res = await fetch(
					`https://api.kinopoisk.dev/v1.4/movie/${movieId}`,
					{
						headers: {
							"X-API-KEY": import.meta.env.VITE_KP_TOKEN,
						},
					}
				);
				if (!res.ok) throw new Error("Ошибка при получении данных фильма");
				const data = await res.json();
				setMovie(data);
				
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchMovie();
	}, [movieId]);

	return { movie, loading, error };
}
