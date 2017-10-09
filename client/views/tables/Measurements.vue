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
                <td>{{measurement.time_stamp}}</td>
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
var request = require('request')
export default {
  data() {
    return {
      measurements: []
    }
  },
  mounted() {
    let self = this
    request({
      url: 'http://localhost:3000/measurements/10',
      method: 'GET'
    }, function(error, response, body) {
      self.measurements = JSON.parse(body).results
    })
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
