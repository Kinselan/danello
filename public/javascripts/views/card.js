var CardView = Backbone.View.extend({
  template: App.templates.card,
  tagName: "div",
  attributes: { class: "modal" },

  events: {
    'click .editCardButton': 'editDescription',
    'click .deleteCardButton': 'deleteCard',
    'click i': 'closeModal',
    'click .saveButton': 'saveChanges',
    'click .cancelButton': 'cancelChanges',
    'blur input': 'saveChanges',
    'keyup input': 'checkForEnter'
  },

  cancelChanges: function(e) {
      e.preventDefault();
      this.render();
  },

  saveChanges: function(e) {
    e.preventDefault();
    description = $(e.currentTarget.closest(".modal")).find("textarea").val();
    title = $(e.currentTarget.closest(".modal")).find("input").val();
    this.model.set('desc', description);
    this.model.set('title', title);
    this.model.collection.trigger("updateCard");

    $(e.currentTarget.closest(".modal")).find("textarea").attr("readonly", true);
    $(e.currentTarget.closest(".modal")).find("textarea").removeClass("editable");

    $('.saveButton').hide();
    $('.cancelButton').hide();
    $('.editCardButton').show();
  },

  closeModal: function() {
    App.trigger('close_modal');
    App.trigger('reRenderAList', this.model.collection.getListID());
  },

  editDescription: function(e) {
    e.preventDefault();

    $(e.currentTarget.closest(".modal")).find("textarea").removeAttr("readonly");
    $(e.currentTarget.closest(".modal")).find("textarea").addClass("editable");
    $(e.currentTarget.closest(".modal")).find("textarea").focus();
    $(e.currentTarget.closest(".modal")).find("textarea").select();

    $('.editCardButton').hide();
    $('.deleteCardButton').hide();
    $('.saveButton').css('display', 'inline-block');
    $('.cancelButton').css('display', 'inline-block');
  },

  deleteCard: function(e) { // Not implemented
    e.preventDefault();
  },

  render: function() {
      var cardHTML = this.$el.html( this.template({card: this.model.toJSON(), list_name: this.model.collection.getListName() }));
      App.trigger("display_card", cardHTML);
  },

  initialize: function() {
    this.render();
  }
});
