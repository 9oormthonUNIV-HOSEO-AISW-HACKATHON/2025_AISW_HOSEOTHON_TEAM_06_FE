import React, { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../../api/axios";
import { media } from "../../styles/media";

const MyPage = () => {
    const [profile, setProfile] = useState({
        nickname: "",
        gender: "",
        generation: "",
        points: 0,
    });

    const [rawData, setRawData] = useState(null);

    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [tempValue, setTempValue] = useState("");

    const fetchProfile = async () => {
        try {
            const response = await api.get("/api/auth/myPage");
            const data = response.data;
            setRawData(data);

            const pointResponse = await api.get("/api/auth/myPoint");
            const userPoint = pointResponse.data;

            const displayGender = data.userSex === "M" ? "남성" : data.userSex === "F" ? "여성" : "정보 없음";
            const displayGen = data.userIsMz === "Y" ? "MZ세대" : data.userIsMz === "N" ? "기성세대" : "정보 없음";

            setProfile({
                nickname: data.userNickname || data.userName || "User",
                gender: displayGender,
                generation: displayGen,
                points: userPoint, // 받아온 포인트 적용
            });
        } catch (error) {
            console.error("내 정보 불러오기 실패:", error);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

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

    // 서버로 데이터 전송
    const applyModal = async () => {
        if (!rawData) return;

        // 기존 원본 데이터 복사
        const requestBody = { ...rawData };

        // 변경된 값 적용 및 변환 (화면용 텍스트 -> 서버용 코드)
        if (modalType === "nickname") {
            requestBody.userNickname = tempValue;
            requestBody.userPass = null;
            requestBody.userId = null;
            requestBody.userIsMz = null;
            requestBody.userName = null;
            requestBody.userSex = null;
        }
        else if (modalType === "gender") {
            requestBody.userSex = tempValue === "남성" ? "M" : "F";
            requestBody.userPass = null;
            requestBody.userId = null;
            requestBody.userIsMz = null;
            requestBody.userName = null;
            requestBody.userNickname = null;
        }
        else if (modalType === "generation") {
            requestBody.userIsMz = tempValue === "MZ세대" ? "Y" : "N";
            requestBody.userPass = null;
            requestBody.userId = null;
            requestBody.userNickname = null;
            requestBody.userName = null;
            requestBody.userSex = null;
        }

        try {
            // POST 요청 전송
            const response = await api.post("/api/auth/updateUser", requestBody);

            if (response.status === 200) {

                setRawData(requestBody);

                const nextProfile = { ...profile };
                if (modalType === "nickname") nextProfile.nickname = tempValue;
                if (modalType === "gender") nextProfile.gender = tempValue;
                if (modalType === "generation") nextProfile.generation = tempValue;
                setProfile(nextProfile);

                if (modalType === "nickname") {
                    localStorage.setItem("nickname", tempValue);
                    window.location.reload();
                }

                closeModal();
            }
        } catch (error) {
            console.error("정보 수정 실패:", error);
            alert("정보 수정 중 오류가 발생했습니다.");
        }
    };

    return (
        <Page>
            <Container>
                <Title>마이페이지</Title>

                <Card>
                    <Row>
                        <Label>닉네임</Label>
                        <Value>{profile.nickname}</Value>
                        <EditBtn onClick={() => openModal("nickname")}>수정</EditBtn>
                    </Row>

                    <Row>
                        <Label>포인트</Label>
                        <Value>
                            {/* 받아온 포인트 표시 */}
                            <PointBadge>⭐ {profile.points} P</PointBadge>
                        </Value>
                        <div />
                    </Row>

                    <Row>
                        <Label>성별</Label>
                        <Value>{profile.gender}</Value>
                        <EditBtn onClick={() => openModal("gender")}>수정</EditBtn>
                    </Row>

                    <Row>
                        <Label>세대</Label>
                        <Value>{profile.generation}</Value>
                        <EditBtn onClick={() => openModal("generation")}>수정</EditBtn>
                    </Row>
                </Card>
            </Container>

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
                                    {["남성", "여성"].map((g) => (
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
                                    {["MZ세대", "기성세대"].map((gen) => (
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

// --- Styled Components ---

const Page = styled.div`
    min-height: 100vh;
    background: #f2f2f2;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
`;

const Container = styled.main`
    max-width: 900px;
    margin: 30px auto;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;

    ${media.mobile} {
        margin: 18px auto;
        padding: 16px;
    }
`;


const Title = styled.h2`
    font-size: 26px;
    font-weight: 900;
    margin-bottom: 18px;

    ${media.mobile} {
        font-size: 22px;
        margin-bottom: 14px;
    }
`;


const Card = styled.div`
    background: white;
    border: 2px solid #cfcfcf;
    border-radius: 14px;
    padding: 22px;
    box-sizing: border-box;

    ${media.mobile} {
        padding: 16px;
    }
`;


const Row = styled.div`
    display: grid;
    grid-template-columns: 140px 1fr auto;
    align-items: center;
    padding: 14px 0;
    border-bottom: 1px solid #eee;
    column-gap: 10px;

    &:last-child {
        border-bottom: none;
    }

    ${media.mobile} {
        grid-template-columns: 1fr auto;  /* 2열로 축소 */
        grid-template-areas:
      "label edit"
      "value value";
        row-gap: 6px;
        padding: 12px 0;
    }
`;

const Label = styled.div`
    font-weight: 900;
    color: #333;

    ${media.mobile} {
        grid-area: label;
        font-size: 14px;
    }
`;

const Value = styled.div`
    font-weight: 700;
    color: #111;

    ${media.mobile} {
        grid-area: value;
        font-size: 15px;
    }
`;


const EditBtn = styled.button`
    padding: 6px 10px;
    border-radius: 8px;
    border: 1px solid #ddd;
    background: #fff;
    font-weight: 800;
    cursor: pointer;
    white-space: nowrap;

    &:hover {
        border-color: #5b4bff;
        color: #5b4bff;
    }

    ${media.mobile} {
        grid-area: edit;
        padding: 6px 8px;
        font-size: 13px;
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
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;

    ${media.mobile} {
        grid-template-columns: 1fr; /* 모바일에서 한줄씩 */
    }
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