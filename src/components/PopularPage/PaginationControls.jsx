export default function PaginationControls({ pages, page, setPage }) {
	return (
		<div className="flex flex-wrap justify-center items-center gap-2 text-white mb-5">
			<button
				onClick={() => setPage((p) => Math.max(p - 1, 1))}
				className="bg-pink-800 rounded-full px-3 py-1 text-sm hover:bg-pink-700 transition-colors cursor-pointer shadow-lg shadow-gray-700"
				disabled={page === 1}
			>
				Назад
			</button>

			{pages.map((num) => (
				<button
					key={num}
					onClick={() => setPage(num)}
					className={`px-3 py-1 rounded-full text-sm transition-colors cursor-pointer shadow-lg shadow-gray-700 ${
						num === page
							? "bg-pink-600 text-white font-semibold"
							: "bg-gray-700 hover:bg-gray-600"
					}`}
				>
					{num}
				</button>
			))}

			<button
				onClick={() => setPage((p) => Math.min(p + 1, pages.length))}
				className="bg-pink-800 rounded-full px-3 py-1 text-sm hover:bg-pink-700 transition-colors cursor-pointer shadow-lg shadow-gray-700"
				disabled={page === pages.length}
			>
				Вперед
			</button>
		</div>
	);
}
