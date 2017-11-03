var List = Backbone.Collection.extend({
	model: Card,

	getListID: function() 		{ return this.listID; 	  },
	getListName: function() 	{ return this.listName;   },
	getLastCardId: function() { return this.lastCardId; },

	saveChangesToServer: function() {
		var data = {  listName: 		this.listName,
									listID: 			this.listID,
									lastCardId:		this.lastCardId,
									cards: 				JSON.stringify(this.toJSON()) };

		$.ajax({
			url: "/",
			type: "put",
			data: data,
			success: function(json) { }
		});
	},

	addNewCard: function(cardTitle) {
		new_card_id = this.getNewCardID();
		this.add({title: cardTitle, cardId: new_card_id});
		this.trigger('reRender');
		this.saveChangesToServer();
	},

	removeMovedCard: function(cardId) {
		this.remove(cardId);
		this.saveChangesToServer();
	},

	addMovedCard: function(card) {
		newCard = card.clone();
		newId = this.getNewCardID();
		newCard.set('cardId', newId);
		this.add(newCard);
		this.saveChangesToServer();
		App.trigger('saveSortOrder');
	},

	receiveMovedCard: function(card) {
		new_card_id = this.getNewCardID();
		cardToAdd = {title: card.title, cardId: new_card_id, desc: card.desc};
		this.add(cardToAdd);
	},

	getNewCardID: function()  {
		this.lastCardId = this.lastCardId + 1;
		return this.lastCardId;
	},

	initialize: function(models, options) {
		this.listName 	= options.listName;
		this.listID 		= options.listID;
		this.lastCardId = +options.lastCardId;
		this.on('updateCard', this.saveChangesToServer);
	}
});
