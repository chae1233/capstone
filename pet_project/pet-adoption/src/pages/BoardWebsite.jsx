import React, { useState, useEffect } from 'react'; // 1. useEffect 임포트
import { Search, Plus, Eye, MessageSquare, ThumbsUp, ChevronLeft, ChevronRight } from 'lucide-react';

// [수정] react-router-dom이 없는 환경을 위해 <a> 태그를 사용하는 Mock Link 정의
const Link = (props) => {
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  return <a href={props.to} {...props} className={props.className}>{props.children}</a>;
};

// --- CSS Block for Styling ---
const styles = `
/* Color Palette */
/* C1: #F2EDE4 (Background) */
/* C2: #594C3C (Dark Text / Main Focus) */
/* C3: #F2E2CE (Light Accent / Input Border) */
/* C4: #F2CBBD (Warm Accent / Error Border) */
/* C5: #735048 (Accent Color / Links / Buttons) */

.min-h-screen { min-height: 100vh; }
.bg-primary { background-color: #F2EDE4; } /* C1 */
.max-w-7xl { max-width: 80rem; }
.mx-auto { margin-left: auto; margin-right: auto; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }
.py-8 { padding-top: 2rem; padding-bottom: 2rem; }
.py-4 { padding-top: 1rem; padding-bottom: 1rem; }
.py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
.mt-1 { margin-top: 0.25rem; }
.mt-6 { margin-top: 1.5rem; }
.mb-6 { margin-bottom: 1.5rem; }
.gap-4 { gap: 1rem; }
.gap-2 { gap: 0.5rem; }

/* Header */
.header-bg { background-color: white; box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05); border-bottom: 1px solid #F2E2CE; } /* C3 */
.header-title { font-size: 1.5rem; font-weight: 700; color: #735048; } /* C5 */
.header-btn { padding: 0.5rem 1rem; border-radius: 0.5rem; font-weight: 500; transition: background-color 150ms; cursor: pointer; }
.header-btn-login { color: #594C3C; } /* C2 */
.header-btn-register { background-color: #735048; color: white; } /* C5 */
.header-btn-register:hover { background-color: #594C3C; } /* C2 */

/* Category Tabs */
.category-box { background-color: white; border-radius: 0.5rem; box-shadow: 0 1px 3px 0 rgba(0,0,0,0.1); border: 1px solid #F2E2CE; }
.category-btn { padding: 1rem 1.5rem; font-weight: 500; white-space: nowrap; transition: color 150ms, border-color 150ms; cursor: pointer; border-bottom: 2px solid transparent; color: #594C3C; } /* C2 */
.category-btn.active { color: #735048; border-color: #735048; } /* C5 */
.category-btn:hover:not(.active) { color: #735048; }

/* Search and Write */
.search-input-wrapper { position: relative; flex: 1; }
.search-icon { position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); color: #735048; width: 1.25rem; height: 1.25rem; } /* C5 */
.search-input { width: 100%; padding: 0.75rem 1rem 0.75rem 2.5rem; border: 1px solid #F2E2CE; border-radius: 0.5rem; transition: box-shadow 150ms; } /* C3 */
.search-input:focus { outline: none; box-shadow: 0 0 0 2px #F2CBBD; border-color: #735048; } /* C4, C5 */
.write-btn { background-color: #735048; color: white; padding: 0.75rem 1.5rem; border-radius: 0.5rem; transition: background-color 150ms; display: flex; align-items: center; gap: 0.5rem; white-space: nowrap; } /* C5 */
.write-btn:hover { background-color: #594C3C; } /* C2 */

/* Board List */
.board-list-box { background-color: white; border-radius: 0.5rem; box-shadow: 0 1px 3px 0 rgba(0,0,0,0.1); overflow: hidden; border: 1px solid #F2E2CE; }
.table-header { display: none; padding: 1rem 1.5rem; background-color: #F2E2CE; border-bottom: 1px solid #F2CBBD; font-weight: 600; color: #594C3C; } /* C3, C4, C2 */
@media (min-width: 768px) {
  .table-header { display: grid; grid-template-columns: repeat(12, 1fr); gap: 1rem; }
}
.table-col-1 { grid-column: span 1 / span 1; text-align: center; }
.table-col-2 { grid-column: span 2 / span 2; }
.table-col-5 { grid-column: span 5 / span 5; }
.table-col-2-center { grid-column: span 2 / span 2; text-align: center; }

/* Board Item (Row) */
.board-item-row { 
    display: grid; 
    grid-template-columns: repeat(1, minmax(0, 1fr)); 
    gap: 1rem; 
    padding: 1rem 1.5rem; 
    border-bottom: 1px solid #F2EDE4; /* C1 */
    transition: background-color 150ms;
    cursor: pointer;
}
.board-item-row:hover { background-color: #F2E2CE; } /* C3 */
@media (min-width: 768px) {
    .board-item-row { grid-template-columns: repeat(12, 1fr); }
}

/* Notice Item */
.notice-row { background-color: #F2CBBD; border: 1px solid #735048; color: #594C3C; } /* C4, C5, C2 */
.notice-row:hover { background-color: #F2E2CE; } /* C3 */
.notice-label { background-color: #735048; color: white; padding: 0.25rem 0.75rem; border-radius: 0.25rem; font-size: 0.875rem; font-weight: 500; } /* C5 */

/* Column Content Styles */
.col-content { display: flex; align-items: center; font-size: 0.875rem; color: #594C3C; } /* C2 */
.col-content.center { justify-content: center; }
.item-title { font-weight: 500; color: #594C3C; margin-right: 0.5rem; } /* C2 */
.item-link:hover { color: #735048; } /* C5 */
.stat-icon { width: 1rem; height: 1rem; margin-right: 0.25rem; color: #735048; } /* C5 */
.like-stat { color: #735048; } /* C5 */
.comment-stat { color: #594C3C; } /* C2 */
.date-text { color: #735048; } /* C5 */
.empty-message { text-align: center; padding: 3rem; color: #735048; font-size: 1rem; } /* C5 */


/* Pagination */
.pagination-container { display: flex; justify-content: center; align-items: center; gap: 0.5rem; margin-top: 1.5rem; }
.pagination-btn { padding: 0.5rem; border-radius: 0.5rem; border: 1px solid #F2E2CE; transition: background-color 150ms; cursor: pointer; } /* C3 */
.pagination-btn:hover:not(:disabled) { background-color: #F2E2CE; } /* C3 */
.pagination-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.page-number-btn { width: 2.5rem; height: 2.5rem; border-radius: 0.5rem; font-weight: 500; transition: background-color 150ms, color 150ms; border: 1px solid #F2E2CE; } /* C3 */
.page-number-btn.active { background-color: #735048; color: white; border-color: #735048; } /* C5 */
.page-number-btn:hover:not(.active) { background-color: #F2E2CE; } /* C3 */


/* Footer */
.footer-bg { background-color: #594C3C; color: white; margin-top: 3rem; padding-top: 2rem; padding-bottom: 2rem; } /* C2 */
.footer-text { color: #F2E2CE; font-size: 0.875rem; } /* C3 */

`;
// --- End CSS Block ---

// 서버 연결 실패 시 사용할 임시 더미 데이터 (게시판이 비어 보이지 않게)
const fallbackPosts = [
  { id: 101, title: '📢 필독! 커뮤니티 이용 규칙 안내', author: '관리자', category: '공지사항', createdAt: '2024-11-10T00:00:00.000Z', views: 520, likes: 15, comments: 5, isNotice: true },
  { id: 102, title: '🤔 반려동물에게 가장 좋은 사료는 무엇일까요?', author: '고민러', category: '질문답변', createdAt: '2024-11-13T10:30:00.000Z', views: 120, likes: 5, comments: 2 },
  { id: 103, title: '우리집 고양이 자랑 (사진 첨부)', author: '집사1호', category: '자유게시판', createdAt: '2024-11-13T09:00:00.000Z', views: 250, likes: 25, comments: 10 },
  { id: 104, title: '강아지 입양 후 필수 준비물 리스트', author: '정보봇', category: '자유게시판', createdAt: '2024-11-12T15:00:00.000Z', views: 400, likes: 30, comments: 8 },
  { id: 105, title: 'FAQ: 입양 절차는 어떻게 되나요?', author: '시스템', category: 'FAQ', createdAt: '2024-11-11T12:00:00.000Z', views: 90, likes: 2, comments: 1 },
];


export default function BoardWebsite() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [posts, setPosts] = useState([]); 

  const categories = ['전체', '공지사항', '자유게시판', '질문답변', 'FAQ'];

  // 서버에서 데이터를 가져오거나 실패 시 더미 데이터를 설정하는 useEffect
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // 🌟 [재수정] API 호출 주소를 명시적인 localhost로 다시 변경 (CORS 문제 회피) 🌟
        const response = await fetch('http://localhost:3001/api/posts');
        
        if (!response.ok) {
          throw new Error('서버에서 데이터를 가져오지 못했습니다.');
        }
        
        const dbData = await response.json(); 

        const formattedData = dbData.map(post => ({
          ...post, 
          category: post.category || '자유게시판',
          date: post.createdAt ? post.createdAt.slice(0, 10) : '날짜없음', 
          views: post.views || 0,
          likes: post.likes || 0,
          comments: post.comments || 0,
          isNotice: post.isNotice || false,
        }));

        setPosts(formattedData.length > 0 ? formattedData : fallbackPosts); // 데이터가 없으면 더미 데이터 사용

      } catch (error) {
        console.error("게시글 로딩 실패:", error);
        setPosts(fallbackPosts); // 에러 발생 시 더미 데이터 사용
      }
    };

    fetchPosts();
  }, []); 

  
  const postsPerPage = 10;

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === '전체' || post.category === selectedCategory;
    const matchesSearch = (post.title && typeof post.title === 'string' && post.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (post.author && typeof post.author === 'string' && post.author.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const noticePosts = filteredPosts.filter(post => post.isNotice);
  const regularPosts = filteredPosts.filter(post => !post.isNotice);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = regularPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(regularPosts.length / postsPerPage);

  // 게시글 클릭 핸들러 (전체 줄 클릭 시 이동)
  const handlePostClick = (postId) => {
    // 🌟 window.location.href를 사용하여 페이지 이동 시뮬레이션
    window.location.href = `/board/${postId}`;
  };


  return (
    <>
    <style>{styles}</style>
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <header className="header-bg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="header-title">커뮤니티 게시판</h1>
            <div className="flex items-center gap-4">
              <button className="header-btn header-btn-login">로그인</button>
              <button className="header-btn header-btn-register">
                회원가입
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Category Tabs */}
        <div className="category-box mb-6">
          <div className="flex border-b overflow-x-auto">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1);
                }}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Search and Write Button */}
        <div className="flex gap-4 mb-6">
          <div className="search-input-wrapper">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="제목, 작성자로 검색하세요"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="search-input"
            />
          </div>
          <Link to="/board/write" 
            className="write-btn"
          >
            <Plus className="w-5 h-5" />
            글쓰기
          </Link>
        </div>

        {/* Board List */}
        <div className="board-list-box">
          {/* Table Header */}
          <div className="table-header">
            <div className="table-col-1">번호</div>
            <div className="table-col-2">카테고리</div>
            <div className="table-col-5">제목</div>
            <div className="table-col-2">작성자</div>
            <div className="table-col-1 table-col-2-center">조회</div>
            <div className="table-col-1 table-col-2-center">날짜</div>
          </div>

          {/* Notice Posts (공지사항 렌더링) */}
          {noticePosts.map(post => (
            <div
              key={post.id}
              className="board-item-row notice-row"
              onClick={() => handlePostClick(post.id)} // 🌟 전체 줄 클릭 핸들러
            >
               <div className="table-col-1 col-content center">
                 <span className="notice-label">공지</span>
               </div>
               <div className="table-col-2 col-content">
                 <span className="text-sm font-medium" style={{color: '#735048'}}>{post.category}</span>
               </div>
               <div className="table-col-5 col-content gap-2">
                 <span className="item-title">{post.title}</span> {/* Link 제거 */}
                 <span className="flex items-center gap-1 text-sm comment-stat">
                   <MessageSquare className="stat-icon" />
                   {post.comments}
                 </span>
               </div>
               <div className="table-col-2 col-content text-sm">{post.author}</div>
               <div className="table-col-1 col-content center text-sm">
                 <Eye className="stat-icon" />
                 {post.views}
               </div>
               <div className="table-col-1 col-content center text-sm date-text">
                 {post.date ? post.date.slice(5) : (post.createdAt ? post.createdAt.slice(5, 10) : '날짜없음')}
               </div>
            </div>
          ))}

          {/* Regular Posts (일반 게시글 렌더링) */}
          {currentPosts.map(post => (
            <div
              key={post.id}
              className="board-item-row"
              onClick={() => handlePostClick(post.id)} // 🌟 전체 줄 클릭 핸들러
            >
              <div className="table-col-1 col-content center text-gray-500">
                {post.id}
              </div>
              <div className="table-col-2 col-content">
                <span className="text-sm">{post.category}</span>
              </div>
              <div className="table-col-5 col-content gap-2">
                <span className="item-title">{post.title}</span> {/* Link 제거 */}
                <span className="flex items-center gap-1 text-sm comment-stat">
                  <MessageSquare className="stat-icon" />
                  {post.comments}
                </span>
                <span className="flex items-center gap-1 text-sm like-stat">
                  <ThumbsUp className="stat-icon" />
                  {post.likes}
                </span>
              </div>
              <div className="table-col-2 col-content text-sm">{post.author}</div>
              <div className="table-col-1 col-content center text-sm text-gray-500">
                {post.views}
              </div>
              <div className="table-col-1 col-content center text-sm date-text">
                {post.date ? post.date.slice(5) : (post.createdAt ? post.createdAt.slice(5, 10) : '날짜없음')}
              </div>
            </div>
          ))}
          
          {/* 게시글이 없을 때 표시 */}
          {posts.length === 0 && (
            <div className="empty-message">
              아직 등록된 게시글이 없습니다.
            </div>
          )}

        </div>

        {/* Pagination */}
        <div className="pagination-container">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`page-number-btn ${currentPage === i + 1 ? 'active' : ''}`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer-bg">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="footer-text">© 2024 커뮤니티 게시판. All rights reserved.</p>
        </div>
      </footer>
    </div>
    </>
  );
}