import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
    const nav = useNavigate();

    return (
        <Page>
            <Container>
                <HeaderGroup>
                    <Title>퀴즈 선택</Title>
                    <SubTitle>풀고 싶은 퀴즈 카테고리를 선택해보세요!</SubTitle>
                </HeaderGroup>

                <QuizList>
                    <QuizItem onClick={() => nav("/quiz/word")}>
                        <IconWrapper>📖</IconWrapper>
                        <ItemContent>
                            <ItemTitle>단어별 퀴즈</ItemTitle>
                            <ItemDesc>MZ세대 신조어와 개발 용어,<br className="desktop-br"/> 얼마나 알고 계신가요?</ItemDesc>
                        </ItemContent>
                    </QuizItem>

                    <QuizItem onClick={() => nav("/quiz/tech")}>
                        <IconWrapper>💻</IconWrapper>
                        <ItemContent>
                            <ItemTitle>기술별 퀴즈</ItemTitle>
                            <ItemDesc>React, Spring 등<br className="desktop-br"/> 개발 지식을 테스트해보세요!</ItemDesc>
                        </ItemContent>
                    </QuizItem>

                    <QuizItem onClick={() => nav("/quiz/situation")}>
                        <IconWrapper>🧩</IconWrapper>
                        <ItemContent>
                            <ItemTitle>상황별 퀴즈</ItemTitle>
                            <ItemDesc>개발 중 마주치는 에러 상황,<br className="desktop-br"/> 어떻게 해결해야 할까요?</ItemDesc>
                        </ItemContent>
                    </QuizItem>
                </QuizList>
            </Container>
        </Page>
    );
};

export default Quiz;

// -------------------- Styled Components --------------------

const Page = styled.div`
    min-height: calc(100vh - 70px);
    background-color: #f3f4f6;
    display: flex;
    flex-direction: column;
`;

const Container = styled.main`
    max-width: 1000px;
    margin: 0 auto;
    width: 100%;
    padding: 60px 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;

    @media (max-width: 768px) {
        padding: 40px 20px;
        justify-content: flex-start;
    }

    @media (max-width: 480px) {
        padding: 24px 16px; /* 전체 컨테이너 패딩 축소 */
    }
`;

const HeaderGroup = styled.div`
    text-align: center;
    margin-bottom: 50px;

    @media (max-width: 480px) {
        margin-bottom: 20px;
        text-align: left;
        padding-left: 4px;
    }
`;

const Title = styled.h2`
    font-size: 32px;
    font-weight: 900;
    color: #1f2937;
    margin-bottom: 12px;

    @media (max-width: 768px) {
        font-size: 26px;
    }

    @media (max-width: 480px) {
        font-size: 22px; /* 폰트 사이즈 축소 */
        margin-bottom: 6px;
    }
`;

const SubTitle = styled.p`
    font-size: 16px;
    color: #6b7280;

    @media (max-width: 480px) {
        font-size: 13px; /* 폰트 사이즈 축소 */
        line-height: 1.4;
    }
`;

const QuizList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
    width: 100%;

    /* 모바일: 세로 리스트, 간격 축소 */
    @media (max-width: 600px) {
        display: flex;
        flex-direction: column;
        gap: 10px; /* 카드 간격 12px -> 10px */
    }
`;

const QuizItem = styled.div`
    width: 80%;
    background: white;
    padding: 40px 30px;
    border-radius: 24px;
    border: 1px solid #e5e7eb;

    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);

    &:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        border-color: rgb(79, 70, 229);
    }

    &:active {
        transform: translateY(-2px);
    }

    /* 모바일 최적화: 더 작고 컴팩트하게 */
    @media (max-width: 600px) {
        flex-direction: row;
        align-items: center;
        text-align: left;

        /* 패딩 대폭 축소 (20px -> 16px) */
        padding: 16px;
        border-radius: 16px;

        &:hover {
            transform: none;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        &:active {
            background-color: #f9fafb;
            transform: scale(0.98);
        }
    }
`;

const IconWrapper = styled.div`
    width: 72px;
    height: 72px;
    background-color: #f3f4f6;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    margin-bottom: 24px;
    transition: background-color 0.3s;

    ${QuizItem}:hover & {
        background-color: #e0e7ff;
    }

    /* 모바일: 아이콘 크기 더 축소 (56px -> 48px) */
    @media (max-width: 600px) {
        width: 48px;
        height: 48px;
        font-size: 20px; /* 이모지 크기 축소 */
        margin-bottom: 0;
        margin-right: 14px; /* 간격 축소 */
        flex-shrink: 0;
    }
`;

const ItemContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;

    @media (max-width: 600px) {
        gap: 4px;
        flex: 1;
    }
`;

const ItemTitle = styled.h3`
    font-size: 20px;
    font-weight: 800;
    color: #111827;

    /* 모바일: 제목 크기 축소 */
    @media (max-width: 600px) {
        font-size: 16px;
    }
`;

const ItemDesc = styled.p`
    font-size: 15px;
    color: #6b7280;
    line-height: 1.5;
    word-break: keep-all;

    .desktop-br {
        display: block;
    }

    /* 모바일: 설명 글씨 크기 축소 */
    @media (max-width: 600px) {
        font-size: 12px;

        .desktop-br {
            display: none;
        }
    }
`;