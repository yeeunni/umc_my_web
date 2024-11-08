// navbar.jsx
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import * as S from './styles';
import { useEffect, useState } from "react";
import styled from 'styled-components';
import axios from "axios";

const Navbar = () => {
    const navigate = useNavigate();
    
    const isLoggedIn = localStorage.getItem('accessToken');
    // 로그인 상태를 확인 (localStorage에서 token이 있으면 로그인된 것으로 간주)
    const [user, setUser] = useState(null);
    useEffect(() => {
        const fetchUserData = async () => {
            if (isLoggedIn) {
                try {
                    const response = await axios.get('http://localhost:3000/user/me', {
                        headers: {
                            Authorization: `Bearer ${isLoggedIn}`
                        }
                    });
                    const nickname = response.data.email.split('@')[0];
                    setUser({ ...response.data, nickname });
                    console.log('username: ',user.nickname);
                } catch (error) {
                    console.error('사용자 정보를 가져오는데 실패했습니다:', error);
                    // 토큰이 유효하지 않거나 오류가 발생하면 로그아웃 처리
                    handleLogout();
                }
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        console.log('Updated user:', user);
    }, [user]); // user 상태가 업데이트될 때마다 출력

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/login');  // 로그아웃 후 로그인 페이지로 이동
    };
    return (
        <S.navbar>
            <S.BrandLink to={'/'}>Lydia</S.BrandLink>
            <div>
            {!isLoggedIn ? (
                    <>
                        <S.LoginLink to={'/login'}>로그인</S.LoginLink>
                        <S.SignupBtn to={'/signup'}>회원가입</S.SignupBtn>
                    </>
                ) : (
                    <>
                    <UserEmail>{user ? `${user.nickname}님 반갑습니다. ` : ''}</UserEmail>
                   
                    <S.LoginLink onClick={handleLogout}>로그아웃</S.LoginLink></>
                )}
            </div>
        </S.navbar>
    );
};
const UserEmail = styled.span`
    color: #fff;
    font-size: 1rem;
`;
export default Navbar;
