import { csrfFetch } from "./csrf";


const GET_ALBUMS="album/getAlbums"
const CREATE_ALBUM="album/createAlbum"

const loadAlbums = (albums) => {
  return {
    type: GET_ALBUMS,
    albums
  }
}

const addAlbum = (album) =>{
    return {
        type: CREATE_ALBUM,
        album
    }
}


export const getalbums = () => async dispatch => {

    const response = await csrfFetch(`/api/albums`);
    if (response.ok) {
        const albums = await response.json();
        dispatch(loadAlbums(albums));
        // console.log("getsongs",songs)
        // return response
    }
  };



export const createAlbum = (album) => async dispatch=>{
        const {
            title,
            description,
            previewImage,
        } = album;

        const res = await fetch(`/api/albums/new`,{
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title,
                description,
                previewImage,
            }),
        });
        if(res.ok){
            const newAlbum = await res.json()
            dispatch(addAlbum(newAlbum))
            return newAlbum
        }
    }

const initialState = {
    albums: null,
}

const albumsReducer = (state = initialState, action)=>{
    let newState;
    switch(action.type){
        case GET_ALBUMS:{
            newState = Object.assign({},state)
            newState.albums = action.albums.Albums
            console.log("newState", newState)
            return newState
        };
        case CREATE_ALBUM:{

            if(!state[action.album.id]){
                newState = {
                    ...state,
                    [action.album.id]:action.album
                };
            }
            return newState
        }

        default:
            return state;
    }
}

export default albumsReducer;
