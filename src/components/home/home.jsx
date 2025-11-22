import { useAuth } from "../../context/AuthContext.jsx";
import SignIn from "../sign/SignIn.jsx";
import { Navigate } from 'react-router-dom';
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { media } from "../../styles/media";
import React, { useEffect, useState } from "react";
import api from "../../api/axios";   // 포인트 가져오는 API 사용

const Home = () => {
    const { isLoggedIn } = useAuth();
    const nav = useNavigate();

    // ⭐ 유저 포인트 상태
    const [points, setPoints] = useState(0);

// ⭐ 티어 정보 상태
    const [tier, setTier] = useState({
        current: { name: "브론즈", min: 0, max: 100 },
        next: { name: "실버", min: 100, max: 300 },
        progress: 0,
        remain: 100,
    });

// ⭐ 티어 기준표
    const tierList = [
        { name: "브론즈", min: 0, max: 100 },
        { name: "실버", min: 100, max: 300 },
        { name: "골드", min: 300, max: 600 },
        { name: "플래티넘", min: 600, max: 1000 },
        { name: "다이아", min: 1000, max: Infinity }
    ];

// ⭐ 포인트 불러오기 + 티어 계산
    useEffect(() => {
        const fetchPoint = async () => {
            try {
                const res = await api.get("/api/auth/myPoint");
                const pt = res.data;
                setPoints(pt);

                // 현재 티어 찾기
                const cur = tierList.find(t => pt >= t.min && pt < t.max);
                const nextIdx = tierList.indexOf(cur) + 1;
                const next = tierList[nextIdx] || null;

                // 진행도 계산
                const progress = next
                    ? ((pt - cur.min) / (next.min - cur.min)) * 100
                    : 100;

                setTier({
                    current: cur,
                    next: next,
                    progress: Math.min(progress, 100),
                    remain: next ? next.min - pt : 0
                });

            } catch (err) {
                console.log("포인트 불러오기 실패", err);
            }
        };

        fetchPoint();
    }, []);


    const topWords = [
        { word: "가오", meaning: "멋/폼/분위기" },
        { word: "현타", meaning: "현실 자각 타임" },
        { word: "킹받네", meaning: "엄청 짜증나네" },
    ];
    const todayQuiz = { q: "“가오”의 뜻은 무엇일까요?" };


    if (!isLoggedIn) {
        return <Navigate to="/signIn" replace />;
    }

    return(
        <Page>
            <Container>
                {/* Hero */}
                <Hero>
                    <HeroText>
                        <HeroTitle>세대 공감 단어 서비스</HeroTitle>
                        <HeroDesc>
                        기성세대와 MZ세대가 서로의 단어를 이해하고 공감할 수 있도록 돕는 서비스입니다.
                        </HeroDesc>

                        <KeywordRow>
                            <Keyword>#세대소통</Keyword>
                            <Keyword>#신조어사전</Keyword>
                            <Keyword>#퀴즈로학습</Keyword>
                            <Keyword>#공감대형성</Keyword>
                        </KeywordRow>

                        <TierBox>
                            <TierTop>
                                <TierName>🏆 {tier.current.name}</TierName>
                                <TierPoint>{points} P</TierPoint>
                            </TierTop>

                            <ProgressTrack>
                                <ProgressFill style={{ width: `${tier.progress}%` }} />
                            </ProgressTrack>

                            {tier.next ? (
                                <TierNext>
                                    다음 티어 "<b>{tier.next.name}</b>" 까지 {tier.remain}P 남았어요!
                                </TierNext>
                            ) : (
                                <TierNext>최고 티어에 도달했어요! 🎉</TierNext>
                            )}
                        </TierBox>


                    </HeroText>

                    <HeroBadge>
                    <BadgeTitle>🔥 오늘의 인기 단어</BadgeTitle>

                    {/* 단어+뜻 유지 */}
                    <BadgeWords>
                    {topWords.map((item, idx) => (
                        <WordChip key={idx}>
                        <WordText>{item.word}</WordText>
                        <MeaningText>{item.meaning}</MeaningText>
                        </WordChip>
                    ))}
                    </BadgeWords>

                    <Small onClick={() => nav("/trending")} style={{cursor:"pointer", marginTop: 2}}>
                    많이 검색된 단어 보러가기 →
                    </Small>
                </HeroBadge>
                </Hero>

                {/* Grid */}
                <Grid>
                    {/* Quiz Preview */}
                    <QuizCard onClick={() => nav("/quiz")}>
                        <CardTitle>오늘의 퀴즈</CardTitle>
                        <QuizQ>{todayQuiz.q}</QuizQ>
                        <Small>퀴즈로 세대 단어를 재미있게 익혀봐요!</Small>
                        <Btn style={{width:"fit-content"}}>퀴즈 풀기 →</Btn>
                    </QuizCard>

                    {/* Search Shortcut */}
                    <SearchCard>
                        <div>
                        <CardTitle>단어 검색</CardTitle>
                        <Small>
                            궁금한 단어를 입력하면 세대별 의미 차이를 보여줘요.
                        </Small>
                        </div>
                        <Btn onClick={() => nav("/dictionary")}>검색하러 가기</Btn>
                    </SearchCard>

                    {/* Extra */}
                    <ExtraCard>
                        <CardTitle>세대 공감 번역기</CardTitle>
                        <Small>(예: 세대 공감 영화 추천 / 대화 코치 / 주간 트렌드)</Small>
                        <Btn
                            className="outline"
                            onClick={() => nav("/translate")}
                            style={{ marginTop: "10px" }}
                        >
                            세대 공감 번역 하러 가기 →
                        </Btn>

                    </ExtraCard>
                </Grid>
            </Container>
        </Page>
    )
}

const Page = styled.div`
    min-height: 100vh;
    background: linear-gradient(180deg, #f6f7fb 0%, #f2f2f2 70%);
    display: flex;
    flex-direction: column;
`;

const TierBox = styled.div`
    margin-top: 16px;
    background: #ffffff;
    border: 1.5px solid #e6e6e6;
    border-radius: 14px;
    padding: 14px 14px 12px 14px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    box-shadow: 0 4px 10px rgba(17, 17, 17, 0.04);

    ${media.mobile} {
        padding: 12px;
        gap: 6px;
    }
`;

const TierTop = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const TierName = styled.div`
    font-weight: 900;
    font-size: 16px;
    color: #111;
    display: flex;
    align-items: center;
    gap: 6px;
`;

const TierPoint = styled.div`
    font-weight: 900;
    font-size: 15px;
    color: #4f46e5;
    background: #f0f2ff;
    padding: 4px 8px;
    border-radius: 999px;

    ${media.mobile} {
        font-size: 14px;
    }
`;

const ProgressTrack = styled.div`
    width: 100%;
    height: 10px;
    background: #ececff;
    border-radius: 999px;
    overflow: hidden;
    position: relative;
`;

const ProgressFill = styled.div`
    height: 100%;
    background: linear-gradient(90deg, #4f46e5, #7c3aed);
    border-radius: 999px;
    transition: width 0.35s ease;
`;

const TierNext = styled.div`
    font-size: 13px;
    font-weight: 700;
    color: #333;
    line-height: 1.35;

    b {
        color: #111;
    }

    ${media.mobile} {
        font-size: 12px;
    }
`;

const Logo = styled.div`
  font-weight: 900;
  font-size: 18px;
`;

const Container = styled.main`
    max-width: 980px;
    margin: 0 auto;
    margin-top: 12px;          /* ✅ 헤더와 간격만 살짝 */
    width: 100%;
    padding: 26px;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 18px;

    box-sizing: border-box;
    overflow-x: hidden;

    ${media.mobile} {
        padding: 16px;
        margin-top: 8px;
    }
`;



const Card = styled.div`
  background: white;
  border: 1.5px solid #d7d7d7;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 6px 16px rgba(17, 17, 17, 0.05);
    ${media.mobile} {
        padding: 16px;
    }
`;

/* ===== Home Sections ===== */
const Hero = styled(Card)`
    display: flex;
    gap: 18px;
    align-items: flex-start;   /* ✅ stretch 말고 위 기준 정렬 */
    padding-top: 24px;         /* ✅ 윗부분 여유를 강제로 줌 */

    ${media.tablet} {
        flex-direction: column;
    }
`;


const HeroText = styled.div`
  flex: 1.2;
`;

const HeroTitle = styled.h1`
  margin: 0 0 8px 0;
  font-size: 28px;
  font-weight: 900;
  letter-spacing: -0.5px;
`;

const HeroDesc = styled.p`
  margin: 0;
  color: #444;
  line-height: 1.5;
  white-space: nowrap;
    ${media.mobile} {
        white-space: normal;
    }
`;



const KeywordRow = styled.div`
  margin-top: 12px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Keyword = styled.span`
  font-size: 12px;
  font-weight: 700;
  padding: 6px 10px;
  background: #f0f2ff;
  color: #3b37d1;
  border-radius: 999px;
`;

const HeroActions = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const HeroBadge = styled.div`
    flex: 0.8;
    background: #f7f7ff;
    border: 1px dashed #bdbdf6;
    border-radius: 14px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    /* 추가 */
    box-sizing: border-box;
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
`;



const BadgeTitle = styled.div`
  font-weight: 900;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const BadgeWords = styled.div`
    margin-top: 6px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    overflow-x: hidden;
`;


const WordChip = styled.div`
  background: white;
  border: 1px solid #e3e3ff;
  border-radius: 12px;
  padding: 8px 10px;
`;

const WordText = styled.div`
  font-weight: 800;
  font-size: 16px;
`;

const MeaningText = styled.div`
  margin-top: 2px;
  font-size: 13px;
  color: #555;
  font-weight: 600;
`;

/* grid */
const Grid = styled.div`
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 16px;

    ${media.tablet} {
        grid-template-columns: 1fr;
    }
`;


const QuizCard = styled(Card)`
  grid-row: span 2;
  min-height: 260px;
  cursor: pointer;
  background: linear-gradient(180deg, #fff, #f6f7ff);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  transition: 0.15s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const CardTitle = styled.div`
  font-weight: 900;
  font-size: 18px;
`;

const QuizQ = styled.div`
  font-size: 20px;
  font-weight: 800;
`;

const Small = styled.div`
  font-size: 13px;
  color: #555;
`;

const SearchCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: space-between;
`;

const ExtraCard = styled(Card)`
  background: #f3f3f3;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Footer = styled.footer`
  background: #e3e3e3;
  text-align: center;
  padding: 22px;
  font-size: 14px;
  color: #333;
`;

const Btn = styled.button`
  border: none;
  background: #4f46e5;
  color: white;
  padding: 9px 14px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 800;
  transition: 0.15s ease;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(0.95);
  }

  &.outline {
    background: white;
    color: #111;
    border: 1px solid #333;
  }
`;

export default Home;
