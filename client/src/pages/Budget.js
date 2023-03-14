import React from "react";
import BudgetEntry from "../components/BudgetEntry";

const defaultData = {
    totalBudget: 0,
    remainingBudget: 0,
    onid: null,
    newExpenseLabel: null,
    newExpensePrice: null,
    expenses: []
};

class Budget extends React.Component {
    constructor(props) {
        super(props);
        this.state = defaultData;

        this.submitNewExpense = this.submitNewExpense.bind(this);
        this.deleteExpense = this.deleteExpense.bind(this);
        this.saveAccountData = this.saveAccountData.bind(this);
        this.loadAccountData = this.loadAccountData.bind(this);
        this.updateRemainingBudget = this.updateRemainingBudget.bind(this);
    }


    render() {
        return(
            <div className="container">
                <div className="row mb-3">
                    <div className="col">
                        <h1 className="mb-3">Budget</h1>
                        <div className="input-group mb-3">
                            <label className="input-group-text" for="totalBudget">Total Budget</label>
                            <input type="number" min="0" className="form-control" id="totalBudget" value={this.state.totalBudget} onChange={e => this.setState({totalBudget: Number(e.target.value)}, this.updateRemainingBudget)}></input>
                        </div>
                        <div className="input-group">
                            <label className="input-group-text" for="remainingBudget">Remaining Budget</label>
                            <input type="text" className="form-control" id="remainingBudget" readonly value={this.state.remainingBudget} />
                        </div>
                    </div>
                    <div className="col">
                        <h1 className="mb-3">Sync to ONID</h1>
                        <div className="input-group mb-3">
                            <label className="input-group-text" for="onid">ONID</label>
                            <input type="text" className="form-control" id="onid" value={this.state.onid} onChange={e => this.setState({onid: e.target.value})} />
                        </div>
                        <div className="row">
                            <div className="col">
                                <button type="button" className="btn btn-success mb-3 w-100" disabled={!this.state.onid} onClick={this.saveAccountData}>Save to Account</button>
                            </div>
                            <div className="col">
                                <button type="button" className="btn btn-success mb-3 w-100" disabled={!this.state.onid} onClick={this.loadAccountData}>Load from Account</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <h1 className="mb-3">Expenses</h1>
                        <ul className="list-group">
                            {Object.values(this.state.expenses).map((expense, i) => {
                                return <BudgetEntry label={expense.label} price={expense.price} index={i} key={`expense-${i}`} delete={this.deleteExpense}/>
                            })}
                        </ul>
                    </div>
                    <div className="col">
                        <h1 className="mb-3">Add Expense</h1>
                        <div className="input-group mb-3">
                            <label className="input-group-text" for="newExpenseLabel">Label</label>
                            <input type="text" className="form-control" id="newExpenseLabel" value={this.state.newExpenseLabel ?? ""} onChange={e => this.setState({newExpenseLabel: e.target.value})}/>
                        </div>
                        <div className="input-group mb-3">
                            <label className="input-group-text" for="newExpensePrice">Price</label>
                            <input type="number" min="0" className="form-control" id="newExpensePrice" value={this.state.newExpensePrice ?? ""} onChange={e => this.setState({newExpensePrice: Number(e.target.value)})}/>
                        </div>
                        <div className="row">
                            <button type="button" className="btn btn-success mb-3 w-100" disabled={!(this.state.newExpenseLabel && this.state.newExpensePrice)} onClick={this.submitNewExpense}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    submitNewExpense() {
        const expense = {
            label: this.state.newExpenseLabel,
            price: this.state.newExpensePrice
        };

        this.setState({
            expenses: [...this.state.expenses, expense],
            newExpenseLabel: null,
            newExpensePrice: null
        }, this.updateRemainingBudget);
    }

    deleteExpense(index) {
        const expenses = this.state.expenses;
        expenses.splice(index, 1);
        this.setState({
            expenses: expenses
        }, this.updateRemainingBudget);
    }

    saveAccountData() {
        localStorage.setItem(this.state.onid, JSON.stringify(this.state));
    }

    loadAccountData() {
        this.setState(JSON.parse(localStorage.getItem(this.state.onid)) ?? defaultData);
    }

    updateRemainingBudget() {
        let remainingBudget = this.state.totalBudget;

        for(const expense of this.state.expenses) {
            remainingBudget -= expense.price;
        }

        this.setState({
            remainingBudget: remainingBudget
        });
    }
}

export default Budget;