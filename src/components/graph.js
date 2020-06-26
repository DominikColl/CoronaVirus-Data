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
                    { x: props.ttt, y: props.yOne },
                    { x: props.xTwo, y: props.yTwo },
                    { x: props.xThree, y: props.yThree },
                    { x: props.xFour, y: props.yFour },
                    { x:props.xFive, y: props.yFive },
                    { x: props.xSix, y: props.ySix },
                    { x:props.xSeven, y: props.ySeven }
                ]} />
        </XYPlot >


    );
}
export default Graph;