import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

// -------------------- 문제 셋 --------------------
const WORD_QUESTIONS = [
    { question: "‘deploy’의 의미는?", options: ["삭제하다", "배포하다", "설치하다", "동기화하다"], answerIndex: 1 },
    { question: "‘refactor’는?", options: ["구조 개선", "배포 준비", "테스트", "렌더링"], answerIndex: 0 },
];

const TECH_QUESTIONS = [
    { question: "React 상태 관리 Hook은?", options: ["useEffect", "useState", "useQuery", "useClick"], answerIndex: 1 },
    { question: "GET 메서드는?", options: ["삭제", "수정", "조회", "추가"], answerIndex: 2 },
];

const SITUATION_QUESTIONS = [
    { question: "사이트가 느릴 때 먼저 볼 것?", options: ["CSS", "콘솔/네트워크", "폰트", "해상도"], answerIndex: 1 },
    { question: "404 원인?", options: ["서버 과부하", "경로 오타", "CORS", "DB 오류"], answerIndex: 1 },
];

const QUESTION_SET = {
    word: { title: "단어별 퀴즈", list: WORD_QUESTIONS },
    tech: { title: "기술별 퀴즈", list: TECH_QUESTIONS },
    situation: { title: "상황별 퀴즈", list: SITUATION_QUESTIONS },
};

// -------------------- 스타일 공통 --------------------

const Page = styled.div`
    height: 100%;
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

    const handleNext = () => {
        if (selected === current.answerIndex) {
            setCorrectCount((prev) => prev + 1);
        }
        setSelected(null);

        if (idx === questions.length - 1) {
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
                        <Question>🎉 퀴즈 완료!</Question>
                        <p>맞춘 문제: {correctCount} / {questions.length}</p>
                        <p style={{ fontSize: "22px", marginTop: "8px" }}>
                            점수: {correctCount * 10}점
                        </p>

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
