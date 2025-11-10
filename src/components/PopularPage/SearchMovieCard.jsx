export default function SearchMovieCard({ movie, onClick }) {
	return (
		<div className="flex items-start gap-6 p-4 bg-gray-900 mr-2 ml-2 rounded-2xl shadow-lg shadow-gray-700 hover:shadow-xl hover:scale-[1.01] transition-all duration-300 ease-out">
			{movie.poster?.previewUrl && (
				<img
					src={movie.poster.previewUrl}
					alt={movie.name}
					className="w-24 sm:w-32 md:w-40 rounded-lg object-cover"
				/>
			)}

			<div className="flex-1 text-white space-y-1">
				<h2 className="text-lg md:text-xl font-bold">
					{movie.name} ({movie.year})
				</h2>
				{movie.rating?.kp?.toFixed(1) > 0 && (
					<p className="text-yellow-400 font-semibold">
						Рейтинг: {movie.rating.kp.toFixed(1) || movie.rating.imdb || "N/A"}
					</p>
				)}
				<p className="text-gray-300 text-sm md:text-base">
					{movie.shortDescription || "Описание отсутствует"}
				</p>
				<p className="text-gray-400 text-sm">
					Жанр: {movie.genres.map((g) => g.name).join(", ") || "N/A"}
				</p>
				<p className="text-gray-400 text-sm">
					Страна: {movie.countries.map((c) => c.name).join(", ") || "N/A"}
				</p>
				<button
					onClick={onClick}
					className="bg-pink-800 rounded-full px-6 py-1 mt-5 font-roboto text-sm font-normal hover:bg-pink-700 transition-colors cursor-pointer"
				>
					Подробно
				</button>
			</div>
		</div>
	);
}
