import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import countries from "../resources/countries.json";
import CountrySelect from "../components/CountrySelect";

const exchangeRates = {
    "usd": 1,
    "mxn": 18.78,
    "eur": 0.92
}

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            origin: null,
            destination: null,
            convertedCurrency: "",
            inputCurrencyType: "origin",
            inputCurrencyValue: 0.00,
            originLanguageValue: "",
            destinationLanguageValue: ""
        };

        this.convertCurrency = this.convertCurrency.bind(this);
        this.translate = this.translate.bind(this);
        this.setOrigin = this.setOrigin.bind(this);
        this.setDestination = this.setDestination.bind(this);
    }

    render() {
        return(
            <div className="container">
                <div className="row mb-3">
                    <CountrySelect setOrigin={this.setOrigin} setDestination={this.setDestination} />
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
                            <div className="input-group mb-3">
                                <label className="input-group-text" for="homeLanguage">Home Language</label>
                                <input type="text" className="form-control" id="homeLanguage" value={this.state.originLanguageValue} onChange={e => this.setState({originLanguageValue: e.target.value})}></input>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <button type="button" className="btn btn-success mb-3 w-100" disabled={this.state.origin == null || this.state.destination == null} onClick={() => this.translate("origin", "destination")}>
                                        <FontAwesomeIcon icon={faArrowDown} />
                                    </button>
                                </div>
                                <div className="col">
                                    <button type="button" className="btn btn-success mb-3 w-100" disabled={this.state.origin == null || this.state.destination == null} onClick={() => this.translate("destination", "origin")}>
                                        <FontAwesomeIcon icon={faArrowUp} />
                                    </button>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <label className="input-group-text" for="destinationLanguage">Destination Language</label>
                                <input type="text" className="form-control" id="destinationLanguage" value={this.state.destinationLanguageValue} onChange={e => this.setState({destinationLanguageValue: e.target.value})}></input>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    convertCurrency() {
        let currencyValue = Number(this.state.inputCurrencyValue)
        let inputCountry = (this.state.inputCurrencyType == "origin") ? countries[this.state.origin] : countries[this.state.destination]
        let outputCountry = (this.state.inputCurrencyType == "origin") ? countries[this.state.destination] : countries[this.state.origin]

        currencyValue /= exchangeRates[inputCountry.currency]
        currencyValue *= exchangeRates[outputCountry.currency]

        this.setState({
            convertedCurrency: currencyValue
        })
    }

    translate(from, to) {
        let inputCountry = countries[this.state[from]];
        let outputCountry = countries[this.state[to]];

        this.setState({
            [to + "LanguageValue"]: "Translating..."
        });

        fetch(`http://localhost:3000/translate?in=${inputCountry.language}&out=${outputCountry.language}&text=${encodeURIComponent(this.state[from + "LanguageValue"])}`)
            .then((response) => response.text())
            .then((data) => {
                this.setState({
                    [to + "LanguageValue"]: data
                });
            })
    }
    
    setOrigin(origin) {
        this.setState({
            origin: origin
        });
    }
    
    setDestination(destination) {
        this.setState({
            destination: destination
        });
    }
}

export default Home;