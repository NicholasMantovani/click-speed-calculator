
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";

interface ChartProps {
    speedClicks: Array<number>;
}

export default function Chart(props: ChartProps) {


    const options: ApexOptions = {
        chart: {
            id: 'basic-char',
            height: 350,
            type: 'bar',
            zoom: {
                enabled: true
            },
        },
        xaxis: {
            categories: ['100', '120', '140', '160', '180', '200', '220', '240', '260', '280', '300']
        }
    };



    function createSeries() {
        const series = [{
            name: "Clicks",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }]

        function newFunction(speedClick: number, offset: number, limit: number, index: number) {
            if (speedClick < limit && speedClick >= offset) {
                series[0].data[index] = series[0].data[index] + 1;
            }
        }


        props.speedClicks.sort().forEach(speedClick => {
            newFunction(speedClick, 0, 100, 0)
            newFunction(speedClick, 100, 120, 1)
            newFunction(speedClick, 120, 140, 2)
            newFunction(speedClick, 140, 160, 3)
            newFunction(speedClick, 160, 180, 4)
            newFunction(speedClick, 180, 200, 5)
            newFunction(speedClick, 200, 220, 6)
            newFunction(speedClick, 220, 240, 7)
            newFunction(speedClick, 240, 260, 8)
            newFunction(speedClick, 260, 280, 9)
            newFunction(speedClick, 280, 300, 10)
        })
        return series;

    }


    const series = createSeries()

    console.log(series)
    return <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
    />
}