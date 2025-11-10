import React from "react";
import { Link } from "react-router-dom";

function FooterNavLink({ to, onClick, children }) {
	return (
		<Link to={to} onClick={onClick}>
			<button className="text-[10px] hover:underline cursor-pointer">
				{children}
			</button>
		</Link>
	);
}

export default FooterNavLink;
