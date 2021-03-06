import React, { useEffect } from "react";
import Card from 'react-bootstrap/Card';


const PercentageBar = (props) => {
    const idx = `${props.name} ${props.index}`
    useEffect(() => {
        document.getElementById(idx).style.width = props.value + "%";
    })

    const activeClass = props.active === true ? " active" : "";
    
    return (
        <Card className="poll-result" border={"primary"} onClick={() => props.handleClick(props.index)}>
            <div className={"color-result"} id={idx}>
                <Card.Body className={"poll-result-text" + activeClass }>{`${Math.round(props.value)}% ${props.name}`}</Card.Body>
            </div>
        </Card>
    );
}

export default PercentageBar;