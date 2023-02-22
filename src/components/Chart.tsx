
import { ApexOptions } from "apexcharts";
import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Data } from "../types/types";

export default function Chart() {

    const [categories, setCategories] = useState<Array<number>>([])
    const [series, setSeries] = useState<Array<number>>([])
    const [info, setInfo] = useState<any>()

    const { lastMessage, readyState } = useWebSocket('ws://localhost:8080/clickspeed');

    useEffect(() => {
        if (lastMessage !== null) {
            const data = JSON.parse(lastMessage.data) as Data
            setCategories(data.payload.x)
            setSeries(data.payload.y)
            setInfo(data.payload.info)
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
            height: 400,
            type: 'bar',
            zoom: {
                enabled: true
            },
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: true,
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
            <div className="card w-96 bg-neutral shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Classifica</h2>
                    <p>Stato websocket: {connectionStatus}</p>
                    <div className="card-actions justify-center p-5">
                        <ReactApexChart
                            options={options}
                            series={seriesClicks}
                            type="bar"
                            height={350}
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
                </div>
            </div>
        </div>
    )

}