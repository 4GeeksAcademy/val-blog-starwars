import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const Single = () => {
	const { theId } = useParams();
	const [character, setCharacter] = useState(null);

	async function getCharacter() {
		try {
			let res = await fetch(`https://www.swapi.tech/api/people/${theId}`);
			let data = await res.json();
			setCharacter(data.result.properties);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getCharacter();
	}, [theId]);

	return (
		<div className="container text-center">
			{character ? (
				<>
					<img
						src={`https://starwars-visualguide.com/assets/img/characters/${theId}.jpg`}
						onError={(e) => (e.target.src = "https://via.placeholder.com/300")}
						className="img-fluid mb-3"
						alt={character.name}
					/>

					<h1>{character.name}</h1>
					<p>Gender: {character.gender}</p>
					<p>Height: {character.height}</p>
					<p>Mass: {character.mass}</p>
					<p>Hair Color: {character.hair_color}</p>
					<p>Eye Color: {character.eye_color}</p>
					<p>Birth Year: {character.birth_year}</p>
				</>
			) : (
				<p>Loading...</p>
			)}

			<Link to="/">
				<button className="btn btn-primary mt-3">Back home</button>
			</Link>
		</div>
	);
};