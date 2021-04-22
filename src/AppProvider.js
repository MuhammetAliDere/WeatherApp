import {useState, useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AppContext from "./AppContext";

const AppProvider = (props) => {
    const apiId = '8d3832d78eb661d236124b47c9db3efa';
    const apiUrls = {
        week: 'https://api.openweathermap.org/data/2.5/onecall?',
        day: 'http://api.openweathermap.org/data/2.5/weather?'
    };
    const baseParams = {
        lat: 40.7143,
        lon: -74.006,
        appid: apiId
    };

    const [weekData, setWeekData] = useState([]);
    const [currentData, setCurrentData] = useState([]);
    const [search, setSearch] = useState('');
    const [params, setParams] = useState(baseParams);

    const objectToUrl = params => 
        Object.keys(params).map(key => key + '=' + params[key]).join('&');

    const fetchData = () => {
        const weekFetchUrl = `${apiUrls.week}${objectToUrl(params)}`;
        const dayFetchUrl = `${apiUrls.day}${objectToUrl(params)}`;
        fetch(weekFetchUrl)
            .then(response => response.json())
            .then(data => setWeekData(data.daily));
        fetch(dayFetchUrl)
            .then(response => response.json())
            .then(data => setCurrentData(data));
    }

    const getLocationData = () => {
        const tempParams = {
            q: search,
            appid: apiId
        };
        fetch(`${apiUrls.day}${objectToUrl(tempParams)}`)
            .then(response => response.json())
            .then(data => {
                if(data.cod === 200){
                    console.log('getLocationData data: ', data);
                    setParams({
                        lat: data.coord.lat,
                        lon: data.coord.lon,
                        appid: apiId
                    });
                }
                else {
                    toast('City Not Found');
                }
            });
    }

    useEffect(() => {
        fetchData();
    },[params]);

    useEffect(() => {
        if (search !== '') {
            getLocationData();
        } else {
            setParams(baseParams)
        }
    },[search]);

    return(
        <AppContext.Provider value={{
            search,
            weekData,
            currentData,
            setSearch: searchText => setSearch(searchText)
        }}>
            {props.children}
            <ToastContainer />
        </AppContext.Provider>
    )
}

export default AppProvider;