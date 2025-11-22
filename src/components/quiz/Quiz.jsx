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
                    <QuizItem onClick={() => nav("/quiz/O")}>
                        <IconWrapper>💻</IconWrapper>
                        <ItemContent>
                            <ItemTitle>MZ세대 퀴즈</ItemTitle>
                            <ItemDesc>기성 세대에게 한 걸음 더 다가갈 수 있는<br className="desktop-br"/> 퀴즈를 풀어보세요! </ItemDesc>
                        </ItemContent>
                    </QuizItem>

                    <QuizItem onClick={() => nav("/quiz/M")}>
                        <IconWrapper>🧩</IconWrapper>
                        <ItemContent>
                            <ItemTitle>기성세대 퀴즈</ItemTitle>
                            <ItemDesc>MZ 세대를 더 잘 이해하기 위해<br className="desktop-br"/> 신조어 줄임말 등의 지식을 테스트해보세요!</ItemDesc>
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
    box-sizing: border-box;

    @media (max-width: 768px) {
        padding: 40px 18px;
        justify-content: flex-start;
    }

    @media (max-width: 480px) {
        padding: 22px 14px;
    }
`;

const HeaderGroup = styled.div`
    text-align: center;
    margin-bottom: 44px;

    @media (max-width: 768px) {
        margin-bottom: 32px;
    }

    @media (max-width: 480px) {
        margin-bottom: 18px;
        text-align: left;
        padding-left: 2px;
    }
`;

const Title = styled.h2`
    font-size: 32px;
    font-weight: 900;
    color: #1f2937;
    margin-bottom: 10px;
    letter-spacing: -0.3px;

    @media (max-width: 768px) {
        font-size: 26px;
    }

    @media (max-width: 480px) {
        font-size: 22px;
        margin-bottom: 6px;
    }
`;

const SubTitle = styled.p`
    font-size: 16px;
    color: #6b7280;
    line-height: 1.5;
    word-break: keep-all;

    @media (max-width: 768px) {
        font-size: 14px;
    }

    @media (max-width: 480px) {
        font-size: 13px;
        line-height: 1.4;
    }
`;

const QuizList = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;
    width: 100%;

    @media (max-width: 900px) {
        grid-template-columns: 1fr;
        gap: 16px;
    }

    @media (max-width: 600px) {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
`;

const QuizItem = styled.div`
    background: white;
    padding: 38px 28px;
    border-radius: 22px;
    border: 1px solid #e5e7eb;
    width: 100%;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.03);

    &:hover {
        transform: translateY(-6px);
        box-shadow: 0 18px 22px -6px rgba(0, 0, 0, 0.12);
        border-color: rgb(79, 70, 229);
    }

    &:active {
        transform: translateY(-1px);
    }

    /* ✅ 모바일: 가로 카드로 자연스럽게 꽉 차게 */
    @media (max-width: 600px) {
        flex-direction: row;
        align-items: center;
        text-align: left;

        padding: 16px 14px;
        border-radius: 14px;
        gap: 10px;

        &:hover {
            transform: none;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
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
    margin-bottom: 22px;
    transition: background-color 0.3s;

    ${QuizItem}:hover & {
        background-color: #e0e7ff;
    }

    @media (max-width: 600px) {
        width: 46px;
        height: 46px;
        font-size: 20px;
        margin-bottom: 0;
        margin-right: 10px;
        flex-shrink: 0;
    }
`;

const ItemContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;

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

    @media (max-width: 600px) {
        font-size: 12px;
        line-height: 1.4;

        .desktop-br {
            display: none;
        }
    }
`;