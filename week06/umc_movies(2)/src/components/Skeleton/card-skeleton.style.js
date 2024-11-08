import styled,{keyframes} from 'styled-components'//animation in keyframes

const skeleton=keyframes`
0%{
    opacity: 1;
}
30%{
    opacity: 0.4;
}
50%{
    opacity: 0.2;
}
80%{
    opacity: 0.8;
}
100%{
    opacity: 1;
}

`
const Container=styled.div`
display: flex;
flex-direction: column;
justify-content:flex-start;
`
const CardMain=styled.div`
width: 140px;
height:210px;
background-color: lightgray;
border-radius: 10px;
overflow: hidden;
animation: ${skeleton} 3s 1s infinite linear alternate;

`
const TextWrapper=styled.div`
width:140px;
height:30px;
display: flex;
flex-direction: column;
margin-top: 5px;
border-radius: 5px;

`
const TitleBox=styled.div`
background-color: lightgray;
height:14px;
border-radius: 5px;
animation: ${skeleton} 3s 1s infinite linear alternate;

`
const DescriptionBox=styled.div`
margin-top: 5px;
animation: ${skeleton} 3s 1s infinite linear alternate;
background-color: lightgray;
height:10px;
border-radius: 5px;
`
export {Container,CardMain,TextWrapper,TitleBox,DescriptionBox}