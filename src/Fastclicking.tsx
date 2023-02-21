import React, { useEffect, useState } from "react"
import useWebSocket, { ReadyState } from "react-use-websocket";
import { boolean } from "yargs";
import Chart from "./Chart";


export default function FastClicking() {
    const timeTreshold = 2000 //time in millis

    const [startTime, setStartTime] = useState(0)
    const [speedClick, setSpeedClick] = useState<Array<number>>([])
    const [totalClicks, setTotalClicks] = useState(0)
    const [allclicks, setAllClicks] = useState<Array<number>>([])

    const { sendMessage, lastMessage, readyState } = useWebSocket('wss://socketsbay.com/wss/v2/1/demo/');


    useEffect(() => {
        if (lastMessage !== null) {
            setAllClicks((prev) => [...prev, ...JSON.parse(lastMessage.data)]);
        }
    }, [lastMessage]);

    function handleOnClick() {
        let timeNow = new Date().getTime()

        if (timeNow - startTime < timeTreshold) {
            speedClick.push(timeNow - startTime)
            setStartTime(timeNow)
            setTotalClicks(prev => prev + 1)
            if (speedClick.length >= 10) {
                handleSendMessage([...speedClick])
                setSpeedClick([])
            }
        } else {
            setStartTime(timeNow)
            setTotalClicks(0)
        }
    }

    async function handleSendMessage(speedClicks: Array<Number>) {
        setAllClicks((prev) => [...prev, ...speedClick])
        sendMessage(JSON.stringify(speedClick))
    }

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    return (
        <>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Quanto sei veloce a cliccare?</h2>
                    <p>Metti alla prova le tue abilità vedremo chi è il più veloce</p>
                    Connection status: {connectionStatus}
                    <div className="card-actions justify-center p-5">
                        <button className="btn btn-primary" onClick={() => handleOnClick()}> Clicca qui</button>
                        {totalClicks}
                    </div>
                </div>

            </div>
            <Chart speedClicks={[...allclicks]} />
        </>
    )
}