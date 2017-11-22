<template>
  <div class="tile is-ancestor is-full-tablet is-half-desktop">
    <div class="tile is-parent">
      <article class="tile is-child box">
        <h1 class="title"> {{ floorName }} </h1>
        <div :id="floor.id"></div>
      </article>
    </div>
  </div>
</template>

<script>
  import ol from 'openlayers'

  export default {
    props: ['floor'],
    data () {
      return {
        style: new ol.style.Style({
          fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.6)'
          }),
          stroke: new ol.style.Stroke({
            color: '#319FD3',
            width: 1
          }),
          text: new ol.style.Text({
            font: '12px Calibri,sans-serif',
            fill: new ol.style.Fill({
              color: '#000'
            }),
            stroke: new ol.style.Stroke({
              color: '#fff',
              width: 3
            })
          })
        })
      }
    },
    computed: {
      floorName: function () {
        let floorName = this.floor.floor_no + ''

        switch (this.floor.floor_no) {
          case 1:
            floorName += 'st'
            break
          case 2:
            floorName += 'nd'
            break
          case 3:
            floorName += 'rd'
            break
          default:
            floorName += 'th'
            break
        }

        floorName += ' floor'
        return floorName
      },
      roomsCondition () {
        return this.$store.getters.roomCurrentConditions()
      }
    },
    methods: {
      roomConditions (name) {
        for (let roomConditions of this.roomsCondition) {
          if (roomConditions.shortName === name) {
            return roomConditions
          }
        }
      },
      createMap: function () {
        const imageExtent = [0, 0, 1259, 404]
        const self = this

        this.map = new ol.Map({
          layers: [
            new ol.layer.Image({
              source: new ol.source.ImageStatic({
                url: require('../../assets/floorplans/' +
                  this.floor.floor_no +
                  '.png'),
                imageExtent: imageExtent
              })
            }),
            new ol.layer.Vector({
              renderMode: 'hybrid',
              source: new ol.source.Vector({
                format: new ol.format.GeoJSON(),
                url: require('../../assets/floorplans/' +
                  this.floor.floor_no +
                  '.geojson')
              }),
              style: (feature) => {
                const conditions = self.roomConditions(feature.get('name'))
                if (conditions) {
                  self.style.getText().setText(feature.get('name') + '\nTemp: ' + conditions.temperature + 'ºC\nHum: ' + conditions.humidity + '%')
                } else {
                  self.style.getText().setText(feature.get('name'))
                }
                return self.style
              }
            })
          ],
          target: this.floor.id + '',
          view: new ol.View({
            center: ol.extent.getCenter(imageExtent),
            zoom: 16.85
          }),
          interactions: ol.interaction.defaults({
            mouseWheelZoom: false
          })
        })
      }
    },
    mounted () {
      this.createMap()
    },
    watch: {
      roomsConditions () {
        console.log('hi')
        if (this.map) {
          this.map.render()
        }
      }
    }
  }
</script>

<style scoped>
  @import "../../../node_modules/openlayers/dist/ol.css";
</style>
