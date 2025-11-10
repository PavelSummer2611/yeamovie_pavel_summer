import React, { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import PopularMovieCard from "../PopularMovieCard/PopularMovieCard";
import { useNavigate } from "react-router-dom";
import { getPopularContent } from "../../services/movieApi";
import CategoryButton from "./CategoryButton";

export default function PopularMovies() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [popularCategory, setPopularCategory] = useState("movie");

	const navigate = useNavigate();

	const categories = [
		{ id: "movie", label: "Популярные фильмы" },
		{ id: "tv-series", label: "Популярные сериалы" },
		{ id: "anime", label: "Популярные аниме" },
	];

	useEffect(() => {
		const fetchPopular = async () => {
			setLoading(true);
			try {
				const res = await getPopularContent(popularCategory);
				setData(res.docs || []);
			} catch (err) {
				console.log(err);
				setError("Не удалось загрузить данные");
			} finally {
				setLoading(false);
			}
		};

		fetchPopular();
	}, [popularCategory]);

	return (
		<section className="m-10 text-black font-roboto mb-15">
			<div className="gap-3 flex ">
				{categories.map(({ id, label }) => (
					<CategoryButton
						key={id}
						id={id}
						label={label}
						active={popularCategory === id}
						onClick={setPopularCategory}
					/>
				))}
			</div>

			<div className="flex justify-end items-center gap-2 mb-3 mt-2">
				<button
					className="text-sm cursor-pointer"
					onClick={() => navigate(`/popular/${popularCategory}`)}
				>
					Смотреть все
				</button>
				<MdKeyboardArrowRight className="cursor-pointer" />
			</div>

			{error && <div className="text-red p-4">Ошибка: {error}</div>}

			<div className="bg-[rgb(10,15,44)] text-white font-roboto p-4 rounded-2xl grid grid-cols-4  gap-4 shadow-lg shadow-gray-700 min-h-[435px]">
				{loading ? (
					<div className="col-span-4 text-center self-center">
						Загрузка фильмов...
					</div>
				) : (
					data.map((movie) => <PopularMovieCard key={movie.id} movie={movie} />)
				)}
			</div>
		</section>
	);
}
