import React, { useState } from 'react';
// import { Link } from 'react-router-dom'; // <--- react-router-dom 사용 대신 자체 Link 정의
import { PawPrint, LogOut, User, LogIn, UserPlus } from 'lucide-react';

// [수정] react-router-dom이 없는 환경을 위해 <a> 태그를 사용하는 Mock Link 정의
const Link = (props) => {
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    return <a href={props.to} {...props} className={props.className}>{props.children}</a>;
};

// --- CSS Block for Styling ---
const styles = `
.nav-bar {
    background-color: white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    position: sticky;
    top: 0;
    z-index: 50;
    height: 4rem; /* h-16 */
}
.nav-max-width {
    max-width: 1280px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 1rem;
    padding-right: 1rem;
}
@media (min-width: 640px) { /* sm:px-6 */
    .nav-max-width {
        padding-left: 1.5rem;
        padding-right: 1.5rem;
    }
}
@media (min-width: 1024px) { /* lg:px-8 */
    .nav-max-width {
        padding-left: 2rem;
        padding-right: 2rem;
    }
}

.nav-flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 4rem; /* h-16 */
}

/* Logo and Main Menu */
.logo-group {
    display: flex;
    align-items: center;
}
.logo-link {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #735048; /* C5: Accent Color */
    text-decoration: none;
}
.logo-text {
    font-weight: 700;
    font-size: 1.25rem; /* text-xl */
}
.desktop-menu {
    display: none;
}
@media (min-width: 768px) { /* md:ml-10 md:flex */
    .desktop-menu {
        display: flex;
        margin-left: 2.5rem;
        gap: 2rem; /* space-x-8 */
    }
}
.menu-link {
    color: #594C3C; /* C2: Dark Text */
    padding: 0.5rem 0.75rem; /* px-3 py-2 */
    border-radius: 0.375rem;
    font-size: 0.875rem; /* text-sm */
    font-weight: 500;
    transition: color 150ms, background-color 150ms;
    text-decoration: none;
}
.menu-link:hover {
    color: #735048; /* C5: Accent Hover */
}

/* Auth Buttons (Desktop) */
.desktop-auth {
    display: none;
    align-items: center;
    gap: 1rem; /* space-x-4 */
}
@media (min-width: 768px) {
    .desktop-auth {
        display: flex;
    }
}

.welcome-text {
    font-size: 0.875rem;
    color: #594C3C; /* C2 */
}
.welcome-name {
    font-weight: 600;
    color: #735048; /* C5: Accent */
}

.auth-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: #594C3C; /* C2 */
    transition: color 150ms;
    text-decoration: none;
}
.auth-link:hover {
    color: #735048; /* C5: Accent Hover */
}

/* Logout Button */
.logout-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: #F2EDE4; /* C1: Light BG */
    color: #735048; /* C5: Accent Text */
    padding: 0.5rem 0.75rem;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 500;
    transition: background-color 150ms;
    border: none;
    cursor: pointer;
}
.logout-button:hover {
    background-color: #F2E2CE; /* C3: Lighter Hover */
}

/* Mobile Toggler */
.mobile-toggler {
    display: flex;
    align-items: center;
}
@media (min-width: 768px) {
    .mobile-toggler {
        display: none;
    }
}
.toggler-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    border-radius: 0.375rem;
    color: #594C3C; /* C2 */
    transition: background-color 150ms;
    background-color: transparent;
    border: none;
}
.toggler-button:hover {
    background-color: #F2E2CE; /* C3 */
}
.h-6 { height: 1.5rem; }
.w-6 { width: 1.5rem; }

/* Mobile Menu */
.mobile-menu {
    border-top: 1px solid #F2E2CE; /* C3 */
}
@media (min-width: 768px) {
    .mobile-menu {
        display: none;
    }
}
.mobile-link-group {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    padding-top: 0.5rem;
    padding-bottom: 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}
.mobile-menu-link {
    color: #594C3C;
    padding: 0.5rem 0.75rem;
    border-radius: 0.375rem;
    font-size: 1rem; /* text-base */
    font-weight: 500;
    transition: background-color 150ms;
    display: block;
    text-decoration: none;
}
.mobile-menu-link:hover {
    background-color: #F2E2CE; /* C3 */
    color: #735048;
}

/* Mobile Auth */
.mobile-auth-group {
    padding-top: 1rem;
    padding-bottom: 0.75rem;
    border-top: 1px solid #F2E2CE; /* C3 */
}
.mobile-auth-content {
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}
.mobile-auth-status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}
.mobile-auth-user {
    color: #735048;
    font-size: 0.875rem;
    font-weight: 500;
}
.mobile-mypage-link {
    display: block;
    width: 100%;
    text-align: left;
    padding: 0.5rem 0.75rem;
    border-radius: 0.375rem;
    font-size: 1rem;
    font-weight: 500;
    color: #594C3C;
    transition: background-color 150ms;
    text-decoration: none;
}
.mobile-mypage-link:hover {
    background-color: #F2E2CE;
}
.mobile-logout-button {
    display: block;
    width: 100%;
    text-align: left;
    padding: 0.5rem 0.75rem;
    border-radius: 0.375rem;
    font-size: 1rem;
    font-weight: 500;
    color: #735048; /* C5 for logout */
    transition: background-color 150ms;
    background-color: #F2EDE4; /* C1 */
    border: none;
    cursor: pointer;
}
.mobile-logout-button:hover {
    background-color: #F2CBBD; /* C4 */
}

/* Mobile Login/Register */
.mobile-login-register {
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}
.mobile-login-link {
    display: block;
    width: 100%;
    background-color: #735048; /* C5 */
    color: white;
    text-align: center;
    padding: 0.5rem 0.75rem;
    border-radius: 0.375rem;
    font-size: 1rem;
    font-weight: 500;
    transition: background-color 150ms;
    text-decoration: none;
}
.mobile-login-link:hover {
    background-color: #594C3C; /* C2 */
}
.mobile-register-link {
    display: block;
    width: 100%;
    background-color: #F2E2CE; /* C3 */
    color: #594C3C; /* C2 */
    text-align: center;
    padding: 0.5rem 0.75rem;
    border-radius: 0.375rem;
    font-size: 1rem;
    font-weight: 500;
    transition: background-color 150ms;
    text-decoration: none;
}
.mobile-register-link:hover {
    background-color: #F2CBBD; /* C4 */
}
`;
// --- End CSS Block ---


/**
 * 상단 네비게이션 바 컴포넌트
 * @param {object} props
 * @param {object | null} props.currentUser - App.js에서 전달받은 로그인한 사용자 정보 (null이면 비로그인)
 * @param {function} props.handleLogout - App.js에서 전달받은 로그아웃 함수
 */
export default function Navigation({ currentUser, handleLogout }) {
    // 모바일 햄버거 메뉴를 위한 상태
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // 🌟 로그인 상태 확인: isLoggedIn (boolean) 대신 currentUser (object)가 존재하는지 확인
    const isLoggedIn = !!currentUser;

    const navLinks = [
        { name: '홈', href: '/' },
        { name: '입양하기', href: '/adoption' },
        { name: '커뮤니티', href: '/board' },
        { name: '용품 리뷰', href: '/reviews' },
        { name: '반려일기', href: '/diary' }, // 🌟 PrivateRoute로 보호됨
    ];

    return (
        <>
            <style>{styles}</style>
            <nav className="nav-bar">
                <div className="nav-max-width">
                    <div className="nav-flex">
                        
                        {/* 1. 로고 및 메인 메뉴 */}
                        <div className="logo-group">
                            <Link to="/" className="logo-link">
                                <PawPrint className="w-8 h-8" />
                                <span className="logo-text">행복한 동행</span>
                            </Link>
                            
                            {/* 데스크탑 메인 메뉴 */}
                            <div className="desktop-menu">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.href}
                                        className="menu-link"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* 2. 로그인/로그아웃 버튼 (데스크탑) */}
                        <div className="desktop-auth">
                            {isLoggedIn ? (
                                // 🌟 로그인 상태일 때 (currentUser가 존재함)
                                <>
                                    <span className="welcome-text">
                                        <span className="welcome-name">{currentUser.nickname}</span>님, 환영합니다!
                                    </span>
                                    <Link
                                        to="/mypage"
                                        className="auth-link"
                                    >
                                        <User className="w-4 h-4" />
                                        마이페이지
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="logout-button"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        로그아웃
                                    </button>
                                </>
                            ) : (
                                // 🌟 로그아웃 상태일 때 (currentUser가 null임)
                                <>
                                    <Link
                                        to="/login"
                                        className="auth-link"
                                    >
                                        <LogIn className="w-4 h-4" />
                                        로그인
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="mobile-login-link" // 재사용 가능한 스타일
                                        style={{ backgroundColor: '#735048', color: 'white', padding: '0.5rem 0.75rem', borderRadius: '0.375rem' }}
                                    >
                                        <UserPlus className="w-4 h-4 mr-2" />
                                        회원가입
                                    </Link>
                                </>
                            )}
                        </div>
                        
                        {/* 3. 모바일 햄버거 버튼 */}
                        <div className="mobile-toggler">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="toggler-button"
                                aria-expanded={isMenuOpen}
                                aria-controls="mobile-menu"
                            >
                                <span className="sr-only">메뉴 열기</span>
                                {isMenuOpen ? (
                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                                    </svg>
                                )}
                            </button>
                        </div>

                    </div>
                </div>

                {/* 4. 모바일 메뉴 (펼쳐졌을 때) */}
                <div id="mobile-menu" className={`mobile-menu ${isMenuOpen ? 'block' : 'hidden'}`}>
                    <div className="mobile-link-group">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                onClick={() => setIsMenuOpen(false)} // 🌟 메뉴 클릭 시 닫기
                                className="mobile-menu-link"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                    
                    {/* 모바일 로그인/로그아웃 영역 */}
                    <div className="mobile-auth-group">
                        {isLoggedIn ? (
                            // 🌟 로그인 상태일 때
                            <div className="mobile-auth-content">
                                <div className="mobile-auth-status">
                                    <User className="w-5 h-5" style={{ color: '#735048' }} />
                                    <span className="mobile-auth-user">
                                        {currentUser.nickname}님
                                    </span>
                                </div>
                                <Link
                                    to="/mypage"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="mobile-mypage-link"
                                >
                                    마이페이지
                                </Link>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setIsMenuOpen(false);
                                    }}
                                    className="mobile-logout-button"
                                >
                                    로그아웃
                                </button>
                            </div>
                        ) : (
                            // 🌟 로그아웃 상태일 때
                            <div className="mobile-login-register">
                                <Link
                                    to="/login"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="mobile-login-link"
                                >
                                    로그인
                                </Link>
                                <Link
                                    to="/register"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="mobile-register-link"
                                >
                                    회원가입
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}