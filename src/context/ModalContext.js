import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

//crear context
export const ModalContext = createContext();

const ModalProvider = (props) => {
	//state del provider

	const [idreceta, guardarIdReceta] = useState(null);
	const [recetainfo, guardarReceta] = useState({});
	//una vez que tenemos la receta, llamar la api

	useEffect(() => {
		const obtenerReceta = async () => {
			if (!idreceta) return;

			const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta} `;
			const resultado = await axios.get(url);
			guardarReceta(resultado.data.drinks[0]);
		};
		obtenerReceta();
	}, [idreceta]);
	return (
		<ModalContext.Provider
			value={{
				recetainfo,
				guardarReceta,
				guardarIdReceta,
			}}
		>
			{props.children}
		</ModalContext.Provider>
	);
};

export default ModalProvider;
