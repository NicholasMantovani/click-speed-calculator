import { useState } from "react"
import { addClicksToDatabase } from "../services/ApiServices";
import { SpeedClickProps } from "../types/types";
import Chart from "./Chart";


export default function SpeedClick(props: SpeedClickProps) {
    const timeTreshold = 2000 //time in millis

    const [startTime, setStartTime] = useState(0)
    const [speedClick, setSpeedClick] = useState<Array<number>>([])
    const [totalClicks, setTotalClicks] = useState(0)


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
        addClicksToDatabase({ userId: props.username, times: speedClick })
    }



    return (
        <>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Quanto sei veloce a cliccare?</h2>
                    <p>Metti alla prova le tue abilità vedremo chi è il più veloce</p>
                    <div className="card-actions justify-center p-5">
                        <button className="btn btn-primary" onClick={() => handleOnClick()}> Clicca qui</button>
                        {totalClicks}
                    </div>
                </div>

            </div>
            <Chart />
        </>
    )
}