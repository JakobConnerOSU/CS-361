import React from "react";
import countries from "../resources/countries.json";

class CountrySelect extends React.Component {
    render() {
        return(
            <React.Fragment>
                <h1 className="mb-3">Country Selection</h1>
                <div className="input-group mb-3">
                    <label className="input-group-text" for="originCountrySelect">Home Country</label>
                    <select className="form-select" id="originCountrySelect" onChange={e => this.props.setOrigin(e.target.value)}>
                        <option selected disabled>Choose...</option>
                        {Object.values(countries).map((country, i) => {
                            return <option key={`origin-${country.value}`} value={country.value}>{country.label}</option>
                        })}
                    </select>
                </div>
                <div className="input-group mb-3">
                    <label className="input-group-text" for="destinationCountrySelect">Destination Country</label>
                    <select className="form-select" id="destinationCountrySelect" onChange={e => this.props.setDestination(e.target.value)}>
                        <option selected disabled>Choose...</option>
                        ${Object.values(countries).map((country, i) => {
                            return <option key={`destination-${country.value}`} value={country.value}>{country.label}</option>
                        })}
                    </select>
                </div>
            </React.Fragment>
        );
    }
}

export default CountrySelect;