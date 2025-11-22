import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";

const WORD_QUESTIONS = [
    { question: "‘deploy’의 의미는?", options: ["삭제하다", "배포하다", "설치하다", "동기화하다"], answerIndex: 1 },
];

const TECH_QUESTIONS = [
    { question: "React 상태 관리 Hook은?", options: ["useEffect", "useState", "useQuery", "useClick"], answerIndex: 1 },
];

const SITUATION_QUESTIONS = [
    { question: "사이트가 느릴 때 먼저 볼 것?", options: ["CSS", "콘솔/네트워크", "폰트", "해상도"], answerIndex: 1 },
];

const QUESTION_SET = {
    word: { title: "단어별 퀴즈", list: WORD_QUESTIONS },
    tech: { title: "기술별 퀴즈", list: TECH_QUESTIONS },
    situation: { title: "상황별 퀴즈", list: SITUATION_QUESTIONS },
};

const QuizRunner = () => {
    const { category } = useParams();
    const nav = useNavigate();

    const data = QUESTION_SET[category] || { title: "퀴즈", list: [] };

    const questions = data.list;
    const title = data.title;

    const [idx, setIdx] = useState(0);
    const [selected, setSelected] = useState(null);
    const [correctCount, setCorrectCount] = useState(0);
    const [finish, setFinish] = useState(false);

    const current = questions[idx];

    const handleNext = async () => {
        const isCorrect = selected === current.answerIndex;

        if (isCorrect) {
            setCorrectCount((prev) => prev + 1);
        }
        setSelected(null);

        if (idx === questions.length - 1) {
            if (isCorrect) {
                try {
                    await api.post("/api/auth/addPoint", {
                        userPoint: "10"
                    });

                    window.dispatchEvent(new Event("pointUpdated"));
                } catch (error) {
                    console.error(error);
                }
            }
            setFinish(true);
        } else {
            setIdx(idx + 1);
        }
    };

    return (
        <Page>
            <Container>
                <Title>{title}</Title>

                {!finish ? (
                    <Card>
                        <Question>Q. {current.question}</Question>

                        <Options>
                            {current.options.map((op, i) => (
                                <OptionBtn
                                    key={i}
                                    onClick={() => setSelected(i)}
                                    $active={selected === i}
                                >
                                    {op}
                                </OptionBtn>
                            ))}
                        </Options>

                        <NavRow>
                            <Btn onClick={() => nav("/quiz")}>뒤로가기</Btn>
                            <Btn onClick={handleNext} disabled={selected === null}>
                                {idx === questions.length - 1 ? "제출" : "다음"}
                            </Btn>
                        </NavRow>
                    </Card>
                ) : (
                    <Card>
                        {correctCount > 0 ? (
                            <>
                                <Question>축하합니다! 정답이에요 🎉</Question>
                                <ResultText>
                                    와우! {correctCount * 10}점을 획득하셨습니다!
                                </ResultText>
                            </>
                        ) : (
                            <>
                                <Question>아쉽네요... 🥺</Question>
                                <ResultText>
                                    오답입니다. 다음에 다시 도전해보세요!
                                </ResultText>
                            </>
                        )}

                        <NavRow>
                            <Btn onClick={() => nav("/quiz")}>목록으로</Btn>
                        </NavRow>
                    </Card>
                )}
            </Container>
        </Page>
    );
};

export default QuizRunner;

const Page = styled.div`
    height: 100%;
    background: #f2f2f2;
    display: flex;
    flex-direction: column;
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
`;

const Card = styled.div`
    background: white;
    border: 2px solid #cfcfcf;
    border-radius: 14px;
    padding: 26px;
    margin-top: 20px;
`;

const Question = styled.div`
    font-size: 20px;
    font-weight: 800;
    margin-bottom: 18px;
`;

const ResultText = styled.p`
    font-size: 18px;
    margin-top: 8px;
    color: #444;
    line-height: 1.5;
`;

const Options = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const OptionBtn = styled.button`
    padding: 14px 16px;
    border-radius: 10px;
    border: 2px solid ${({ $active }) => ($active ? "#5b4bff" : "#e3e3e3")};
    background: ${({ $active }) => ($active ? "#f3f1ff" : "white")};
    font-size: 16px;
    text-align: left;
    cursor: pointer;
    transition: 0.15s;

    &:hover {
        border-color: #5b4bff;
    }
`;

const NavRow = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
`;

const Btn = styled.button`
    padding: 10px 14px;
    border-radius: 10px;
    border: 1px solid #cfcfcf;
    background: white;
    font-weight: 800;
    cursor: pointer;
`;