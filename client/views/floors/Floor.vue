<template>
    <div id="map">

    </div>
</template>

<script>
import ol from 'openlayers'

export default {
    props: {
        id: String
    },
    data() {
        return {
        }
    },
    mounted() {
        var imageExtent = [0, 0, 1259, 404]

        new ol.Map({
            layers: [
                new ol.layer.Image({
                    source: new ol.source.ImageStatic({
                        url: require('../../assets/floor' + this.id + '.png'),
                        imageExtent: imageExtent
                    })
                }),
                new ol.layer.Vector({
                    renderMode: 'hybrid',
                    source: new ol.source.Vector({
                        format: new ol.format.GeoJSON(),
                        loader: () => {
                            return require('../../assets/floor' + this.id + '.json')
                        }
                    })
                })
            ],
            target: 'map',
            view: new ol.View({
                center: ol.extent.getCenter(imageExtent),
                zoom: 16.85
            })
        })
    }
}
</script>

<style scoped>
@import '../../../node_modules/openlayers/dist/ol.css';
</style>
