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
                    <Title>쉬운 말 번역기</Title>
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

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// 전체 레이아웃 컨테이너
const Container = styled.div`
    box-sizing: border-box;
    height: 100vh;
    background-color: #f3f4f6; /* 부드러운 배경색 */
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif;
`;

// 메인 카드 디자인
const Card = styled.div`
  background: white;
  width: 100%;
  max-width: 500px;
  padding: 40px;
  border-radius: 24px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;

  @media (max-width: 768px) {
    padding: 24px;
    max-width: 100%;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 32px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 800;
  color: rgb(79, 70, 229); /* 포인트 컬러 적용 */
  margin-bottom: 12px;
  letter-spacing: -0.5px;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const SubTitle = styled.p`
  font-size: 16px;
  color: #6b7280;
  line-height: 1.5;
  word-break: keep-all;

  /* 모바일 줄바꿈 처리 */
  .mobile-only {
    display: none;
  }
  
  @media (max-width: 768px) {
    font-size: 14px;
    .mobile-only {
      display: inline;
    }
  }
`;

const Section = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
`;

const TextArea = styled.textarea`
  width: calc(100% - 32px);
  height: 120px;
  padding: 16px;
  font-size: 16px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  resize: none;
  outline: none;
  transition: all 0.2s;
  background-color: #f9fafb;

  &::placeholder {
    color: #9ca3af;
    font-size: 15px;
  }

  &:focus {
    border-color: rgb(79, 70, 229); /* 포커스 시 포인트 컬러 */
    background-color: white;
    box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
  }
`;

const TranslateButton = styled.button`
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 12px;
  background-color: rgb(79, 70, 229); /* 포인트 컬러 */
  color: white;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background-color: rgb(67, 56, 202); /* 호버 시 약간 어둡게 */
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
    transform: none;
  }
`;

const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: ${spin} 1s linear infinite;
`;

// 결과 섹션은 내용이 있을 때만 보이도록 처리
const ResultSection = styled.div`
  margin-top: 32px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all 0.3s ease-out;

  ${props => props.$isVisible && css`
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    animation: ${fadeIn} 0.5s ease-out;
  `}
`;

const ResultBox = styled.div`
  background-color: #eff6ff; /* 아주 연한 블루/인디고 배경 */
  border: 1px solid #bfdbfe;
  color: #1e3a8a;
  padding: 20px;
  border-radius: 12px;
  font-size: 16px;
  line-height: 1.6;
  white-space: pre-wrap; /* 줄바꿈 보존 */
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);
`;

export default Translate;