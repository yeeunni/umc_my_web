import { useState } from "react";
import useForm from "../hooks/use-form";
import { validateLogin } from "../utils/validate";
import styled from 'styled-components';

const Login = () => {
const initialValues = { email: '', password: '' };
const loginMem = useForm(
    initialValues, validateLogin
)
const handlePress=()=>{
    console.log(signMem.values.email, signMem.values.password)
}
//console.log(loginMem.values,loginMem.errors)
return(
    <Container>
        <Input error={loginMem.touched.email && loginMem.errors.email} type={'email'} placeholder={'이메일을 입력해주세요.'} {...loginMem.getTextInputProps('email')}
        />
        {loginMem.touched.email && loginMem.errors.email && <ErrorText>{loginMem.errors.email}</ErrorText>}
         <Input type={'password'} placeholder={'비밀번호를 입력해주세요.'} {...loginMem.getTextInputProps('password')}
        />
          {loginMem.touched.password && loginMem.errors.password && <ErrorText>{loginMem.errors.password}</ErrorText>}

          <button onClick={handlePress}>제출</button>
    </Container>
);
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const Input=styled.input`
    margin: 10px 0;
    padding: 8px;
    width: 300px;
    border: 1px solid #ccc;
    border-radius: 4px;

    border: ${props=> props.error? '4px solid red' : '1px solid #ccc'};
    
    &:focus{
        border-color: #007bff;
    }
`
const ErrorText=styled.h1`
    color:red;
    font-size: 12px;
`
export default Login;
