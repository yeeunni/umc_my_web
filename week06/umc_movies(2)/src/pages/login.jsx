import { useState } from "react";
import useForm from "../hooks/use-form";
import { validateLogin } from "../utils/validate";
import styled from 'styled-components';
import axios from "axios";
import { Form } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const api = axios.create({
        baseURL: 'http://localhost:3000',
    });    
    const navigate = useNavigate();
const initialValues = { email: '', password: '' };
const loginMem = useForm(
    initialValues, validateLogin
)

const handlePressLogin = async ()=>{
    try{
        const response = await api.post('/auth/login',{
            email: loginMem.values.email,
            password: loginMem.values.password,
            
        });
        console.log('로그인 성공: ',response.data);
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        navigate('/');
    } catch(error){
        if (error.response) {
            // 서버에서 반환한 에러
            console.error('로그인 실패:', error.response.data.message);
        } else if (error.request) {
            // 요청이 보내졌으나 응답이 없음
            console.error('서버 응답이 없습니다.');
        } else {
            // 요청 설정 중 에러 발생
            console.error('오류 발생:', error.message);
        }
    }
   }
   const onSubmit = (e) => {
       e.preventDefault();
       console.log("onSubmit called");
    
        handlePressLogin();

};
//console.log(loginMem.values,loginMem.errors)
return(
    <Container>
        <h2>로그인</h2>
        <Form onSubmit={onSubmit}>
        <Input $error={loginMem.touched.email && loginMem.errors.email} type={'email'} placeholder={'이메일을 입력해주세요.'} {...loginMem.getTextInputProps('email')}
        />
        {loginMem.touched.email && loginMem.errors.email && <ErrorText>{loginMem.errors.email}</ErrorText>}
         <Input type={'password'}  autoComplete="username" placeholder={'비밀번호를 입력해주세요.'} {...loginMem.getTextInputProps('password')}
        />
          {loginMem.touched.password && loginMem.errors.password && <ErrorText>{loginMem.errors.password}</ErrorText>}

          <Submit type="submit" >제출</Submit>
          </Form>
    </Container>
);
};
const Submit = styled.button`
    width: 100px;
    padding: 10px;
    background-color: hotpink;
    color: white;
    display: flex;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    align-items: center;
    justify-content: center;
    &:hover {
        background-color: pink;
    }
`;
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const Input = styled.input`
    margin: 10px 0;
    padding: 8px;
    width: 300px;
    border: 1px solid #ccc;
    border-radius: 4px;
    display:flex;
    border: ${props => props.$error ? '4px solid red' : '1px solid #ccc'};
   
    &:focus {
        border-color: #007bff;
    }
`
const ErrorText=styled.h1`
    color:red;
    font-size: 12px;
`
export default Login;
