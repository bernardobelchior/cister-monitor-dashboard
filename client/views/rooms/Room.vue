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
                  <select v-on:change="updateFrequency" v-model="selectedFrequency.id">
                    <option v-for="frequency in frequencies" :value="frequency.id">
                      {{frequency.name}}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <chart ref="chart" :type="'line'" :data="seriesData" :options="options"></chart>
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
          {id: 0, name: '7 days', time: 'day', num: 7},
          {id: 1, name: '15 days', time: 'day', num: 15},
          {id: 2, name: '1 month', time: 'month', num: 1},
          {id: 3, name: '3 months', time: 'month', num: 3},
          {id: 4, name: '6 months', time: 'month', num: 6},
          {id: 5, name: '1 year', time: 'year', num: 1},
          {id: 6, name: '2 years', time: 'year', num: 2},
          {id: 7, name: '5 years', time: 'year', num: 5},
          {id: 8, name: '10 years', time: 'year', num: 10},
          {id: 9, name: 'all time', time: 'all'}
        ],
        selectedFrequency: {id: 2, name: '1 month', time: 'month', num: 1},
        options: {
          tooltips: {
            mode: 'index'
          },
          scales: {
            yAxes: [{
              position: 'left',
              id: 'temperature-axis',
              scaleLabel: {
                display: true,
                labelString: 'Temperature (ºC)'
              }
            }, {
              beginAtZero: true,
              position: 'right',
              id: 'humidity-axis',
              scaleLabel: {
                display: true,
                labelString: 'Humidity (%)'
              },
              ticks: {
                min: 0,
                max: 100
              }
            }
            ]
          }
        },
        labels: ['Temperature (ºC)', 'Humidity'],
        borderColors: ['rgba(245, 85, 85, .5)', 'rgba(31, 200, 219, .5)'],
        pointBackgroundColors: ['rgba(245, 85, 85, 1)', 'rgba(31, 200, 219, 1)'],
        backgroundColors: ['rgba(245, 85, 85, .5)', 'rgba(31, 200, 219, .5)']
      }
    },
    beforeRouteEnter (to, from, next) {
      store.dispatch('fetchRoom', to.params.id)
      store.commit('initRoomStatistics', to.params.id)
      store.dispatch('fetchRoomStatistics', {id: to.params.id})
      next()
    },
    computed: {
      room () {
        return this.$store.getters.room(this.id)
      },
      roomLabels () {
        return this.$store.getters.roomChartLabels(this.id)
      },
      roomTemperature () {
        return this.$store.getters.roomTemperatureValues(this.id)
      },
      roomHumidity () {
        return this.$store.getters.roomHumidityValues(this.id)
      },
      seriesData: function () {
        let data = {
          labels: this.roomLabels,
          datasets: [{
            data: this.roomTemperature,
            label: this.labels[0],
            borderColor: this.borderColors[0],
            pointBackgroundColor: this.pointBackgroundColors[0],
            backgroundColor: this.backgroundColors[0],
            yAxisID: 'temperature-axis'
          }, {
            data: this.roomHumidity,
            label: this.labels[1],
            borderColor: this.borderColors[1],
            pointBackgroundColor: this.pointBackgroundColors[1],
            backgroundColor: this.backgroundColors[1],
            yAxisID: 'humidity-axis'
          }]
        }

        if (this.$refs.chart) {
          this.$nextTick(() => {
            this.$refs.chart.resetChart()
          })
        }

        return data
      }
    },
    methods: {
      updateFrequency: function () {
        const id = this.selectedFrequency.id
        store.dispatch('fetchRoomStatistics', {
          id: this.room.id,
          params: {
            time: this.frequencies[id].time,
            num: this.frequencies[id].num
          }
        })
      }
    }
  }
</script>

<style scoped>
  .space-between {
    justify-content: space-between;
  }
</style>
