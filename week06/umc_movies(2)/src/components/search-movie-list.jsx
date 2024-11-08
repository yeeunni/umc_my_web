import { useSearchParams } from 'react-router-dom';
import Card from './Card.jsx';
import * as S from './styles.jsx';
import useCustomFetch from '../hooks/useCustomFetch.js';
import CardSkeleton from './Skeleton/card-skeleton.jsx';
import CardListSkeleton from './Skeleton/card-list-skeleton.jsx';
const SearchMovieList = () => {
    const [searchParams,setSearchParams] = useSearchParams({
        mq:''
       });    
    const mq=searchParams.get('mq');
    const url=`/search/movie?query=${mq}&include_adult=false&language=ko-KR&page=1`;
    const {data:movies, isLoading, isError} = useCustomFetch(url);
    console.log('movies :',movies);
    if(isError){
      return(
        <div style={{textAlign:'center', marginTop:'30px'}}>
            <h1 style={{color: 'white'}}>에러 발생.</h1>

        </div>
    )

    }
    if(isLoading){
        return(
          <S.CardList>
           <CardListSkeleton number={20}/>
          </S.CardList>
          
        )
    }

    if(mq && movies.data?.results.length===0){
        return(
            <div style={{textAlign:'center', marginTop:'30px'}}>
                <h1 style={{color: 'white'}}>해당하는 ' {mq} ' 검색어에 대한 데이터가 없습니다.</h1>

            </div>
        )

    }
  return (
    <S.CardList> {/* styled-components로 스타일링된 CardList 사용 */}
            {movies.data?.results.map((movie) => (
            <Card key={movie.id} movie={movie} />
      ))}
    </S.CardList>
  )
}

export default SearchMovieList;