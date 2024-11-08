/*import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import useCustomFetch from '../hooks/useCustomFetch.js';
import SearchMovieList from '../components/search-movie-list.jsx';

const Search = () => {
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();
    const onChangeSearchValue=(event)=>{
        setSearchValue(event.target.value)
    }
   // console.log('검색 결과 값: ',searchValue);
   const [searchParams,setSearchParams] = useSearchParams({
    mq:''
   });    
const mq=searchParams.get('mq');
   const handleSearchMovie = ()=>{
        if(mq === searchValue) return;
        navigate(`/search?mq=${searchValue}`);
        
   }    
   const handleSearchMovieWithKeyboard=(e)=>{
    if (e.key === 'Enter'){
        handleSearchMovie();
    }
   }


   return (
    <>
        <SearchContainer>
            <input value={searchValue} onChange={onChangeSearchValue} placeholder="영화 제목을 입력해주세요 "
            onKeyDown={handleSearchMovieWithKeyboard}
            />
            <button onClick={handleSearchMovie}>검색</button>

        </SearchContainer>
        <SearchMovieList/>
        
     </>
    );
};
const SearchContainer = styled.div`
    display: flex;
    justify-content: center;
    input{
        flex:0.6;
        padding: 15px;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
    
        border: 1px solid rgb(220,220,220);
    }
    button{
        width: 80px;
        background-color: hotpink;
        color:white;
        cursor: pointer;
        border: none;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        &:hover {
        background-color: pink;
    }
    }
`
export default Search;
*/
import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { debounce } from 'lodash';
import SearchMovieList from '../components/search-movie-list.jsx';

const Search = () => {
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams({
        mq: ''
    });
    const mq = searchParams.get('mq');

    const updateSearchValue = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSearchMovie = useCallback(
        debounce((value) => {
            if (mq !== value) {
                navigate(`/search?mq=${value}`);
            }
        }, 500),
        [mq, navigate]
    );

    useEffect(() => {
        if (searchValue) {
            handleSearchMovie(searchValue);
        }
    }, [searchValue, handleSearchMovie]);

    return (
        <>
            <SearchContainer>
                <input 
                    value={searchValue}
                    onChange={updateSearchValue}
                    placeholder="영화 제목을 입력해주세요"
                />
            </SearchContainer>
            <SearchMovieList />
        </>
    );
};

const SearchContainer = styled.div`
    display: flex;
    justify-content: center;
    input {
        flex: 0.6;
        padding: 15px;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        border: 1px solid rgb(220,220,220);
    }
`;

export default Search;
