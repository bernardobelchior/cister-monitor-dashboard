export const pkg = state => state.pkg

export const app = state => state.app

export const device = state => state.app.device

export const sidebar = state => state.app.sidebar

export const effect = state => state.app.effect

export const menuitems = state => state.menu.items

export const componententry = state => {
  return state.menu.items.filter(c => c.meta && c.meta.label === 'Components')[0]
}

export const floors = state => state.floors

export const rooms = state => state.rooms

export const room = (state) => (id) => {
  for (let room of state.rooms) {
    if (room.id === id) {
      return room
    }
  }

  return {
    id: id,
    name: ''
  }
}

export const roomTemperature = (state) => (id) => {
  for (let roomStatistics of state.roomsStatistics) {
    if (roomStatistics.id === id) {
      return roomStatistics.temperature
    }
  }
}

export const roomHumidity = (state) => (id) => {
  for (let roomStatistics of state.roomsStatistics) {
    if (roomStatistics.id === id) {
      return roomStatistics.humidity
    }
  }
}

export const roomLabels = (state) => (id) => {
  for (let roomStatistics of state.roomsStatistics) {
    if (roomStatistics.id === id) {
      return roomStatistics.labels
    }
  }
}
