import React, { useState } from "react";

export default function Dropdown({ placeholder, options, onSelect }) {
	const [selected, setSelected] = useState("");

	const handleSelect = (option) => {
		setSelected(option);
		onSelect && onSelect(option);
	};

	return (
		<select
			className="px-1 py-1 w-26 border rounded-full text-sm text-gray-700 cursor-pointer"
			value={selected}
			onChange={(e) => handleSelect(e.target.value)}
		>
			<option value="">{placeholder}</option>
			{options.map((opt) => (
				<option key={opt} value={opt}>
					{opt}
				</option>
			))}
		</select>
	);
}
