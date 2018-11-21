import { combineReducers } from 'redux'
import counter from './counter'
import album from './album'

export default combineReducers({
  counter,
  album,
})
