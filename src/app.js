import Item from "components/Item";
import Footer from "components/Footer";
import {BrowserRouter as Router, Route} from 'react-router-dom';

require("style/base.css");
require("style/index.css");

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todosData: [], //{id,value,hasCompleted}
            inputVal: '',
            view: 'all'
        };
        this.handleKeyDownPost = this.handleKeyDownPost.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.onDestroy = this.onDestroy.bind(this);
        this.onClearCompleted = this.onClearCompleted.bind(this);
        this.toggleAll = this.toggleAll.bind(this);
        this.onToggle = this.onToggle.bind(this);
        this.changeView = this.changeView.bind(this);
        this.editItemDone = this.editItemDone.bind(this);
        this.editEsc = this.editEsc.bind(this);
    }

    //footer tab选中
    changeView(view) {
        this.setState({view})
    }

    //输入内容时
    inputChange(ev) {
        this.setState({
            inputVal: ev.target.value
        })
    }

    //输入添加列表
    handleKeyDownPost(ev) {
        if (ev.keyCode !== 13) return;
        let {inputVal} = this.state;
        let value = inputVal.trim();
        if (value === '') return;

        let todo = {};
        todo.id = new Date().getTime();
        todo.value = value;
        todo.hasComplated = false;
        let {todosData} = this.state;
        todosData.push(todo);
        this.setState({
            todosData,
            inputVal: ''
        });
    }

    //改变所以的todo
    toggleAll(ev) {
        let {checked} = ev.target;
        let {todosData} = this.state;
        todosData = todosData.map(elt => {
            elt.hasComplated = checked;
            return elt;
        });
        this.setState({todosData});
    }

    //edit修改todosData
    editItemDone(todoV, value) {
        let {todosData} = this.state;
        todosData = todosData.map(elt=> {
            if (todoV.id === elt.id) {
                elt.value = value;
            }
            return elt;
        })
    }

    //editEsc
    editEsc() {
        return;
        // let {todosData} = this.state;
        // todosData = todosData.map(elt=> {
        //     if (todoV.id === elt.id) {
        //         elt.value = elt.value;
        //     }
        //
        // })
    }

    //每一个todo的改变
    onToggle(todo) {
        var {todosData} = this.state;
        todosData = todosData.map(elt => {
            if (elt.id === todo.id) {
                elt.hasComplated = !elt.hasComplated;
            }
            return elt;
        });
        this.setState({todosData});

    }

    //删除当前的一条
    onDestroy(todoV) {
        let {todosData} = this.state;
        todosData = todosData.filter((elt) => {
            return elt.id !== todoV.id;
        });
        this.setState({todosData});
    }

    //清除列表
    onClearCompleted() {
        let {todosData} = this.state;
        todosData = todosData.filter((elt) => {
            return !elt.hasComplated;
        });
        this.setState({todosData})
    }

    render() {
        let {handleKeyDownPost, onDestroy, onClearCompleted, inputChange, toggleAll, onToggle, changeView, editItemDone, editEsc} = this;
        let {todosData, inputVal, view} = this.state;
        let {location:{pathname}} = this.props;
        //初始组件空对象
        let items = null,
            footer = null,
            itemsBox = null;
        //无勾选状态的总是
        let leftCount = todosData.length;
        //footer下tab筛选
        items = todosData.filter(elt=> {
            //如果为勾选，总数减减
            if (elt.hasComplated == true) leftCount--;
            switch (pathname) {
                //未勾选
                case '/active':
                    return !elt.hasComplated;
                //已勾选
                case '/completed':
                    return elt.hasComplated;
                //all
                default:
                    return true;
            }
        });
        //数据列表
        items = items.map((elt, i) => {
            return (
                <Item
                    {...{
                        onDestroy,
                        todoValue: elt,
                        onToggle,
                        editItemDone,
                        editEsc
                    }}
                    key={i}
                />
            )
        });
        //footer、数据列表显示
        if (todosData.length) {
            itemsBox = (
                <section className="main">
                    <input type="checkbox" checked={leftCount === 0} className="toggle-all" onChange={toggleAll}/>
                    <ul className="todo-list">
                        {items}
                    </ul>
                </section>
            );
            footer = (
                <Footer
                    {...{
                        leftCount,
                        showClearButton: leftCount < todosData.length,
                        onClearCompleted,
                        pathname
                    }}
                />
            );
        }
        return (
            <div>
                <header className="header">
                    <h1>todos</h1>
                    <input type="text"
                           className="new-todo"
                           value={inputVal}
                           onChange={inputChange}
                           onKeyDown={handleKeyDownPost}
                           placeholder="type something here"/>
                </header>
                {itemsBox}
                {footer}
            </div>
        )
    }
}


ReactDOM.render(
    <Router>
        <Route path="/" component={App}></Route>
    </Router>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept()
}