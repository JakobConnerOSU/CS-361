import React from "react";

const exchangeRates ={
    "usd": 1,
    "mxn": 18.78,
    "eur": 0.92
}

const countries = {
    "unitedstates": {
        value: "unitedstates",
        label: "United States",
        currency: "usd",
        language: "en"
    },
    "mexico": {
        value: "mexico",
        label: "Mexico",
        currency: "mxn",
        language: "es"
    },
    "france": {
        value: "france",
        label: "France",
        currency: "eur",
        language: "fr"
    }
}

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            origin: null,
            destination: null,
            convertedCurrency: "",
            inputCurrencyType: "origin",
            inputCurrencyValue: 0.00
        }

        this.convertCurrency = this.convertCurrency.bind(this);
    }

    render() {
        console.log(this.state)
        return (
            <div className="container">
                <div className="row mb-3">
                    <h1 className="mb-3">Country Selection</h1>
                    <div className="input-group mb-3">
                        <label className="input-group-text" for="originCountrySelect">Home Country</label>
                        <select className="form-select" id="originCountrySelect" onChange={e => this.setState({origin: e.target.value})}>
                            <option selected disabled>Choose...</option>
                            ${Object.values(countries).map((country, i) => {
                                return <option key={`origin-${country.value}`} value={country.value}>{country.label}</option>
                            })}
                        </select>
                    </div>
                    <div className="input-group mb-3">
                        <label className="input-group-text" for="destinationCountrySelect">Destination Country</label>
                        <select className="form-select" id="destinationCountrySelect" onChange={e => this.setState({destination: e.target.value})}>
                            <option selected disabled>Choose...</option>
                            ${Object.values(countries).map((country, i) => {
                                return <option key={`destination-${country.value}`} value={country.value}>{country.label}</option>
                            })}
                        </select>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-5">
                        <div className="row mb-3">
                            <h1 className="mb-3">Currency Conversion</h1>
                            <div className="input-group mb-3">
                                <label className="input-group-text" for="inputCurrency">
                                    <select className="form-select" onChange={e => this.setState({inputCurrencyType: e.target.value})}>
                                        <option value="origin" selected>Home Currency</option>
                                        <option value="destination">Destination Currency</option>
                                    </select>
                                </label>
                                <input type="number" className="form-control" id="inputCurrency" value={this.state.inputCurrencyValue} onChange={e => this.setState({inputCurrencyValue: e.target.value})}></input>
                            </div>
                            <button type="button" className="btn btn-success mb-3" disabled={this.state.origin == null || this.state.destination == null} onClick={this.convertCurrency}>Convert</button>
                            <div className="input-group">
                                <label className="input-group-text" for="outputCurrency">Converted Value</label>
                                <input type="text" className="form-control" id="outputCurrency" readonly value={this.state.convertedCurrency}></input>
                            </div>
                        </div>
                    </div>
                    <div className="col-2" />
                    <div className="col-5">
                        <div className="row mb-3">
                            <h1 className="mb-3">Translation</h1>
                            <h3>Coming Soon!</h3>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    convertCurrency() {
        let value = Number(this.state.inputCurrencyValue)
        let inputCountry = (this.state.inputCurrencyType == "origin") ? countries[this.state.origin] : countries[this.state.destination]
        let outputCountry = (this.state.inputCurrencyType == "origin") ? countries[this.state.destination] : countries[this.state.origin]

        value /= exchangeRates[inputCountry.currency]
        value *= exchangeRates[outputCountry.currency]

        this.setState({
            convertedCurrency: value
        })
    }

    translate() {
        
    }
}

export default Home;