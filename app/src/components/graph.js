import React from 'react';

import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries, VerticalBarSeries } from 'react-vis';

const Graph = (props) => {
    return (
        <XYPlot margin={{ left: 100 }} height={400} width={800} xType="ordinal">
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis margin={4000} xType="ordinal" />
            <YAxis />
            <LineSeries data=
                {[
                    { x: "Monday", y: props.yOne },
                    { x: "Tuesday", y: props.yTwo },
                    { x: "Wedsday", y: props.yThree },
                    { x: "Thursday", y: props.yFour },
                    { x: "Friday", y: props.yFive },
                    { x: "Saturday", y: props.ySix },
                    { x: "Sunday", y: props.ySeven }
                ]} />
        </XYPlot >


    );
}
export default Graph;