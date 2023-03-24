import React, { useMemo } from "react";
import { useState } from "react"
import { SpeedClickProps } from "../types/types";
import Chart from "./Chart";
import { originLocation } from "./Login";


export default function SpeedClick(props: SpeedClickProps) {
    const timeTreshold = 1000 //time in millis

    const [startTime, setStartTime] = useState(0)
    const [speedClick, setSpeedClick] = useState<Array<number>>([])
    const [totalClicks, setTotalClicks] = useState(0)



    const worker: Worker = useMemo(
        () => new Worker('Worker.js'),
        []
    );

    function handleOnClick() {
        let timeNow = new Date().getTime()

        if (timeNow - startTime < timeTreshold) {
            speedClick.push(timeNow - startTime)
            setStartTime(timeNow)
            setTotalClicks(prev => prev + 1)
            if (speedClick.length >= 20) {
                handleSendMessage([...speedClick], originLocation, props.username)
                setSpeedClick([])
            }
        } else {
            setStartTime(timeNow)
        }
    }

    async function handleSendMessage(speedClicks: Array<Number>, origin: string, userId: string) {
        worker.postMessage({ userId: userId, times: speedClicks, origin: origin })
    }

    return (
        <>
            <div className="card w-100 bg-neutral shadow-xl">
                <div className="card-body">
                    <h2 className="card-title title">Quanto sei veloce a cliccare?</h2>
                    <p>Metti alla prova le tue abilità vedremo chi è il più veloce</p>
                    <div className="card-actions justify-center p-5">
                        <button className="btn btn-primary btn-wide test" onClick={() => handleOnClick()}> Clicca qui</button>
                    </div>
                    <p>Click totali: {totalClicks}</p>
                </div>
            </div>
            <Chart username={props.username} />
        </>
    )
}