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

export const floor = (state) => (id) => {
  for (let floor of state.floors) {
    if (floor.id === id) {
      return floor
    }
  }

  return {
    id: id
  }
}

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

export const roomStatistics = (state) => (id) => {
  for (let roomStatistics of state.roomsStatistics) {
    if (roomStatistics.id === id) {
      return roomStatistics
    }
  }

  return {
    id: id,
    stats: []
  }
}
