export default function MovieTrailers({ trailers }) {
	if (!trailers?.length) return null;

	return (
		<div className="mt-4">
			<h3 className="font-semibold mb-2">Трейлеры:</h3>
			{trailers.map((t, i) => (
				<iframe
					key={i}
					className="w-full h-64 mb-4"
					src={t.url}
					title={t.name}
					frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				></iframe>
			))}
		</div>
	);
}
