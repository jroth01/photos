export const ALBUMS_ALL_REQUESTED = 'album/ALBUMS_ALL_REQUESTED'
export const ALBUMS_ALL = 'album/ALBUMS'

export const ALBUM_BY_ID_REQUESTED = 'album/ALBUM_BY_ID_REQUESTED'
export const ALBUM_BY_ID = 'album/ALBUM_BY_ID'

const updateLoader = (state, requestKey) => ({
    ...state,
    requestKey: !state[requestKey]
});

const initialState = {
  id: 0,
  parentId: 0,
  albumsRequested: false,
  albumByIdRequested: false,
  isDecrementing: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ALBUMS_ALL_REQUESTED:
      return {
        ...state,
        id: action.parentId,
        albumsRequested: true
      }
    case ALBUMS_ALL:
      return updateLoader(state, 'albumsRequested');
    case ALBUM_BY_ID_REQUESTED:
      return {
        ...state,
        id: action.id,
        albumByIdRequested: true
      }
    case ALBUM_BY_ID:
     return updateLoader(state, 'albumByIdRequested');
    default:
      return state
  }
}

export const albumsAllAsync = () => {
  return dispatch => {
    dispatch({
      type: ALBUMS_ALL_REQUESTED
    })

    return setTimeout(() => {
      dispatch({
        type: ALBUMS_ALL
      })
    }, 3000)
  }
}

export const albumByIDAsync = () => {
  return dispatch => {
    dispatch({
      type: ALBUM_BY_ID_REQUESTED
    })

    return setTimeout(() => {
      dispatch({
        type: ALBUM_BY_ID
      })
    }, 3000)
  }
}