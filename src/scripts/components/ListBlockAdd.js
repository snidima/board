/** @jsx React.DOM */
var React = require('react');
var AppActions = require('../actions/AppActions.js');

var ListBlockAdd = React.createClass({

    getInitialState: function() {
        return { enter: false };
    },

    handleShowForm: function(){
        this.setState({ enter: 'enter' }, function(){
            this.refs.inputName.getDOMNode().focus();
            this.refs.inputName.getDOMNode().select();
        });
    },

    handleHideForm: function(){
        this.setState({ enter: false });
    },

    nameValidate: function( name ){
        return ( name === '' ) ? false : true;
    },

    handlerSubmit: function(){
        var name = this.refs.inputName.getDOMNode().value;

        if ( !this.nameValidate( name ) ) {
            this.refs.inputName.getDOMNode().focus();
            return false;
        }

        AppActions.insertList({
            name: name
        });

        this.refs.inputName.getDOMNode().value = '';
        this.setState({ enter: false });
        return false;
    },

    render: function(){
        return(
            <div className="list-block list-block_new">
                <div className="list-block-add-new" data-state={ this.state.enter }>
                    <div className="list-block-add-new__text" onClick={ this.handleShowForm } >+ Добавить новый список...</div>
                    <div className="list-block-add-new__form">
                        <form id="list-block-add-new-form" className="list-block-add-new-form" onSubmit={ this.handlerSubmit }>
                            <input ref= "inputName" type="text" placeholder="Введите название списка.." className="list-block-add-new-form__input-text"/>
                            <input type="submit" value="Сохранить" data-val="save" className="list-block-add-new-form__input-btn list-block-add-new-form__input-btn-save"/>
                            <span onClick={ this.handleHideForm } className="list-block-add-new-form__input-btn list-block-add-new-form__input-btn-cancel">Отмена</span>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = ListBlockAdd;