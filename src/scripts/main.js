/** @jsx React.DOM */
var React = require('react');
var ListsApp = require('./components/app.js');

var AppStore = require('./stores/AppStore.js');
var AppActions = require('./actions/AppActions.js');
var _ = require('underscore');


React.render(
    <ListsApp />,
    document.getElementById('main')
);


var TestApp = React.createClass({

    click: function(){
        console.info( AppStore.getApp() );
    },
    click2: function(){
        AppActions.insertList({
            name: 'Первый список',
            cards: [
                {
                    text: 'Даже всемогущая пунктуа'
                },
                {
                    text: 'екстами, ведущими безорфограф'
                },
                {
                    text: 'Однажды одна маленькая строчка '
                }
            ]
        });
        AppActions.insertList({
            name: 'Пустой список',
        });

        AppActions.insertList({
            name: 'Не пустой список',
            cards: [
                {
                    text: 'Далеко-далеко за словесными горам'
                },
                {
                    text: 'Вдали от всех живут они в буквенных'
                },
                {
                    text: 'Маленький ручеек Даль журчит по всей стране и обеспечивает ее всеми необходимыми правилами.'
                },
                {
                    text: 'Эта парадигматическая страна, в которой жаренные члены предложения залетаю'
                }
            ]
        });
    },

    click3: function(){
        var arr = [];
        for ( var i=0; i< AppStore.getListCount();i++)
            arr.push(i);
        arr = _.shuffle(arr);
        AppActions.moveList(arr);
    },

    click4: function(){
        AppActions.moveCard({
            srcListID: 0,
            trgListID: 1,
            srcCardID: 0,
            trgCardID: 0
        });
    },

    render: function(){
        return(
            <div>
                <div>
                    <button className="btn-yellow" onClick={this.click}>Вывести модель ( console.info )</button>
                    <button className="btn-green" onClick={this.click2}>Добавить данные</button>
                    <button className="btn-blue" onClick={this.click3}>Перемешать списки</button>
                    <button className="btn-some" onClick={this.click4}>Перенести карточку ( 0=>1 )</button>
                </div>
            </div>
        )
    }
});



React.render(
    <TestApp />,
    document.getElementById('test')
);