import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => {
    return {
      type: SET_USER,
      payload: user,
    };
  };

const removeUser = ()=>{
    return {
        type: REMOVE_USER,
    }
}

export const login = (user) => async (dispatch) =>{
    const {credential, password} = user;
    const response = await csrfFetch('/api/session',{
        method:'POST',
        body: JSON.stringify({
            credential,
            password,
        })
    });

    const data = await response.json()
    console.log(data)
    dispatch(setUser(data));
    return response;
}


export const signup = (user) => async (dispatch)=>{
    const {email, password, username, firstName, lastName, isArtist, previewImage} = user;
    const res = await csrfFetch('/api/users',{
        method:'POST',
        body: JSON.stringify({
            email,
            password,
            username,
            firstName,
            lastName,
            isArtist,
            previewImage
        }),
    });
    const data = await res.json();
    console.log(data)
    dispatch(setUser(data))
    return res;
}

export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session/logout', {
      method: 'DELETE',
    });
    dispatch(removeUser());
    // console.log(response)
    return response;
  };

const initialState = { user: null};

const sessionReducer = ( state=initialState, action) =>{
    let newState;
    switch(action.type){
        case SET_USER:{
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        }
        case REMOVE_USER:{

            newState=Object.assign({},state);
            newState.user = null;
            return newState;
        }
        default:
            return state;

    }
}

export const restoreUser = () => async dispatch => {
    const res = await csrfFetch('/api/session/currentUser');
    const data = await res.json();

    dispatch(setUser(data))
    return res
}



export default sessionReducer;
