import '../App.css';
import axios from "axios";
import { useState, useEffect } from "react";
import Card from '../components/Card.jsx'; // Card 컴포넌트 불러오기
import * as S from '../components/styles.jsx'; // styled-components 사용을 가정한 파일 불러오기
import {axiosInstance} from '../apis/axios-instance.js';
import useCustomFetch from '../hooks/useCustomFetch.js';
const HomePage = () => {

  const {data:movies,isLoading,isError} = useCustomFetch(`/movie/popular?language=ko-kr&page=1`)

  if(isLoading){
    return <div>
      <h1 style={{color:'white'}}>로딩중입니다.....</h1>
      </div>
  }
  if(isError){
    return <div>
       <h1 style={{color:'white'}}>Error입니다.....</h1>
      </div>
  }
  //console.log(data);
  return (
    <S.CardList> {/* styled-components로 스타일링된 CardList 사용 */}
      {movies.data?.results.map((movie) => (
        <Card key={movie.id} movie={movie} />
      ))}
    </S.CardList>
  );
}

export default HomePage;
