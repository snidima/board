/** @jsx React.DOM */
var React = require('react');
var ListBlock = require('./ListBlock.js');
var ListBlockAdd = require('./ListBlockAdd.js');
var AppActions = require('../actions/AppActions.js');
var AppStore = require('../stores/AppStore.js');
var $ = require('jquery');
require('jquery-ui-browserify');
var _ = require('underscore');





function getListsState() {
    return {
        lists: AppStore.getAllLists()
    };
}

var ListsContainer = React.createClass({

    sortable: function(){
        var self = this;
        $('.lists-block').sortable({
            items:'>*.list-block:not(.list-block_new)',
            snapMode: "both",
            placeholder: "lists-block-drag-placeholder",
            tolerance: "pointer",
            start: function(e, ui){
                var height = $(ui.item).find('.list-block-wrap').height();
                ui.placeholder.height(height);
            },
            update: function(){
                var els = $('.lists-block >*.list-block:not(.list-block_new)');
                els = _.map(els, function(num){
                    return ($(num).attr('id')*1);
                });
                AppActions.moveList( els );
                $('.lists-block').sortable('cancel');
            }
        });
    },

    render: function(){
        var el = this.state.lists.map(function(list, index){
            return (
                <ListBlock list={ list } listID={index} key={index}/>
            )
        });
        return(
            <div className="lists-block">
                { el }
                <ListBlockAdd />
            </div>
        );
    },

    componentWillUnmount: function() {
        AppStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        this.forceUpdate();
        this.setState(getListsState());
    },

    getInitialState: function() {
        return getListsState();
    },

    componentDidMount: function() {
        AppStore.addChangeListener(this._onChange);
        this.sortable();
    }
});

module.exports = ListsContainer;