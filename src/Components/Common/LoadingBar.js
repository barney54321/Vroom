import React from 'react'
import { Spinner } from 'react-bootstrap'

const LoadingBar = (props) => {
    return (
        <div className="tab-container d-flex align-items-center justify-content-center flex-column ">
            <Spinner animation="border" variant="primary" />
            <h4>{props.text}</h4>
        </div>
    )
}

export default LoadingBar
