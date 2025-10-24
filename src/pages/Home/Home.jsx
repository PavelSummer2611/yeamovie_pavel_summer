import React, { useEffect, useState } from "react";
import MoviesByCategories from "../../components/MoviesByCategories/MoviesByCategories";
import PopularMovies from "../../components/PopularMovies/PopularMovies";
import InTheaters from "../../components/InTheaters/InTheaters";

export default function Home() {
	const [data, setData] = useState();

	useEffect(() => {
		fetch("https://api.kinopoisk.dev/v1.4/movie/1143242", {
			headers: {
				"X-API-KEY": import.meta.env.VITE_KP_TOKEN,
			},
		})
			.then((res) => res.json())
			.then((json) => setData(json))
			.catch((err) => console.error(err));
	}, []);

	return (
		<>
			<InTheaters data={data} />
			<PopularMovies />
			<MoviesByCategories />
		</>
	);
}
