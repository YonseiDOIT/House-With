package HouseWith.hwf.web.Dormitory;

import HouseWith.hwf.DTO.ArticleDTO;
import HouseWith.hwf.DTO.JoinRequestDTO;
import HouseWith.hwf.DTO.MemberDTO;
import HouseWith.hwf.DTO.RoomKeywordDTO;
import HouseWith.hwf.Exceptions.RequestExceptioons.ArticleNotFoundException;
import HouseWith.hwf.Exceptions.RequestExceptioons.IllegalJoinStatusException;
import HouseWith.hwf.domain.Article.Article;
import HouseWith.hwf.domain.Article.ArticleRepository;
import HouseWith.hwf.domain.JoinRequest.Custom.JoinStatus;
import HouseWith.hwf.domain.JoinRequest.JoinRequest;
import HouseWith.hwf.domain.JoinRequest.JoinRequestRepository;
import HouseWith.hwf.domain.Keywords.RoomKeyword;
import HouseWith.hwf.domain.Keywords.RoomKeywordRepository;
import HouseWith.hwf.domain.Member.Member;
import HouseWith.hwf.domain.Member.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DormitoryArticleService {
    private final ArticleRepository articleRepository;
    private final MemberRepository memberRepository;
    private final RoomKeywordRepository roomKeywordRepository;
    private final JoinRequestRepository joinRequestRepository;

    @Value("${ErrorCode.Param.INVALID_JOIN_STATUS}")
    private String error_INVALID_STATUS;

    @Value("${ErrorCode.Request.UNAVAILABLE_REQUEST_NULL}")
    private String error_NULL;

    @Value("${ErrorCode.Request.REQUEST_OVERFLOW}")
    private String error_OVERFLOW;

    static String ERROR = "잘못된 요청입니다. ERROR CODE : ";

    /**
     * @param ownerId : 중복 생성을 피하기 위한 파라미터
     * @param articleDTO : 새로 받은 방
     * @param roomKeywordDTO : 새로 받은 키워드
     * @param joinRequestDTO : 새로 받은 join
     * @return : 방 생성 이후 객체에 담아 반환
     *
     * 7/8 - 수정
     * 기존 비효율적인 객체 생성을 줄였고
     * 글 생성 갯수가 초과인 경우 방지 추가
     *
     * 7/8 - 테스트 완료
     *
     * 생성 완료 후 OWNER 의 ownerId 저장하지 않는 문제 수정 필요
     * -> 수정 완료
     * 생성한 사람의 memberId(ownerId) 를 받아오도록 변경
     */
    @Transactional
    public Article createRoom(
            Long ownerId ,
            ArticleDTO articleDTO ,
            RoomKeywordDTO roomKeywordDTO ,
            JoinRequestDTO joinRequestDTO) {

        /**
         * 해당 인물이 작성한 방의 갯수
         * 최대 1개까지 작성 가능하도록 -> 이거 작동 안됨
         */
        long cnt = articleRepository
                .countArticlesByMember(ownerId);

        System.out.println(cnt);
        if (cnt > 1)
            throw new IllegalJoinStatusException(ERROR + error_OVERFLOW + " : 방을 한 개 이상 생성하였습니다.");

        /**
         * 새 방을 설정
         * 7/9 - 방 생성자의 ID 를 받아오는 장치 추가
         */
        Article newRoom = new Article(
                ownerId ,
                articleDTO.getDormitory() ,
                articleDTO.getTitle() ,
                articleDTO.getQuarter() ,
                1 ,
                articleDTO.getAccess_max() ,
                articleDTO.getComment() ,
                articleDTO.getOpen_url()
        );

        RoomKeyword roomKeyword = new RoomKeyword(
                roomKeywordDTO.getDormitory() ,
                roomKeywordDTO.getMotion() ,
                roomKeywordDTO.getSmoke() ,
                roomKeywordDTO.getSleep_time() ,
                roomKeywordDTO.getAvailable_eat()
        );

        JoinRequest joinRequest = new JoinRequest(
                joinRequestDTO.getLocalDateTime() ,
                JoinStatus.OWNER
        );

        //생성한 방과 생성한 사람의 ID 를 저장
        joinRequest.set_Article(newRoom);
        joinRequest.set_Member(memberRepository.findByMemberId(ownerId));

        //키워드와
        newRoom.set_roomKeyword(roomKeyword);
        newRoom.set_joinRequest(joinRequest);


        roomKeywordRepository.save(roomKeyword);
        joinRequestRepository.save(joinRequest);
        articleRepository.save(newRoom);

        return newRoom;
    }

    public Article modifyRoom(
            Long ownerId ,
            Long memberId ,
            ArticleDTO articleDTO ,
            RoomKeywordDTO roomKeywordDTO) {

        JoinStatus status =
                articleRepository.findJoinStatus(ownerId , memberId);

        if (status == null)
            throw new ArticleNotFoundException(ERROR + error_NULL);
        else if (!status.equals(JoinStatus.OWNER))
            throw new IllegalStateException(ERROR + error_INVALID_STATUS);

        Article newRoom =
                articleRepository.findArticlesById(ownerId);
        if (newRoom == null)
            throw new ArticleNotFoundException(ERROR + error_NULL);

        newRoom.update_detail(articleDTO);

        RoomKeyword roomKeyword = newRoom.getRoomKeyword();
        if (roomKeyword == null)
            throw new ArticleNotFoundException(ERROR + error_NULL);
        roomKeyword.update_detail(roomKeywordDTO);

        //키워드 입력
        newRoom.set_roomKeyword(roomKeyword);
        return newRoom;
    }
}
