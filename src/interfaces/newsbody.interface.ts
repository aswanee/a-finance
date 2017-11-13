
export interface Newsbody {
    N: string;
    V: string [];
}

export interface Favorites {
    Status: string ;
    result: {
        N: string;
        V: string [];
    }
}

export interface AddFavorites {
    Detail: string[] ;
    Fav: {};
}    