import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";


const Page = styled.div`
    min-height: 100%;
    background: #f2f2f2;
    display: flex;
    flex-direction: column;
`;

const Header = styled.header`
    background: white;
    border-bottom: 1px solid #ddd;
    padding: 12px 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const LogoImg = styled.img`
    width: 36px;
    height: 36px;
    object-fit: contain;
    cursor: pointer;
`;

const ScoreBox = styled.div`
    background: #fff;
    padding: 8px 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-weight: 700;
`;

const UserBox = styled.div`
    background: #fff;
    padding: 8px 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-weight: 700;
`;

const Container = styled.main`
    max-width: 900px;
    margin: 30px auto;
    width: 100%;
    padding: 20px;
`;

const Title = styled.h2`
    font-size: 26px;
    font-weight: 900;
    margin-bottom: 24px;
`;

const QuizGrid = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;   /* 가운데 정렬 */
    gap: 26px;
    margin-top: 20px;
    width: 100%;
`;

const QuizBox = styled.div`
    width: 80%;              /* 전체 폭 중 80% */
    max-width: 480px;        /* 너무 넓지 않게 제한 */
    background: white;
    padding: 26px 0;
    border-radius: 14px;
    border: 2px solid #cfcfcf;
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
        border-color: #5b4bff;
        box-shadow: 0 0 12px rgba(90, 72, 255, 0.4);
    }
`;

const Footer = styled.footer`
    background: #ddd;
    text-align: center;
    padding: 22px;
    margin-top: auto;
    font-size: 14px;
    color: #333;
`;

const Quiz = () => {
    const nav = useNavigate();

    return (
        <Page>

            {/* CONTENT */}
            <Container>
                <Title>퀴즈 선택</Title>

                <QuizGrid>
                    <QuizBox onClick={() => nav("/quiz/word")}>단어별 퀴즈</QuizBox>
                    <QuizBox onClick={() => nav("/quiz/tech")}>기술별 퀴즈</QuizBox>
                    <QuizBox onClick={() => nav("/quiz/situation")}>상황별 퀴즈</QuizBox>
                </QuizGrid>
            </Container>
        </Page>
    );
};

export default Quiz;
