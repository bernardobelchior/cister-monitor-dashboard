import * as types from './mutation-types'
import axios from 'axios'

export const toggleSidebar = ({commit}, config) => {
  if (config instanceof Object) {
    commit(types.TOGGLE_SIDEBAR, config)
  }
}

export const toggleDevice = ({commit}, device) => commit(types.TOGGLE_DEVICE, device)

export const expandMenu = ({commit}, menuItem) => {
  if (menuItem) {
    menuItem.expanded = menuItem.expanded || false
    commit(types.EXPAND_MENU, menuItem)
  }
}

export const switchEffect = ({commit}, effectItem) => {
  if (effectItem) {
    commit(types.SWITCH_EFFECT, effectItem)
  }
}

export const fetchFloors = ({commit}) => {
  axios.get(process.env.HOST_URL + '/floors')
    .then((response) => commit('setFloors', response.data))
    .catch((error) => console.log(error))
}

export const fetchRooms = ({commit}) => {
  axios.get(process.env.HOST_URL + '/rooms')
    .then((response) => commit('setRooms', response.data))
    .catch((error) => console.log(error))
}

export const fetchRoom = ({commit}, id) => {
  axios.get(process.env.HOST_URL + '/room/' + id)
    .then((response) => commit('setRoom', response.data[0]))
    .catch((error) => console.log(error))
}

export const fetchRoomStatistics = ({commit}, options) => {
  axios.get(process.env.HOST_URL + '/statistics/room/' + options.id, {params: options.params})
    .then((response) => commit('setRoomStatistics', {id: parseInt(options.id), stats: response.data}))
    .catch((error) => console.log(error))
}

export const fetchRoomsConditions = ({commit}) => {
  axios.get(process.env.HOST_URL + '/measurements/last/')
    .then((response) => commit('setRoomsConditions', response.data))
    .catch((error) => console.log(error))
}
