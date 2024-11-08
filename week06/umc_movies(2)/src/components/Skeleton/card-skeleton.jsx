import React from 'react'
import * as S from './card-skeleton.style.js'

const CardSkeleton = () => {
  return (
    <div>
        <S.Container>
          <S.CardMain/>
          <S.TextWrapper>
            <S.TitleBox/>
            <S.DescriptionBox/>
          </S.TextWrapper>
        </S.Container>
    </div>
  )
}

export default CardSkeleton