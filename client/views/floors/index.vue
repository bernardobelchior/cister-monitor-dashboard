<template>
  <div class="components">
    <div class="columns is-multiline is-mobile">

      <div class="column is-half-mobile is-one-third-tablet is-one-third-desktop" v-for="floor in floors" v-bind:key="floor.id">
        <base-card :title="'Floor ' + floor.floor_no" :content="'Floor: ' + floor.floor_no">
          <card-footer-item slot="footer">
            <router-link :to="{name: 'Floor', params: { id: floor.id }}">
              <span class="icon is-small">
                <i aria-hidden="true" class="fa fa-map"></i>
              </span>&nbsp;&nbsp; Map
            </router-link>
          </card-footer-item>
        </base-card>
      </div>

    </div>
  </div>
</template>

<script>
import { BaseCard, CardFooterItem } from 'vue-bulma-card'

export default {
  components: {
    BaseCard,
    CardFooterItem
  },
  computed: {
    floors() {
      return this.$store.getters.floors
    }
  },
  created() {
    this.$store.dispatch('fetchFloors')
  }
}
</script>
