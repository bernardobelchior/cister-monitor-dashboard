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
      }
    },
    methods: {
      createMap: function () {
        const imageExtent = [0, 0, 1259, 404]
        let map = new ol.Map({
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
              })
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

        const selectPointerMove = new ol.interaction.Select({
          condition: ol.events.condition.pointerMove
        })

        map.addInteraction(selectPointerMove)
      }
    },
    mounted () {
      this.createMap()
    }
  }
</script>

<style scoped>
  @import "../../../node_modules/openlayers/dist/ol.css";
</style>
