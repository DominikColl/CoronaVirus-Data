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
                    { x: '2014', y: 75 },
                    { x: '2015', y: 60 },
                    { x: '2016', y: 80 },
                    { x: '2017', y: 90 }
                ]} />
        </XYPlot >


    );
}
export default Graph;