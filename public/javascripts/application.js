var App = {
  templates: JST,

  search: function() {
    $(".card").hide();
    searchTerm = $('#search').val().toLowerCase();

    $(".card").each(function(index) {
      if (($(".card")[index].firstChild.value.toLowerCase().indexOf(searchTerm) >= 0) ||
          ($(".card")[index].getAttribute('data-desc').toLowerCase().indexOf(searchTerm) >= 0)) {
        $($(".card")[index]).show();
      }
    });
  },

  editCard: function(card) {
    this.cardModal = new CardView({ model: card} );
  },

  displayCard: function(cardHTML) {
    $(".overlay").html(cardHTML);
    $(".overlay").show();
  },

  closeModal: function() {
    $(".overlay").hide();
    this.cardModal.remove();
  },

  saveAllSortOrders: function() { // CARDs
    this.allSortable.forEach(function(sortable) { sortable.save() });
  },

  makeCardsDraggable: function() {
    this.allSortable = [];

    self = this;

    $(".cards").each(function(index, value) {

      self.allSortable.push(Sortable.create(value, {
        group: "cards",
        store: {
          /**
           * Get the order of elements. Called once during initialization.
           * @param   {Sortable}  sortable
           * @returns {Array}
           */
          get: function (sortable) {
            var listName = "list" + value.getAttribute('list-id');
            var order = localStorage.getItem(listName);
            return order ? order.split('|') : [];
          },

          /**
           * Save the order of elements. Called onEnd (when the item is dropped).
           * @param {Sortable}  sortable
           */
          set: function (sortable) {
            var listName = "list" + value.getAttribute('list-id');
            var order = sortable.toArray();
            localStorage.setItem(listName, order.join('|'));
          }
        },
        onAdd: function(evt) {
          cardID = evt.item.getAttribute('data-id');
          App.donatingListID = evt.from.getAttribute('list-id');
          App.receivingListID = evt.to.getAttribute('list-id');
          card = _.findWhere(App.listCollections, {listID: App.donatingListID}).get(cardID);
          _.findWhere(App.listCollections, {listID: App.receivingListID}).addMovedCard(card);
        },

        onEnd: function(evt) {
          if (App.receivingListID !== App.donatingListID) {
            movedCardId = _.findWhere(App.listCollections, {listID: App.receivingListID}).getLastCardId();
            evt.item.setAttribute("data-id", movedCardId);
          };

          this.save();
          App.saveAllSortOrders();
          App.makeCardsDraggable();
        },

        onRemove: function(evt) {
          cardID = evt.item.getAttribute('data-id');
          listID = evt.from.getAttribute('list-id');
          _.findWhere(App.listCollections, {listID: listID}).removeMovedCard(cardID);
        }
      }));
    });
  },

  getListID: function() {
    this.currentListID++;
    return this.currentListID;
  },

  loadLists: function() {
    self = this;

    if (this.lists.length === 0) {
      this.listOrder = [];
    } else {
      this.listOrder = JSON.parse(localStorage.getItem('listOrder') || '[]');
    }
    if (this.listOrder.length !== 0) {
      this.listOrder.forEach(function(index) {
        list = _.findWhere($(self.lists), {listID: index});
        newList     = new List(JSON.parse(list.cards), { listName: list.listName, listID: list.listID, lastCardId: list.lastCardId });
        self.listCollections.push(newList);
        newListView = new ListView({collection: newList});
      });

    } else {
      this.lists.forEach(function(list) {
        newList     = new List(JSON.parse(list.cards), { listName: list.listName, listID: list.listID, lastCardId: list.lastCardId });
        this.listCollections.push(newList);
        newListView = new ListView({collection: newList});
      }.bind(this));
    }

    $( "#lists" ).sortable({
      update: function(event, ui) { App.trigger('saveListOrderToLocalStorage') },
    });

    this.saveListOrderToLocalStorage();
    this.makeCardsDraggable();
  },

  saveListOrderToLocalStorage: function() {
    this.listOrder = $("#lists").sortable("toArray", {attribute: "list-id"});
    localStorage.setItem('listOrder', JSON.stringify(this.listOrder));
  },

  addList: function(e) {
    e.preventDefault();

    var listName = $('#addListInput').val();
    var listID   = this.getListID();
    var self = this;

    $.ajax({
      url: "/",
      type: "post",
      data: { listName: listName, lastCardId: 0 },
      success: function(json) {
        var newList = new List(json.data, { listName: json.listName, listID: json.listID, lastCardId: json.lastCardId });
        self.lists.push(newList);
        self.listCollections.push(newList);
        var newListView = new ListView({collection: newList});
        self.saveListOrderToLocalStorage();
      }
    });

    $('#addListForm')[0].reset();
  },

  init: function(lists) {
    this.lists = lists || [];
    this.listCollections = [];
    this.loadLists();
    this.bindEvents();
    $("#addListInput").focus();
  },

  insertMovedCard: function(receivingListId, card) {
    _.findWhere(this.listCollections, {listID: receivingListId}).receiveMovedCard(card);
  },

  reRenderAList: function(listID) {
    _.findWhere(this.listCollections, { listID: listID } ).trigger('reRender');
  },

  cancelSubmit: function(e) {
    e.preventDefault();
  },

  bindEvents: function() {
    _.extend(this, Backbone.Events);
    $('#addListForm').on("submit", this.addList.bind(this));
    $('#search').on("keyup", this.search.bind(this));
    $('header form').on("submit", this.cancelSubmit);
    this.on('edit_card', this.editCard);
    this.on('display_card', this.displayCard);
    this.on('close_modal', this.closeModal);
    this.on('dropCard', this.insertMovedCard);
    this.on('saveSortOrder', this.saveAllSortOrders);
    this.on('makeCardsDraggable', this.makeCardsDraggable);
    this.on('reRenderAList', this.reRenderAList);
    this.on('saveListOrderToLocalStorage', this.saveListOrderToLocalStorage);
  },
};
