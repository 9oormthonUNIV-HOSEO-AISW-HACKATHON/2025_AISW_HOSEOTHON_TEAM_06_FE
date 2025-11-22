import {useState} from 'react';
import styled from 'styled-components';
import {useNavigate} from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState();
    const [password, setPassword] = useState();
    const [checkPass, setCheckPass] = useState();
    const [generation, setGeneration] = useState(0);
    
    const [err, setErr] = useState("");

    const handleIdChange = (e) => { setUserId(e.target.value); }
    const handlePasswordChange = (e) => { setPassword(e.target.value) }
    const handleCheckPasswordChange = (e) => { setCheckPass(e.target.value) }

    const SignUpButton = () => {
    //     TODO: 요청 보내기
        setErr("미구현")
    }

    return (
        <Container>
            <Title>회원가입</Title>
            <SubTitle>세대 공감 단어 서비스에 오신 걸 환영해요!</SubTitle>

            <Label>아이디</Label>
            <Input value={userId} onChange={handleIdChange} placeholder="아이디를 입력하세요" />

            <Label>비밀번호</Label>
            <Input value={password} onChange={handlePasswordChange} type="password" placeholder="비밀번호를 입력하세요" />

            <Label>비밀번호 확인</Label>
            <Input value={checkPass} onChange={handleCheckPasswordChange} type="password" placeholder="비밀번호를 다시 입력하세요" />

            <Label>세대 선택</Label>
            <Row>
                <SelectButton $active={generation === 1} onClick={() => setGeneration(1)}>기성세대</SelectButton>
                <SelectButton $active={generation === 2} onClick={() => setGeneration(2)}>MZ세대</SelectButton>
            </Row>

            <CheckboxRow>
                <input type="checkbox" />
                <CheckboxLabel>
                    서비스 이용약관 및 개인정보 처리방침에 동의합니다.
                </CheckboxLabel>
            </CheckboxRow>

            <ErrorText $visible={!!err}>
                {err || "　"} {/* 내용이 없으면 높이 유지를 위한 더미 텍스트 */}
            </ErrorText>
            <SubmitButton onClick={SignUpButton}>회원가입 완료</SubmitButton>

            <FooterText>
                이미 계정이 있나요? <span onClick={() => navigate('/signIn')}>로그인</span>
            </FooterText>
        </Container>
    );
};

const ErrorText = styled.p`
    color: #ff4b4b;
    font-size: 14px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 12px;
`;

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 10px;
  font-size: 32px;
  font-weight: 800;
`;

const SubTitle = styled.p`
  text-align: center;
  margin-bottom: 40px;
  color: #666;
`;

const Label = styled.label`
  font-weight: 700;
  margin-bottom: 6px;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  border-radius: 10px;
  border: 1px solid #ddd;
  margin-bottom: 22px;
  font-size: 15px;

  &:focus {
    outline: none;
    border-color: #6a5acd;
  }
`;

const Row = styled.div`
  display: flex;
  gap: 14px;
  margin-bottom: 22px;
`;

const SelectButton = styled.button`
    flex: 1;
    padding: 14px 16px;
    border-radius: 10px;
    font-weight: 700;
    cursor: pointer;
    transition: 0.2s;

    background: ${(props) => (props.$active ? '#5b4bff' : 'white')};
    color: ${(props) => (props.$active ? 'white' : '#333')};
    border: 1px solid ${(props) => (props.$active ? '#5b4bff' : '#ddd')};

    &:hover {
        background: ${(props) => (props.$active ? '#4d3ef8' : '#f0f0ff')};
    }
`;

const CheckboxRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 30px;
`;

const CheckboxLabel = styled.label`
  font-size: 14px;
  color: #555;
`;

const SubmitButton = styled.button`
  width: 100%;
  background: #5b4bff;
  color: white;
  padding: 16px 0;
  border-radius: 10px;
  font-weight: 700;
  font-size: 17px;
  border: none;
  cursor: pointer;

  &:hover {
    background: #4d3ef8;
  }
`;

const FooterText = styled.p`
  text-align: center;
  margin-top: 20px;
  color: #555;

  span {
    color: #5b4bff;
    font-weight: 700;
    text-decoration: none;
    cursor: pointer;
  }
`;

export default SignUp;
