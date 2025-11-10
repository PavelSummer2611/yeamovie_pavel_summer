import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieInfo from "../../components/MoviePage/MovieInfo";
import MoviePersons from "../../components/MoviePage/MoviePersons";
import MovieTrailers from "../../components/MoviePage/MovieTrailers";
import MovieBudget from "../../components/MoviePage/MovieBudget";
import { getMovieById } from "../../services/movieApi";

export default function MoviePage() {
	const { id } = useParams();
	const [movie, setMovie] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!id) return;

		const fetchMovie = async () => {
			setLoading(true);
			setError(null);
			try {
				const data = await getMovieById(id);
				setMovie(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchMovie();
	}, [id]);

	if (loading) return <p>Загрузка...</p>;
	if (error) return <p>Ошибка: {error}</p>;
	if (!movie) return <p className="text-white">Фильм не найден</p>;

	return (
		<div className="space-y-6 p-4 m-5 bg-gray-900 rounded-2xl shadow-gray-700 shadow-xl text-white">
			<MovieInfo movie={movie} />
			<MoviePersons persons={movie.persons} />
			<MovieTrailers trailers={movie.videos?.trailers} />
			<MovieBudget budget={movie.budget} fees={movie.fees} />
		</div>
	);
}
