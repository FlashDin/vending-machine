import Transaction from "./pages/transaction/Index.js";
import TransactionForm from "./pages/transaction/Form.js";

class App extends React.Component {

    components = {
        "": Transaction,
        'form': TransactionForm,
    };

    constructor(props) {
        super(props);
        this.state = {
            path: '',
            nextPath: ''
        };
    }

    componentDidMount() {
        this.setState({
            path: window.location.pathname.split("/").pop()
        });
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextState.nextPath !== this.state.nextPath) {
            console.log(nextState.nextPath)
            this.setState({
                path: nextState.nextPath
            });
        }
    }

    popState = (e, data, title, uri) => {
        e.preventDefault();
        window.history.pushState(data, title, uri);
        this.setState({
            nextPath: uri
        });
    };

    render() {
        const TagName = this.components[this.state.path];
        return TagName === undefined ? '' : (<TagName popState={this.popState.bind(this)}/>);
    }
}

export default App;
