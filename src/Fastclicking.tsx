import React, { useState } from "react"


export default function FastClicking() {
    const timeTreshold = 2000 //time in millis

    const [users, setUsers] = useState([])
    const [startTime, setStartTime] = useState(0)
    const [speedClick, setSpeedClick] = useState<Array<Number>>([])

    function handleOnClick() { 
        let timeNow = new Date().getTime()

        if(timeNow - startTime < timeTreshold) {
            speedClick.push(timeNow - startTime)
            setStartTime(Object.assign({}, timeNow))
            if(speedClick.length >= 10) {
                console.log(speedClick)
                setSpeedClick([])
            }
        } else {
            setStartTime(timeNow)
        }
    }

    return (

        <div className="flex text-center">fast clicking
            <button className="btn bg-white" onClick={event => handleOnClick()}> CliCk me</button>
        </div>
    )
}