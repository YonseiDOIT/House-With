import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TYPOGRAPHY } from '../../constants/typography';
import { useNavigate } from 'react-router-dom';
import { COLORS } from '../../constants/colors';
import BottomNavigation from '../../components/BottomNavigation';

// API 응답 타입 정의
interface PostResponse {
    articleId: number;
    nickname: string;
    owner: number;
    dormitory: string;
    title: string;
    quarter: string;
    join_member_count: number;
    access_max: number;
    comment: string;
    times_Ago: string;
}

// 컴포넌트에서 사용할 Post 타입
interface Post {
    id: number;
    category: string;
    categoryColor: string;
    title: string;
    description: string;
    author: string;
    timeAgo: string;
    memberCount: number;
    totalCount: number;
}

const Home = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // 검색 아이콘 클릭 핸들러
    const handleSearchClick = () => {
        navigate('/homefilter');
    };

   const handleHouseClick = () => {
    navigate('/homedetail');
};

    // 기숙사명에 따른 카테고리 색상 매핑
    const getDormitoryColor = (dormitory: string): string => {
        const colorMap: { [key: string]: string } = {
            '세연학사': 'green',
            '청연학사': 'blue',
            '매지학사': 'red',
            // 필요에 따라 추가
        };
        return colorMap[dormitory] || 'green';
    };

    // API 데이터를 컴포넌트에서 사용할 형태로 변환
    const transformPostData = (apiPosts: PostResponse[]): Post[] => {
        return apiPosts.map(post => ({
            id: post.articleId,
            category: post.dormitory,
            categoryColor: getDormitoryColor(post.dormitory),
            title: post.title,
            description: post.comment,
            author: post.nickname,
            timeAgo: post.times_Ago,
            memberCount: post.join_member_count,
            totalCount: post.access_max
        }));
    };

    // API 호출 함수
    const fetchPosts = async () => {
        try {
            setLoading(true);
            setError(null);


            const response = await axios.get<PostResponse[]>('http://ec2-52-78-243-69.ap-northeast-2.compute.amazonaws.com:8080/dormitory/list');

            const transformedPosts = transformPostData(response.data);
            setPosts(transformedPosts);
        } catch (err) {
            console.error('포스트 조회 실패:', err);
            setError('포스트를 불러오는데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    // 컴포넌트 마운트 시 API 호출
    useEffect(() => {
        fetchPosts();
    }, []);

    // 카테고리 색상 함수
    const getCategoryStyle = (color: string) => {
        const styles: { [key: string]: { backgroundColor: string; color: string } } = {
            green: { backgroundColor: COLORS.SECONDARY.HW_Green1, color: COLORS.SECONDARY.HW_Green2 },
            blue: { backgroundColor: COLORS.SECONDARY.HW_Blue1, color: COLORS.SECONDARY.HW_Blue2 },
            red: { backgroundColor: COLORS.SECONDARY.HW_Red1, color: COLORS.SECONDARY.HW_Re2 }
        };
        return styles[color] || styles.green;
    };

    // 로딩 상태 렌더링
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center w-screen max-w-[375px] mx-auto min-h-screen bg-white">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
                    <p className={`${TYPOGRAPHY.BODY1}`} style={{ color: COLORS.GRAYSCALE.G4 }}>
                        로딩 중...
                    </p>
                </div>
            </div>
        );
    }

    // 에러 상태 렌더링
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center w-screen max-w-[375px] mx-auto min-h-screen bg-white">
                <div className="text-center px-4">
                    <p className={`${TYPOGRAPHY.BODY1} mb-4`} style={{ color: COLORS.GRAYSCALE.B }}>
                        {error}
                    </p>
                    <button
                        onClick={fetchPosts}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        다시 시도
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-start justify-start w-screen max-w-[375px] mx-auto min-h-screen py-6 bg-white">
            {/* 앱바 영역*/}
            <div className="w-full h-[48px] flex items-center justify-between px-[18px] py-[5.5px] mb-4">
                <div>
                    <img
                        src="../public/logo/home_logo.svg"
                        alt="house with 로고"
                        className="w-[105px] h-[37px]"
                    />
                </div>
                <div className='flex items-center space-x-2'>
                    <button
                        onClick={handleSearchClick}
                        className="p-1 bg-transparent"
                        aria-label="검색"
                    >
                        <img
                            src="../public/icons/home_search_black.svg"
                            alt="앱바 검색 아이콘"
                            className="w-5 h-5"
                        />
                    </button>
                    <img
                        src="../public/icons/home_alarm_disabled.svg"
                        alt="앱바 알림 아이콘"
                        className="w-[18px] h-5"
                    />
                </div>
            </div>

            <div className='px-4 mb-[33px]'>
                <div className='w-full rounded-xl pl-6 pr-[155px] py-[42px]'
                    style={{ backgroundColor: COLORS.PRIMARY }}
                >
                    <div className='w-full'>
                        <p className={`${TYPOGRAPHY.TITLE1}`}>
                            대화 전에 꼭 확인해보세요<br />
                            내 생활패턴 체크리스트 👀
                        </p>
                    </div>
                </div>
            </div>

            <div className='mx-5 mb-[33px]'>
                <p className={`${TYPOGRAPHY.HEADING1}`} style={{ color: COLORS.GRAYSCALE.B }}>
                    하우스 둘러보기
                </p>
            </div>

            {/* 스크롤 가능한 컨텐츠 영역 */}
            <div className="flex-1 w-full overflow-y-auto pb-20">
                <div className="px-[30px]">
                    <div className="space-y-[24px]">
                        {posts.length > 0 ? (
                            posts.map((post) => (
                                <div
                                    key={post.id}
                                    className="cursor-pointer hover:bg-gray-50 active:bg-gray-100 p-2 rounded-lg transition-colors"
                                    onClick={handleHouseClick}
                                >
                                    {/* 카테고리 태그 */}
                                    <div className={`inline-block px-[10px] py-1 rounded-[20px] mb-2 ${TYPOGRAPHY.BODY1}`}
                                        style={getCategoryStyle(post.categoryColor)}>
                                        {post.category}
                                    </div>

                                    {/* 제목 */}
                                    <div className={`mb-1 ${TYPOGRAPHY.TITLE1}`} style={{ color: COLORS.GRAYSCALE.B }}>
                                        {post.title}
                                        <span className="ml-1" style={{ color: COLORS.GRAYSCALE.G4 }}>💬</span>
                                    </div>

                                    {/* 설명 */}
                                    <div className={`mb-1 ${TYPOGRAPHY.BODY2}`} style={{ color: COLORS.GRAYSCALE.B }}>
                                        {post.description}
                                    </div>

                                    {/* 메타 정보 */}
                                    <div className={`mb-1 ${TYPOGRAPHY.BODY2} flex items-center`}
                                        style={{ color: COLORS.GRAYSCALE.B }}>
                                        {post.author} • {post.timeAgo} •
                                        <img src="../public/icons/home_house_black.svg"
                                            alt="집 아이콘"
                                            className="w-[7px] h-[8px] mx-1" />
                                        {post.memberCount}/{post.totalCount}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8">
                                <p className={`${TYPOGRAPHY.BODY1}`} style={{ color: COLORS.GRAYSCALE.G4 }}>
                                    등록된 게시글이 없습니다.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <BottomNavigation />
        </div>
    );
};

export default Home;