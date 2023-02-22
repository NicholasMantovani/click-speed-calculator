
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
            height: 350,
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
        <>
            <h1 className="text-2xl">Risultati</h1>
            Stato websocket: {connectionStatus}
            <ReactApexChart
                options={options}
                series={seriesClicks}
                type="bar"
                height={350}
            />

            <div className="stat">
                {info && Array.from(Object.keys(info)).map((key) => {
                    const value = info[key] as string
                    return (<>
                        <div className="stat-title">{key}</div>
                        <div className="stat-value">{value}</div>
                    </>)
                })};
            </div>

        </>
    )

}