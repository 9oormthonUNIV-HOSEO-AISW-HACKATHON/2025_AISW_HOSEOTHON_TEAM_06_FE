import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

/* ------------------ localStorage 키 ------------------ */
const LS_KEY = "myPageProfile";

/* ------------------ 기본값 ------------------ */
const DEFAULT_PROFILE = {
    nickname: "User",
    gender: "선택 안 함",  // 남 / 여 / 선택 안 함
    generation: "선택 안 함", // MZ / 기성 / 선택 안 함
    points: 0,
};

/* ------------------ styled-components ------------------ */
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

const HeaderRight = styled.div`
  display: flex;
  gap: 8px;
`;

const HeaderBtn = styled.button`
  background: #fff;
  padding: 8px 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
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
  margin-bottom: 18px;
`;

const Card = styled.div`
  background: white;
  border: 2px solid #cfcfcf;
  border-radius: 14px;
  padding: 22px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 140px 1fr auto;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 600px) {
    grid-template-columns: 110px 1fr auto;
  }
`;

const Label = styled.div`
  font-weight: 900;
  color: #333;
`;

const Value = styled.div`
  font-weight: 700;
  color: #111;
`;

const EditBtn = styled.button`
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background: #fff;
  font-weight: 800;
  cursor: pointer;

  &:hover {
    border-color: #5b4bff;
    color: #5b4bff;
  }
`;

const PointBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #f3f1ff;
  color: #5b4bff;
  font-weight: 900;
  padding: 6px 10px;
  border-radius: 999px;
`;

/* ------------------ 모달 ------------------ */
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const Modal = styled.div`
  width: 92%;
  max-width: 420px;
  background: #fff;
  border-radius: 14px;
  padding: 18px;
  border: 2px solid #cfcfcf;
`;

const ModalTitle = styled.div`
  font-size: 18px;
  font-weight: 900;
  margin-bottom: 12px;
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  height: 44px;
  padding: 0 12px;
  border: 1.5px solid #ddd;
  border-radius: 10px;
  font-size: 15px;
  outline: none;

  &:focus {
    border-color: #5b4bff;
  }
`;

const OptionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: 8px;
`;

const OptionBtn = styled.button`
  height: 42px;
  border-radius: 10px;
  border: 1.5px solid ${({ $active }) => ($active ? "#5b4bff" : "#ddd")};
  background: ${({ $active }) => ($active ? "#f3f1ff" : "#fff")};
  font-weight: 800;
  cursor: pointer;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 14px;
`;

const Btn = styled.button`
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid #ddd;
  background: #fff;
  font-weight: 900;
  cursor: pointer;

  &.primary {
    background: #5b4bff;
    color: #fff;
    border: none;
  }
`;

const Footer = styled.footer`
  background: #ddd;
  text-align: center;
  padding: 22px;
  margin-top: auto;
  font-size: 14px;
  color: #333;
`;

/* ------------------ 컴포넌트 ------------------ */
const MyPage = () => {
    const nav = useNavigate();

    const [profile, setProfile] = useState(DEFAULT_PROFILE);

    // 모달 상태
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null); // "nickname" | "gender" | "generation"
    const [tempValue, setTempValue] = useState("");

    /* ---- 로컬스토리지 로드 ---- */
    useEffect(() => {
        try {
            const saved = localStorage.getItem(LS_KEY);
            if (saved) {
                setProfile(JSON.parse(saved));
            }
        } catch (e) {
            // ignore
        }
    }, []);

    /* ---- 로컬스토리지 저장 ---- */
    const saveProfile = (next) => {
        setProfile(next);
        localStorage.setItem(LS_KEY, JSON.stringify(next));
    };

    /* ---- 모달 열기 ---- */
    const openModal = (type) => {
        setModalType(type);
        if (type === "nickname") setTempValue(profile.nickname);
        if (type === "gender") setTempValue(profile.gender);
        if (type === "generation") setTempValue(profile.generation);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setModalType(null);
        setTempValue("");
    };

    const applyModal = () => {
        const next = { ...profile };

        if (modalType === "nickname") {
            next.nickname = tempValue.trim() || "User";
        }
        if (modalType === "gender") {
            next.gender = tempValue;
        }
        if (modalType === "generation") {
            next.generation = tempValue;
        }

        saveProfile(next);
        closeModal();
    };

    return (
        <Page>
            {/* HEADER */}
            <Header>
                <HeaderLeft>
                    <LogoImg src={logo} alt="logo" onClick={() => nav("/")} />
                </HeaderLeft>

                <HeaderRight>
                    <HeaderBtn onClick={() => nav("/dictionary")}>단어 검색</HeaderBtn>
                    <HeaderBtn onClick={() => nav("/quiz")}>퀴즈</HeaderBtn>
                </HeaderRight>
            </Header>

            {/* CONTENT */}
            <Container>
                <Title>마이페이지</Title>

                <Card>
                    {/* 닉네임 */}
                    <Row>
                        <Label>닉네임</Label>
                        <Value>{profile.nickname}</Value>
                        <EditBtn onClick={() => openModal("nickname")}>수정</EditBtn>
                    </Row>

                    {/* 포인트 */}
                    <Row>
                        <Label>포인트</Label>
                        <Value>
                            <PointBadge>⭐ {profile.points} P</PointBadge>
                        </Value>
                        {/* 포인트는 수정 불가라 버튼 없음 */}
                        <div />
                    </Row>

                    {/* 성별 */}
                    <Row>
                        <Label>성별</Label>
                        <Value>{profile.gender}</Value>
                        <EditBtn onClick={() => openModal("gender")}>수정</EditBtn>
                    </Row>

                    {/* 세대 */}
                    <Row>
                        <Label>세대</Label>
                        <Value>{profile.generation}</Value>
                        <EditBtn onClick={() => openModal("generation")}>수정</EditBtn>
                    </Row>
                </Card>
            </Container>

            <Footer>footer</Footer>

            {/* MODAL */}
            {modalOpen && (
                <Overlay onClick={closeModal}>
                    <Modal onClick={(e) => e.stopPropagation()}>
                        <ModalTitle>
                            {modalType === "nickname" && "닉네임 수정"}
                            {modalType === "gender" && "성별 수정"}
                            {modalType === "generation" && "세대 수정"}
                        </ModalTitle>

                        <ModalBody>
                            {modalType === "nickname" && (
                                <Input
                                    value={tempValue}
                                    onChange={(e) => setTempValue(e.target.value)}
                                    placeholder="새 닉네임 입력"
                                />
                            )}

                            {modalType === "gender" && (
                                <OptionGrid>
                                    {["남", "여", "선택 안 함"].map((g) => (
                                        <OptionBtn
                                            key={g}
                                            $active={tempValue === g}
                                            onClick={() => setTempValue(g)}
                                        >
                                            {g}
                                        </OptionBtn>
                                    ))}
                                </OptionGrid>
                            )}

                            {modalType === "generation" && (
                                <OptionGrid>
                                    {["MZ", "기성", "선택 안 함"].map((gen) => (
                                        <OptionBtn
                                            key={gen}
                                            $active={tempValue === gen}
                                            onClick={() => setTempValue(gen)}
                                        >
                                            {gen}
                                        </OptionBtn>
                                    ))}
                                </OptionGrid>
                            )}
                        </ModalBody>

                        <ModalFooter>
                            <Btn onClick={closeModal}>취소</Btn>
                            <Btn className="primary" onClick={applyModal}>
                                저장
                            </Btn>
                        </ModalFooter>
                    </Modal>
                </Overlay>
            )}
        </Page>
    );
};

export default MyPage;
