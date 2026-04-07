import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer();

	const [list, setList] = useState([]);

	const toggleFavorite = (item) => {
		const exists = store.favorites.some(fav => fav.id === item.id)

		if (exists) {
			dispatch({ type: "remove_favorite", payload: item.id })
		} else {
			dispatch({
				type: "add_favorite",
				payload: { id: item.id, name: item.name }
			})
		}
	};

	const getCharacters = async () => {
		try {
			let response = await fetch("https://www.swapi.tech/api/people");
			let data = await response.json();

			let simpleList = data.results.map(item => ({
				name: item.name,
				id: item.uid
			}));

			setList(simpleList);

		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getCharacters();
	}, []);

	return (
		<div className="d-flex flex-column align-items-center">
			<h1 className="text-center mb-4">Characters</h1>

			<div className="container">
				<div className="row row-cols-1 row-cols-md-3 justify-content-center g-4">
					{list.map((item, index) => (
						<div className="col d-flex justify-content-center" key={index}>
							<div className="card" style={{ width: "18rem" }}>
								<img src="https://www.latamcinema.com/archivos/300x200-300x200.gif" className="card-img-top" alt="..." />

								<div className="card-body">
									<h5 className="card-title">{item.name}</h5>

									<Link to={`/single/${item.id}`}>
										<button className="btn btn-primary">See More</button>
									</Link>

									<button
										className="btn ms-2 border border-primary text-primary"
										style={{ backgroundColor: "white" }}
										onClick={() => toggleFavorite(item)}
									>
										{store.favorites.some(fav => fav.id === item.id) ? "💙" : "🤍"}
									</button>

								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};