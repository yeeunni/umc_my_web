const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

//{email :'',password:''} 형식으로 values인자에 들어옴
function validateUser(values){
    const errors={
        email:'',
        password:'',
        passwordcheck:'',
    }

    if(emailPattern.test(values.email)==false){
        errors.email = '올바른 이메일 형식이 아닙니다. 다시 확인해주세요.'
    }
    if (typeof values.password !== 'string' || values.password.trim() === '') {
        errors.password = '비밀번호는 필수 입력 사항입니다.';
    } else if (values.password.length < 8 || values.password.length > 16) {
        errors.password = '비밀번호는 8자 초과 16자 이하로 넣어주세요.';
    }
    // if(values.password.length<8 || values.password.length>16){
    //     errors.password = '비밀번호는 8자 초과 16자 이하로 넣어주세요.'
    // }
    if(values.password != values.passwordcheck || values.password.trim()===''){
        errors.passwordcheck = '비밀번호가 일치하지 않습니다.'
    }

    return errors;
}

function validateLogin(values){
    return validateUser(values);
}
function validateSignup(values){
    return validateUser(values);
}
export {validateLogin}
export {validateSignup}