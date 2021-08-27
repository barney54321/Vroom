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
                <label>!attend</label>
                <input type="text" placeholder="Write your message here"></input>
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default Commands
