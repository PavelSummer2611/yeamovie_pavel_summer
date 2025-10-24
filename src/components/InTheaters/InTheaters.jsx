import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function InTheaters() {
	const [data, setData] = useState(null);

	const navigate = useNavigate();

	const watchMovie = (id) => {
		navigate(`/movie/${id}`);
	};

	useEffect(() => {
		fetch("https://api.kinopoisk.dev/v1.4/movie/1290942", {
			headers: {
				"X-API-KEY": import.meta.env.VITE_KP_TOKEN,
			},
		})
			.then((res) => res.json())
			.then((json) => setData(json))
			.catch((err) => console.error(err));
	}, []);

	if (!data) {
		return <div className="text-white p-4">Загрузка...</div>;
	}

	return (
		<div
			className="bg-[rgb(10,15,44)] m-10 text-white font-roboto p-4 
      flex-row justify-between rounded-2xl sm:flex shadow-lg shadow-gray-700"
		>
			<div className="flex flex-col justify-between basis-1/3 lg:basis-2/3 pr-6">
				<div className="text-md mb-4">В Кинотеатрах</div>

				<div>
					<div className="py-3 text-3xl">{data.name}</div>
					<div className="text-xl">{data.year}</div>
					<p className="font-roboto py-3">{data.description}</p>
					<button onClick={() => {
						watchMovie(data.id);
					}}
						className="bg-pink-800 rounded-full px-6 py-1 mt-5 font-roboto text-sm font-normal 
            hover:bg-pink-700 transition-colors cursor-pointer mb-5"
					>
						Подробно
					</button>
				</div>
			</div>

			<div className=" flex items-center lg:basis-1/3 rounded-2xl ">
				<img
					src={data.poster.url}
					alt={data.name}
					className="w-auto h-auto max-h-[500px]  rounded-2xl min-w-[100px]"
				/>
			</div>
		</div>
	);
}
