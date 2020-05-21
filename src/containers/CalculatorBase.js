import React from 'react';
import CalButton from '../components/CalButton'

class CalculatorBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            calValue: '0',
            isSciFic: false,
            theam: 'LIGHT'
        };
        this.buttonlist = [
            [{ label: '1', value: '1' }, { label: '2', value: '2' }, { label: '3', value: '3' }, { label: 'Add(+)', value: '+' }],
            [{ label: '4', value: '4' }, { label: '5', value: '5' }, { label: '6', value: '6' }, { label: 'Subtract(-)', value: '-' }],
            [{ label: '7', value: '7' }, { label: '8', value: '8' }, { label: '9', value: '9' }, { label: 'Multiply(*)', value: '*' }],
            [{ label: 'Clear', value: 'CLR' }, { label: '0', value: '0' }, { label: '=', value: '=' }, { label: 'Devide(/)', value: '/' }],
        ];
        this.calculator = this.buttonlist.map((row, ridx) => {
            return (
                <div className="cal-row" key={ridx}>{
                    row.map((col, cidx) => (
                        <CalButton
                            title={col.label}
                            value={col.value}
                            key={col.label}
                            onClickHandler={this.onClickHandler}
                        />
                    ))
                }</div>
            )
        })
        this.operationStack = [];
        this.prevValueStack = [];
    }

    onClickSciHandler = (operator) => {
        let { calValue } = this.state;
        let oldVal = parseInt(calValue);
        if (operator === 'SIGN') {
            calValue = oldVal * -1;
        } else if (operator === 'ROOT') {
            calValue = Math.sqrt(oldVal);
        } else {
            calValue = oldVal * oldVal;
        }

        this.setState({
            calValue: calValue.toString()
        })

    };

    calculateValue = (value1, operator, value2) => {
        switch (operator) {
            case '+':
                return value1 + value2;
            case '-':
                return value1 - value2;
            case '*':
                return value1 * value2;
            case '/':
                return value1 / value2;
            case 'CLR':
                this.operationStack = [];
                this.prevValueStack = [];
                return 0;
            default:
                return value2 + value1
        }
    }

    onClickHandler = (value) => {
        let { calValue } = this.state;
        if (value === 'CLR') {
            this.operationStack = [];
            this.prevValueStack = [];
            this.setState({
                calValue: '0'
            })
            return;
        }
        if (!isNaN(value)) {
            if (this.operationStack.length === 0) {
                this.setState(prevState => ({
                    calValue: parseInt(prevState.calValue + value).toString()
                }))
            } else {
                if (this.prevValueStack.length === 1 && this.prevValueStack[0] !== calValue) {
                    this.setState(prevState => ({
                        calValue: parseInt(prevState.calValue + value).toString()
                    }))
                } else {
                    this.setState(prevState => ({
                        calValue: parseInt(value).toString()
                    }))
                }
            }

        } else {
            if (this.prevValueStack.length === 1 && this.operationStack.length === 1) {
                const finalValue = this.calculateValue(parseInt(this.prevValueStack[0]), this.operationStack[0], parseInt(calValue))
                this.setState({
                    calValue: parseInt(finalValue).toString()
                })
                this.operationStack = [];
                this.prevValueStack = [];
                value !== '=' && this.operationStack.push(value);

                this.prevValueStack.push(finalValue.toString());
            } else {
                this.prevValueStack.push(calValue);
                value !== '=' && this.operationStack.push(value);
            }
        }
    }
    handleSci = () => {
        this.setState(prevState => ({
            isSciFic: !prevState.isSciFic
        }))
    }

    changeTheam = (theam) =>{
        this.setState({
            theam
        })
    }

    render() {
        const { calValue, isSciFic,theam } = this.state;
        return (
            <div className={theam === 'LIGHT' ? "cal-light" : "cal-dark"}>
                <div>
                    <button onClick={this.handleSci}>Scientific Mode </button>
                    <button onClick={() => this.changeTheam('LIGHT')}>Light Theme </button>
                    <button onClick={() => this.changeTheam('DARK')}>Dark Theme </button>
                </div>

                <div className="cal-inside">
                    <div className="final-value">
                        <div className="value-in">
                            {calValue}
                        </div>
                    </div>
                    {this.calculator}
                </div>
                {
                    isSciFic ?
                        <div className="scific">
                            <CalButton
                                title="Sign"
                                value="SIGN"
                                onClickHandler={this.onClickSciHandler}
                            />
                            <CalButton
                                title="Square"
                                value="SQUARE"
                                onClickHandler={this.onClickSciHandler}
                            />
                            <CalButton
                                title="Root"
                                value="ROOT"
                                onClickHandler={this.onClickSciHandler}
                            />
                        </div>
                        : null
                }


            </div>

        )
    }
}

export default CalculatorBase;