import React from 'react';
import CalButton from '../components/CalButton'

class CalculatorBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            calValue: '0'
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
    }

    onClickHandler = (value) => {
        this.setState(prevState => ({
            calValue: prevState.calValue + value
        }))
    }

    render() {
        const { calValue } = this.state;
        return (
            <div className="cal-inside">
                <div className="final-value">
                    <div className="value-in">
                        {calValue}
                    </div>

                </div>
                {this.calculator}
            </div>
        )
    }
}

export default CalculatorBase;