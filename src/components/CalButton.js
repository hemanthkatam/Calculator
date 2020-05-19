import React from 'react';

const CalButton = props => (<button className="cal-button" onClick={()=>props.onClickHandler(props.value)}>
    {props.title}
</button>);

export default CalButton;