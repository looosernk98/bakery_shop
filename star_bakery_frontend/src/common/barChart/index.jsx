import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const BarChart = ({ data, title='barchart', xAxisTitle, yAxisTitle }) => {
	const options = {
		theme: "light2",
		title: {
			text: title
		},
		animationEnabled: true,
		interactivityEnabled: true,
		width: 600,
		axisX: {
			title: xAxisTitle,
			// reversed: true,
		},
		axisY: {
			title: yAxisTitle,
			// includeZero: true,
		},
		data: [
		{
			// Change type to "doughnut", "line", "splineArea", etc.
			type: "column",
			dataPoints: data
		}
		]
	}
	return (
		<>
		  <CanvasJSChart options = {options}/>
		</>
		);
}

export default BarChart;