import React from "react";
import MoviesByCategories from "../../components/MoviesByCategories/MoviesByCategories";
import PopularMovies from "../../components/PopularMovies/PopularMovies";
import InTheaters from "../../components/InTheaters/InTheaters";

export default function Home() {
	return (
		<>
			<InTheaters />
			<PopularMovies />
			<MoviesByCategories />
		</>
	);
}
