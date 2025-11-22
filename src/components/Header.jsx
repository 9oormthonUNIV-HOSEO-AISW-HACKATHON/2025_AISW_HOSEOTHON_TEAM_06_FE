import logo from "../assets/logo.png";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
    const nav = useNavigate();
    const { isLoggedIn, logout } = useAuth();
    const username = localStorage.getItem('nickname') || "사용자";

    const handleLogout = () => {
        logout();
        nav("/");
    };

    return(
        <HeaderDiv>
            <LogoImg src={logo} alt="logo" onClick={() => nav("/")} />
            <HeaderActions>
                {isLoggedIn ? (
                    <>
                        <WelcomeText>
                            <Name>{username}</Name>님
                        </WelcomeText>
                        <Btn className="outline" onClick={handleLogout}>로그아웃</Btn>
                    </>
                ) : (
                    <>
                        <Btn className="outline" onClick={() => nav("/signup")}>회원가입</Btn>
                        <Btn className="outline" onClick={() => nav("/signin")}>로그인</Btn>
                    </>
                )}
            </HeaderActions>
        </HeaderDiv>
    )
}

const HeaderDiv = styled.header`
    background: white;
    border-bottom: 1px solid #eee;
    padding: 14px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    box-sizing: border-box;
`;

const HeaderActions = styled.div`
    display: flex;
    align-items: center; /* 세로 중앙 정렬 추가 */
    gap: 12px; /* 간격 살짝 넓힘 */
`;

const WelcomeText = styled.div`
    font-size: 15px;
    color: #333;
    margin-right: 4px;
    font-weight: 500;
`;

const Name = styled.span`
  font-weight: 800;
  color: #4f46e5;
  margin-right: 2px;
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
  white-space: nowrap;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(0.95);
  }

  &.outline {
    background: white;
    color: #111;
    border: 1px solid #e5e7eb; /* 테두리 색 살짝 연하게 */
  }
`;

const LogoImg = styled.img`
    width: 36px;
    height: 36px;
    object-fit: contain;
    cursor: pointer;
`

export default Header