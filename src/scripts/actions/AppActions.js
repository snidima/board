var AppDispatcher = require('../dispatcher/AppDispatcher');

var AppActions = {
    insertList: function(list){
        AppDispatcher.handleViewAction({
            actionType:'INSERT_LIST',
            list: list
        })
    },
    insertCard: function(data){
        AppDispatcher.handleViewAction({
            actionType:'INSERT_CARD',
            data: data
        })
    },
    moveList: function(data){
        AppDispatcher.handleViewAction({
            actionType:'MOVE_LIST',
            data: data
        })
    },
    moveCard: function(data){
        AppDispatcher.handleViewAction({
            actionType:'MOVE_CARD',
            data: data
        })
    },
    listDelete: function(listID){
        AppDispatcher.handleViewAction({
            actionType:'LIST_DELETE',
            listID: listID
        })
    },
    cardDelete: function(data){
        AppDispatcher.handleViewAction({
            actionType:'CARD_DELETE',
            data: data
        })
    },
    renameList: function(data){
        AppDispatcher.handleViewAction({
            actionType:'LIST_RENAME',
            data: data
        })
    }
};

module.exports = AppActions;