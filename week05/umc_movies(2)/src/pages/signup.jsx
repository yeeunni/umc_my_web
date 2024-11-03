import { useState } from "react";
import useForm from "../hooks/use-form";
import { validateLogin, validateSignup } from "../utils/validate";
import styled from 'styled-components';

const Signup = () => {
    const initialValues = { email: '', password: '',passwordcheck:'', };
    const signMem = useForm(
        initialValues, validateSignup
    )
    const handlePress=()=>{
        console.log(signMem.values.email, signMem.values.password)
    }
   //console.log(signMem.values,signMem.errors)
    return(
        <Container>
            <Input error={signMem.touched.email && signMem.errors.email} type={'email'} placeholder={'이메일을 입력해주세요.'} {...signMem.getTextInputProps('email')}
            />
            {signMem.touched.email && signMem.errors.email && <ErrorText>{signMem.errors.email}</ErrorText>}

             <Input error={signMem.touched.password && signMem.errors.password} type={'password'} placeholder={'비밀번호를 입력해주세요.'} {...signMem.getTextInputProps('password')}
            />
             {signMem.touched.password && signMem.errors.password && <ErrorText>{signMem.errors.password}</ErrorText>}
            
            <Input error={signMem.touched.passwordcheck && signMem.errors.passwordcheck} type={'email'} placeholder={'비밀번호를 확인해주세요.'} {...signMem.getTextInputProps('passwordcheck')}
            />
            {signMem.touched.passwordcheck && signMem.errors.passwordcheck && <ErrorText>{signMem.errors.passwordcheck}</ErrorText>}

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
export default Signup;
