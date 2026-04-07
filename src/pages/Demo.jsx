// Import necessary components from react-router-dom and other parts of the application.
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.

export const Demo = () => {
  // Access the global state and dispatch function using the useGlobalReducer hook.
  const { store, dispatch } = useGlobalReducer()

  return (
    <div className="container">
      <ul className="list-group">
	{store.favorites.length === 0 ? (
		<li className="list-group-item text-center">
			No favorites added yet
		</li>
	) : (
		store.favorites.map((fav) => (
			<li
				key={fav.id}
				className="list-group-item d-flex justify-content-between"
			>
				<Link to={"/single/" + fav.id}>
					{fav.name}
				</Link>

				<button
					className="btn btn-outline-primary"
					onClick={() =>
						dispatch({ type: "remove_favorite", payload: fav.id })
					}
				>
					<i className="bi bi-trash"></i>
				</button>
			</li>
		))
	)}
</ul>
      <br />

      <Link to="/">
        <button className="btn btn-primary">Back home</button>
      </Link>
    </div>
  );
};
