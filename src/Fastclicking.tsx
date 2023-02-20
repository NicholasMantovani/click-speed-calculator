import React, { useState } from "react"
import useWebSocket from "react-use-websocket";


export default function FastClicking() {
    const timeTreshold = 2000 //time in millis

    const [startTime, setStartTime] = useState(0)
    const [speedClick, setSpeedClick] = useState<Array<Number>>([])

    const { sendMessage, lastMessage, readyState } = useWebSocket('wss://echo.websocket.org');


    function handleOnClick() { 
        let timeNow = new Date().getTime()

        if(timeNow - startTime < timeTreshold) {
            speedClick.push(timeNow - startTime)
            setStartTime(Object.assign({}, timeNow))
            if(speedClick.length >= 10) {
                console.log(speedClick)
                sendMessage(JSON.stringify(speedClick))
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