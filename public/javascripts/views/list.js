var ListView = Backbone.View.extend({
	template: App.templates.list,
	tagName: "li",
	attributes: { class: "list" },

	events: {
		'click .addCard': 'displayAddCardForm',
		'click .addCardButton': 'addCard',
		'click .cancelAddCardButton': 'cancelAddCard',
		'keypress textarea': 'checkForEnter',
		'keyup textarea': 'checkForEscape',
		'click .card': 'editCardDetails',
		'click i': 'editTitleInline',
		'blur input': 'saveInlineTitleChanges',
		'click input': 'editCardDetails',
		'keypress input': 'checkIfEnterOnCardTitleChange',
	},

	checkIfEnterOnCardTitleChange: function(e) {
		// If we are editing a card title inline and hit "enter", it should save changes
		if(e.which == 13) {
			this.saveInlineTitleChanges(e);
		};
	},

	saveInlineTitleChanges: function(e) {
		e.currentTarget.setAttribute("readonly", true);
		cardId = +e.currentTarget.parentElement.getAttribute('data-id');
		card = this.collection.get(cardId);
		title = $(e.currentTarget).val();
		card.set('title', title);
		this.collection.trigger("updateCard");
	},

	editTitleInline: function(e) {
		e.stopPropagation();
		e.currentTarget.parentElement.firstChild.removeAttribute("readonly");
		e.currentTarget.parentElement.firstChild.focus();
		e.currentTarget.parentElement.firstChild.select();
	},

	editCardDetails: function(e) {
		cardId = $(e.currentTarget).closest('li').attr('data-id')
		card = this.collection.get(+cardId);
		console.log('check');
		App.trigger('edit_card', card);
	},

	checkForEnter: function(e) {
		if(e.which == 13) {
			this.addCard(e);
		}
	},

	checkForEscape: function(e) {
		if(e.keyCode == 27) {
			this.cancelAddCard(e);
		}
	},

	displayAddCardForm: function(e) {
		$("[list-id='" + this.listID + "'] .addCard").hide();
		$(".addCardForm").hide();
		$("[list-id='" + this.listID + "'] .addCardForm").show();
		$("[list-id='" + this.listID + "'] .addCardForm textarea").focus();
	},

	addCard: function(e) {
		e.preventDefault();
		var cardTitle = $("[list-id='" + this.listID + "'] textarea").val();
		this.collection.addNewCard(cardTitle);
	},

	cancelAddCard: function(e) {
		e.preventDefault();
		$(".addCardForm").hide();
		e.currentTarget.closest('form').reset()
		$(".addCard").show();
	},

	render: function() {
		var listName = this.collection.getListName();
		var listID   = this.collection.getListID();
		this.$el.html(this.template({ cards: this.collection.toJSON(), list_name: listName, list_id: listID }));
		$('#lists').append(this.el);
	},

	reRender: function() {
		var listName = this.collection.getListName();
		var listID   = this.collection.getListID();
		this.$el.html(this.template({ cards: this.collection.toJSON(), list_name: listName, list_id: listID }));
		this.displayAddCardForm();

		// at this point, we have a new card at the bottom of the list that is not part of the sortable collection
		// resaving the sort order is useless as it isn't included in the Sortable object
		// refreshing the sortable from the top list element will trigger checking the last-saved-order... which doesn't
		// include our latest card... and thus puts that card somewhere else.
		// solution - remove the sort order form local storage, THEN re-run sortable
		var listName = "list" + this.listID;
		localStorage.removeItem(listName);
		App.trigger('makeCardsDraggable');
	},

	initialize: function() {
		this.listID = this.collection.getListID();
		this.listenTo(this.collection, 'reRender', this.reRender);
		this.render();
		this.$el.attr("list-id", this.listID);
	}
});
