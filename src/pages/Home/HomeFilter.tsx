import { useNavigate } from 'react-router-dom';
import { TYPOGRAPHY } from '../../constants/typography';
import { COLORS } from '../../constants/colors';
import { useEffect, useState } from 'react';

const HomeFilter = () => {
  const navigate = useNavigate();

  /* 검색어 */
  const [searchTerm, setSearchTerm] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // 검색어 저장 함수
  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    const updatedHistory = [searchTerm, ...searchHistory.filter(item => item !== searchTerm)];
    setSearchHistory(updatedHistory.slice(0, 10)); // 최대 10개 저장
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory.slice(0, 10)));
    setSearchTerm('');
  };

  // 마운트 시 저장된 검색 내역 불러오기
  useEffect(() => {
    const saved = localStorage.getItem('searchHistory');
    if (saved) {
      setSearchHistory(JSON.parse(saved));
    }
  }, []);

  /* 학사 */
  const [selected, setSelected] = useState(''); // 선택된 학사 저장

  const dorms = [
    ['청연 1학사', '청연 2학사'],
    ['세연 1학사', '세연 2학사', '세연 3학사'],
    ['매지 1학사', '매지 2학사', '매지 3학사'],
  ];

  /* 인원 수 */
  const [selectedCount, setSelectedCount] = useState<number | null>(null);

  const memberOptions = [2, 3];

  /* 생활 조건 */
  const [personality, setPersonality] = useState('');
  const [smoking, setSmoking] = useState('');
  const [sleep, setSleep] = useState('');
  const [meal, setMeal] = useState('');

  /* 초기화 버튼 */
  const handleReset = () => {
    setSelected('');
    setSelectedCount(null);
    setPersonality('');
    setSmoking('');
    setSleep('');
    setMeal('');
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[375px] mx-auto min-h-screen bg-white">
      {/* 상단 헤더 */}
      <div className="w-[375px] h-[48px] flex items-center justify-between px-4 py-3 mt-6 gap-[90px]">
        <button
          onClick={() => navigate(-1)}
          aria-label="뒤로가기"
          className="px-0 py-0 bg-transparent"
        >
          <img src="/icons/chevron_left.svg" alt="뒤로가기" />
        </button>
        <button
          style={{ color: COLORS.PRIMARY }}
          className={`${TYPOGRAPHY.TITLE2} px-0 py-0 bg-transparent`}
        >
          적용
        </button>
      </div>

      {/* 겅색 */}
      <div className="w-[375px] h-[108px]">
        {/* 텍스트 */}
        <div className={`${TYPOGRAPHY.HEADING1} py-[9px] px-5`}>검색</div>

        {/* 검색 input */}
        <div className="flex justify-center w-full h-16">
          <div
            style={{ borderColor: COLORS.GRAYSCALE.G6 }}
            className="w-[335px] h-12 px-3 py-3 border rounded-md flex items-center"
          >
            <img src="/icons/home_search_gray.svg" alt="검색" className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="검색하기"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
              className="w-full ml-2 text-sm placeholder-gray-400 outline-none"
            />
          </div>
        </div>

        {/* 최근 검색 내역 */}
        <div className="px-5">
          <div className={`${TYPOGRAPHY.TITLE2} h-12 py-[9px]`}>최근 검색 내역</div>
          <div className="flex flex-wrap gap-2">
            {searchHistory.map((item, idx) => (
              <div
                key={idx}
                style={{ backgroundColor: COLORS.GRAYSCALE.G2 }}
                className="flex items-center text-sm text-black rounded-full"
              >
                {/* 삭제 버튼 */}
                <button
                  onClick={() => {
                    const updated = searchHistory.filter(v => v !== item);
                    setSearchHistory(updated);
                    localStorage.setItem('searchHistory', JSON.stringify(updated));
                  }}
                  className="flex items-center justify-center px-0 py-0 mx-2 my-2 mr-1 bg-transparent focus:outline-none "
                >
                  <img
                    src="/icons/CircleCross.svg"
                    alt="삭제"
                    className="w-4 h-4 text-black"
                    draggable={false}
                  />
                </button>

                {/* 텍스트 누르면 검색 input에 반영 */}
                <button
                  onClick={() => setSearchTerm(item)}
                  className="px-0 py-0 my-1 mr-3 bg-transparent focus:outline-none"
                >
                  {item}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 필터 */}
        <div className="w-[375px] h-[580px] mt-5">
          {/* 텍스트 */}
          <div className="flex justify-between w-full h-11">
            <div className={`${TYPOGRAPHY.HEADING1} py-[9px] px-5`}>필터</div>
            <button
              onClick={handleReset}
              style={{ color: COLORS.PRIMARY }}
              className={`${TYPOGRAPHY.TITLE2} py-[9px] px-5 bg-transparent`}
            >
              초기화
            </button>
          </div>

          {/* 학사 필터 영역 */}
          <div className="w-full h-[176px] mt-4">
            {/* 텍스트 */}
            <div className={`${TYPOGRAPHY.TITLE2} w-full h-12 py-[9px] px-5`}> 학사</div>
            {/* 학사 */}
            <div className="h-32 px-6">
              {dorms.map((group, i) => (
                <div key={i} className={`flex gap-2 ${i !== 0 ? 'mt-2' : ''}`}>
                  {group.map(dorm => (
                    <button
                      key={dorm}
                      onClick={() => setSelected(dorm)}
                      className={`px-4 py-2 rounded-full text-sm border transition`}
                      style={{
                        backgroundColor:
                          selected === dorm ? COLORS.GRAYSCALE.B : COLORS.GRAYSCALE.G2,
                        color: selected === dorm ? COLORS.GRAYSCALE.F : COLORS.GRAYSCALE.B,
                      }}
                    >
                      {dorm}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* 인원 필터 영역 */}
          <div className="w-full h-[88px] mt-4">
            {/* 텍스트 */}
            <div className={`${TYPOGRAPHY.TITLE2} h-12 py-[9px] px-5`}> 하우스 총 안원 </div>
            {/* 하우스 인원 */}
            <div className="flex w-full h-10 gap-2 px-6">
              {memberOptions.map(count => (
                <button
                  key={count}
                  onClick={() => setSelectedCount(count)}
                  style={{
                    backgroundColor:
                      selectedCount === count ? COLORS.GRAYSCALE.B : COLORS.GRAYSCALE.G2,
                    color: selectedCount === count ? COLORS.GRAYSCALE.F : COLORS.GRAYSCALE.B,
                  }}
                  className="px-4 py-2 text-sm border rounded-full"
                >
                  {count}명
                </button>
              ))}
            </div>
          </div>

          {/* 생활 조건 영역 */}
          <div>
            {/* 텍스트 */}
            <div className={`${TYPOGRAPHY.TITLE2} h-12 py-[9px] px-5 mt-4`}>
              {' '}
              원하는 룸메이트 생활 조건{' '}
            </div>
            {/* 생활 조건 */}
            <div className="w-full h-10 px-6">
              {/* 성격 */}
              <div className="flex gap-2 mb-2">
                {['내향적', '외향적'].map(option => (
                  <button
                    key={option}
                    onClick={() => setPersonality(option)}
                    style={{
                      backgroundColor:
                        personality === option ? COLORS.GRAYSCALE.B : COLORS.GRAYSCALE.G2,
                      color: personality === option ? COLORS.GRAYSCALE.F : COLORS.GRAYSCALE.B,
                    }}
                    className="px-4 py-2 text-sm border rounded-full"
                  >
                    {option}
                  </button>
                ))}
              </div>

              {/* 흡연 여부 */}
              <div className="flex gap-2 mb-2">
                {['흡연자', '비흡연자'].map(option => (
                  <button
                    key={option}
                    onClick={() => setSmoking(option)}
                    style={{
                      backgroundColor:
                        smoking === option ? COLORS.GRAYSCALE.B : COLORS.GRAYSCALE.G2,
                      color: smoking === option ? COLORS.GRAYSCALE.F : COLORS.GRAYSCALE.B,
                    }}
                    className="px-4 py-2 text-sm border rounded-full"
                  >
                    {option}
                  </button>
                ))}
              </div>
              {/* 수면 습관 */}
              <div className="flex gap-2 mb-2">
                {['규칙적인 수면', '불규칙적인 수면'].map(option => (
                  <button
                    key={option}
                    onClick={() => setSleep(option)}
                    style={{
                      backgroundColor: sleep === option ? COLORS.GRAYSCALE.B : COLORS.GRAYSCALE.G2,
                      color: sleep === option ? COLORS.GRAYSCALE.F : COLORS.GRAYSCALE.B,
                    }}
                    className="px-4 py-2 text-sm border rounded-full"
                  >
                    {option}
                  </button>
                ))}
              </div>
              {/* 기숙사 취식 여부 */}
              <div className="flex gap-2 mb-2">
                {['기숙사 내 취식 가능', '기숙사 내 취식 불가'].map(option => (
                  <button
                    key={option}
                    onClick={() => setMeal(option)}
                    style={{
                      backgroundColor: meal === option ? COLORS.GRAYSCALE.B : COLORS.GRAYSCALE.G2,
                      color: meal === option ? COLORS.GRAYSCALE.F : COLORS.GRAYSCALE.B,
                    }}
                    className="px-4 py-2 text-sm border rounded-full"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeFilter;
