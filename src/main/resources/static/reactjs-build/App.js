var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Transaction from "./pages/transaction/Index.js";
import TransactionForm from "./pages/transaction/Form.js";

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.components = {
            "": Transaction,
            'form': TransactionForm
        };

        _this.popState = function (e, data, title, uri) {
            e.preventDefault();
            window.history.pushState(data, title, uri);
            _this.setState({
                nextPath: uri
            });
        };

        _this.state = {
            path: '',
            nextPath: ''
        };
        return _this;
    }

    _createClass(App, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.setState({
                path: window.location.pathname.split("/").pop()
            });
        }
    }, {
        key: "componentWillUpdate",
        value: function componentWillUpdate(nextProps, nextState, nextContext) {
            if (nextState.nextPath !== this.state.nextPath) {
                console.log(nextState.nextPath);
                this.setState({
                    path: nextState.nextPath
                });
            }
        }
    }, {
        key: "render",
        value: function render() {
            var TagName = this.components[this.state.path];
            return TagName === undefined ? '' : React.createElement(TagName, { popState: this.popState.bind(this) });
        }
    }]);

    return App;
}(React.Component);

export default App;