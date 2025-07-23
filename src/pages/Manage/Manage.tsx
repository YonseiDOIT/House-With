import React, { useState } from 'react';
import { TYPOGRAPHY } from '../../constants/typography';
import { useNavigate } from 'react-router-dom';
import { COLORS } from '../../constants/colors';
import BottomNavigation from '../../components/BottomNavigation';



const Manage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'manage' | 'history'>('manage'); // 상태를 메인 컴포넌트로 이동
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState<number | null>(null);


    const handleTabClick = (tab: 'manage' | 'history') => {
        setActiveTab(tab);
        // 필요시 추가 로직
    };

    const handleDotsClick = (postId: number) => {
        setSelectedPostId(postId);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedPostId(null);
    };

    const handleEdit = () => {
        console.log('수정하기 클릭');
        setIsModalOpen(false);
        // 수정 로직 추가
    };

    const handleDelete = () => {
        console.log('삭제하기 클릭');
        setIsModalOpen(false);
        // 삭제 로직 추가
    };

    const posts = [
        {
            id: 1,
            category: '세연학사',
            categoryColor: 'green',
            title: '소통 잘 되는 룸메 원해요',
            description: '같이 얘기하면서 룰 정하고, 서로 존중하며 지내고 싶어요!',
            author: '두잇5팀가족',
            timeAgo: '1일 전',
            memberCount: 1,
            totalCount: 3
        }
    ]

    // 카테고리 색상 함수
    const getCategoryStyle = (color: string) => {
        const styles: { [key: string]: { backgroundColor: string; color: string } } = {
            green: { backgroundColor: COLORS.SECONDARY.HW_Green1, color: COLORS.SECONDARY.HW_Green2 },
            blue: { backgroundColor: COLORS.SECONDARY.HW_Blue1, color: COLORS.SECONDARY.HW_Blue2 },
            red: { backgroundColor: COLORS.SECONDARY.HW_Red1, color: COLORS.SECONDARY.HW_Re2 }
        };
        return styles[color] || styles.green;
    };

    return (
        <div className="relative flex flex-col items-start justify-start w-screen max-w-[375px] mx-auto min-h-screen py-6 bg-white">
            {/* 앱바 영역*/}
            <div className="w-full h-[48px] flex items-center justify-between px-[16px] py-[5.5px] mb-3">
                <div>
                    <p className={`${TYPOGRAPHY.HEADING2}`} style={{ color: COLORS.GRAYSCALE.B }}>
                        관리
                    </p>
                </div>
                <div>
                    <img
                        src="../public/icons/appbar_user.svg"
                        alt="앱바 유저 아이콘"
                        className="w-[19px] h-[19px]"
                    />
                </div>
            </div>

            {/* 탭 네비게이션 */}
            <div className="bg-white w-full mb-6">
                <div className="flex">
                    <button
                        onClick={() => handleTabClick('manage')}
                        className="flex-1 pb-3 text-center bg-white border-b-2 border-transparent"
                    >
                        <div className={`${TYPOGRAPHY.TITLE1} pb-[10px] ${activeTab === 'manage'
                            ? 'border-b-2 border-orange-500 '
                            : ''
                            }`} style={{
                                color: activeTab === 'manage'
                                    ? COLORS.PRIMARY
                                    : COLORS.GRAYSCALE.G4
                            }}>
                            관리하기
                        </div>
                    </button>
                    <button
                        onClick={() => handleTabClick('history')}
                        className="flex-1 pb-3 text-center bg-white border-b-2 border-transparent"
                    >
                        <div className={`${TYPOGRAPHY.TITLE1} pb-[10px] ${activeTab === 'history'
                            ? 'border-b-2 border-orange-500 '
                            : ''
                            }`} style={{
                                color: activeTab === 'history'
                                    ? COLORS.PRIMARY
                                    : COLORS.GRAYSCALE.G4
                            }}>
                            하우스 내역
                        </div>
                    </button>
                </div>
            </div>

            {/* 탭 내용 */}
            <div className="flex-1 w-full">
                {activeTab === 'manage' ? (
                    <div><div className="w-full px-[30px]">
                        <div className="space-y-[24px]">
                            {posts.map((post) => (
                                <div key={post.id} className="relative">

                                    {/* 카테고리 태그 */}
                                    <div className='flex justify-between items-center relative'>
                                        <div className={`inline-block px-[10px] py-1 rounded-[20px] mb-2 ${TYPOGRAPHY.BODY1}`}
                                            style={getCategoryStyle(post.categoryColor)}>
                                            {post.category}
                                        </div>
                                        <div className="relative">
                                            <img src="../public/icons/vertical_dots.svg"
                                                alt="점 세개"
                                                onClick={() => handleDotsClick(post.id)}
                                            />
                                            {/* 모달 */}
                                            {isModalOpen && selectedPostId === post.id && (
                                                <>
                                                    {/* 백드롭 */}
                                                    <div
                                                        className="fixed inset-0 z-40"
                                                        onClick={handleModalClose}
                                                    />

                                                    {/* 모달 컨텐츠 */}
                                                    <div className="absolute top-full right-0 mt-2 bg-white rounded-[12px] shadow-lg border border-gray-200 z-50 overflow-hidden whitespace-nowrap">
                                                        <div>
                                                            {/* 수정하기 버튼 */}
                                                            <div
                                                                onClick={handleEdit}
                                                                className={`text-left py-3 px-4 hover:bg-gray-50 transition-colors border-b border-gray-100 cursor-pointer ${TYPOGRAPHY.BODY1}`}
                                                                style={{ color: COLORS.GRAYSCALE.B }}
                                                            >
                                                                수정하기
                                                            </div>

                                                            {/* 삭제하기 버튼 */}
                                                            <div
                                                                onClick={handleDelete}
                                                                className={`text-left py-3 px-4 hover:bg-red-50 transition-colors cursor-pointer ${TYPOGRAPHY.BODY1}`}
                                                                style={{ color: COLORS.PRIMARY }}
                                                            >
                                                                삭제하기
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {/* 제목 */}
                                    <div className={`mb-1 ${TYPOGRAPHY.TITLE1}`} style={{ color: COLORS.GRAYSCALE.B }}
                                    >
                                        {post.title}
                                        <span className="ml-1" style={{ color: COLORS.GRAYSCALE.G4 }}>💬</span>
                                    </div>

                                    {/* 설명 */}
                                    <div className={`mb-1 ${TYPOGRAPHY.BODY2}`} style={{ color: COLORS.GRAYSCALE.B }}
                                    >
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
                            ))}
                        </div>
                    </div></div>
                ) : (
                    <div>하우스 내역 컨텐츠</div>
                )}
            </div>

            {/* 플로팅 액션 버튼 */}
            <div className="absolute fixed bottom-20 right-4 z-30">
                <button className="bg-black text-white rounded-full px-5 py-3 flex items-center gap-2 shadow-lg hover:bg-gray-800 transition-colors"
                style={{ borderRadius: '60px' }}
>
                    <span className="text-lg">+</span>
                    <span className={`${TYPOGRAPHY.BODY3}`}>
                        생성하기
                    </span>
                </button>
            </div>

            <BottomNavigation />
        </div>
    );
};

export default Manage;