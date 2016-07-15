var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');
var _ = require('underscore');

/*
lists: [
    {
         id:
         position:
         name: 'Стандартный список',
         type: 'default',
         color: 'default',
         cards: [
            {
                 name: 'Стандартная каточка',
                 type: 'text'
            }
         ]
    }
]
 */

var _app = {
    lists: [],
    defaults: {
        list: function(){
            return {
                name: 'Стандартный список',
                type: 'default',
                color: 'default',
                cards: []
            }
        },
        card: function(){
            return {
                text: 'Стандартная каточка',
                type: 'text'
            }
        }
    }
};





function insertList( list ) {
    _app.lists.push( _.defaults( list, _app.defaults.list() ) );
}


function insertCard( data ) {
    _app.lists[data.listID].cards.push( _.defaults( data.card, _app.defaults.card() ) );
}


function moveList(data){
    var newLists = [];
    data.forEach(function(index,position ){
        newLists[position] = _app.lists[index];
    });
    _app.lists = newLists;
    console.info('moveList!');
}


function listDelete(listID){
    _app.lists.splice(listID, 1)
}

function renameList(data){
    var name = data.name;
    var id = data.id;
    _app.lists[id].name = name;
}


function moveCard(data){
    var srcListID = data.srcListID;
    var trgListID = data.trgListID;
    var srcCardID = data.srcCardID;
    var trgCardID = data.trgCardID;

    if ((srcListID==trgListID) && (srcCardID==trgCardID)) return;

    if ( !_app.lists[srcListID] || !_app.lists[srcListID].cards[srcCardID] ) return;

    var card = _app.lists[srcListID].cards[srcCardID];
    if( card == undefined ) return;
    cardDelete({
        cardID: srcCardID,
        listID: srcListID
    });

    console.group('Перемещение карточки');
    console.log('Исходный лист: '+srcListID);
    console.log('Конечный лист: '+trgListID);
    console.log('Исходная карточка: '+srcCardID);
    console.log('Конечная карточка: '+trgCardID);
    console.groupEnd();
    _app.lists[trgListID].cards.splice(trgCardID,0,card);

}

function cardDelete(data){
    var cardID = data.cardID;
    var listID = data.listID;
    _app.lists[listID].cards.splice(cardID, 1);
}



var ListStore = merge(EventEmitter.prototype, {

    getAllLists: function(){
        return _app.lists;
    },

    getListCount: function(){
        return _app.lists.length;
    },

    getApp: function(){
      return _app;
    },

    getSortList: function(){
        return _.sortBy(_app.lists, function(list){ return list.position });
    },

    emitChange: function() {
        this.emit('change');
    },

    addChangeListener: function(callback) {
        this.on('change', callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    }

});






AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {

        case 'INSERT_LIST':
            insertList( action.list );
            ListStore.emitChange();
            break;
        case 'INSERT_CARD':
            insertCard( action.data );
            ListStore.emitChange();
            break;
        case 'MOVE_LIST':
            moveList( action.data );
            ListStore.emitChange();
            break;
        case 'LIST_DELETE':
            listDelete( action.listID );
            ListStore.emitChange();
            break;
        case 'CARD_DELETE':
            cardDelete( action.data );
            ListStore.emitChange();
            break;
        case 'LIST_RENAME':
            renameList( action.data );
            ListStore.emitChange();
            break;
        case 'MOVE_CARD':
            moveCard( action.data );
            ListStore.emitChange();
            break;
        default:
            return true;
    }

    return true;
});

module.exports = ListStore;
