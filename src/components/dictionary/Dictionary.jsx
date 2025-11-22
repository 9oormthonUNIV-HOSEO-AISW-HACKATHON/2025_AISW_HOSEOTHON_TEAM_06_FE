import React, { useState } from "react";
import styled from "styled-components";
import api from "../../api/axios";

const Dictionary = () => {
    
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [recents, setRecents] = useState([]);

    const onSearch = async () => {
        if (!query.trim()) return;

        try {
            // API 요청
            const response = await api.get("/api/word/search", {
                params: { name: query }
            });

            // 응답 데이터 저장 (배열 형태)
            setResults(response.data);

            // 최근 검색어 업데이트
            const trimmed = query.trim();
            setRecents((prev) => {
                const next = [trimmed, ...prev.filter((x) => x !== trimmed)];
                return next.slice(0, 5);
            });

        } catch (error) {
            console.error("단어 검색 실패:", error);
            setResults([]);
        }
    };

    const onEnter = (e) => {
        if (e.key === "Enter") onSearch();
    };

    const handleRecentClick = (word) => {
        setQuery(word);
        // 최근 검색어를 클릭했을 때도 검색 실행하려면 아래 코드 추가
        // (비동기 처리를 위해 useEffect나 별도 함수 분리가 필요할 수 있음)
        // 여기서는 단순히 입력창만 채우도록 둠
    };

    return (
        <Page>
            <Container>
                <Title>단어 검색</Title>

                <SearchCard>
                    <Input
                        placeholder="단어를 입력하세요..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={onEnter}
                    />
                    <SearchBtn onClick={onSearch}>검색</SearchBtn>
                </SearchCard>

                <Layout>
                    <ResultCard>
                        <CardTitle>검색 결과</CardTitle>

                        {results.length === 0 ? (
                            <Empty>검색 결과가 없습니다.</Empty>
                        ) : (
                            <ResultList>
                                {results.map((item, index) => (
                                    <WordItem key={item.idx || index}>
                                        <WordTitle>{item.name}</WordTitle>
                                        <MeaningBox>{item.mean}</MeaningBox>
                                        {item.categories && (
                                            <CategoryTag>#{item.categories}</CategoryTag>
                                        )}
                                    </WordItem>
                                ))}
                            </ResultList>
                        )}
                    </ResultCard>

                    <SideColumn>
                        <ResultCard>
                            <CardTitle>최근 검색</CardTitle>
                            {recents.length === 0 ? (
                                <Empty>최근 검색어가 없습니다.</Empty>
                            ) : (
                                recents.map((r, i) => (
                                    <RecentItem
                                        key={i}
                                        onClick={() => handleRecentClick(r)}
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

const Page = styled.div`
  min-height: 100vh;
  background: #f2f2f2;
  display: flex;
  flex-direction: column;
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
    height: fit-content;
`;

const CardTitle = styled.div`
    font-size: 18px;
    font-weight: 900;
    margin-bottom: 12px;
`;

const ResultList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const WordItem = styled.div`
    border-bottom: 1px solid #eee;
    padding-bottom: 16px;
    &:last-child {
        border-bottom: none;
        padding-bottom: 0;
    }
`;

const WordTitle = styled.div`
    font-size: 22px;
    font-weight: 900;
    margin-bottom: 8px;
    color: #333;
`;

const MeaningBox = styled.div`
    background: #fafafa;
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 12px;
    font-size: 16px;
    font-weight: 500;
    color: #555;
    line-height: 1.5;
`;

const CategoryTag = styled.span`
    display: inline-block;
    margin-top: 8px;
    font-size: 12px;
    font-weight: 800;
    color: #5b4bff;
    background: #f3f1ff;
    padding: 4px 8px;
    border-radius: 999px;
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
    width: 100%;
    &:hover {
        border-color: #5b4bff;
    }
    &:not(:last-child) {
        margin-bottom: 8px;
    }
`;