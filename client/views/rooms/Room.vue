<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <div class="is-flex space-between">
            <h4 class="title">{{ room.name }}</h4>

            <div class="control is-horizontal">
              <div class="control-label">
                <label class="label">Last</label>
              </div>
              <div class="control">
                <div class="select">
                  <select v-model="selectedFrequency.id">
                    <option v-for="frequency in frequencies" :value="frequency.id">
                      {{frequency.name}}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <chart :type="'line'" :data="seriesData" :options="options"></chart>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
  import Chart from 'vue-bulma-chartjs'
  import store from '../../store/index.js'

  export default {
    components: {
      Chart
    },
    props: [
      'id'
    ],
    data: function () {
      return {
        frequencies: [
          {id: 0, name: '1 month', days: 30, leap: 1},
          {id: 1, name: '3 months', days: 90, leap: 3},
          {id: 2, name: '6 months', days: 180, leap: 6},
          {id: 3, name: '1 year', days: 365, leap: 15},
          {id: 4, name: '2 years', days: 730, leap: 30},
          {id: 5, name: 'all time', days: 0, leap: 0}
        ],
        selectedFrequency: {id: 0, name: '1 month', days: 30, leap: 1},
        options: {
          tooltips: {
            mode: 'index'
          }
        },
        labels: ['Temperature (ºC)', 'Humidity'],
        borderColors: ['rgba(31, 200, 219, .5)', 'rgba(151, 205, 118, .5)'],
        pointBackgroundColors: ['rgba(31, 200, 219, 1)', 'rgba(151, 205, 118, 1)'],
        backgroundColors: ['rgba(31, 200, 219, .5)', 'rgba(151, 205, 118, .5)']
      }
    },
    beforeRouteEnter (to, from, next) {
      store.dispatch('fetchRoom', to.params.id)
      store.commit('initRoomStatistics', to.params.id)
      store.dispatch('fetchRoomStatistics', to.params.id)
      next()
    },
    computed: {
      room () {
        return this.$store.getters.room(this.id)
      },
      seriesData: function () {
        return {
          labels: this.$store.getters.roomLabels(this.id),
          datasets: [{
            data: this.$store.getters.roomTemperature(this.id),
            label: this.labels[0],
            borderColor: this.borderColors[0],
            pointBackgroundColor: this.pointBackgroundColors[0],
            backgroundColor: this.backgroundColors[0]
          }, {
            data: this.$store.getters.roomHumidity(this.id),
            label: this.labels[1],
            borderColor: this.borderColors[1],
            pointBackgroundColor: this.pointBackgroundColors[1],
            backgroundColor: this.backgroundColors[1]
          }]
        }
      }
    },
    created () {
    }
  }
</script>

<style scoped>
  .space-between {
    justify-content: space-between;
  }
</style>
