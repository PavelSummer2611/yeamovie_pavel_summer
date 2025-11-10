import React from "react";

export default function CategoryButton({ id, label, active, onClick }) {
	const buttonClass = `rounded-full px-4 py-2 font-roboto font-normal text-sm transition-colors cursor-pointer shadow-lg shadow-gray-700 ${
		active
			? "bg-[rgb(10,15,44)] text-white"
			: "hover:bg-[rgb(10,15,44)] hover:text-white"
	}`;

	return (
		<button className={buttonClass} onClick={() => onClick(id)}>
			{label}
		</button>
	);
}
