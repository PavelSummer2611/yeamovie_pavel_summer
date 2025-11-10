import { useLocation, useNavigate } from "react-router-dom";
import SearchMovieCard from "../../components/PopularPage/SearchMovieCard";

export default function SearchResults() {
	const location = useLocation();
	const navigate = useNavigate();

	const { results, query } = location.state || {};

	const watchMovie = (id) => {
		navigate(`/movie/${id}`);
	};

	return (
		<div className="space-y-6 mb-5">
			<h1 className="text-xl pt-4 pl-2 text-center">
				Результаты поиска: {query}
			</h1>
			{!results || results.length === 0 ? (
				<h2 className="text-center text-2xl p-10">
					По вашему запросу ничего не найдено 😔
				</h2>
			) : (
				results.map((movie) => (
					<SearchMovieCard
						key={movie.id}
						movie={movie}
						onClick={() => watchMovie(movie.id)}
					/>
				))
			)}
		</div>
	);
}
