import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

class BudgetEntry extends React.Component {
    render() {
        return(
            <li className="list-group-item">
                <div className="row">
                    <div className="col">
                        {this.props.label} - ${this.props.price}
                    </div>
                    <div className="col d-flex justify-content-end align-items-center">
                        <FontAwesomeIcon icon={faTrashCan} onClick={() => this.props.delete(this.props.index)} />
                    </div>
                </div>
            </li>
        );
    }
}

export default BudgetEntry;