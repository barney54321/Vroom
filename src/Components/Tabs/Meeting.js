import React from 'react'

const Commands = () => {
    const launch = () => {
        // function when we submit form
    }
    return (
        <div>
            <form onSubmit={launch}>
                <label>URL of the zoom meeting</label>
                <input type="text" placeholder="https://zoom.example..."></input>
                <label>!attend</label>
                <input type="text" placeholder="Write your message here"></input>
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default Commands
