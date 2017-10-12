<template>
    <div id="map">

    </div>
</template>

<script>
import ol from 'openlayers'

export default {
    props: [
        'id'
    ],
    computed: {
        floor() {
            return this.$store.getters.floor(this.id)
        }
    },
    methods: {
        createMap: function() {
            var imageExtent = [0, 0, 1259, 404]

            var map = new ol.Map({
                layers: [
                    new ol.layer.Image({
                        source: new ol.source.ImageStatic({
                            url: require('../../assets/floorplans/' + this.floor.floor_no + '.png'),
                            imageExtent: imageExtent
                        })
                    }),
                    new ol.layer.Vector({
                        renderMode: 'hybrid',
                        source: new ol.source.Vector({
                            format: new ol.format.GeoJSON(),
                            url: require('../../assets/floorplans/' + this.floor.floor_no + '.geojson')
                        })
                    })
                ],
                target: 'map',
                view: new ol.View({
                    center: ol.extent.getCenter(imageExtent),
                    zoom: 16.85
                })
            })

            var selectPointerMove = new ol.interaction.Select({
                condition: ol.events.condition.pointerMove
            })

            map.addInteraction(selectPointerMove)
        }
    },
    created() {
        this.$store.dispatch('fetchFloor', this.id)
    },
    mounted() {
        this.createMap()
    }
}
</script>

<style scoped>
@import '../../../node_modules/openlayers/dist/ol.css';
</style>
