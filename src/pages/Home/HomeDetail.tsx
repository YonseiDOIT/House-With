import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TYPOGRAPHY } from '../../constants/typography';
import { useNavigate } from 'react-router-dom';
import { COLORS } from '../../constants/colors';
import Button from '../../components/Button/Button';

const HomeDetail = () => {
    const navigate = useNavigate();




    return (
        <div className="flex flex-col items-start justify-start w-screen max-w-[375px] mx-auto min-h-screen py-6 bg-white">
            <div className="w-full h-[48px] flex items-center justify-start px-4 py-3 mb-1">
                <button
                    onClick={() => navigate(-1)}
                    aria-label="뒤로가기"
                    className="w-8 h-8 px-0 py-0 bg-transparent"
                >
                    <img src="../public/icons/chevron_left.svg" alt="뒤로가기" />
                </button>
            </div>

            <div className="px-5 mb-[29px]">
                <div>
                    <h1 className={`${TYPOGRAPHY.HEADING1}`} style={{ color: COLORS.GRAYSCALE.B }}>
                        제목
                    </h1>
                </div>
            </div>

            <div className="px-6 mb-[23px]">
                <div>
                    <h1 className={`${TYPOGRAPHY.TITLE2}`} style={{ color: COLORS.GRAYSCALE.B }}>
                        생활 학기
                    </h1>
                </div>
            </div>

            <div className="px-6 mb-[45px]">
                <div className="flex gap-2 mb-2">
                    <div
                        style={{
                            backgroundColor: COLORS.GRAYSCALE.B,
                            color: COLORS.GRAYSCALE.F,
                        }}
                        className="px-4 py-2 text-sm border rounded-full"
                    >
                        1학기
                    </div>
                </div>
            </div>

            <div className="px-6 mb-[23px]">
                <div>
                    <h1 className={`${TYPOGRAPHY.TITLE2}`} style={{ color: COLORS.GRAYSCALE.B }}>
                        생활 조건
                    </h1>
                </div>
            </div>

            <div className="px-6 mb-2">
                <div className="flex gap-1">
                    <div
                        style={{
                            backgroundColor: COLORS.GRAYSCALE.B,
                            color: COLORS.GRAYSCALE.F,
                        }}
                        className="px-4 py-2 text-sm border rounded-full"
                    >
                        내향적
                    </div>
                    <div
                        style={{
                            backgroundColor: COLORS.GRAYSCALE.B,
                            color: COLORS.GRAYSCALE.F,
                        }}
                        className="px-4 py-2 text-sm border rounded-full"
                    >
                        12시 이전 취침
                    </div>
                </div>
            </div>

            <div className="px-6 mb-[45px]">
                <div className="flex gap-2 mb-2">
                    <div
                        style={{
                            backgroundColor: COLORS.GRAYSCALE.B,
                            color: COLORS.GRAYSCALE.F,
                        }}
                        className="px-4 py-2 text-sm border rounded-full"
                    >
                        기숙사 내 취식 가능
                    </div>
                </div>
            </div>

            <div className="px-6 mb-[27.5px]">
                <div>
                    <h1 className={`${TYPOGRAPHY.TITLE2}`} style={{ color: COLORS.GRAYSCALE.B }}>
                        소개글
                    </h1>
                </div>
            </div>

            <div className="px-6 mb-[51.5px]">
                <div>
                    <h1 className={`${TYPOGRAPHY.BODY3}`} style={{ color: COLORS.GRAYSCALE.G8 }}>
                        동해물과 백두산이 마르고 닳도록
                    </h1>
                </div>
            </div>

            <div className="px-6 mb-[27.5px]">
                <div>
                    <h1 className={`${TYPOGRAPHY.TITLE2}`} style={{ color: COLORS.GRAYSCALE.B }}>
                        오픈채팅
                    </h1>
                </div>
            </div>

            <div className="px-6 mb-[38.5px]">
                <div>
                    <h1 className={`${TYPOGRAPHY.BODY3}`} style={{ color: COLORS.GRAYSCALE.G8 }}>
                        https://narangsallemalle.kakao
                    </h1>
                </div>
            </div>

            <div className="w-full h-[48px] flex items-center justify-between px-6 py-3 mb-6">
                <div>
                    <h1 className={`${TYPOGRAPHY.TITLE2}`} style={{ color: COLORS.GRAYSCALE.B }}>
                        총 인원
                    </h1>
                </div>

                <div className='flex items-center space-x-3'>
                    <div className="flex space-x-1">
                        <img
                            src="../public/icons/home_house_black.svg"
                            alt="하우스 아이콘"
                            className="w-4 h-[18px]"
                        />
                        <img
                            src="../public/icons/home_house_black.svg"
                            alt="하우스 아이콘"
                            className="w-4 h-[18px]"
                        />
                        <img
                            src="../public/icons/home_house_black.svg"
                            alt="하우스 아이콘"
                            className="w-4 h-[18px]"
                        />
                    </div>
                    <div>
                        <h1 className={`${TYPOGRAPHY.BODY3}`} style={{ color: COLORS.GRAYSCALE.G8 }}>
                            3/3명
                        </h1>
                    </div>
                </div>
            </div>

            <div className="w-full h-[48px] flex items-center px-6 py-2 mb-4">
                <div
                    className="w-12 h-12 rounded-full"
                    style={{ backgroundColor: COLORS.GRAYSCALE.G2 }}
                >
                </div>
                <div className="flex-1 ml-4">
                    <div className="mb-2">
                        <h1 className={`${TYPOGRAPHY.BODY2}`} style={{ color: COLORS.GRAYSCALE.B }}>
                            청연불주먹
                        </h1>
                    </div>
                    <div className="flex-1 mr-1">
                        <div className="flex gap-1">
                            <div
                                style={{
                                    backgroundColor: COLORS.GRAYSCALE.G2,
                                    color: COLORS.GRAYSCALE.G8,
                                }}
                                className={`px-[10px] py-1 border rounded-full ${TYPOGRAPHY.BODY2}`}
                            >
                                규칙적
                            </div>
                            <div
                                style={{
                                    backgroundColor: COLORS.GRAYSCALE.G2,
                                    color: COLORS.GRAYSCALE.G8,
                                }}
                                className={`px-[10px] py-1 border rounded-full ${TYPOGRAPHY.BODY2}`}
                            >
                                아침샤워
                            </div>
                            <div
                                style={{
                                    backgroundColor: COLORS.GRAYSCALE.G2,
                                    color: COLORS.GRAYSCALE.G8,
                                }}
                                className={`px-[10px] py-1 border rounded-full ${TYPOGRAPHY.BODY2}`}
                            >
                                외향적
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            <div className="w-full h-[48px] flex items-center px-6 py-2 mb-10">
                <div
                    className="w-12 h-12 rounded-full"
                    style={{ backgroundColor: COLORS.GRAYSCALE.G2 }}
                >
                </div>
                <div className="flex-1 ml-4">
                    <div className="mb-2">
                        <h1 className={`${TYPOGRAPHY.BODY2}`} style={{ color: COLORS.GRAYSCALE.B }}>
                            닉네임
                        </h1>
                    </div>
                    <div className="flex-1 mr-1">
                        <div className="flex gap-1">
                            <div
                                style={{
                                    backgroundColor: COLORS.GRAYSCALE.G2,
                                    color: COLORS.GRAYSCALE.G8,
                                }}
                                className={`px-[10px] py-1 border rounded-full ${TYPOGRAPHY.BODY2}`}
                            >
                                코골이
                            </div>
                            <div
                                style={{
                                    backgroundColor: COLORS.GRAYSCALE.G2,
                                    color: COLORS.GRAYSCALE.G8,
                                }}
                                className={`px-[10px] py-1 border rounded-full ${TYPOGRAPHY.BODY2}`}
                            >
                                위생민감
                            </div>
                            <div
                                style={{
                                    backgroundColor: COLORS.GRAYSCALE.G2,
                                    color: COLORS.GRAYSCALE.G8,
                                }}
                                className={`px-[10px] py-1 border rounded-full ${TYPOGRAPHY.BODY2}`}
                            >
                                집순이
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            {/* 하단: 버튼 */}
            <div className="flex items-center justify-center w-full h-[64px] px-6">
                <Button size="xl" >
                    지원하기
                </Button>
            </div>

        </div>
    );
};

export default HomeDetail;