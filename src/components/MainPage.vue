<template>
  <div>
    <b-button v-b-popover.hover.top="'Моя геолокация'" class="map-button__position" @click="geolocationClick" variant="success">  <b-icon icon="cursor-fill" aria-hidden="true"></b-icon></b-button>
    <label class="gmap-autocomplete__wrap">
      <gmap-autocomplete
          placeholder="Поиск по карте"
          @place_changed="setPlace">
      </gmap-autocomplete>
    </label>

    <div class="map-wrap">
      <GmapMap
          :center="currentLocation"
          :zoom="zoom"
          map-type-id="terrain"
          ref="mainMap"
          @click="onMapClick"
          :options="{
             zoomControl: true,
             mapTypeControl: false,
             scaleControl: true,
             streetViewControl: false,
             rotateControl: false,
             fullscreenControl: true,
             disableDefaultUi: false
           }"
          style="width: 100%; height: 100%"
      >
        <gmap-custom-marker
            v-if="myLocation.lat"
            :marker="myLocation"
            :clickable="true"
            :draggable="false"


        >
          <img  v-b-popover.hover.top="'Моя геолокация'"   src="../assets/car.png">
        </gmap-custom-marker>
        <gmap-cluster
            cssClass="'cluster'"
            imagePath="https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
        >
            <gmap-custom-marker
              :key="index"
              v-for="(m, index) in markers"
              :marker="m.position"
              :clickable="true"
              :draggable="false"


          >
                <img  v-if="m.my" v-b-popover.hover.top="m.text"
                     @click="clickMarker(m.position)" alt="Vue logo" src="../assets/marker.png">
               <img v-else  v-b-popover.hover.top="m.text"
                    @click="clickMarker(m.position)" alt="Vue logo" src="../assets/flag.png">

          </gmap-custom-marker>
        </gmap-cluster>
      </GmapMap>
    </div>
    <b-modal ref="my-modal" id="modal-1" title="Заказ №123234">
      <p class="my-4">Информация о заказе</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi, repellendus. </p>
    </b-modal>
  </div>
</template>

<script>
import GmapCluster from 'gmap-vue/dist/components/cluster'
import GmapCustomMarker from 'vue2-gmap-custom-marker';
import { gmapApi } from 'gmap-vue';

export default {
  name: 'Map',
  components: {
    GmapCluster,
    'gmap-custom-marker': GmapCustomMarker
  },
  data() {
    return {
      statusText: '',

      currentMidx: null,
      zoom: 7,
      currentLocation : {
        lat:  49.03852577889835,
        lng: 31.451398586698268,
      },
      searchAddressInput: '',
      myLocation: {
        lat:  null,
        lng: null,
      },
      markers: [
        {
          position: {
            lat: 49.03976776234585, lng: 28.42251596133349,
          },
          text: 'Haup'
        },
        {
          position: {
            lat:49.04030931024395, lng:28.4192651241294,
          },
          text: 'Hauptgebäude der ETH Zürich'
        },
        {
          position: {
            lat:49.103454213106346, lng:28.329668666414566,
          },
          text: 'Hauptgebäh'
        },

        {
          position: {
            lat:49.304540680757476, lng:28.3943244378971,
          },
          text: 'Vinytsa'
        },

        {
          position: {
            lat:49.23053443502308, lng:28.428601042056965,
          },
          text: 'lorem'
        },

        {
          position: {
            lat:50.51702704434216, lng:30.418573112177715,
          },
          text: 'Vinytsa'
        },


        {
          position: {
            lat:50.50660899827567, lng:30.557256583334407,
          },
          text: 'Vinytsa'
        },

        {
          position: {
            lat:50.39975484601799, lng: 30.508514017943824,
          },
          text: 'Vinytsa'
        },
        {
          position: {
            lat:49.99163772713007, lng: 36.264533090522775,
          },
          text: 'Харьков'
        },
        {
          position: {
            lat:49.251493867984635, lng: 28.482700611428335,
          },
          text: 'Винница'
        },
        {
          position: {
            lat:49.84628525356473, lng: 23.943054600356525,
          },
          text: 'Львов',
          my: true,

        },
      ],
    }
  },
  computed: {
    google: gmapApi,

  },
  mounted : function() {
    this.geolocation()
  },

  methods: {
    clickMarker(){
      this.$refs['my-modal'].show()
    },
    geolocationClick(){
      this.currentLocation = {
        lat:  49.03852577889835,
        lng: 31.451398586698268,
      }
      this.geolocation()

    },
    setPlace(place) {
      this.currentLocation = place.geometry.location;
      this.zoom = 11;
    },
    onMapClick(e) {
      this.markers.push({
        id: 1 + Math.max(0, ...this.markers.map(n => n.id)),
        position: e.latLng,
      });
      console.log(e.latLng)
    },

    geolocation : function() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          this.myLocation.lat = position.coords.latitude;
          this.myLocation.lng = position.coords.longitude;
          // this.zoom = 10;

        })
      } else {
        // Browser doesn't support Geolocation
        alert('Browser doesn\'t support Geolocation')
      }

    },
  },
}
</script>
<style>
.map-wrap{
  width: 100%;
  height: calc(100vh - 106px);
}
.map-button__position{
  position: fixed;
  z-index: 100000;
  right: 10px;
  top: 50%;
  border-radius: 0!important;
}
.gmap-autocomplete__wrap{
  width: 100%;
  margin: 0;
  padding: 0;

}
.gmap-autocomplete__wrap input{
  width: 100%;
  margin: 0;
  padding: 0 20px;
  height: 50px;
  border: none;

}
</style>
