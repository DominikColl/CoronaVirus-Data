import React from 'react';

import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries, VerticalBarSeries } from 'react-vis';

const Graph = (props) => {
    return (
        <XYPlot height={400} width={800} xType="ordinal">
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis margin={4000} xType="ordinal" />
            <YAxis />
            <LineSeries data=
                {[
                    { x: '2014', y: props.yOne },
                    { x: '2015', y: props.yTwo },
                    { x: '2016', y: props.yThree },
                    { x: '2017', y: props.yFour }
                ]} />
        </XYPlot >


    );
}
export default Graph;