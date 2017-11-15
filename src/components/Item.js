let propTypes = {
    todoValue: PT.object,
    onDestroy: PT.func,
    onToggle: PT.func,
    editItemDone: PT.func,
    editEsc:PT.func
};
export default class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inEdit: false,
            val: ''
        };
        this.onEdit = this.onEdit.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onEnter = this.onEnter.bind(this);
        this.editItemDone = this.editItemDone.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.editEsc = this.editEsc.bind(this);
    }

    inputChange(ev) {
        this.setState({
            val: ev.target.value
        })
    }

    //双击编辑
    onEdit() {
        let {value} = this.props.todoValue;
        this.setState({
            inEdit: true,
            val: value
        },()=>{
            //因setState 是异步更新的，所以focus必须放在setState回调函数里
            this.refs.editInput.focus();
        });
    }
    //input失去焦点保存当前的内容
    onBlur() {
        this.editItemDone();
        console.log('onblur')
    }
    //input，enter时
    onEnter(ev) {
        if(ev.keyCode == 13){
            this.editItemDone();
        }else if(ev.keyCode == 27){
            this.editEsc();
        }else{return;}
    }
    //todo 编辑时候，按键esc之后则不修改，写好了，只因 onBlur时调用了修改的数据的方法，想办法不让调用才对；
    editEsc() {
        this.setState({inEdit: false});
        let {editEsc,todoValue} = this.props;
        editEsc(todoValue,this.state.val)
    }
    //编辑当前val去修改
    editItemDone() {
        this.setState({
            inEdit: false
        });
        let {todoValue, editItemDone} = this.props;
        editItemDone(todoValue, this.state.val);
    }

    render() {
        let {onEdit, onEnter, onBlur, inputChange} = this;
        let {todoValue, onDestroy, onToggle} = this.props;
        let {inEdit, val} = this.state;
        let itemClassName = todoValue.hasComplated ? 'completed':'';
        if (inEdit) {
            itemClassName += 'editing';
        }
        return (
            <li className={itemClassName}>
                <div className="view">
                    <input type="checkbox" className="toggle"
                           checked={todoValue.hasComplated}
                           onChange={ ev => {
                               onToggle(todoValue)
                           }}
                    />
                    <label
                        onDoubleClick={onEdit}
                    >
                        {todoValue.value}
                    </label>
                    <button
                        className="destroy"
                        onClick={ ev=> {
                            onDestroy(todoValue)
                        } }
                    ></button>
                </div>
                <input type="text"
                       className="edit"
                       value={val}
                       onBlur={onBlur}
                       onKeyDown={onEnter}
                       onChange={inputChange}
                       ref="editInput"
                />
            </li>
        );
    }
}

Item.propTypes = propTypes;