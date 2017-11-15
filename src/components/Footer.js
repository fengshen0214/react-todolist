import {Link} from 'react-router-dom';

let propType = {
    leftCount: PT.number,
    showClearButton: PT.bool,
    //oneOf只接受指定的值
    // view: PT.oneOf(['all', 'active', 'completed']),
    onClearCompleted: PT.func,
    pathname:PT.string
    // changeView: PT.func
};
export default class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {
            leftCount,
            showClearButton,
            pathname,
            // view,
            // changeView,
            onClearCompleted
        } = this.props;
        var clearBtn = null;
        if (showClearButton) {
            clearBtn = (
                <button
                    className="clear-completed"
                    onClick={onClearCompleted}
                >
                    clear add completed
                </button>
            )
        }
        return (
            <footer className="footer">
                <span className="todo-count">
                    <strong>{leftCount}</strong>
                    <span>item left</span>
                </span>
                <ul className="filters">
                    <li>
                        <Link to="/" className={pathname === '/' ? 'selected' : ''}>全部</Link>
                    </li>
                    <li>
                        <Link to="/active" className={pathname === '/active' ? 'selected' : ''}>未勾选的</Link>
                    </li>
                    <li>
                        <Link to="/completed" className={pathname === '/completed' ? 'selected' : ''}>已勾选的</Link>
                    </li>
                </ul>
                {clearBtn}
            </footer>
        );
    }
}
Footer.propTypes = propType;