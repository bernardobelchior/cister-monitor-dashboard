import * as types from './mutation-types'
var request = require('request')

export const toggleSidebar = ({
  commit
}, config) => {
  if (config instanceof Object) {
    commit(types.TOGGLE_SIDEBAR, config)
  }
}

export const toggleDevice = ({
  commit
}, device) => commit(types.TOGGLE_DEVICE, device)

export const expandMenu = ({
  commit
}, menuItem) => {
  if (menuItem) {
    menuItem.expanded = menuItem.expanded || false
    commit(types.EXPAND_MENU, menuItem)
  }
}

export const switchEffect = ({
  commit
}, effectItem) => {
  if (effectItem) {
    commit(types.SWITCH_EFFECT, effectItem)
  }
}

export const
  fetchFloors = ({
    commit
  }) => {
    request({
      url: process.env.HOST_URL + '/floors',
      method: 'GET'
    }, function (error, response, body) {
      if (error) {
        console.log(error)
      } else {
        let floors = JSON.parse(body).results
        if (floors !== undefined) {
          commit('setFloors', floors)
        }
      }
    })
  }

export const fetchFloor = ({
  commit
}, id) => {
  request({
    url: process.env.HOST_URL + '/floor/' + id,
    method: 'GET'
  }, function (error, response, body) {
    if (error) {
      console.log(error)
    } else {
      let floor = JSON.parse(body).results[0]
      if (floor !== undefined) {
        commit('setFloor', floor)
      }
    }
  })
}
