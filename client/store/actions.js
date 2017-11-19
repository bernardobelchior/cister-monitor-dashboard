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

export const fetchFloor = ({commit}, id) => {
  axios.get(process.env.HOST_URL + '/floor/' + id)
    .then((response) => commit('setFloor', response.data[0]))
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

export const fetchRoomStatistics = ({commit}, id) => {
  axios.get(process.env.HOST_URL + '/statistics/room/' + id)
    .then((response) => commit('setRoomStatistics', {id: parseInt(id), stats: response.data}))
    .catch((error) => console.log(error))
}
