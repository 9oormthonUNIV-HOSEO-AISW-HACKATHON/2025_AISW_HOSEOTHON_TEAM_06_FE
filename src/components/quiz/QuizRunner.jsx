import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";

const QuizRunner = () => {
    const { category } = useParams(); // 'S' or 'C'
    const nav = useNavigate();

    // 전체 문제 목록 저장
    const [questionList, setQuestionList] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(null);

    const [selected, setSelected] = useState(null);
    const [finish, setFinish] = useState(false);
    const [loading, setLoading] = useState(true);

    const [userIsMz, setUserIsMz] = useState("");
    const [isCorrect, setIsCorrect] = useState(false);

    // 1. 사용자 정보(isMz) 가져오기
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await api.get("/api/auth/myPage");
                setUserIsMz(response.data.userIsMz);
            } catch (error) {
                console.error("사용자 정보 로드 실패:", error);
            }
        };
        fetchUserInfo();
    }, []);

    // 2. 문제 데이터 로드
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await api.get("/api/que/list");
                const allQuestions = response.data;

                const filtered = allQuestions.filter(q => q.type === category);
                setQuestionList(filtered);

                if (filtered.length > 0) {
                    pickRandomQuestion(filtered);
                } else {
                    console.warn("해당 카테고리의 문제가 없습니다.");
                }
            } catch (error) {
                console.error("문제 로딩 실패:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [category]);

    // 랜덤 문제 선택 함수
    const pickRandomQuestion = (list) => {
        const randomIndex = Math.floor(Math.random() * list.length);
        setCurrentQuestion(list[randomIndex]);
    };

    // 다음 문제로 넘어가기
    const handleNextQuestion = () => {
        setFinish(false);       // 결과창 닫기
        setSelected(null);      // 선택 초기화
        setIsCorrect(false);    // 정답 여부 초기화
        pickRandomQuestion(questionList); // 새 문제 뽑기
    };

    const handleSelect = (idx) => {
        setSelected(idx);
    };

    // 3. 제출 버튼 핸들러
    const handleSubmit = async () => {
        if (!currentQuestion || selected === null) return;

        try {
            const { data: resultMessage } = await api.post("/api/que/check", {
                questionIdx: currentQuestion.idx,
                answerNumber: selected.toString(),
                isMz: userIsMz
            });

            const correct = resultMessage === "정답입니다.";
            setIsCorrect(correct);

            if (correct) {
                try {
                    await api.post("/api/auth/addPoint", { userPoint: "10" });
                    window.dispatchEvent(new Event("pointUpdated"));
                } catch (e) {
                    console.error("포인트 적립 실패", e);
                }
            }

            setFinish(true);

        } catch (error) {
            console.error("답안 제출 실패:", error);
            alert("제출 중 오류가 발생했습니다.");
        }
    };

    if (loading) return <Page><Container>로딩 중...</Container></Page>;
    if (!currentQuestion) return <Page><Container>문제를 찾을 수 없습니다.</Container></Page>;

    const options = [
        currentQuestion.opt1,
        currentQuestion.opt2,
        currentQuestion.opt3
    ].filter(Boolean);

    const title = category === 'S' ? "기술별 퀴즈" : "상황별 퀴즈";

    return (
        <Page>
            <Container>
                <Title>{title}</Title>

                {!finish ? (
                    <Card>
                        <Question>Q. {currentQuestion.contents}</Question>

                        <Options>
                            {options.map((op, i) => (
                                <OptionBtn
                                    key={i}
                                    onClick={() => handleSelect(i + 1)}
                                    $active={selected === i + 1}
                                >
                                    {op}
                                </OptionBtn>
                            ))}
                        </Options>

                        <NavRow>
                            <Btn onClick={() => nav("/quiz")}>뒤로가기</Btn>
                            <Btn onClick={handleSubmit} disabled={selected === null}>
                                제출
                            </Btn>
                        </NavRow>
                    </Card>
                ) : (
                    // 결과 화면
                    <Card>
                        {isCorrect ? (
                            <>
                                <Question>정답입니다! 🎉</Question>
                                <ResultText>
                                    축하합니다! 포인트 10점을 획득하셨습니다.
                                </ResultText>
                            </>
                        ) : (
                            <>
                                <Question>아쉽네요... 🥺</Question>
                                <ResultText>
                                    오답입니다. 다음 기회에 다시 도전해보세요!
                                </ResultText>
                            </>
                        )}

                        <Divider />

                        <ExplainBox>
                            <ExplainLabel>📝 해설</ExplainLabel>
                            <ExplainText>{currentQuestion.explain}</ExplainText>
                        </ExplainBox>

                        <NavRow>
                            <Btn onClick={() => nav("/quiz")} className="outline">목록으로</Btn>
                            <Btn onClick={handleNextQuestion} className="primary">다음 문제</Btn>
                        </NavRow>
                    </Card>
                )}
            </Container>
        </Page>
    );
};

export default QuizRunner;

// -------------------- Styled Components --------------------

const Page = styled.div`
    min-height: calc(100vh - 70px);
    background: #f2f2f2;
    display: flex;
    flex-direction: column;
`;

const Container = styled.main`
    max-width: 900px;
    margin: 30px auto;
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;

    @media (max-width: 480px) {
        margin: 0 auto;
        padding: 20px 16px;
    }
`;

const Title = styled.h2`
    font-size: 26px;
    font-weight: 900;
    color: #1f2937;
    margin-bottom: 20px;

    @media (max-width: 480px) {
        font-size: 22px;
        margin-bottom: 10px;
    }
`;

const Card = styled.div`
    width: 100%;
    max-width: 600px;
    background: white;
    border: 2px solid #cfcfcf;
    border-radius: 14px;
    padding: 26px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);

    @media (max-width: 480px) {
        padding: 20px;
        margin-top: 20px;
        border-radius: 12px;
    }
`;

const Question = styled.div`
    font-size: 20px;
    font-weight: 800;
    margin-bottom: 24px;
    line-height: 1.4;
    color: #111;

    @media (max-width: 480px) {
        font-size: 18px;
        margin-bottom: 18px;
    }
`;

const ResultText = styled.p`
    font-size: 16px;
    color: #444;
    line-height: 1.5;
    margin-bottom: 20px;
`;

const Options = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;

    @media (max-width: 480px) {
        gap: 10px;
    }
`;

const OptionBtn = styled.button`
    padding: 16px;
    border-radius: 10px;
    border: 2px solid ${({ $active }) => ($active ? "#5b4bff" : "#e3e3e3")};
    background: ${({ $active }) => ($active ? "#f3f1ff" : "white")};
    font-size: 16px;
    text-align: left;
    cursor: pointer;
    transition: 0.15s;
    color: #333;
    font-weight: 500;

    &:hover {
        border-color: #5b4bff;
    }

    @media (max-width: 480px) {
        padding: 14px;
        font-size: 15px;
    }
`;

const Divider = styled.hr`
    border: none;
    border-top: 1px solid #eee;
    margin: 20px 0;
`;

const ExplainBox = styled.div`
    background-color: #f8f9fa;
    padding: 16px;
    border-radius: 10px;
    margin-bottom: 20px;
`;

const ExplainLabel = styled.h4`
    font-size: 14px;
    color: #5b4bff;
    font-weight: 800;
    margin-bottom: 8px;
`;

const ExplainText = styled.p`
    font-size: 15px;
    color: #333;
    line-height: 1.6;
    word-break: keep-all;
`;

const NavRow = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 24px;

    @media (max-width: 480px) {
        margin-top: 20px;
    }
`;

const Btn = styled.button`
    padding: 10px 16px;
    border-radius: 10px;
    font-weight: 800;
    cursor: pointer;
    transition: background-color 0.2s;

    /* 기본 스타일 (Secondary 느낌) */
    border: 1px solid #cfcfcf;
    background: white;
    color: #333;

    &:hover:not(:disabled) {
        background-color: #f9fafb;
        border-color: #bbb;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    /* Primary 스타일 (강조 버튼) */
    &.primary {
        background-color: #5b4bff;
        color: white;
        border: 1px solid #5b4bff;

        &:hover {
            background-color: #4a3bcf;
            border-color: #4a3bcf;
        }
    }

    /* Outline 스타일 (선택적) */
    &.outline {
        background: white;
        color: #555;
        border: 1px solid #ddd;
    }
`;