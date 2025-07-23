import { TYPOGRAPHY } from '../../constants/typography';
import { useNavigate } from 'react-router-dom';
import { COLORS } from '../../constants/colors';
import BottomNavigation from '../../components/BottomNavigation';

const Home = () => {
    const navigate = useNavigate();

    // 검색 아이콘 클릭 핸들러
    const handleSearchClick = () => {
        navigate('/homefilter'); 
    };

    // 포스트 데이터
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
        },
        {
            id: 2,
            category: '청연학사',
            categoryColor: 'blue',
            title: '제목',
            description: '같이 얘기하면서 룰 정하고, 서로 존중하며 지내고 싶어요!',
            author: '두잇5팀가족',
            timeAgo: '1일 전',
            memberCount: 1,
            totalCount: 3
        },
        {
            id: 3,
            category: '매지학사',
            categoryColor: 'red',
            title: '제목',
            description: '같이 얘기하면서 룰 정하고, 서로 존중하며 지내고 싶어요!',
            author: '두잇5팀가족',
            timeAgo: '1일 전',
            memberCount: 1,
            totalCount: 3
        }
    ];

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
            <div className='px-4  mb-[33px]'>
                <div className='w-full rounded-xl pl-6 pr-[155px] py-[42px]'
                    style={{ backgroundColor: COLORS.PRIMARY }}
                >
                    <div className='w-full'>
                        <p className={`${TYPOGRAPHY.TITLE1} `}>
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

            <div className="w-full px-[30px]">
                <div className="space-y-[24px]">
                    {posts.map((post) => (
                        <div key={post.id}>

                            {/* 카테고리 태그 */}
                            <div className={`inline-block px-[10px] py-1 rounded-[20px] mb-2 ${TYPOGRAPHY.BODY1}`}
                                style={getCategoryStyle(post.categoryColor)}>
                                {post.category}
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
            </div>

            <BottomNavigation />
            
        </div>
    );
};

export default Home;