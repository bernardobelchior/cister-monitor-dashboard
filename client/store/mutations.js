export const
  setFloors = (state, floors) => {
    state.floors = floors
  }

export const
  setFloor = (state, newFloor) => {
    for (let floor of state.floors) {
      if (floor.id === newFloor.id) {
        floor = newFloor
        return
      }
    }

    state.floors.push(newFloor)
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

export const
  setRoomStatistics = (state, newRoomStatistics) => {
    for (let roomStatistics of state.roomsStatistics) {
      if (roomStatistics.id === newRoomStatistics.id) {
        roomStatistics = newRoomStatistics
        roomStatistics.stats.reverse()
        return
      }
    }

    state.roomsStatistics.push(newRoomStatistics)
  }
