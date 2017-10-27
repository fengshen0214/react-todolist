export default class Footer extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <footer className="footer">
                <span className="todo-count"></span>
                <strong>0</strong>
                <span>item left</span>
                <ul className="filters">
                    <li>
                        <a href="#/all"></a>
                    </li>
                    <li>
                        <a href="#/active"></a>
                    </li>
                    <li>
                        <a href="#/completed"></a>
                    </li>
                    <li>
                        <a href="#/clear-completed"></a>
                    </li>
                </ul>
                <button className="clear-completed">
                    clear add completed
                </button>
            </footer>
        )
    }



}