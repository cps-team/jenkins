import { ResponsiveRadialBar } from '@nivo/radial-bar'
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from 'axios';
import CommonEnum from '../../Util/CommonEnum';

function MyResponsiveRadialBar() {
    const tabItem = useSelector(state => state);
    const Enum = new CommonEnum();
    let { id } = useParams();
    const [RadialBarChartData, setRadialBarChartData] = useState([]);

    useEffect(() => {
        axios.post('/Machine/GetMachineRaialBarChartData', {
            'companyCode': sessionStorage.getItem('companyCode'),
            'factoryCode': sessionStorage.getItem('factoryCode'),
            'blockCode': sessionStorage.getItem('blockCode'),
            'districtCode': sessionStorage.getItem('districtCode'),
            'machineCode': id,
            'itemType': tabItem
        }).then(res => {
            let resObjectList = [];
            let resDataKeys = Object.keys(res.data[0])
            for (let resDataKey of resDataKeys) {
                let resDataList = [];
                for (let dataRow of res.data) {
                    resDataList.push({
                        "x": Enum[resDataKey],
                        "y": dataRow[resDataKey]
                        // "y": 123
                    })
                }
                resObjectList.push({
                    'id': Enum[resDataKey],
                    'data': resDataList
                })
            }

            setRadialBarChartData(resObjectList);
        })
    }, [])
    return (
        <ResponsiveRadialBar
            data={RadialBarChartData}
            valueFormat=">-.2f"
            padding={0.4}
            cornerRadius={2}
            margin={{ top: 40, right: 200, bottom: 200, left: 100 }}
            radialAxisStart={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
            circularAxisOuter={{ tickSize: 5, tickPadding: 12, tickRotation: 0, angle: 360 }}
            legends={[
                {
                    anchor: 'top-right',
                    direction: 'column',
                    justify: false,
                    translateX: 20,
                    translateY: 0,
                    itemsSpacing: 6,
                    itemDirection: 'left-to-right',
                    itemWidth: 10,
                    itemHeight: 18,
                    itemTextColor: '#999',
                    symbolSize: 18,
                    symbolShape: 'square',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000'
                            }
                        }
                    ]
                }
            ]}
        />
    )
}
export default MyResponsiveRadialBar;