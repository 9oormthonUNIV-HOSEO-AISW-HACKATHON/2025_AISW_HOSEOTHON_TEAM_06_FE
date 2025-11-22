import logo from "../assets/logo.png";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useRef, useEffect, useCallback } from "react";
import api from '../api/axios.jsx'

const Header = () => {
    const nav = useNavigate();
    const { isLoggedIn, logout } = useAuth();

    const [username, setUsername] = useState("사용자");
    const [userPoint, setUserPoint] = useState(0);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const fetchUserInfo = useCallback(async () => {
        if (!isLoggedIn) return;

        try {
            const response = await api.get("/api/auth/myPage");
            const data = response.data;
            const displayName = data.userNickname || data.userName || "사용자";
            setUsername(displayName);

            const pointResponse = await api.get("/api/auth/myPoint");
            setUserPoint(pointResponse.data);

        } catch (error) {
            console.error(error);
        }
    }, [isLoggedIn]);

    useEffect(() => {
        fetchUserInfo();

        const handlePointUpdate = () => {
            fetchUserInfo();
        };

        window.addEventListener("pointUpdated", handlePointUpdate);

        return () => {
            window.removeEventListener("pointUpdated", handlePointUpdate);
        };
    }, [fetchUserInfo]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        logout();
        nav("/");
    };

    const handleMyPage = () => {
        setIsDropdownOpen(false);
        nav("/mypage");
    };

    return(
        <HeaderDiv>
            <LogoImg src={logo} alt="logo" onClick={() => nav("/")} />
            <HeaderActions>
                {isLoggedIn ? (
                    <>
                        <PointBadge>
                            ⭐ {userPoint} P
                        </PointBadge>

                        <UserMenuContainer ref={dropdownRef}>
                            <UserTrigger onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                <Name>{username}</Name>님 ▼
                            </UserTrigger>

                            {isDropdownOpen && (
                                <DropdownMenu>
                                    <MenuItem onClick={handleMyPage}>마이페이지</MenuItem>
                                    <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
                                </DropdownMenu>
                            )}
                        </UserMenuContainer>
                    </>
                ) : (
                    <>
                        <Btn className="outline" onClick={() => nav("/signUp")}>회원가입</Btn>
                        <Btn className="outline" onClick={() => nav("/signIn")}>로그인</Btn>
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
    position: relative;
    z-index: 100;
`;

const HeaderActions = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

const UserMenuContainer = styled.div`
    position: relative;
`;

const PointBadge = styled.div`
    background-color: #f3f1ff;
    color: #5b4bff;
    padding: 8px 12px;
    border-radius: 20px;
    font-weight: 800;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 4px;
    white-space: nowrap;
`;

const UserTrigger = styled.div`
    font-size: 15px;
    color: #333;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 8px;
    border-radius: 8px;
    transition: background-color 0.2s;
    user-select: none;

    &:hover {
        background-color: #f3f4f6;
    }
`;

const Name = styled.span`
    font-weight: 800;
    color: #4f46e5;
    margin-right: 4px;
`;

const DropdownMenu = styled.div`
    position: absolute;
    top: 120%;
    right: 0;
    background: white;
    border: 1px solid #eee;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    width: 120px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    z-index: 101;
`;

const MenuItem = styled.button`
    background: white;
    border: none;
    padding: 12px 16px;
    text-align: left;
    font-size: 14px;
    color: #333;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #f9fafb;
        color: #4f46e5;
    }

    &:not(:last-child) {
        border-bottom: 1px solid #f3f4f6;
    }
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
        border: 1px solid #e5e7eb;
    }
`;

const LogoImg = styled.img`
    width: 36px;
    height: 36px;
    object-fit: contain;
    cursor: pointer;
`;

export default Header;