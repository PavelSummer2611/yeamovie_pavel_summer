import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPopularContent } from "../../services/movieApi";
import PaginationControls from "../../components/PopularPage/PaginationControls";
import SearchMovieCard from "../../components/PopularPage/SearchMovieCard";

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
		const fetchPopular = async () => {
			setLoading(true);
			setError(null);
			try {
				const res = await getPopularContent(category, page, limit);
				setData(res.docs);
				setTotalPages(Math.ceil(res.total / limit));
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchPopular();
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
				Все популярные{" "}
				{
					{
						movie: "фильмы",
						"tv-series": "сериалы",
						anime: "аниме",
					}[category]
				}
			</h1>

			<PaginationControls pages={pages} page={page} setPage={setPage} />

			{data.map((movie) => (
				<SearchMovieCard
					key={movie.id}
					movie={movie}
					onClick={() => watchMovie(movie.id)}
				/>
			))}

			<PaginationControls pages={pages} page={page} setPage={setPage} />
		</div>
	);
}
