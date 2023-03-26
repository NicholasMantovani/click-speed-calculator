
import { ApexOptions } from "apexcharts";
import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Data, SpeedClickProps, UserBestTime } from "../types/types";

export default function Chart(props: SpeedClickProps) {

    const [categories, setCategories] = useState<Array<number>>([])
    const [series, setSeries] = useState<Array<number>>([])
    const [info, setInfo] = useState<any>()
    const [classification, setClassification] = useState<Array<UserBestTime>>()


    const ip = window.location.host

    const { lastMessage, readyState } = useWebSocket('ws://' + ip + '/clickspeed');

    useEffect(() => {
        if (lastMessage !== null) {
            const data = JSON.parse(lastMessage.data) as Data
            setCategories(data.payload.x)
            setSeries(data.payload.y)
            setInfo(data.payload.info)
            setClassification(data.payload.classification)

        }
    }, [lastMessage]);

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];


    const options: ApexOptions = {
        chart: {
            id: 'basic-char',
            type: 'bar',
            zoom: {
                enabled: true
            },
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: false,
            }
        },
        xaxis: {
            categories: categories
        }
    };

    const seriesClicks = [{
        name: "Clicks",
        data: series
    }]

    return (
        <div className="pt-5">
            <div className="card w-100 bg-neutral shadow-xl">
                <div className="card-body">
                    <h2 className="card-title title">Classifica</h2>
                    <p>Stato websocket: {connectionStatus}</p>
                    <div className="card-actions justify-center p-5">
                        <ReactApexChart
                            options={options}
                            series={seriesClicks}
                            type="bar"
                            width={450}
                        />
                    </div>

                    <div className="stats shadowstats-vertical shadow">
                        {info && Array.from(Object.keys(info)).map((key) => {
                            const value = info[key] as string
                            return (
                                <div className="stat">
                                    <div className="stat-value">{key}</div>
                                    <div className="stat-title">{value}</div>

                                </div>)
                        })}
                    </div>
                    <ul className="menu bg-base-100 rounded-box">
                        {classification && classification.map(userBestTime => (
                            <li className={props.username === userBestTime.userId ? 'text-xl font-extrabold' : undefined} key={userBestTime.userId}> {userBestTime.time}ms - {userBestTime.user} </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )

}