var app = app || {}

var RouteView = Backbone.View.extend({

  className: 'route-view',

  template: _.template( $('#route-view-template').html() ),

  // The DOM events specific to an item.
  events: {
    'click .go-button' : 'changeStateToRide'
  },

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },

  render: function() {
    this.$el.html(this.template( this.model.attributes ));
    return this;
  }

});
