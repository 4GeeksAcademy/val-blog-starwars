export const initialStore=()=>{
  return{favorites: JSON.parse(localStorage.getItem("favorites")) || []
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
  case "add_favorite":
	const newFavs = [...store.favorites, action.payload]

	localStorage.setItem("favorites", JSON.stringify(newFavs))

	return {
		...store,
		favorites: newFavs
	};

case "remove_favorite":
	const filteredFavs = store.favorites.filter(
		fav => fav.id !== action.payload
	)

	localStorage.setItem("favorites", JSON.stringify(filteredFavs))

	return {
		...store,
		favorites: filteredFavs
	};
 default:
  return store;
  }    
}
