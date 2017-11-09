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
  import axios from 'axios'
  import Chart from 'vue-bulma-chartjs'

  export default {
    components: {
      Chart
    },
    props: [
      '_id'
    ],
    data: function () {
      return {
        room: {},
        frequencies: [
          {id: 0, name: '1 month', days: 30, leap: 1},
          {id: 1, name: '3 months', days: 90, leap: 3},
          {id: 2, name: '6 months', days: 180, leap: 6},
          {id: 3, name: '1 year', days: 365, leap: 15},
          {id: 4, name: '2 years', days: 730, leap: 30}
        ],
        selectedFrequency: {id: 0, name: '1 month', days: 30, leap: 1},
        options: {
          tooltips: {
            mode: 'index'
          }
        },
        data: [5, 1, 2, 4, 4],
        label: 'Temperature (ºC)',
        borderColor: 'rgba(31, 200, 219, .5)',
        pointBackgroundColor: 'rgba(31, 200, 219, 1)',
        backgroundColor: 'rgba(31, 200, 219, .5)'
      }
    },
    computed: {
      id () {
        return Number(this._id)
      },
      // TODO: Make reactive
      labels () {
        let labels = []
        let date = new Date()
        date.setDate(date.getDate() - this.selectedFrequency.days)
        for (let i = this.selectedFrequency.days; i >= 0; i -= this.selectedFrequency.leap) {
          labels.push(this.formatDate(date))
          date.setDate(date.getDate() + this.selectedFrequency.leap)
        }

        return labels
      },
      seriesData: function () {
        return {
          labels: this.labels,
          datasets: [{
            data: this.data,
            label: this.label,
            borderColor: this.borderColor,
            pointBackgroundColor: this.pointBackgroundColor,
            backgroundColor: this.backgroundColor
          }]
        }
      }
    },
    created () {
      if (this.room.id === undefined) {
        axios.get(process.env.HOST_URL + '/room/' + this.id)
          .then((response) => this.$set(this, 'room', response.data.results[0]))
          .catch((error) => console.log(error))
      }
    },
    methods: {
      formatDate (date) {
        return date.getDate() + '/' + (date.getMonth() + 1)
      }
    }
  }
</script>

<style scoped>
  .space-between {
    justify-content: space-between;
  }
</style>
