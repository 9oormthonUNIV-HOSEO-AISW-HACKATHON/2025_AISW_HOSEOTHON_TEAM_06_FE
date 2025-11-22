import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

/** ---------------- 더미 데이터 (나중에 API 연결 가능) ---------------- */
const DUMMY_DICT = [
    {
        word: "가요",
        mzMeaning: "좋아요 / 괜찮아요 / 마음에 듭니다",
        oldMeaning: "노래(歌謠)",
        examples: ["이거 디자인 가요!", "오늘 분위기 가요~"],
        tags: ["#긍정", "#호응", "#MZ단어"],
    },
    {
        word: "현타",
        mzMeaning: "현실 자각 타임",
        oldMeaning: "현실을 냉정하게 깨닫는 순간",
        examples: ["시험 범위 보고 현타 옴", "통장 잔고 보고 현타..."],
        tags: ["#현실", "#자각", "#슬랭"],
    },
    {
        word: "킹받네",
        mzMeaning: "엄청 짜증나 / 화나",
        oldMeaning: "매우 화가 난다 (강조 표현)",
        examples: ["아 진짜 킹받네ㅋㅋ", "버스 놓쳐서 킹받음"],
        tags: ["#짜증", "#강조", "#유행어"],
    },
];

const findWord = (q) => {
    const normalized = q.trim().toLowerCase();
    if (!normalized) return null;
    return DUMMY_DICT.find((d) => d.word.toLowerCase() === normalized) || null;
};

/** ----------------- 스타일 ----------------- */
const Page = styled.div`
  min-height: 100vh;
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

const Container = styled.main`
  max-width: 980px;
  margin: 28px auto;
  width: 100%;
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 26px;
  font-weight: 900;
  margin-bottom: 12px;
`;

const SearchCard = styled.div`
  background: white;
  border: 2px solid #cfcfcf;
  border-radius: 14px;
  padding: 18px;
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  height: 48px;
  border-radius: 10px;
  border: 1.5px solid #ddd;
  padding: 0 14px;
  font-size: 16px;
  &:focus {
    border-color: #5b4bff;
  }
`;

const SearchBtn = styled.button`
  height: 48px;
  padding: 0 18px;
  border-radius: 10px;
  border: none;
  background: #5b4bff;
  color: white;
  font-weight: 800;
  cursor: pointer;
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 18px;
  margin-top: 18px;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ResultCard = styled.div`
  background: white;
  border: 2px solid #cfcfcf;
  border-radius: 14px;
  padding: 18px;
`;

const CardTitle = styled.div`
  font-size: 18px;
  font-weight: 900;
  margin-bottom: 12px;
`;

const WordTitle = styled.div`
  font-size: 24px;
  font-weight: 900;
  margin-bottom: 8px;
`;

const Tabs = styled.div`
  display: flex;
  gap: 8px;
  margin: 10px 0 14px;
`;

const Tab = styled.button`
  padding: 8px 12px;
  border-radius: 999px;
  border: 1.5px solid ${({ $active }) => ($active ? "#5b4bff" : "#ddd")};
  background: ${({ $active }) => ($active ? "#f3f1ff" : "#fff")};
  font-weight: 800;
  cursor: pointer;
`;

const MeaningBox = styled.div`
  background: #fafafa;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 12px;
  font-size: 16px;
  font-weight: 700;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 10px;
`;

const Tag = styled.span`
  font-size: 12px;
  font-weight: 800;
  color: #5b4bff;
  background: #f3f1ff;
  padding: 4px 8px;
  border-radius: 999px;
`;

const Example = styled.li`
  margin: 6px 0;
  color: #333;
  font-size: 15px;
`;

const SideColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Empty = styled.div`
  color: #777;
  font-size: 15px;
  padding: 10px 0;
`;

const RecentItem = styled.button`
  text-align: left;
  border: 1px solid #eee;
  background: #fff;
  padding: 10px 12px;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    border-color: #5b4bff;
  }
`;

/** ---------------- 컴포넌트 ---------------- */
const Dictionary = () => {
    const nav = useNavigate();
    const [query, setQuery] = useState("");
    const [result, setResult] = useState(null);
    const [tab, setTab] = useState("mz");
    const [recents, setRecents] = useState([]);

    const popular = useMemo(() => DUMMY_DICT.slice(0, 3), []);

    const onSearch = () => {
        const r = findWord(query);
        setResult(r);
        setTab("mz");

        const trimmed = query.trim();
        if (trimmed) {
            setRecents((prev) => {
                const next = [trimmed, ...prev.filter((x) => x !== trimmed)];
                return next.slice(0, 5);
            });
        }
    };

    const onEnter = (e) => {
        if (e.key === "Enter") onSearch();
    };

    return (
        <Page>
            {/* HEADER */}
            <Header>
                <HeaderLeft>
                    <LogoImg src={logo} alt="logo" onClick={() => nav("/")} />
                </HeaderLeft>
            </Header>

            {/* CONTENT */}
            <Container>
                <Title>단어 검색</Title>

                <SearchCard>
                    <Input
                        placeholder="예) 가요, 현타, 킹받네 ..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={onEnter}
                    />
                    <SearchBtn onClick={onSearch}>검색</SearchBtn>
                </SearchCard>

                <Layout>
                    {/* 검색 결과창 */}
                    <ResultCard>
                        <CardTitle>검색 결과</CardTitle>

                        {!result ? (
                            <Empty>단어를 검색해보세요!</Empty>
                        ) : (
                            <>
                                <WordTitle>{result.word}</WordTitle>

                                <Tabs>
                                    <Tab $active={tab === "mz"} onClick={() => setTab("mz")}>
                                        MZ 의미
                                    </Tab>
                                    <Tab $active={tab === "old"} onClick={() => setTab("old")}>
                                        기성 의미
                                    </Tab>
                                </Tabs>

                                <MeaningBox>
                                    {tab === "mz" ? result.mzMeaning : result.oldMeaning}
                                </MeaningBox>

                                <TagRow>
                                    {result.tags.map((t, i) => (
                                        <Tag key={i}>{t}</Tag>
                                    ))}
                                </TagRow>

                                <div style={{ marginTop: "14px", fontWeight: 900 }}>
                                    예문
                                </div>
                                <ul style={{ paddingLeft: "18px", marginTop: "6px" }}>
                                    {result.examples.map((ex, i) => (
                                        <Example key={i}>{ex}</Example>
                                    ))}
                                </ul>
                            </>
                        )}
                    </ResultCard>

                    {/* 사이드 영역 */}
                    <SideColumn>
                        <ResultCard>
                            <CardTitle>오늘의 인기 단어</CardTitle>
                            {popular.map((p, i) => (
                                <RecentItem
                                    key={i}
                                    onClick={() => {
                                        setQuery(p.word);
                                        setResult(p);
                                        setTab("mz");
                                    }}
                                >
                                    {p.word}
                                </RecentItem>
                            ))}
                        </ResultCard>

                        <ResultCard>
                            <CardTitle>최근 검색</CardTitle>
                            {recents.length === 0 ? (
                                <Empty>최근 검색어가 없습니다.</Empty>
                            ) : (
                                recents.map((r, i) => (
                                    <RecentItem
                                        key={i}
                                        onClick={() => {
                                            setQuery(r);
                                            const rr = findWord(r);
                                            setResult(rr);
                                            setTab("mz");
                                        }}
                                    >
                                        {r}
                                    </RecentItem>
                                ))
                            )}
                        </ResultCard>
                    </SideColumn>
                </Layout>
            </Container>
        </Page>
    );
};

export default Dictionary;
