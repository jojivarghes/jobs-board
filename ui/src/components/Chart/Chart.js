import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

const chart = (props) => {
    /*const data = [
        {
          name: 'Feb 2019', uv: 4000, pv: 2400, amt: 2400,
        },
        {
          name: 'Jan 2019', uv: 3000, pv: 1398, amt: 2210,
        },
        {
          name: 'Dec 2018', uv: 2000, pv: 9800, amt: 2290,
        },
        {
          name: 'Nov 2018', uv: 2780, pv: 3908, amt: 2000,
        },
        {
          name: 'Oct 2018', uv: 1890, pv: 4800, amt: 2181,
        },
        {
          name: 'Sep 2018', uv: 2390, pv: 3800, amt: 2500,
        }
      ];*/
    const data = props.jobsChartData;
    data.map(element => {
      element.Success = element.Success ? element.Success : 0;
      element.Failed = element.Failed ? element.Failed : 0;
      element.Running = element.Running ? element.Running : 0;
    });
    return (
        <LineChart width={1000} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="Success" stroke="green" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="Failed" stroke="red" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="Running" stroke="blue" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            {/*<Line type="monotone" dataKey="pv" stroke="red" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />*/}
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
        </LineChart>
    );
};

export default chart;