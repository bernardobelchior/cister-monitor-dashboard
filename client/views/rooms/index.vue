<template>
  <div class="components">
    <div class="columns is-multiline is-mobile">

      <div class="column is-half-mobile is-one-third-tablet is-one-third-desktop" v-for="room in rooms"
           v-bind:key="room.id">
        <base-card :title="room.name" :content="'Floor: ' + room.floor_id">
          <card-footer-item slot="footer">
            <router-link :to="{name: 'Room', params: {_id: room.id, room: room}}">
              <span class="icon is-small">
                <i aria-hidden="true" class="fa fa-link"></i>
              </span>&nbsp;&nbsp; Statistics
            </router-link>
          </card-footer-item>
        </base-card>
      </div>

    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { BaseCard, CardFooterItem } from 'vue-bulma-card'

  export default {
    components: {
      BaseCard,
      CardFooterItem
    },
    data () {
      return {
        rooms: []
      }
    },
    mounted () {
      axios.get(process.env.HOST_URL + '/rooms').then((response) => {
        this.$set(this, 'rooms', response.data.results)
      }).catch((error) => {
        console.log(error)
      })
    }
  }
</script>
