import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { ResponsiveLine } from '@nivo/line'
import { useSelector } from 'react-redux';
import axios from 'axios';
import CommonEnum from '../../Util/CommonEnum';


function MachineChart() {
    const tabItem = useSelector(state => state);
    const Enum = new CommonEnum();
    let { id } = useParams();
    const [lineChartData, setLineChartData] = useState([]);
    const [DataKey, setDataKey] = useState(['date', 'daily_uptime']);

    useEffect(() => {
        axios.post('/Machine/GetMachineChartData', {
            'companyCode': sessionStorage.getItem('companyCode'),
            'factoryCode': sessionStorage.getItem('factoryCode'),
            'blockCode': sessionStorage.getItem('blockCode'),
            'districtCode': sessionStorage.getItem('districtCode'),
            'machineCode': id,
            'itemType': tabItem
        }).then(res => {
            let resDataList = [];
            let resDataKey = Object.keys(res.data[0]);

            setDataKey(Object.keys(res.data[0]));

            for (let dataRow of res.data) {
                resDataList.push({
                    x: dataRow[resDataKey[0]],
                    y: dataRow[resDataKey[1]]
                });
            }
            setLineChartData([{
                id: Enum[resDataKey[1]],
                data: resDataList
            }])
        })
    }, [])

    return (
        <ResponsiveLine
            data={lineChartData}
            margin={{ top: 20, right: 160, bottom: 90, left: 80 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 0, max: 'auto' }}
            useMesh={true}
            enableGridX={true}
            animate={true}
            theme={{
                legends: {
                    text: {
                        fontSize: 12,
                        fill: '#000000',
                    },
                },
                axis: {
                    legend: {
                        text: {
                            fontSize: 20,
                            fill: 'black',
                        },
                    },
                    ticks: {
                        text: {
                            fontSize: 12,
                            fontWeight: 600,
                            fill: 'gray'
                        },
                    },
                },
                tooltip: {
                    container: {
                        background: '#333',
                        color: '#fff',
                        fontSize: '12px',
                        borderRadius: '4px',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.5)',
                    },
                },
            }}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemOpacity: 0.5,
                            },
                        },
                    ],
                },
            ]}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 25,
                legend: Enum[DataKey[0]],
                legendPosition: 'middle',
                legendOffset: 70,
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: Enum[DataKey[1]],
                legendPosition: 'middle',
                legendOffset: -60,
            }}
        />
    )



};
export default MachineChart;
