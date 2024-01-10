import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import './index.css'

const CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
const PieChart = ({ data }) => {

    const options = {
        theme: "light2",
        title: {
            text: "Top 5 Branches"
        },
        data: [{
            type: "pie",
            startAngle: 75,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}%",
            dataPoints: data
        }]
    }
    
    return (
		<>
			<CanvasJSChart  options = {options} />
		</>
		);
}

export default PieChart;