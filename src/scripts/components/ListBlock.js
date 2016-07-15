/** @jsx React.DOM */
var React = require('react');
var ListCardBlock = require('./ListCardBlock.js');
var AppActions = require('../actions/AppActions.js');
var AppStore = require('../stores/AppStore.js');
var _ = require('underscore');
var $ = require('jquery');
require('jquery-ui-browserify');

var ListBlock = React.createClass({

    sortable: function(){
        self = this;
        $('.list-block-card').sortable({
            connectWith: ".list-block-card",
            placeholder: "list-block-card-placeholder",
            start: function(e, ui){
                var height = $(ui.item).outerHeight();
                ui.placeholder.height(height);
                self.listleSourceId = $(ui.item).parent().parent().parent().parent().attr('id');
                self.cardSourcetId = $(ui.item).attr('id');
            },

            update: function(event, ui){
                $(ui.item).attr('data-target-card-id', 'true');
                var data = {
                    srcListID: self.listleSourceId,
                    trgListID: $(ui.item).parent().parent().parent().parent().attr('id'),
                    srcCardID:self.cardSourcetId,
                    trgCardID:(function(){
                        var lol = _.map($(ui.item).parent().parent().parent().parent().find('.list-block-card-content'), function(num){
                            return ($(num).attr('data-target-card-id') == 'true') ? true : false
                        });
                        var id=null;
                        lol.forEach(function(val, key){
                            if ( val ) id = key;
                        });
                        return id;
                    })()
                };

                if (( data.srcListID == data.trgListID ) && ( data.srcCardID == data.trgCardID )) {
                    $(ui.item).attr('data-target-card-id', null);
                    $('.list-block-card').sortable('cancel');
                    return;
                }

                if (( data.trgListID === undefined) || ( data.trgCardID == null )) {
                    $(ui.item).attr('data-target-card-id', null);
                    $('.list-block-card').sortable('cancel');
                    return;
                }

                $(ui.item).attr('data-target-card-id', null);
                $('.list-block-card').sortable('cancel');
                AppActions.moveCard(data);
            }
        });
    },

    componentDidMount: function() {
        this.sortable();
    },

    getInitialState: function() {
        this.lastValidLisstName = this.props.list.name;
        return {
            listNameEnter: false,
            listNameValue: this.props.list.name,
            cardAddEnter: false
        }
    },

    handleShowListRenameForm: function(){
        this.setState({ listNameEnter: 'enter' }, function(){
            this.refs.listRename.getDOMNode().focus();
            this.refs.listRename.getDOMNode().select();
        });
    },

    handleHideListRenameForm: function(){
        this.setState({ listNameEnter: false, listNameValue: this.lastValidLisstName });
    },

    ListNameValidate: function( name ){
        return ( name === '' ) ? false : true;
    },

    handlerListRenameSave: function() {
        var name = this.state.listNameValue;

        if ( !this.ListNameValidate( name ) ) {
            this.refs.listRename.getDOMNode().val = this.lastValidLisstName;
            this.setState({
                listNameEnter: false,
                listNameValue: this.lastValidLisstName
            });
            return false;
        }

        this.lastValidLisstName = name;

        AppActions.renameList({
            name: this.lastValidLisstName,
            id:  this.props.listID
        });
        this.handleHideListRenameForm();
        return false;
    },

    handleChange: function( event ){
        this.setState({listNameValue: event.target.value});
    },

    handleShowAddCardForm: function(){
        this.setState({ cardAddEnter: 'enter' }, function(){
            this.refs.cardValue.getDOMNode().focus();
        });
    },

    handleHideAddCardForm: function(){
        this.setState({ cardAddEnter: false });
    },

    valueCardValidate: function( value ){
        return ( value === '' ) ? false : true;
    },

    handlerCardSubmit: function() {
        var value = this.refs.cardValue.getDOMNode().value;

        if ( !this.valueCardValidate( value ) ) {
            this.refs.cardValue.getDOMNode().focus();
            return false;
        }

        AppActions.insertCard({
            card: {
                text: value
            },
            listID: this.props.listID
        });

        this.refs.cardValue.getDOMNode().value = '';
        this.setState({ cardAddEnter: false });
        return false;
    },

    listDelete: function(){
        AppActions.listDelete(this.props.listID);
    },

    render: function() {
        var listID = this.props.listID;
        var listName = this.props.list.name;
        return (
            <div className="list-block" id={this.props.listID}>
                <div className="list-block-wrap">
                    <div className="list-block-header" data-state={ this.state.listNameEnter }>
                        <div onClick={ this.handleShowListRenameForm } className="list-block-header__text">{ this.props.list.name }</div>
                        <form onSubmit={ this.handlerListRenameSave } className="list-block-header__form list-block-header-form">
                            <input onChange={this.handleChange} ref="listRename" type="text" value={ this.state.listNameValue } className="list-block-header-form__input"/>
                            <input type="submit" value="Сохранить" data-val="save" className="list-block-add-new-form__input-btn list-block-add-new-form__input-btn-save"/>
                            <span onClick={ this.handleHideListRenameForm } className="list-block-add-new-form__input-btn list-block-add-new-form__input-btn-cancel">Отмена</span>
                        </form>
                        <div className="list-block-header__menu" onClick={this.listDelete}>x</div>
                    </div>
                    <div className="list-block-main-content" type="horizontal">
                        <div className="list-block-card">
                            {
                                this.props.list.cards.map(function(card, index){
                                    return (
                                        <ListCardBlock card={ card } listID={listID} listName={ listName } cardID={index} key={index} />
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="list-block-add-a-card" data-state={ this.state.cardAddEnter }>
                        <div className="list-block-add-a-card__text" onClick={ this.handleShowAddCardForm }>+ Добавить карточку..</div>
                        <form className="list-block-add-a-card__form" onSubmit={ this.handlerCardSubmit } >
                            <textarea ref="cardValue" type="text" placeholder="Введите название карточки.." className="list-block-add-a-card-form-input"></textarea>
                            <button className="list-block-add-a-card-form-btn list-block-add-a-card-form-btn_save">Сохранить</button>
                            <span onClick={ this.handleHideAddCardForm } className="list-block-add-a-card-form-btn list-block-add-a-card-form-btn_cancel">Отмена</span>
                        </form>
                    </div>
                </div>
            </div>
        );
    },
    listleSourceId: null,
    cardSourcetId: null
});

module.exports = ListBlock;