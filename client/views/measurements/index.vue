<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">Table</h4>
          <table class="table">
            <thead>
            <tr>
              <th>ID</th>
              <th>Mote ID</th>
              <th>Timestamp</th>
              <th>Temperature</th>
              <th>Humidity</th>
            </tr>
            </thead>
            <tfoot>
            <tr>
              <th>ID</th>
              <th>Mote ID</th>
              <th>Timestamp</th>
              <th>Temperature</th>
              <th>Humidity</th>
            </tr>
            </tfoot>
            <tbody>
            <tr v-for="measurement in measurements" v-bind:key="measurement.id">
              <td>{{measurement.id}}</td>
              <td>{{measurement.mote_id}}</td>
              <td>{{measurement.date}}</td>
              <td>{{measurement.temperature}}ºC</td>
              <td>{{measurement.humidity}} %</td>
            </tr>
            </tbody>
          </table>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        measurements: []
      }
    },
    mounted () {
      let self = this
      axios.get(process.env.HOST_URL + '/measurements', {params: {numResults: 10}})
        .then((response) => {
          self.measurements = response.data
          for (let measurement of self.measurements) {
            measurement.date = new Date(measurement.time_stamp).toLocaleString()
          }
        }).catch((error) => console.log(error))
    }
  }
</script>


<style lang="scss">
  .table-responsive {
    display: block;
    width: 100%;
    min-height: .01%;
    overflow-x: auto;
  }
</style>
