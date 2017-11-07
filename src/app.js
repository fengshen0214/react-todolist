import Item from "components/Item";
import Footer from "components/Footer";

require("style/base.css");
require("style/index.css");

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            todosData:[], //{id,value,hasCompleted}
            inputVal:''
        }
        this.handleKeyDownPost = this.handleKeyDownPost.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.onDestroy = this.onDestroy.bind(this);
        this.onClearCompleted = this.onClearCompleted.bind(this);
        this.toggleAll = this.toggleAll.bind(this);
        this.onToggle = this.onToggle.bind(this);
    }

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

    //每一个todo的改变
    onToggle(todo) {
        var {todosData} = this.state;
        todosData = todosData.map(elt => {
            if (elt.id === todo.id) {
                elt.hasComplated = !elt.hasComplated;
                console.log(elt.hasComplated)
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
        this.setState({todosData: todosData});
    }

    //清楚列表
    onClearCompleted() {
        let {todosData} = this.state;
        todosData = todosData.filter((elt) => {
            return !elt.hasComplated;
        })
        this.setState = ({todosData})
    }
    render(){
        let {handleKeyDownPost, onDestroy, onClearCompleted, inputChange, toggleAll,onToggle} = this;
        let {todosData,inputVal} = this.state;
        let items = todosData.map((elt, i) => {
            return (
                <Item
                    {...{
                        onDestroy,
                        todoValue: elt,
                        onToggle
                    }}
                    key={i}
                />
            )
        })
        return (
            <div>
                <header className="header">
                    <h1>todos</h1>
                    <input type="text" className="new-todo" value={inputVal} onChange={inputChange}  onKeyDown={handleKeyDownPost}/>
                </header>
                <section className="main">
                    <input type="checkbox" className="toggle-all" onChange={toggleAll} />
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