const API_URL = "https://api.poiskkino.dev/v1.4";
const API_KEY = import.meta.env.VITE_KP_TOKEN;

export async function searchMovies(query, page = 1, limit = 10) {
	if (!query.trim()) return [];

	try {
		const response = await fetch(
			`${API_URL}/movie/search?page=${page}&limit=${limit}&query=${encodeURIComponent(query)}`,
			{
				headers: {
					"X-API-KEY": API_KEY,
				},
			}
		);

		const data = await response.json();
		return data.docs;
	} catch (error) {
		console.error("Ошибка при поиске:", error);
		throw error;
	}
}

export async function getMovieById(id) {
	try {
		const response = await fetch(`https://api.poiskkino.dev/v1.4/movie/${id}`, {
			headers: {
				"X-API-KEY": API_KEY,
			},
		});
		return await response.json();
	} catch (error) {
		console.error("Ошибка при получении фильма:", error);
		throw error;
	}
}

export async function getPopularContent(
	category = "movie",
	page =1,
	limit = 8,
	yearFrom = 2020,
	yearTo = 2025
) {
	try {
		const response = await fetch(
			`${API_URL}/movie?page=${page}&limit=${limit}&notNullFields=top250&type=${category}&year=${yearFrom}-${yearTo}`,
			{
				headers: {
					"X-API-KEY": API_KEY,
				},
			}
		);

		const data = await response.json();
		return { docs: data.docs || [], total: data.total || 0 };
	} catch (error) {
		console.error(`Ошибка при получении популярных ${category}:`, error);
		throw error;
	}
}

export async function getMoviesByFilters({
	genre,
	year,
	country,
	rating,
	limit = 16,
	page = 1,
}) {
	const params = new URLSearchParams({
		lists: "top250",
		page,
		limit,
	});

	if (year) params.append("year", year);
	if (rating) params.append("rating.kp", rating);
	if (genre) params.append("genres.name", genre.toLowerCase());
	if (country) params.append("countries.name", country);

	const url = `${API_URL}/movie?${params.toString()}`;

	try {
		const response = await fetch(url, {
			headers: {
				"X-API-KEY": API_KEY,
			},
		});

		if (!response.ok) {
			throw new Error("Ошибка при загрузке фильмов");
		}

		const data = await response.json();
		return data.docs || [];
	} catch (error) {
		console.error(error);
		throw error;
	}
}
