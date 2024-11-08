import { useState } from "react";
import useForm from "../hooks/use-form";
import { validateLogin, validateSignup } from "../utils/validate";
import styled from 'styled-components';
import { Form, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
    const api = axios.create({
        baseURL: 'http://localhost:3000',
    });
    const navigate = useNavigate();
    const initialValues = { email: '', password: '',passwordcheck:'', };
    const signMem = useForm(
        initialValues, validateSignup
    )
    const handlePress=()=>{
        console.log(signMem.values.email, signMem.values.password)
    }
   //console.log(signMem.values,signMem.errors)
   const onSubmit = async ()=>{
    try{
        const response = await api.post('/auth/register',{
            email: signMem.values.email,
            password: signMem.values.password,
            passwordCheck: signMem.values.passwordcheck
        });
        console.log('회원가입 성공: ',response.data);
        navigate('/login');
    } catch(error){
        if (error.response) {
            // 서버에서 반환한 에러
            console.error('회원가입 실패:', error.response.data.message);
        } else if (error.request) {
            // 요청이 보내졌으나 응답이 없음
            console.error('서버 응답이 없습니다.');
        } else {
            // 요청 설정 중 에러 발생
            console.error('오류 발생:', error.message);
        }
    }
   }
    return(
        <Container>
            <h3>회원가입</h3>
            <Form onSubmit={onSubmit}>
            <Input error={signMem.touched.email && signMem.errors.email} type={'email'} placeholder={'이메일을 입력해주세요.'} {...signMem.getTextInputProps('email')}
            />
            {signMem.touched.email && signMem.errors.email && <ErrorText>{signMem.errors.email}</ErrorText>}

             <Input error={signMem.touched.password && signMem.errors.password} type={'password'} placeholder={'비밀번호를 입력해주세요.'} {...signMem.getTextInputProps('password')}
            />
             {signMem.touched.password && signMem.errors.password && <ErrorText>{signMem.errors.password}</ErrorText>}
            
            <Input error={signMem.touched.passwordcheck && signMem.errors.passwordcheck} type={'password'} placeholder={'비밀번호를 확인해주세요.'} {...signMem.getTextInputProps('passwordcheck')}
            />
            {signMem.touched.passwordcheck && signMem.errors.passwordcheck && <ErrorText>{signMem.errors.passwordcheck}</ErrorText>}

            <Submit type='submit'>제출</Submit>
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
export default Signup;
