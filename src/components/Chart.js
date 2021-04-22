import {useRef, useLayoutEffect, useContext} from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import AppContext from '../AppContext';

am4core.useTheme(am4themes_animated);

const Chart = () => {
    const context = useContext(AppContext);
    const {weekData} = context;
    const chart = useRef(null);

    useLayoutEffect(() => {
        let x = am4core.create("chartdiv", am4charts.XYChart);
        x.paddingRight = 20;
        let data = [];
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        weekData.map((item, i) => {
            const day = new Date(item.dt * 1000).getDay();
            const description = item.weather[0].description;
            data.push({ 
                date: (item.dt * 1000), 
                name: "name" + i, 
                value: item.temp.day, 
                dayName: days[day],
                maxTemp: item.temp.max,
                minTemp: item.temp.min,
                description: description
            });
        });
        x.data = data;

        let dateAxis = x.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;

        let valueAxis = x.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = false;
        valueAxis.renderer.minWidth = 35;

        let series = x.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = "date";
        series.dataFields.valueY = "value";
        series.tooltipText = `Temperature: {valueY.value} \n 
            Day: {dayName} \n 
            Max Temperature: {maxTemp} \n 
            Min Temperature: {minTemp} \n 
            Description: {description}` ;
        x.cursor = new am4charts.XYCursor();

        chart.current = x;

        return () => {
        x.dispose();
        };
    }, [weekData]);
    return(
        <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
    )
}

export default Chart;