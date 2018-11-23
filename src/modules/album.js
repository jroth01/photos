import ALBUM_DATA from '../data/albums';
import PHOTO_DATA from '../data/photos';

export const ALBUMS_ALL_REQUESTED = 'album/ALBUMS_ALL_REQUESTED'
export const ALBUMS_ALL = 'album/ALBUMS'

export const ALBUM_WITH_PHOTOS_REQUESTED = 'album/ALBUM_WITH_PHOTOS_REQUESTED'
export const ALBUM_WITH_PHOTOS = 'album/ALBUM_WITH_PHOTOS'

const initialState = {
  data: [],
  loading: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ALBUMS_ALL_REQUESTED:
      return {
        ...state,
        id: action.parentId,
        loading: true
      }
    case ALBUMS_ALL:
      return {
        ...state,
        data: action.data,
        loading: !state.loading
      }
    case ALBUM_WITH_PHOTOS_REQUESTED:
      return {
        ...state,
        id: action.id,
        albumByIdRequested: true
      }
    case ALBUM_WITH_PHOTOS:
     return {
      ...state,
      data: action.data,
      albumsByIdRequested: state.albumsByIdRequested
    }
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
        type: ALBUMS_ALL,
        data:  ALBUM_DATA,
      })
    }, 200)
  }
}

// Mock db join between album and media
const fetchAlbumWithPhotos = (id) => {
  let match = {};
  const album = ALBUM_DATA.find(album => album.id === id);
  let photos = [];
  if (album) {
    photos = PHOTO_DATA.filter(photo => photo.albumId === album.id);
    match = { ...album, photos: photos}
  } else {
    match = {};
  }
  return match;
}

export const albumWithPhotosAsync = (id) => {
  return dispatch => {
    dispatch({
      type: ALBUM_WITH_PHOTOS_REQUESTED,
      id: id,
    });
    return setTimeout(() => {
      let match = fetchAlbumWithPhotos(id);
      dispatch({
        type: ALBUM_WITH_PHOTOS,
        data: match,
      })
    }, 200)
  }
}