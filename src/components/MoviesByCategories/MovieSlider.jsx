import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import PopularMovieCard from "../PopularMovieCard/PopularMovieCard";

function MovieSlider({ movies }) {
	if (!movies || movies.length === 0)
		return (
			<div className="text-center text-gray-500">Ничего не найдено 😕</div>
		);

	return (
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
			<style>
				{`.swiper-pagination-bullet { background-color: #888 !important; opacity: 0.6; }
				  .swiper-pagination-bullet-active { background-color: #4caf50 !important; opacity: 1; }`}
			</style>
		</Swiper>
	);
}

export default MovieSlider;
