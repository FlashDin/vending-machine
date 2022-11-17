
export default class Form extends React.Component {

    initState = {

    };

    constructor(props) {
        super(props);
        this.state = this.initState;
    }

    render() {
        return (
            <form id="formAdd" className="ui form" onSubmit={this.saveData}>
                <button className="ui button primary" type="submit">Save</button>
            </form>
        );
    }

}
