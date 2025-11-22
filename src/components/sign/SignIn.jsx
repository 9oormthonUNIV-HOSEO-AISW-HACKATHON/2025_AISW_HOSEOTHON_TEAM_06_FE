import React from 'react';
import styled from 'styled-components';

const Temp = styled.div`
    width: 50px;
    height: 50px;
    background-color: coral;
`;

/* ===== 로그인 페이지 스타일 ===== */
const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f7f7f7;
`;

const Card = styled.div`
    width: 380px;
    padding: 40px 32px;
    border-radius: 16px;
    background: white;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.12);
`;

const Title = styled.h2`
    text-align: center;
    font-size: 24px;
    font-weight: 800;
    margin-bottom: 24px;
`;

const Input = styled.input`
    width: 100%;
    padding: 12px 14px;
    border-radius: 8px;
    border: 1px solid #ccc;
    margin-bottom: 16px;
    font-size: 15px;
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

const SignIn = () => {
    return (
        <Container>
            <Card>
                <Title>로그인</Title>

                <Input type="email" placeholder="이메일" />
                <Input type="password" placeholder="비밀번호" />

                <Button>로그인</Button>

                <SubText>
                    아직 회원이 아니신가요? <span>회원가입</span>
                </SubText>

                {/* 기존 temp 박스 */}
                <Temp />
            </Card>
        </Container>
    );
};

export default SignIn;
