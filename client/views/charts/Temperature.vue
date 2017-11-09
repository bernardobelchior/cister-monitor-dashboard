<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-12">
        <article class="tile is-child box">
          <h4 class="title">Last 30 days</h4>
          <chart :type="'line'" :data="seriesData" :options="options"></chart>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
  import Chart from 'vue-bulma-chartjs'

  export default {
    components: {
      Chart
    },

    data () {
      return {
        data: [
          [65, 59, 90, 81, 56, 55, 40]
        ],
        options: {
          tooltips: {
            mode: 'index'
          }
        },
        backgroundColor: [
          'rgba(31, 200, 219, 1)'
        ],
        series: ['Product A']
      }
    },
    methods: {
      formatDate (date) {
        return date.getDate() + '/' + (date.getMonth() + 1)
      }
    },
    computed: {
      labels () {
        let labels = []
        let date = new Date()
        date.setDate(date.getDate() - 30)
        for (let i = 30; i >= 0; i--) {
          labels.push(this.formatDate(date))
          date.setDate(date.getDate() + 1)
        }

        return labels
      },
      seriesData () {
        let data = {
          labels: this.labels
        }
        data.datasets = this.series.map((e, i) => {
          return {
            data: this.data[i],
            label: this.series[i],
            borderColor: this.backgroundColor[i].replace(/1\)$/, '.5)'),
            pointBackgroundColor: this.backgroundColor[i],
            backgroundColor: this.backgroundColor[i].replace(/1\)$/, '.5)')
          }
        })
        return data
      }
    }
  }
</script>
