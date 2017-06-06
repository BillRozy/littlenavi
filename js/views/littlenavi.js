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
  }

});
