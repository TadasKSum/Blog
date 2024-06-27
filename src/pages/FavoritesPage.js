import React, {useEffect} from 'react';
import mainStore from "../store/mainStore";
import FavoritePost from "../components/FavoritePost";

const FavoritesPage = () => {

    const {favorites} = mainStore()

    return (
        <div>
            <div className="container">
                {favorites.length > 0 && favorites.map(x => <FavoritePost key={x.id} post={x} />)}
            </div>
        </div>
    );
};

export default FavoritesPage;