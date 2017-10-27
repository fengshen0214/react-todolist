let propTypes = {
    todoValue: PT.object,
    onDestroy: PT.func
};
export default class Item extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {todoValue,onDestroy} = this.props;
        console.log(todoValue);
        return (
            <li>
                <div className="view">
                    <input type="checkout" className="toggle"/>
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