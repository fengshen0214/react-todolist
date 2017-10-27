"use strict";
import Item from 'components/Item';
import Footer from 'components/Footer';

require('style/base.css');
require('style/index.css');
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todosData: [],
            todoArr: []
        };
        this.handleKeyDownPost = this.handleKeyDownPost.bind(this);
        this.onDestroy = this.onDestroy.bind(this);
        this.onClearCompleted = this.onClearCompleted.bind(this);
    }

    //输入添加列表
    handleKeyDownPost(ev) {
        if (ev.keyCode !== 13) return;
        let value = ev.target.value.trim();
        if (value === '') return;
        let todo = {};
        todo.id = new Date().getTime();
        todo.value = value;
        todo.hasComplated = false;
        let {todosData} = this.state;
        todosData.push(todo);
        this.setState({todosData});
        ev.target.value = '';
    }

    //删除当前的一条
    onDestroy(todoV) {
        let {todosData} = this.state;
        console.dir(todosData);
        todosData = todosData.filter((elt) => {
            return elt.id !== todoV.id;
        });
        this.setState = ({todosData:todosData});
        console.dir(todosData);
    }

    //清楚列表
    onClearCompleted() {
        let {todosData} = this.state;
        todosData = todosData.filter((elt) => {
            return !elt.hasComplated;
        })
        this.setState = ({todosData})
    }

    //

    render() {
        let {handleKeyDownPost, onDestroy, onClearCompleted} = this;
        let {todosData} = this.state;
        console.log('render')
        let items = todosData.map((elt, i) => {
            return (
                <Item
                    {...{
                        onDestroy,
                        todoValue: elt
                    }}
                    key={i}
                />
            )
        })
        return (
            <div>
                <header className="header">
                    <h1 onClick={onClearCompleted}>todos</h1>
                    <input
                        type="text"
                        className="new-todo"
                        onKeyDown={handleKeyDownPost}
                    />
                </header>
                <section className="main">
                    <input type="checkout" className="toggle-all"/>
                    <ul className="todo-list">
                        {items}
                    </ul>
                </section>
                <Footer/>
            </div>
        )
    }
}


ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
if (module.hot) {
    module.hot.accept()
}