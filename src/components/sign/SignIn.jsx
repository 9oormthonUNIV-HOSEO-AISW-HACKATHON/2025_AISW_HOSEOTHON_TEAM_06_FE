import React, {useState} from 'react';
import styled from 'styled-components';
import api from '../../api/axios.jsx';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';

const SignIn = () => {
    const { login } = useAuth();

    const navigate = useNavigate("");
    const [userId, setUserId] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("");

    const handleIdChange = (e) => {
        setUserId(e.target.value)
        setError('')
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
        setError('')
    }

    const handleSignIn = async () => {
        if (!userId.trim() || !password.trim()) {
            setError("아이디와 비밀번호를 모두 입력해주세요.");
            return;
        }

        try {
            const loginResponse = await api.post('/api/auth/login', {
                userId: userId,
                userPass: password
            });

            if (loginResponse.status === 200) {
                const token = loginResponse.data;

                if (token) {
                    login(token);

                    try {
                        const myPageResponse = await api.get('/api/auth/myPage');

                        const userData = myPageResponse.data;

                        const displayName = userData.userNickname || userData.userName || userId;

                        localStorage.setItem('nickname', displayName);

                        console.log("환영합니다:", displayName);

                    } catch (infoError) {
                        console.error("내 정보 가져오기 실패:", infoError);
                        // 정보 가져오기에 실패해도 로그인은 유지하되, 이름은 아이디로 대체
                        localStorage.setItem('nickname', userId);
                    }

                    // 4. 메인으로 이동
                    navigate('/');
                } else {
                    setError("서버로부터 토큰을 받아오지 못했습니다.");
                }
            }
        } catch (err) {
            console.error(err);
            const msg = err.response?.data?.message || "로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.";
            setError(msg);
        }
    }

    return (
        <Container>
            <Card>
                <Title>로그인</Title>

                <Input onChange={handleIdChange} value={userId} placeholder="아이디" />
                <Input onChange={handlePasswordChange} value={password} type="password" placeholder="비밀번호" />

                <ErrorText $visible={!!error}>
                    {error || " "}
                </ErrorText>

                <Button onClick={handleSignIn}>로그인</Button>

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
    min-height: 100%;
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
