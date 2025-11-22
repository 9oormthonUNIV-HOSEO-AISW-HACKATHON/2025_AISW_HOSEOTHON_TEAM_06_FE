import React, {useState} from 'react';
import styled from 'styled-components';
import api from '../../api/axios.jsx';
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState("");

    const handleIdChange = (e) => {
        setUserId(e.target.value)
        setError('')
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
        setError('')
    }

    const SignInButton = async () => {
        if (!userId  || !password || userId === '' || password === '') {
            setError("아이디와 비밀번호를 모두 입력해주세요.");
            return;
        }
    // TODO : 주소 수정, 데이터 수정, response 어떻게 올지 받고 토큰 저장하기
    // TODO : 실패하는 경우 추가
    //     try{
    //         const res = await api.post('/signUpOk', {userId: userId, password: password})
    //     }
    //     catch(error){
    //     }
    }

    return (
        <Container>
            <Card>
                <Title>로그인</Title>

                <Input onChange={handleIdChange} value={userId} placeholder="이메일" />
                <Input onChange={handlePasswordChange} value={password} type="password" placeholder="비밀번호" />

                <ErrorText $visible={!!error}>
                    {error || " "}
                </ErrorText>

                <Button onClick={SignInButton}>로그인</Button>

                <SubText>
                    아직 회원이 아니신가요?
                    <span onClick={() => navigate('/signUp')}> 회원가입</span>
                </SubText>

            </Card>
        </Container>
    );
};

/* ===== 로그인 페이지 스타일 ===== */
const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f7f7f7;
`;

const ErrorText = styled.p`
    color: #ff4b4b;
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 12px;
    min-height: 20px;
    visibility: ${(props) => (props.$visible ? 'visible' : 'hidden')};
`;

const Card = styled.div`
    width: 400px;
    padding: 40px 32px;
    border-radius: 16px;
    background: white;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    display: flex;
    flex-direction: column;
`;

const Title = styled.h2`
    text-align: center;
    font-size: 24px;
    font-weight: 800;
    margin-bottom: 24px;
`;

const Input = styled.input`
    padding: 12px 14px;
    border-radius: 8px;
    border: 1px solid #ccc;
    margin-bottom: 16px;
    font-size: 15px;

    &:focus {
        outline: none;
        border-color: #6a5acd;
    }
`;

const Button = styled.button`
    width: 100%;
    padding: 14px 0;
    background-color: #4F46E5;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    margin-top: 8px;

    &:hover {
        background-color: #4338CA;
    }
`;

const SubText = styled.p`
    margin-top: 14px;
    text-align: center;
    font-size: 14px;
    color: #555;

    span {
        color: #4F46E5;
        font-weight: 600;
        cursor: pointer;
    }
`;

export default SignIn;
