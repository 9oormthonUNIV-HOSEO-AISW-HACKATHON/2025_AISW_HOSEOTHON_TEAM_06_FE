import React from 'react';
import styled from 'styled-components';

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
  border: 1px solid #ddd;
  font-weight: 700;
  background: white;
  cursor: pointer;

  &:hover {
    background: #f0f0ff;
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

  a {
    color: #5b4bff;
    font-weight: 700;
    text-decoration: none;
  }
`;

const SignUp = () => {
  return (
    <Container>
      <Title>회원가입</Title>
      <SubTitle>세대 공감 단어 서비스에 오신 걸 환영해요!</SubTitle>

      {/* 아이디 필드 추가 */}
      <Label>아이디</Label>
      <Input placeholder="아이디를 입력하세요" />

      <Label>비밀번호</Label>
      <Input type="password" placeholder="비밀번호를 입력하세요" />

      <Label>비밀번호 확인</Label>
      <Input type="password" placeholder="비밀번호를 다시 입력하세요" />

      <Label>세대 선택</Label>
      <Row>
        <SelectButton>기성세대</SelectButton>
        <SelectButton>MZ세대</SelectButton>
      </Row>

      <CheckboxRow>
        <input type="checkbox" />
        <CheckboxLabel>
          서비스 이용약관 및 개인정보 처리방침에 동의합니다.
        </CheckboxLabel>
      </CheckboxRow>

      <SubmitButton>회원가입 완료</SubmitButton>

      <FooterText>
        이미 계정이 있나요? <a href="/signin">로그인</a>
      </FooterText>
    </Container>
  );
};

export default SignUp;
