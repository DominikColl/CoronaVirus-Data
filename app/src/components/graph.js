import React from 'react';
import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries, VerticalBarSeries } from 'react-vis';

const Graph = (props) => {
    let data = { x: 2016, y: 8 }
    return (
        <XYPlot margin={100} width={500} height={500}>
            <VerticalGridLines />
            <XAxis />
            <YAxis />
            <VerticalBarSeries data={[{ x: 1, y: 10 }, { x: 2, y: 5 }, { x: 3, y: 15 }]} />
        </XYPlot>
    );
}
export default Graph;