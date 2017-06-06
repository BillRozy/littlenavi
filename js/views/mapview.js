var app = app || {}

var MapView = Backbone.View.extend({

  className: 'map-view',

  template: _.template( $('#map-view-template').html() ),

  // The DOM events specific to an item.
  events: {
    'input input': 'checkInputField'
  },

  initialize: function() {
    // this.listenTo(this.model, 'change', this.render);

    _.extend(this, Backbone.Events);
    this.on("map:appear", this.renderMap);
    this.latlonRegExp = /^([-+]?[1-8]?\d(?:\.\d+)?|90(?:\.0+)?),\s*([-+]?(?:180(?:\.0+)?|(?:(?:1[0-7]\d)|(?:[1-9]?\d))(?:\.\d+)?))$/;
    this.startmarker = {id: 'start-address', marker: null};
    this.finishmarker = {id: 'finish-address', marker: null};
    this.machineRoute = null;
  },


  render: function() {
    this.$el.html(this.template( this.model.attributes ));
    return this;
  },

  setFieldErrored: function(el ,hasError){
    $(el).toggleClass('hasError', hasError);
  },

  showRoute: function(){
    let origin = this.model.get('origin');
    let dest = this.model.get('dest');
    if(this.machineRoute){
      this.machineRoute.setWaypoints({
        waypoints: [
          L.latLng(origin[0], origin[1]),
          L.latLng(dest[0], dest[1])
        ]
      }).route();
    }else{
      this.machineRoute = L.Routing.control({
        waypoints: [
          L.latLng(origin[0], origin[1]),
          L.latLng(dest[0], dest[1])
        ],
        router: L.Routing.mapbox('pk.eyJ1IjoiYmlsbHJvenkiLCJhIjoiY2l4OG5zbWJ0MDA0bDJ0c2J1YzJid2FrNCJ9.0ouNSG8VeWn-H2qWV1Lf7A')
      });
      this.machineRoute.addTo(this.map);
    }
  },

  checkIfCanShowRoute: function() {
    return this.startmarker.marker && this.finishmarker.marker;
  },

  checkInputField: function(e){
    let val = e.currentTarget.value;
    if(this.checkIfIsLatLon(val)){
      this.setFieldErrored(e.currentTarget ,false);
      let latlon = this.strLatLonToArray(val);
      this.model.set((e.currentTarget.id === 'start-address') ? 'origin' : 'dest', latlon);
      this.flyTo(latlon);
      let whatmarker = (e.currentTarget.id === 'start-address') ? this.startmarker : this.finishmarker;
      if(whatmarker.marker != null){
        whatmarker.marker.setLatLng(latlon);
      }else{
        whatmarker.marker = L.marker(latlon);
        whatmarker.marker.addTo(this.map);
      }
    }else{
      this.setFieldErrored(e.currentTarget, true);
    }
    if(this.checkIfCanShowRoute()){
      this.showRoute();
    }
  },

  enter: function(){
      alert('click');
  },

  strLatLonToArray: function(latlonStr){
    return latlonStr.split(',');
  },

  checkIfIsLatLon: function(value) {
    return this.latlonRegExp.test(value);
  },

  flyTo: function(latlonArr){
    this.map.panTo([latlonArr[0], latlonArr[1]])
  },

  renderMap: function() {
    this.map = L.map('mapid').setView(this.model.get('center'), this.model.get('zoom'));

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		id: 'mapbox.streets'
  }).addTo(this.map);
    this.geocoder = L.control.geocoder('mapzen-h33t24L', {
  focus: false // this can also written as {lat: 50.5, lon: 30.5} or L.latLng(50.5, 30.5)
});
  }
});
