<template>
  <div>
    <div v-for="floor in floors" v-bind:key="floor.id">
      <floor :floor="floor"></floor>
    </div>
  </div>
</template>

<script>
  import { BaseCard, CardFooterItem } from 'vue-bulma-card'
  import Floor from './Floor'

  export default {
    components: {
      BaseCard,
      CardFooterItem,
      Floor
    },
    computed: {
      floors () {
        return this.$store.getters.floors
      }
    },
    created () {
      this.$store.dispatch('fetchFloors')
      this.$store.dispatch('fetchRoomsConditions')
    }
  }
</script>
