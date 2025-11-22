import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import api from '../../api/axios.jsx'

const SignUp = () => {
    const navigate = useNavigate();

    // 초기값을 ""(빈 문자열)로 설정하여 React 경고 방지
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [checkPass, setCheckPass] = useState("");
    const [generation, setGeneration] = useState(0);
    const [nickname, setNickname] = useState()
    const [userSex, setUserSex] = useState()

    const [userIdError, setUserIdError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [matchError, setMatchError] = useState("");
    const [submitError, setSubmitError] = useState("");
    const [nicknameError, setNicknameError] = useState("");

    const ID_REGEX = /^[a-z0-9]{4,12}$/;
    const PW_REGEX = /^[a-zA-Z0-9]{8,20}$/;

    const handleIdChange = (e) => {
        const value = e.target.value;
        setUserId(value);
        setSubmitError("");

        if (value.length > 0 && !ID_REGEX.test(value)) {
            setUserIdError("아이디는 영문 소문자와 숫자 4~12자여야 합니다.");
        } else {
            setUserIdError("");
        }
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        setSubmitError("");

        if (value.length > 0 && !PW_REGEX.test(value)) {
            setPasswordError("비밀번호는 영문과 숫자 포함 8~20자여야 합니다.");
        } else {
            setPasswordError("");
        }
    };

    const handleCheckPasswordChange = (e) => {
        const value = e.target.value;
        setCheckPass(value);
        setSubmitError("");

        if (value.length > 0 && password !== value) {
            setMatchError("비밀번호가 일치하지 않습니다.");
        } else {
            setMatchError("");
        }
    };

    const handleNicknameChange = (e) => {
        const value = e.target.value;
        setNickname(value);
        setSubmitError("");

        if (value.length > 0 && (value.length < 2 || value.length > 10)) {
            setNicknameError("닉네임은 2~10글자 사이여야 합니다.");
        } else {
            setNicknameError("");
        }
    };

    const handleSignUp = async () => {
        if (!userId || !password || !checkPass || !nickname || !userSex) {
            setSubmitError("모든 정보를 입력해주세요.");
            return;
        }

        if (userIdError || passwordError || matchError) {
            setSubmitError("입력 정보를 다시 확인해주세요.");
            return;
        }

        if (generation === 0) {
            setSubmitError("세대를 선택해주세요.");
            return;
        }

        const isMzString = generation === 2 ? "Y" : "N";

        const requestBody = {
            userId: userId,
            userPass: password,
            userIsMz: isMzString,
            userName: nickname,
            userSex: userSex
        };

        try {
            const response = await api.post('/api/auth/signup', requestBody);

            if (response.status === 200 || response.status === 201) {
                console.log("회원가입 성공:", response.data);
                navigate('/signIn');
                console.log(response.data)
            }
        } catch (error) {
            console.error("회원가입 에러:", error);
            const errorMsg = error.response?.data?.message || "회원가입 중 오류가 발생했습니다.";
            setSubmitError(errorMsg);
        }
    }

    return (
        <PageWrapper>
            <Card>
                <Header>
                    <Title>회원가입</Title>
                    <SubTitle>세대 공감 단어 서비스에 오신 걸 환영해요!</SubTitle>
                </Header>

                <FormGroup>
                    <Label>아이디</Label>
                    <Input
                        value={userId}
                        onChange={handleIdChange}
                        placeholder="영문 소문자, 숫자 4~12자"
                        $hasError={!!userIdError}
                    />
                    <ErrorText $visible={!!userIdError}>{userIdError || " "}</ErrorText>
                </FormGroup>

                <FormGroup>
                    <Label>닉네임</Label>
                    <Input
                        value={nickname}
                        onChange={handleNicknameChange}
                        placeholder="닉네임 (2~10자)"
                        $hasError={!!nicknameError}
                    />
                    <ErrorText $visible={!!nicknameError}>{nicknameError || " "}</ErrorText>
                </FormGroup>

                <FormGroup>
                    <Label>비밀번호</Label>
                    <Input
                        value={password}
                        onChange={handlePasswordChange}
                        type="password"
                        placeholder="영문, 숫자 포함 8~20자"
                        $hasError={!!passwordError}
                    />
                    <ErrorText $visible={!!passwordError}>{passwordError || " "}</ErrorText>
                </FormGroup>

                <FormGroup>
                    <Label>비밀번호 확인</Label>
                    <Input
                        value={checkPass}
                        onChange={handleCheckPasswordChange}
                        type="password"
                        placeholder="비밀번호를 다시 입력해주세요"
                        $hasError={!!matchError}
                    />
                    <ErrorText $visible={!!matchError}>{matchError || " "}</ErrorText>
                </FormGroup>

                <FormGroup>
                    <Label>성별</Label>
                    <Row>
                        <SelectButton
                            $active={userSex === "M"}
                            onClick={() => setUserSex("M")}
                        >
                            남성
                        </SelectButton>
                        <SelectButton
                            $active={userSex === "F"}
                            onClick={() => setUserSex("F")}
                        >
                            여성
                        </SelectButton>
                    </Row>
                </FormGroup>

                <FormGroup>
                    <Label>세대 선택</Label>
                    <Row>
                        <SelectButton
                            $active={generation === 1}
                            onClick={() => setGeneration(1)}
                        >
                            기성세대
                        </SelectButton>
                        <SelectButton
                            $active={generation === 2}
                            onClick={() => setGeneration(2)}
                        >
                            MZ세대
                        </SelectButton>
                    </Row>
                </FormGroup>

                <CheckboxRow>
                    <Checkbox type="checkbox" id="terms" />
                    <CheckboxLabel htmlFor="terms">
                        서비스 이용약관 및 개인정보 처리방침에 동의합니다.
                    </CheckboxLabel>
                </CheckboxRow>

                <SubmitErrorBox $visible={!!submitError}>
                    {submitError}
                </SubmitErrorBox>

                <SubmitButton onClick={handleSignUp}>
                    가입하기
                </SubmitButton>

                <FooterText>
                    이미 계정이 있나요? <span onClick={() => navigate('/signIn')}>로그인</span>
                </FooterText>
            </Card>
        </PageWrapper>
    );
};

export default SignUp;

// --- Styled Components ---

const PageWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f3f4f6;
    padding: 20px;

    @media (max-width: 480px) {
        background-color: white;
        align-items: flex-start; /* 모바일에서는 위부터 채움 */
        padding: 0;
    }
`;

const Card = styled.div`
    background: white;
    width: 100%;
    max-width: 460px;
    padding: 40px;
    border-radius: 24px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);

    @media (max-width: 480px) {
        box-shadow: none;
        padding: 24px 20px;
        border-radius: 0;
    }
`;

const Header = styled.div`
    text-align: center;
    margin-bottom: 32px;
`;

const Title = styled.h1`
    font-size: 28px;
    font-weight: 800;
    color: rgb(79, 70, 229);
    margin-bottom: 8px;
`;

const SubTitle = styled.p`
    font-size: 15px;
    color: #6b7280;
    word-break: keep-all;
    line-height: 1.4;
`;

const FormGroup = styled.div`
    margin-bottom: 8px; /* 에러 메시지 공간 포함 조정 */
`;

const Label = styled.label`
    display: block;
    font-size: 14px;
    font-weight: 700;
    color: #374151;
    margin-bottom: 8px;
`;

const Input = styled.input`
    width: 100%;
    padding: 14px 16px;
    border-radius: 12px;
    border: 1px solid ${props => props.$hasError ? '#ef4444' : '#e5e7eb'};
    background-color: #f9fafb;
    font-size: 15px;
    transition: all 0.2s;
    outline: none;

    &::placeholder {
        color: #9ca3af;
    }

    &:focus {
        background-color: white;
        border-color: ${props => props.$hasError ? '#ef4444' : 'rgb(79, 70, 229)'};
        box-shadow: 0 0 0 4px ${props => props.$hasError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(79, 70, 229, 0.1)'};
    }
`;

const ErrorText = styled.div`
    height: 20px; /* 고정 높이로 레이아웃 흔들림 방지 */
    color: #ef4444;
    font-size: 12px;
    font-weight: 500;
    margin-top: 6px;
    margin-left: 4px;
    visibility: ${props => props.$visible ? 'visible' : 'hidden'};
`;

const Row = styled.div`
    display: flex;
    gap: 12px;
    margin-bottom: 24px;
`;

const SelectButton = styled.button`
    flex: 1;
    padding: 14px;
    border-radius: 12px;
    font-weight: 600;
    font-size: 15px;
    cursor: pointer;
    transition: all 0.2s;
    
    background: ${(props) => (props.$active ? 'rgb(79, 70, 229)' : 'white')};
    color: ${(props) => (props.$active ? 'white' : '#4b5563')};
    border: 1px solid ${(props) => (props.$active ? 'rgb(79, 70, 229)' : '#e5e7eb')};
    box-shadow: ${(props) => (props.$active ? '0 4px 6px rgba(79, 70, 229, 0.2)' : 'none')};

    &:hover {
        background: ${(props) => (props.$active ? 'rgb(67, 56, 202)' : '#f3f4f6')};
        transform: translateY(-1px);
    }
    
    &:active {
        transform: translateY(0);
    }
`;

const CheckboxRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 24px;
  padding: 0 4px;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  margin-top: 2px;
  accent-color: rgb(79, 70, 229);
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  font-size: 14px;
  color: #6b7280;
  line-height: 1.4;
  cursor: pointer;
`;

const SubmitErrorBox = styled.div`
  background-color: #fef2f2;
  color: #ef4444;
  padding: ${props => props.$visible ? '12px' : '0'};
  height: ${props => props.$visible ? 'auto' : '0'};
  margin-bottom: ${props => props.$visible ? '16px' : '0'};
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
  font-weight: 600;
  opacity: ${props => props.$visible ? '1' : '0'};
  transition: all 0.2s;
  overflow: hidden;
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: rgb(79, 70, 229);
  color: white;
  padding: 16px 0;
  border-radius: 12px;
  font-weight: 700;
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 6px rgba(79, 70, 229, 0.2);

  &:hover {
    background-color: rgb(67, 56, 202);
    transform: translateY(-1px);
    box-shadow: 0 6px 8px rgba(79, 70, 229, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const FooterText = styled.p`
  text-align: center;
  margin-top: 24px;
  color: #6b7280;
  font-size: 14px;

  span {
    color: rgb(79, 70, 229);
    font-weight: 700;
    margin-left: 4px;
    cursor: pointer;
    text-decoration: underline;
    text-underline-offset: 4px;
    
    &:hover {
        color: rgb(67, 56, 202);
    }
  }
`;