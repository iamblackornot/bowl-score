import React from "react";

export default function useError()
{
	const[active, toggleActive] = React.useState(false);
	const[errorMessage, setErrorMessage] = React.useState("");

	return { active, toggleActive, errorMessage, setErrorMessage };
}
