/** @jsx React.DOM */
var React = require('react');
var AppActions = require('../actions/AppActions.js');

var ListCardBlock = React.createClass({

    getInitialState: function(){
        return {
            popupOpen: false
        }
    },

    popupOpen: function(){
        $('.list-block-card').sortable('disable');
        $('.lists-block').sortable('disable');
        this.setState({
            popupOpen: true
        });
    },

    popupClose: function(){
        $('.list-block-card').sortable('enable');
        $('.lists-block').sortable('enable');
        this.setState({
            popupOpen: false
        });
    },

    render: function(){
        var popup = !this.state.popupOpen ? null : (
            <div className="list-block-card-popup">
                <div className="list-block-card-popup-wrap">

                    <div className="list-block-card-popup-block">
                        <div className="list-block-card-popup-block__icon">
                            icon
                        </div>
                        <div className="list-block-card-popup-block__content">
                            <h1 className="list-block-card-popup-text-big">{ this.props.card.text }</h1>
                            <span className="list-block-card-popup-text-normal">В списке <u>{ this.props.listName }</u></span>
                            <div className="list-block-card-popup-horizontal-items">
                                <div className="list-block-card-popup-horizontal__item">
                                    <div className="list-block-card-popup-horizontal-item-text">
                                        Метки
                                    </div>
                                    <div className="list-block-card-popup-horizontal-item-else">
                                        <div className="list-block-card-popup-horizontal-item-else__block list-block-card-popup-horizontal-item-else__block_green"></div>
                                        <div className="list-block-card-popup-horizontal-item-else__block list-block-card-popup-horizontal-item-else__block_add">+</div>
                                    </div>
                                </div>
                                <div className="list-block-card-popup-horizontal__item">
                                    <div className="list-block-card-popup-horizontal-item-text">
                                        Срок
                                    </div>
                                    <div className="list-block-card-popup-horizontal-item-else">
                                        <div className="list-block-card-popup-horizontal-item-else__text">В субботу в 12:00</div>
                                    </div>
                                </div>
                            </div>
                            <div className="list-block-card-popup-horizontal-items">
                                <div className="list-block-card-popup-horizontal__item">
                                    <div className="list-block-card-popup-horizontal-item-text">
                                        Описание <u>Изменить</u>
                                    </div>
                                    <div className="list-block-card-popup-horizontal-item-else">
                                        <div className="list-block-card-popup-horizontal-item-else__comments">
                                            <ul className="list-block-card-popup-horizontal-item-else-comments">
                                                <li className="list-block-card-popup-horizontal-item-else-comments__text">new comment-1</li>
                                                <li className="list-block-card-popup-horizontal-item-else-comments__text">new comment-2</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className="list-block-card-popup-block">
                        <div className="list-block-card-popup-block__icon">
                            icon
                        </div>
                        <div className="list-block-card-popup-block__content">
                            <h1 className="list-block-card-popup-text-big">Вложения</h1>
                            <div className="list-block-card-popup-horizontal-items">
                                <div className="list-block-card-popup-horizontal__item">
                                    <div className="list-block-card-popup-horizontal-item-attach">
                                        TXT
                                    </div>
                                </div>
                                <div className="list-block-card-popup-horizontal__item">
                                    <div className="list-block-card-popup-horizontal-item-description">
                                        <div className="list-block-card-popup-horizontal-item__file-name">
                                            Какой-то файл.txt
                                        </div>
                                        <div className="list-block-card-popup-horizontal-item__file-time">
                                            добавлено 6 минут назад
                                        </div>
                                        <div className="list-block-card-popup-horizontal-item__action">
                                            <div className="list-block-card-popup-horizontal-item-action">
                                                Скачать
                                            </div>
                                            <div className="list-block-card-popup-horizontal-item-action">
                                                Удалить
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="list-block-card-popup-add-attach">
                                Добавить вложение
                            </div>
                        </div>
                    </div>


                    <div className="list-block-card-popup-block">
                        <div className="list-block-card-popup-block__icon">
                            icon
                        </div>
                        <div className="list-block-card-popup-block__content">
                            <h1 className="list-block-card-popup-text-big">Чек-лист</h1>
                        </div>
                    </div>


                    <div className="list-block-card-popup-close" onClick={this.popupClose}></div>
                </div>
            </div>
        );

        return(
            <div className="list-block-card-content" id={this.props.cardID} onDoubleClick={this.deleteCard} >
                <div className="list-block-card-content__text">
                    { this.props.card.text }
                </div>
                <div className="list-block-card-content__edit" onClick={this.popupOpen}>
                    ...
                </div>
                { popup }
            </div>

        );
    }
});

module.exports = ListCardBlock;