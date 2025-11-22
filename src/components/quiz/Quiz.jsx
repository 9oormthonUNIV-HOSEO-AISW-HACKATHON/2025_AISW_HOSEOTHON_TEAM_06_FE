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
        padding: 30px 16px;
    }
`;

const HeaderGroup = styled.div`
    text-align: center;
    margin-bottom: 50px;

    @media (max-width: 480px) {
        margin-bottom: 24px;
        text-align: left; /* 모바일에서는 헤더를 왼쪽 정렬하여 리스트와 통일감 */
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
        font-size: 24px;
        margin-bottom: 8px;
    }
`;

const SubTitle = styled.p`
    font-size: 16px;
    color: #6b7280;

    @media (max-width: 480px) {
        font-size: 14px;
        line-height: 1.4;
    }
`;

const QuizList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;

    /* 모바일: 그리드 대신 세로 리스트로 변경 */
    @media (max-width: 600px) {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
`;

const QuizItem = styled.div`
    background: white;
    padding: 40px 30px;
    border-radius: 24px;
    border: 1px solid #e5e7eb;

    /* PC 기본: 세로 정렬 (Column) */
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

    /* 모바일: 가로 정렬 (Row) - 리스트 형태로 변경 */
    @media (max-width: 600px) {
        flex-direction: row; /* 가로 배치 */
        align-items: center; /* 세로 중앙 정렬 */
        text-align: left;    /* 텍스트 왼쪽 정렬 */
        padding: 20px;       /* 패딩 축소 */
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
    margin-bottom: 24px; /* PC: 아래 여백 */
    transition: background-color 0.3s;

    ${QuizItem}:hover & {
        background-color: #e0e7ff;
    }

    /* 모바일: 아이콘 배치 변경 */
    @media (max-width: 600px) {
        width: 56px;
        height: 56px;
        font-size: 24px;
        margin-bottom: 0;      /* 아래 여백 제거 */
        margin-right: 16px;    /* 오른쪽 여백 추가 */
        flex-shrink: 0;        /* 아이콘 크기 고정 */
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

    @media (max-width: 600px) {
        font-size: 17px;
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

    @media (max-width: 600px) {
        font-size: 13px;

        /* 모바일에서는 줄바꿈 태그 무시하고 한 줄로 쭉 쓰거나 자연스럽게 줄바꿈 */
        .desktop-br {
            display: none;
        }
    }
`;