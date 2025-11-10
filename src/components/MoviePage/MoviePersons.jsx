function getPersonsByProfession(persons, profession) {
	return persons.filter((p) => p.profession === profession);
}

export default function MoviePersons({ persons }) {
	const actors = getPersonsByProfession(persons, "актеры");

	if (!actors.length) return null;

	return (
		<div>
			<h3 className="font-semibold mb-2">Актеры:</h3>
			<div className="flex gap-4 overflow-x-auto pb-2">
				{actors.map((actor) => (
					<div key={actor.id} className="text-center w-24 flex-shrink-0">
						<img
							src={actor.photo}
							alt={actor.name}
							className="rounded-lg mb-1"
						/>
						<p className="text-sm">{actor.name}</p>
						<p className="text-xs text-gray-400">{actor.description}</p>
					</div>
				))}
			</div>

			<div className="text-gray-400 text-sm space-y-1 mt-2">
				<p>
					Режиссер:{" "}
					{getPersonsByProfession(persons, "режиссеры")
						.map((p) => p.name)
						.join(", ")}
				</p>
				<p>
					Сценарист:{" "}
					{getPersonsByProfession(persons, "сценаристы")
						.map((p) => p.name)
						.join(", ")}
				</p>
				<p>
					Продюсеры:{" "}
					{getPersonsByProfession(persons, "продюсеры")
						.map((p) => p.name)
						.join(", ")}
				</p>
			</div>
		</div>
	);
}
