import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components'; // keyframes, css 추가
import { GoogleGenerativeAI } from "@google/generative-ai";

const Translate = () => {
    const [inputText, setInputText] = useState('');
    const [resultText, setResultText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // 환경 변수에서 API 키 가져오기
    const API_KEY = import.meta.env.VITE_GOOGLE_AI_API_KEY;

    const handleTranslate = async () => {
        if (!inputText.trim()) {
            alert("변환할 문장을 입력해주세요!");
            return;
        }

        if (!API_KEY) {
            alert("API 키가 설정되지 않았습니다.");
            return;
        }

        setIsLoading(true);
        setResultText('');

        try {
            const genAI = new GoogleGenerativeAI(API_KEY);
            // 참고: 현재 시점 최신 모델은 gemini-1.5-flash 입니다.
            // 2.5가 안된다면 1.5로 변경해주세요.
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

            const prompt = `
                다음 문장을 누구나 이해하기 쉽고 친절한 말투로 바꿔서 설명해줘. 
                만약 외국어라면 한국어로 번역해서 쉽게 설명해줘.
                문장에 대해서 설명하지 말고 그냥 번역된 문장만 출력해줘.
                
                입력 문장: "${inputText}"
            `;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            setResultText(text);

        } catch (error) {
            console.error("Error fetching data:", error);
            setResultText("죄송합니다. 변환 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container>
            <Card>
                <Header>
                    <Title>쉬운 말 번역기 <Icon>🤖</Icon></Title>
                    <SubTitle>어려운 말이나 외국어를 입력하면<br className="mobile-only"/> 쉽고 친절하게 바꿔드려요!</SubTitle>
                </Header>

                <Section>
                    <Label>입력할 문장</Label>
                    <TextArea
                        placeholder="예시: 'The physiological mechanisms of stress...' 또는 '금일 회의는 취소되었습니다.'"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                    />
                </Section>

                <TranslateButton onClick={handleTranslate} disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Spinner /> 변환하는 중...
                        </>
                    ) : (
                        '쉽게 바꾸기 ✨'
                    )}
                </TranslateButton>

                <ResultSection $isVisible={!!resultText}>
                    <Label>변환 결과</Label>
                    <ResultBox>
                        {resultText}
                    </ResultBox>
                </ResultSection>
            </Card>
        </Container>
    );
};

/* ===== 애니메이션 정의 ===== */
const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
`;

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

/* ===== 스타일 컴포넌트 ===== */

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    /* 세련된 그라데이션 배경 */
    background: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%);
    padding: 20px;

    /* 모바일에서 배경색 조정 */
    @media (max-width: 480px) {
        padding: 16px;
        background: #f8f9fa;
    }
`;

const Card = styled.div`
    width: 100%;
    max-width: 580px;
    background: white;
    border-radius: 24px;
    padding: 40px;

    /* 입체적인 그림자 효과 */
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.04);

    display: flex;
    flex-direction: column;
    gap: 24px;

    /* 모바일 반응형 */
    @media (max-width: 480px) {
        padding: 24px 20px;
        border-radius: 20px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    }
`;

const Header = styled.div`
    text-align: center;
`;

const Title = styled.h1`
    font-size: 28px;
    font-weight: 800;
    color: #1a1a1a;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    @media (max-width: 480px) {
        font-size: 22px;
    }
`;

const Icon = styled.span`
    font-size: 28px;
    @media (max-width: 480px) {
        font-size: 22px;
    }
`;

const SubTitle = styled.p`
    font-size: 16px;
    color: #666;
    line-height: 1.5;

    .mobile-only {
        display: none;
    }

    @media (max-width: 480px) {
        font-size: 14px;
        .mobile-only {
            display: block; /* 모바일에서만 줄바꿈 */
        }
    }
`;

const Section = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Label = styled.label`
    font-size: 15px;
    font-weight: 700;
    color: #444;
    margin-left: 4px;
`;

const TextArea = styled.textarea`
    width: 100%;
    height: 140px;
    padding: 16px;
    border-radius: 16px;
    border: 2px solid #eef0f5;
    background-color: #fcfcfd;
    font-size: 16px;
    line-height: 1.6;
    resize: none;
    outline: none;
    transition: all 0.2s ease;
    color: #333;

    &::placeholder {
        color: #bbb;
    }

    /* 포커스 시 보라색 테두리와 그림자 */
    &:focus {
        border-color: #5b4bff;
        background-color: white;
        box-shadow: 0 0 0 4px rgba(91, 75, 255, 0.1);
    }

    @media (max-width: 480px) {
        height: 120px;
        font-size: 15px;
    }
`;

const TranslateButton = styled.button`
    width: 100%;
    padding: 16px;
    background: #5b4bff;
    color: white;
    font-size: 17px;
    font-weight: 700;
    border: none;
    border-radius: 14px;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;

    /* 호버 효과 */
    &:hover:not(:disabled) {
        background: #4d3ef8;
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(91, 75, 255, 0.3);
    }

    /* 클릭 효과 */
    &:active:not(:disabled) {
        transform: translateY(0);
    }

    /* 비활성화(로딩) 상태 */
    &:disabled {
        background: #e0e0e0;
        color: #888;
        cursor: not-allowed;
    }

    @media (max-width: 480px) {
        font-size: 16px;
        padding: 14px;
    }
`;

const ResultSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;

    /* 결과가 없으면 숨김, 있으면 애니메이션과 함께 등장 */
    display: ${props => props.$isVisible ? 'flex' : 'none'};
    animation: ${fadeIn} 0.5s ease-out;
`;

const ResultBox = styled.div`
    padding: 20px;
    background: #f0f7ff; /* 아주 연한 파란색 배경 */
    border: 1px solid #dbeafe;
    border-radius: 16px;
    color: #1e3a8a; /* 짙은 파란색 텍스트 */
    font-size: 16px;
    line-height: 1.6;
    white-space: pre-wrap;

    @media (max-width: 480px) {
        font-size: 15px;
        padding: 16px;
    }
`;

const Spinner = styled.div`
    width: 20px;
    height: 20px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: ${spin} 0.8s linear infinite;
`;

export default Translate;