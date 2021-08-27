import React from 'react'

const Commands = () => {
    const submitForm = () => {
        // function when we submit form
    }
    return (
        <div>
            <form onSubmit={submitForm}>
                <label>!now</label>
                <input type="text" placeholder="Write your message here"></input>
                <label>Your zoom name</label>
                <input type="text" placeholder="Your exact zoom name"></input>
                <button type="submit">Launch</button>
            </form>
        </div>
    )
}

export default Commands
