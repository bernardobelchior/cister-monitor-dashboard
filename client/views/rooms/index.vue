<template>
  <div class="components">
    <div class="columns is-multiline is-mobile">

      <div class="column is-half-mobile is-one-third-tablet is-one-third-desktop" v-for="room in rooms" v-bind:key="room.id">
        <base-card :title="room.name" :content="'Floor: ' + room.floor">
          <card-footer-item slot="footer" element='link' :to="{name: room.name}">
            <span class="icon is-small">
              <i aria-hidden="true" class="fa fa-link"></i>
            </span>&nbsp;&nbsp; Statistics
          </card-footer-item>
        </base-card>
      </div>

    </div>
  </div>
</template>

<script>
var request = require('request')
import { BaseCard, CardFooterItem } from 'vue-bulma-card'

export default {
  components: {
    BaseCard,
    CardFooterItem
  },
  data() {
    return {
      rooms: []
    }
  },
  mounted() {
    let self = this

    request({
      url: process.env.HOST_URL + '/rooms',
      method: 'GET'
    }, function(error, response, body) {
      self.rooms = JSON.parse(body).results
    })
  }
}
</script>
