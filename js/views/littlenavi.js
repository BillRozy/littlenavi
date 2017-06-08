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
    _.extend(this, Backbone.Events);
    this.on("map:focus", this.focusOnMap);
    this.on("map:defocus", this.resetFocus);
    this.isMapFocused = false;

  },


  render: function() {

    var $temp = $('<div class="littlenavi-wrapper"></div>').html(this.template( this.model.attributes ));
    var $goBtn = $temp.find('.go-button');
    switch(this.model.get('state')){
      case 'ride':
        $goBtn.toggleClass('displayed', false);
        $temp.append(app.map.render().el);
        break;
      case 'init':
        $goBtn.toggleClass('displayed', true);
        app.map.$el.remove();
        break;
    }
    this.$el.empty().append($temp);
    app.map.delegateEvents();
    return this;
  },

  changeStateToRide: function() {
    app.router.navigate('#buildroute', {trigger: true});
  },


  focusOnMap: function() {
    if(!this.isMapFocused){
      this.isMapFocused = true;
      this.$el.find('.message').fadeOut(300, () => {
        this.$el.find('#mapid').css({
          'width':'100%',
          'height':'100%',
          'min-height': '400px',
          'min-width': '400px',
          'filter': 'blur(5px)'
        });
        setTimeout(function(){ app.map.trigger('map:refresh');}, 350);
      });
    }
  },

  resetFocus: function() {
    if(this.isMapFocused){
      this.isMapFocused = false;
      this.$el.find('#mapid').css({
        'width':'80%',
        'height':'400px',
        'min-height': '',
        'min-width': '',
        'filter': 'blur(5px)'
      });
       this.$el.find('.message').fadeIn(300, function() {
               app.map.trigger('map:refresh');
       });
    }
  }

});
