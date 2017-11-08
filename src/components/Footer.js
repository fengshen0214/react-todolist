let propType = {
    leftCount: PT.number,
    showClearButton: PT.bool,
    //oneOf只接受指定的值
    view: PT.oneOf(['all', 'active', 'completed']),
    onClearCompleted: PT.func,
    changeView: PT.func
};
export default class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {
            leftCount,
            showClearButton,
            view,
            changeView,
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
                        <a href="#/all"
                           className={view === 'all' ? 'selected' : ''}
                           onClick={ev => changeView('all')}
                        >全部</a>
                    </li>
                    <li>
                        <a href="#/active"
                           className={view === 'active' ? 'selected' : ''}
                           onClick={ev => changeView('active')}
                        >未勾选的</a>
                    </li>
                    <li>
                        <a href="#/completed"
                           className={view === 'completed' ? 'selected' : ''}
                           onClick={ev => changeView('completed')}
                        >已勾选的</a>
                    </li>
                </ul>
                {clearBtn}
            </footer>
        );
    }
}
Footer.propTypes = propType;