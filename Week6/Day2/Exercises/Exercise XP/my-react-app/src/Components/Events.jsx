import { useState } from "react"

function Events() {


    const clickMe = () => {
        alert("You clicked me!")
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            alert(`You typed: ${e.target.value}`)
        }
    }

    const [isToggleOn, setIsToggleOn] = useState(true);

    return (
        <>
        <button onClick={clickMe}>Click Me</button>
        <input type="text" placeholder="Type something..." onKeyDown={handleKeyDown} />
        <button onClick={() => setIsToggleOn(!isToggleOn)}>
            {isToggleOn ? "ON" : "OFF"}
        </button>
        </>
    )
}

export default Events
