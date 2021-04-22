import { Collapse } from 'antd';
import styled from 'styled-components';
import {useContext} from 'react';

import AppContext from '../AppContext';

const { Panel } = Collapse;
const Container = styled.div`
    padding: 20px;
    width: 100%;
    max-width: 400px;
`;

const CurrentConditions = () => {
    const context = useContext(AppContext);
    const {currentData} = context;
    
    const getLocalTime = date => new Date(date * 1000).toLocaleTimeString();
    if (Object.keys(currentData).length ===  0) {
        return(<div>Loading...</div>)
    }
    return(
        <Container>    
            <Collapse defaultActiveKey={['1']} >
                <Panel header="Weather Data" key="1">
                    <div>Location: <b>{currentData.name}</b></div>
                    <div>Description: <b>{currentData.weather[0].description}</b></div>
                    <div>Temperature: <b>{currentData.main.temp}</b></div>
                    <div>High Temperature: <b>{currentData.main.temp_max}</b></div>
                    <div>Low Temperature: <b>{currentData.main.temp_min}</b></div>
                </Panel>
                <Panel header="More Data" key="2">
                    <div>Wind Speed: <b>{currentData.wind.speed}</b></div>
                    <div>Humidity: <b>{currentData.main.humidity}</b></div>
                    <div>Pressure: <b>{currentData.main.pressure}</b></div>
                    <div>Sunrise/Sunset Time: <b>{getLocalTime(currentData.sys.sunset)}/{getLocalTime(currentData.sys.sunrise)}</b></div>
                </Panel>
            </Collapse>
        </Container>
    )
}

export default CurrentConditions;