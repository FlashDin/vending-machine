var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_React$Component) {
    _inherits(Index, _React$Component);

    function Index(props) {
        _classCallCheck(this, Index);

        var _this = _possibleConstructorReturn(this, (Index.__proto__ || Object.getPrototypeOf(Index)).call(this, props));

        _this.acceptCurrency = [2000, 5000, 10000, 20000, 50000];
        _this.initState = {
            schema: {
                content: []
            },
            baskets: [],
            totalPrice: 0,
            insertedMoney: false,
            myMoney: 0
        };

        _this.findAll = function () {
            fetch(APP_HOST + '/api/item').then(function (t) {
                return t.json();
            }).then(function (t) {
                _this.setState({
                    schema: t
                });
            });
        };

        _this.addBasket = function (v) {
            var arr = _this.state.baskets;
            if (v.stock <= 0 || arr.some(function (v1) {
                return v1.itemTotal >= v.stock;
            })) {
                alert('Max limit stock');
                return;
            }
            var itemIdx = 0;
            var existItems = [];
            for (var i = 0; i < arr.length; i++) {
                var item = arr[i];
                if (item.id === v.id) {
                    itemIdx = i;
                    existItems.push(item);
                    break;
                }
            }
            if (existItems.length > 0) {
                var _item = existItems[0];
                arr.splice(itemIdx, 1, Object.assign({}, _item, {
                    itemTotal: _item.itemTotal + 1,
                    subtotalPrice: (_item.itemTotal + 1) * _item.itemPrice
                }));
            } else {
                arr.push({
                    id: v.id,
                    name: v.name,
                    itemPrice: v.price,
                    itemTotal: 1,
                    subtotalPrice: v.price
                });
            }
            _this.setState({
                baskets: arr
            }, function () {
                _this.setState({
                    totalPrice: _this.state.baskets.map(function (v) {
                        return v.subtotalPrice;
                    }).reduce(function (a, b) {
                        return a + b;
                    }, 0)
                });
            });
        };

        _this.deleteBasket = function (i) {
            var arr = _this.state.baskets;
            arr.splice(i, 1);
            _this.setState({
                baskets: arr
            }, function () {
                _this.setState({
                    totalPrice: _this.state.baskets.map(function (v) {
                        return v.subtotalPrice;
                    }).reduce(function (a, b) {
                        return a + b;
                    }, 0)
                });
            });
        };

        _this.onSubmit = function (e) {
            e.preventDefault();
            var par = {
                items: _this.state.baskets.map(function (v) {
                    return Object.assign({}, v, {
                        item: {
                            id: v.id
                        }
                    });
                }),
                inPay: _this.state.myMoney
            };
            if (confirm("Are you sure to process it ?")) {
                fetch(APP_HOST + '/api/transaction', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(par)
                }).then(function (t) {
                    return t.json();
                }).then(function (t) {
                    var message = "Failed";
                    if (t.status && t.status != "200") {
                        message = t.message;
                    } else {
                        _this.findAll();
                        _this.setState(function (prevState) {
                            return {
                                insertedMoney: !prevState.insertedMoney
                            };
                        });
                        message = 'Success \n Your return is ' + t.inReturn;
                    }
                    alert(message);
                }).catch(function (e) {
                    console.error(e);
                    alert(e.message);
                });
            }
        };

        _this.state = _this.initState;
        return _this;
    }

    _createClass(Index, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.findAll();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return React.createElement(
                'section',
                { className: 'text-gray-600 body-font bg-slate-100' },
                this.state.insertedMoney ? React.createElement(
                    'div',
                    { className: 'container px-5 py-24 mx-auto max-w-7x1' },
                    React.createElement(
                        'div',
                        { className: 'flex flex-row w-full mb-4 p-4 justify-between' },
                        React.createElement(
                            'div',
                            { className: 'mb-6 lg:mb-0' },
                            React.createElement(
                                'h1',
                                { className: 'sm:text-4xl text-5xl font-medium font-bold title-font mb-2 text-gray-900' },
                                'Vending Machine'
                            ),
                            React.createElement('div', { className: 'h-1 w-40 bg-indigo-500 rounded' }),
                            React.createElement(
                                'h4',
                                { className: 'text-sm text-gray-400' },
                                'Choose Item'
                            )
                        ),
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'h1',
                                { className: 'sm:text-4xl text-5xl font-medium font-bold title-font mb-2 text-gray-900' },
                                'Your Balance: ',
                                this.state.myMoney
                            )
                        )
                    ),
                    React.createElement(
                        'form',
                        { onSubmit: this.onSubmit },
                        React.createElement(
                            'div',
                            { className: 'flex flex-wrap -m-4' },
                            this.state.schema.content.map(function (v, i) {
                                return React.createElement(
                                    'div',
                                    { key: 'contentList' + i,
                                        className: 'xl:w-1/4 md:w-1/3 p-4' },
                                    React.createElement(
                                        'div',
                                        { className: 'bg-white p-6 rounded-lg' },
                                        React.createElement('img', {
                                            className: 'lg:h-60 xl:h-56 md:h-64 sm:h-72 xs:h-72 h-72  rounded w-full object-cover object-center mb-6',
                                            src: 'https://dummyimage.com/480x240/000/fff&text=' + v.name,
                                            alt: 'Image Size 720x400' }),
                                        React.createElement(
                                            'h3',
                                            { className: 'tracking-widest text-indigo-500 text-xs font-medium title-font' },
                                            v.price
                                        ),
                                        React.createElement(
                                            'h2',
                                            { className: 'text-lg text-gray-900 font-medium title-font mb-4' },
                                            v.name
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'flex justify-between' },
                                            React.createElement(
                                                'div',
                                                null,
                                                React.createElement(
                                                    'button',
                                                    { type: 'button',
                                                        className: 'inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out',
                                                        onClick: function onClick() {
                                                            _this2.addBasket(v);
                                                        }
                                                    },
                                                    'Add To Basket'
                                                )
                                            )
                                        )
                                    )
                                );
                            })
                        ),
                        React.createElement(
                            'div',
                            { className: 'flex flex-wrap w-full my-4 p-4 bg-white p-6 rounded-lg' },
                            React.createElement(
                                'table',
                                { className: 'min-w-full' },
                                React.createElement(
                                    'thead',
                                    { className: 'border-b' },
                                    React.createElement(
                                        'tr',
                                        null,
                                        React.createElement(
                                            'th',
                                            { scope: 'col',
                                                className: 'text-sm font-medium text-gray-900 px-6 py-4 text-left' },
                                            'Item'
                                        ),
                                        React.createElement(
                                            'th',
                                            { scope: 'col',
                                                className: 'text-sm font-medium text-gray-900 px-6 py-4 text-left' },
                                            'Price'
                                        ),
                                        React.createElement(
                                            'th',
                                            { scope: 'col',
                                                className: 'text-sm font-medium text-gray-900 px-6 py-4 text-left' },
                                            '#'
                                        ),
                                        React.createElement(
                                            'th',
                                            { scope: 'col',
                                                className: 'text-sm font-medium text-gray-900 px-6 py-4 text-left' },
                                            'Subtotal'
                                        ),
                                        React.createElement(
                                            'th',
                                            { scope: 'col',
                                                className: 'text-sm font-medium text-gray-900 px-6 py-4 text-left' },
                                            'Action'
                                        )
                                    )
                                ),
                                React.createElement(
                                    'tbody',
                                    null,
                                    this.state.baskets.map(function (v, i) {
                                        return React.createElement(
                                            'tr',
                                            { key: 'basketList' + i, className: 'border-b' },
                                            React.createElement(
                                                'td',
                                                { className: 'px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900' },
                                                v.name
                                            ),
                                            React.createElement(
                                                'td',
                                                { className: 'px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900' },
                                                v.itemPrice
                                            ),
                                            React.createElement(
                                                'td',
                                                { className: 'px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900' },
                                                React.createElement('input', {
                                                    type: 'text',
                                                    className: 'block max-w-xs px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none',
                                                    name: 'itemTotal',
                                                    value: v.itemTotal,
                                                    readOnly: true
                                                })
                                            ),
                                            React.createElement(
                                                'td',
                                                { className: 'px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900' },
                                                v.subtotalPrice
                                            ),
                                            React.createElement(
                                                'td',
                                                { className: 'px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900' },
                                                React.createElement(
                                                    'button',
                                                    {
                                                        className: 'inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out',
                                                        onClick: function onClick() {
                                                            _this2.deleteBasket(i);
                                                        }
                                                    },
                                                    'Delete'
                                                )
                                            )
                                        );
                                    })
                                ),
                                React.createElement(
                                    'tfoot',
                                    null,
                                    React.createElement(
                                        'tr',
                                        null,
                                        React.createElement(
                                            'td',
                                            { colSpan: 2, className: 'text-right font-bold' },
                                            'Total'
                                        ),
                                        React.createElement('td', null),
                                        React.createElement(
                                            'td',
                                            null,
                                            this.state.totalPrice
                                        )
                                    ),
                                    React.createElement(
                                        'tr',
                                        null,
                                        React.createElement(
                                            'td',
                                            { colSpan: 2, className: 'text-right font-bold' },
                                            'Your Balance'
                                        ),
                                        React.createElement('td', null),
                                        React.createElement(
                                            'td',
                                            null,
                                            this.state.myMoney
                                        )
                                    )
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'flex flex-wrap w-full mb-4 p-4' },
                            React.createElement(
                                'button',
                                {
                                    className: 'inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out' },
                                'Pay'
                            )
                        )
                    )
                ) : React.createElement(
                    'div',
                    { className: 'fixed w-full h-full bg-slate-400 flex flex-col justify-center' },
                    React.createElement(
                        'div',
                        { className: 'text-center' },
                        React.createElement(
                            'h1',
                            { className: 'sm:text-4xl text-5xl font-medium font-bold title-font mb-2 text-gray-900' },
                            'Vending Machine'
                        ),
                        React.createElement(
                            'h4',
                            { className: 'text-sm text-white' },
                            'Choose Your Money'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'flex justify-center' },
                        this.acceptCurrency.map(function (v, i) {
                            return React.createElement(
                                'div',
                                { key: 'acceptCurrencyList' + i,
                                    className: 'xl:w-1/4 md:w-1/3 p-4' },
                                React.createElement(
                                    'div',
                                    { className: 'bg-white p-6 rounded-lg' },
                                    React.createElement(
                                        'button',
                                        {
                                            className: 'sm:text-4xl text-5xl font-medium font-bold title-font mb-2 text-gray-900',
                                            onClick: function onClick() {
                                                return _this2.setState(function (prevState) {
                                                    return {
                                                        insertedMoney: !prevState.insertedMoney,
                                                        myMoney: v
                                                    };
                                                });
                                            }
                                        },
                                        v
                                    ),
                                    React.createElement('div', { className: 'h-1 w-40 bg-indigo-500 rounded' })
                                )
                            );
                        })
                    )
                )
            );
        }
    }]);

    return Index;
}(React.Component);

export default Index;