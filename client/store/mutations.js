import Vue from 'vue'
import formatDate from './utils.js'

export const
  setFloors = (state, floors) => {
    state.floors = floors
  }

export const
  setRooms = (state, rooms) => {
    state.rooms = rooms
  }

export const
  setRoom = (state, newRoom) => {
    for (let room of state.rooms) {
      if (room.id === newRoom.id) {
        room = newRoom
        return
      }
    }

    state.rooms.push(newRoom)
  }

export const initRoomStatistics = (state, _id) => {
  const id = parseInt(_id)
  for (let roomStatistics of state.roomsStatistics) {
    if (roomStatistics.id === id) {
      return
    }
  }

  state.roomsStatistics.push({
    id: id,
    humidity: [],
    temperature: [],
    labels: []
  })
}

export const setRoomStatistics = (state, newRoomStatistics) => {
  for (let roomStatistics of state.roomsStatistics) {
    if (roomStatistics.id === newRoomStatistics.id) {
      Vue.set(roomStatistics, 'labels', newRoomStatistics.stats.map((obj) => formatDate(new Date(obj.date))))
      Vue.set(roomStatistics, 'temperature', newRoomStatistics.stats.map((obj) => obj.temperature))
      Vue.set(roomStatistics, 'humidity', newRoomStatistics.stats.map((obj) => obj.humidity))
      Vue.set(roomStatistics, 'shortName', newRoomStatistics.shortName)
      return
    }
  }

  newRoomStatistics.labels = newRoomStatistics.stats.map((obj) => formatDate(new Date(obj.date)))
  newRoomStatistics.temperature = newRoomStatistics.stats.map((obj) => obj.temperature)
  newRoomStatistics.humidity = newRoomStatistics.stats.map((obj) => obj.humidity)
  delete newRoomStatistics.stats
  state.roomsStatistics.push(newRoomStatistics)
}

export const setRoomsConditions = (state, roomsConditions) => {
  state.roomsConditions = roomsConditions
}
