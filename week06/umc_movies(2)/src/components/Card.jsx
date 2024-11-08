import React from 'react';
import { Link } from 'react-router-dom'; // Link 추가
import * as S from './styles'; // styled-components 불러오기

const Card = ({ movie }) => {
  return (
    <S.Card>
      
      <Link to={`/movies/${movie.id}`}> {/* 경로를 영화 ID에 맞게 설정 */}
        <S.StyledHoverImage
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} // 영화 포스터 이미지
          alt={movie.title}
        />
      </Link>
      <h4>{movie.title}</h4> 
      <p>{movie.release_date}</p> 
    </S.Card>
  );
};

export default Card;
