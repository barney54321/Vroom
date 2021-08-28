import React, { useEffect } from "react";
import Card from 'react-bootstrap/Card';


const OptionBar = (props) => {

    useEffect(() => {
        document.getElementById(props.index).style.width = props.value + "%";
    })

    const activeClass = props.active === true ? " active" : "";

    return (
        <Card className="poll-result" border={"primary"} onClick={() => props.handleClick(props.index)}>
            <div className={"color-result"} id={props.index}>
                <Card.Body className={"poll-result-text" + activeClass }>{`${props.value} ${props.name}`}</Card.Body>
            </div>
        </Card>
    );
}

export default OptionBar;