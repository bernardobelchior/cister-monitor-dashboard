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
