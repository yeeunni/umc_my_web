import '../App.css';
import { useParams } from 'react-router-dom';
import * as S from '../components/styles.jsx'; // styled-components 사용을 가정한 파일 불러오기
import useCustomFetch from '../hooks/useCustomFetch.js';

const MovieDetail = () => {
  const { movieId } = useParams();
  const { data: movie, isLoading, isError } = useCustomFetch(`/movie/${movieId}?language=ko-kr`);
  const { data: credit, isCreditLoading, isCreditError } = useCustomFetch(`/movie/${movieId}/credits?language=ko-kr`);

  if (isLoading || isCreditLoading) {
    return <div><h1 style={{ color: 'white' }}>로딩중입니다.....</h1></div>;
  }

  if (isError || isCreditError) {
    return <div><h1 style={{ color: 'white' }}>Error입니다 in fetching movie details.....</h1></div>;
  }

  // movie가 정의되어 있는지 확인
  if (!movie || !movie.data) {
    return <div><h1 style={{ color: 'white' }}>영화 정보를 찾을 수 없습니다.</h1></div>;
  }
  if (!credit || !credit.data) {
    return <div><h1 style={{ color: 'white' }}>credit 정보를 찾을 수 없습니다.</h1></div>;
  }

  console.log("movie",movie);
  const castMembers = credit.data.cast.slice(0, 10);
  return (
    <S.DetailContainer>
      <S.StyledImage
        src={`https://image.tmdb.org/t/p/w200${movie.data.backdrop_path}`} // 포스터 이미지
        alt={movie.data.title}
      />
      <h2 style={{ color: 'white' }}>{movie.data.id}</h2>
      <h2 style={{ color: 'white' }}>{movie.data.title}</h2>
      <h2 style={{ color: 'white' }}>{movie.data.overview}</h2>
      <h2 style={{ color: 'white' }}>{movie.data.runtime} 분</h2>
      <h3 style={{ color: 'white' }}>출연진:</h3>
<S.CastContainer>
  {castMembers.map(member => (
    <S.CastCard key={member.id}>
      <S.CastImage
        src={member.profile_path ? `https://image.tmdb.org/t/p/w200${member.profile_path}` : '/default-profile.png'}
        alt={member.name}
      />
      <S.CastName>{member.name}</S.CastName>
      <S.CastRole>{member.character}</S.CastRole>
    </S.CastCard>
  ))}
</S.CastContainer>
    </S.DetailContainer>
  );
}

export default MovieDetail;
