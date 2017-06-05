var app = app || {}

var LittleNavi = Backbone.View.extend({

  className: 'littlenavi-display',

  template: _.template( $('#display-view-template').html() ),

  // The DOM events specific to an item.
  events: {
    'click .go-button' : 'changeStateToRide'
  },

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },

  render: function() {

    var $temp = $('<div class="littlenavi-display"></div>').html(this.template( this.model.attributes ));
    var $goBtn = $temp.find('.go-button');
    var $geoTools = $temp.find('.geocoding-tools');
    switch(this.model.get('state')){
      case 'ride':
        $goBtn.toggleClass('displayed', false);
        $geoTools.toggleClass('displayed', true);
        break;
      case 'init':
        $goBtn.toggleClass('displayed', true);
        $geoTools.toggleClass('displayed', false);
        break;
    }
    this.$el.empty().append($temp);
    return this;
  },

  changeStateToRide: function() {
    this.$el.fadeOut(500, () => {
      this.model.set({state: 'ride', message: 'Choose your route now'});
      this.render();
      this.$el.fadeIn(500);
    });


  }

});
