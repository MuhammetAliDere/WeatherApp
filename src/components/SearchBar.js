import { useState, useContext } from 'react';
import styled from 'styled-components';

import AppContext from '../AppContext';

const Container = styled.div`
    padding: 20px;
    display: flex;
    & .header{
        flex: 1;
        text-align: center;
        font-size: 20px;
    }
`;

const SearchBar = () => {
    const context = useContext(AppContext);
    const {setSearch, currentData} = context;

    const [searchText, setSearchText] = useState();

    const handleChange = (event) => {
        setSearchText(event.target.value);
    };
    const onClick = () => {
        setSearch(searchText);
    }
    return(
        <Container>
            <div>
                <div>Search city by zip code</div>
                <input onChange={handleChange} />
                <button onClick={onClick}>Search</button>
            </div>
            <div className="header">
                <h1>{currentData.name}</h1>
            </div>
        </Container>
    )
}

export default SearchBar;