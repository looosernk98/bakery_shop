import React, {useRef, useState} from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import './index.css'
 
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
const FILTER_OPTIONS = [
	{ label: 'Hour', value: 'hour'},
	{ label: 'Day', value: 'day'},
	{ label: 'Week', value: 'week'},
	{ label: 'Month', value: 'month'},
];

const MultiSeriesChart = ({data1, data2, setFilterType}) => {	
	const [filterValue, setFilterValue] = useState('hour');
    
    let chartRef = useRef(CanvasJSChart);
	const [ref, setRef] = useState(chartRef)
	
	const toggleDataSeries = (e) => {
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else{
			e.dataSeries.visible = true;
		}
		ref.render();
	}

	const onChangeFilter = (e) => {
		setFilterValue(e.target.value)
		setFilterType(e.target.value);
	}
	
	
	const options = {
			theme: "light2",
			animationEnabled: true,
			zoomEnabled: true,
			title:{
				text: "Time Series charts of order data"
			},
			subtitles: [{
				text: "Click Legend to Hide or Unhide Data Series",
				verticalAlign: "bottom"
			}],
			axisX: {
				title: `Time Period (${filterValue})`
			},
			axisY: {
				title: "number of orders",
				titleFontColor: "#6D78AD",
				lineColor: "#6D78AD",
				labelFontColor: "#6D78AD",
				tickColor: "#6D78AD"
			},
			axisY2: {
				title: "Total value of orders in Rupees",
				titleFontColor: "#51CDA0",
				lineColor: "#51CDA0",
				labelFontColor: "#51CDA0",
				tickColor: "#51CDA0"
			},
			toolTip: {
				shared: true
			},
			legend: {
				cursor: "pointer",
				itemclick: toggleDataSeries,
				verticalAlign: "bottom"
			},
			data: [
				{
					type: "spline",
					name: "number of orders",
					showInLegend: true,
					dataPoints: data1,
				},
				{
					type: "spline",
					name: "Total value of orders in Rupees",
					axisYType: "secondary",
					showInLegend: true,
					dataPoints: data2
				}
		    ]}
		
		return (
		<>
            <div className='time-period-filter'>
				<label for="time-period">Choose format:</label>
				<select name="time-period" id="time-period" onChange={onChangeFilter}>
					{ FILTER_OPTIONS.map((item, index) => (
						<option key={`filter_${index}`} value={item.value} >{item.label}</option>
					))}
				</select>
            </div>
			<CanvasJSChart 
			   options = {options} 
			   onRef={ref => setRef(ref)}
			/>
		</>
		);
	}
			
export default MultiSeriesChart;

