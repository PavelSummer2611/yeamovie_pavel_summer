export default function MovieInfo({ movie }) {
	const {
		name,
		year,
		alternativeName,
		slogan,
		description,
		poster,
		genres,
		countries,
		movieLength,
		ageRating,
		rating,
	} = movie;

	return (
		<div className="flex flex-col sm:flex-row items-start gap-6">
			<img
				src={poster?.previewUrl}
				alt={name}
				className="w-32 sm:w-40 md:w-48 rounded-lg object-cover"
			/>
			<div className="flex-1 space-y-2">
				<h2 className="text-xl md:text-2xl font-bold">
					{name} ({year})
				</h2>
				{alternativeName && (
					<p className="text-gray-400 text-sm">
						Альтернативные названия: {alternativeName}
					</p>
				)}
				{slogan && <p className="italic text-gray-300">"{slogan}"</p>}
				<p className="text-yellow-400 font-semibold">
					Рейтинг: {rating?.kp?.toFixed(1) || rating?.imdb || "N/A"}
				</p>
				<p className="text-gray-300 text-sm md:text-base">
					{description || "Описание отсутствует"}
				</p>
				<p className="text-gray-400 text-sm">
					Жанр: {genres.map((g) => g.name).join(", ") || "N/A"}
				</p>
				<p className="text-gray-400 text-sm">
					Страна: {countries.map((c) => c.name).join(", ") || "N/A"}
				</p>
				<p className="text-gray-400 text-sm">Длительность: {movieLength} мин</p>
				<p className="text-gray-400 text-sm">
					Возрастной рейтинг: {ageRating}+
				</p>
			</div>
		</div>
	);
}
