import React from 'react'
import { Button } from 'react-bootstrap'
import PollBarObject from '../../Common/PollBarObject'
const PollNotLaunched = () => {

    const launchPoll = () => {
        console.log("clicked launch poll")
    }

    const createNewPoll = () => {
        console.log("clicked create new poll")
    }
    return (
        <div>
            <h4>Your Poll</h4>
            <PollBarObject></PollBarObject>
            <Button onClick={launchPoll} n>Launch Poll</Button>
            <Button onClick={createNewPoll}>+ New Poll</Button>
        </div>
    )
}

export default PollNotLaunched
