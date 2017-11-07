let propTypes = {
    todoValue: PT.object,
    onDestroy: PT.func,
    onToggle:PT.func
};
export default class Item extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {todoValue,onDestroy,onToggle} = this.props;
        return (
            <li>
                <div className="view">
                    <input type="checkbox" className="toggle"
                        checked={todoValue.hasComplated}
                           onChange={ ev => {onToggle(todoValue)}}
                    />
                    <label htmlFor="">
                        {todoValue.value}
                    </label>
                    <button
                        className="destroy"
                        onClick={ ev=> {onDestroy(todoValue)} }
                    ></button>
                </div>
                <input type="text" className="edit"/>
            </li>
        );
    }
}

Item.propTypes = propTypes;