export default class Index extends React.Component {

    acceptCurrency = [
        2000,
        5000,
        10000,
        20000,
        50000
    ]

    initState = {
        schema: {
            content: []
        },
        baskets: [],
        totalPrice: 0,
        insertedMoney: false,
        myMoney: 0
    };

    constructor(props) {
        super(props);
        this.state = this.initState;
    }

    componentDidMount() {
        this.findAll();
    }

    findAll = () => {
        fetch(`${APP_HOST}/api/item`)
            .then((t) => t.json())
            .then((t) => {
                this.setState({
                    schema: t
                });
            });
    }

    addBasket = (v) => {
        const arr = this.state.baskets;
        if (v.stock <= 0 || arr.some(v1 => v1.itemTotal >= v.stock)) {
            alert('Max limit stock');
            return;
        }
        let itemIdx = 0;
        let existItems = [];
        for (let i = 0; i < arr.length; i++) {
            const item = arr[i];
            if (item.id === v.id) {
                itemIdx = i;
                existItems.push(item)
                break;
            }
        }
        if (existItems.length > 0) {
            const item = existItems[0];
            arr.splice(itemIdx, 1, {
                ...item,
                itemTotal: item.itemTotal + 1,
                subtotalPrice: (item.itemTotal + 1) * item.itemPrice
            });
        } else {
            arr.push({
                id: v.id,
                name: v.name,
                itemPrice: v.price,
                itemTotal: 1,
                subtotalPrice: v.price
            });
        }
        this.setState({
            baskets: arr
        }, () => {
            this.setState({
                totalPrice: this.state.baskets.map((v) => v.subtotalPrice).reduce((a, b) => a + b, 0)
            });
        });
    }

    deleteBasket = (i) => {
        const arr = this.state.baskets;
        arr.splice(i, 1);
        this.setState({
            baskets: arr
        }, () => {
            this.setState({
                totalPrice: this.state.baskets.map((v) => v.subtotalPrice).reduce((a, b) => a + b, 0)
            });
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const par = {
            items: this.state.baskets.map(v => ({
                ...v,
                item: {
                    id: v.id
                }
            })),
            inPay: this.state.myMoney
        };
        if (confirm("Are you sure to process it ?")) {
            fetch(`${APP_HOST}/api/transaction`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(par)
            })
                .then((t) => t.json())
                .then((t) => {
                    let message = "Failed";
                    if (t.status && t.status != "200") {
                        message = t.message;
                    } else {
                        this.findAll();
                        this.setState(prevState => ({
                            insertedMoney: !prevState.insertedMoney
                        }));
                        message = 'Success \n Your return is ' + t.inReturn;
                    }
                    alert(message);
                })
                .catch(e => {
                    console.error(e);
                    alert(e.message);
                });
        }
    }

    render() {
        return (
            <section className="text-gray-600 body-font bg-slate-100">
                {this.state.insertedMoney ? <div className="container px-5 py-24 mx-auto max-w-7x1">
                    <div className="flex flex-row w-full mb-4 p-4 justify-between">
                        <div className="mb-6 lg:mb-0">
                            <h1 className="sm:text-4xl text-5xl font-medium font-bold title-font mb-2 text-gray-900">Vending
                                Machine</h1>
                            <div className="h-1 w-40 bg-indigo-500 rounded"/>
                            <h4 className="text-sm text-gray-400">Choose Item</h4>
                        </div>
                        <div>
                            <h1 className="sm:text-4xl text-5xl font-medium font-bold title-font mb-2 text-gray-900">Your
                                Balance: {this.state.myMoney}</h1>
                        </div>
                    </div>
                    <form onSubmit={this.onSubmit}>
                        <div className="flex flex-wrap -m-4">
                            {this.state.schema.content.map((v, i) => <div key={`contentList${i}`}
                                                                          className="xl:w-1/4 md:w-1/3 p-4">
                                <div className="bg-white p-6 rounded-lg">
                                    <img
                                        className="lg:h-60 xl:h-56 md:h-64 sm:h-72 xs:h-72 h-72  rounded w-full object-cover object-center mb-6"
                                        src={`https://dummyimage.com/480x240/000/fff&text=${v.name}`}
                                        alt="Image Size 720x400"/>
                                    <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">{v.price}</h3>
                                    <h2 className="text-lg text-gray-900 font-medium title-font mb-4">{v.name}</h2>
                                    <div className="flex justify-between">
                                        {/*<p className="leading-relaxed text-base">Stock: {v.stock}</p>*/}
                                        <div>
                                            <button type="button"
                                                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                                    onClick={() => {
                                                        this.addBasket(v);
                                                    }}
                                            >
                                                Add To Basket
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>)}
                        </div>
                        <div className="flex flex-wrap w-full my-4 p-4 bg-white p-6 rounded-lg">
                            <table className="min-w-full">
                                <thead className="border-b">
                                <tr>
                                    <th scope="col"
                                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Item
                                    </th>
                                    <th scope="col"
                                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Price
                                    </th>
                                    <th scope="col"
                                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left">#
                                    </th>
                                    <th scope="col"
                                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Subtotal
                                    </th>
                                    <th scope="col"
                                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Action
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.baskets.map((v, i) => <tr key={`basketList${i}`} className="border-b">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {v.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {v.itemPrice}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        <input
                                            type="text"
                                            className="block max-w-xs px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                            name="itemTotal"
                                            value={v.itemTotal}
                                            readOnly
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{v.subtotalPrice}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        <button
                                            className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                                            onClick={() => {
                                                this.deleteBasket(i);
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>)}
                                </tbody>
                                <tfoot>
                                <tr>
                                    <td colSpan={2} className="text-right font-bold">Total</td>
                                    <td></td>
                                    <td>{this.state.totalPrice}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2} className="text-right font-bold">Your Balance</td>
                                    <td></td>
                                    <td>{this.state.myMoney}</td>
                                </tr>
                                </tfoot>
                            </table>
                        </div>
                        <div className="flex flex-wrap w-full mb-4 p-4">
                            <button
                                className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Pay
                            </button>
                        </div>
                    </form>
                </div> : <div className="fixed w-full h-full bg-slate-400 flex flex-col justify-center">
                    <div className="text-center">
                        <h1 className="sm:text-4xl text-5xl font-medium font-bold title-font mb-2 text-gray-900">Vending
                            Machine</h1>
                        <h4 className="text-sm text-white">Choose Your Money</h4>
                    </div>
                    <div className="flex justify-center">
                        {this.acceptCurrency.map((v, i) => <div key={`acceptCurrencyList${i}`}
                                                                className="xl:w-1/4 md:w-1/3 p-4">
                            <div className="bg-white p-6 rounded-lg">
                                <button
                                    className="sm:text-4xl text-5xl font-medium font-bold title-font mb-2 text-gray-900"
                                    onClick={() => this.setState(prevState => ({
                                        insertedMoney: !prevState.insertedMoney,
                                        myMoney: v
                                    }))}
                                >{v}</button>
                                <div className="h-1 w-40 bg-indigo-500 rounded"/>
                            </div>
                        </div>)}
                    </div>
                </div>}
            </section>
        );
    }
}
