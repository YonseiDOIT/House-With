package HouseWith.hwf.web.JoinMate.Controller;

import HouseWith.hwf.DTO.ArticleDTO;
import HouseWith.hwf.DTO.MemberDTO;
import HouseWith.hwf.Exceptions.RequestExceptioons.IllegalParamException;
import HouseWith.hwf.domain.Article.ArticleRepository;
import HouseWith.hwf.domain.JoinRequest.Custom.JoinStatus;
import HouseWith.hwf.domain.JoinRequest.JoinRequest;
import HouseWith.hwf.domain.JoinRequest.JoinRequestRepository;
import HouseWith.hwf.domain.Member.Member;
import HouseWith.hwf.web.JoinMate.Service.JoinMateService;
import HouseWith.hwf.web.JoinMate.Service.OwnerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("mate")
public class JoinController {
    private final JoinMateService joinMateService;
    private final OwnerService ownerService;

    /**
     * 6/26 -
     * 가입한 멤버들의 목록을 받아오는 로직
     * @param articleId :
     * @return : 어떤 값을 반환할지 아직 미정
     */
    @GetMapping("requests")
    public List<String> getRequests(@RequestParam String articleId) {
        List<Member> members =
                ownerService.getRequest_All(Long.parseLong(articleId));

        List<String> name = new ArrayList<>();
        for (Member member : members) {
            name.add(member.getName());
        }
//        if (name.isEmpty())
//            throw new IllegalParamException("NULL");

        return name;
    }

    /**
     * 6/26 -
     * 원하는 방에 신청하여 WAITING 상태로 방에 소속
     * @param articleId : 글 목록 반환
     * @param memberId : 가입한 멤버
     * @return : 방에 가입 신청
     *
     * 7/8 - 수정 완료
     * 잘못된 쿼리 방향성 잡기
     * 비효율적인 엔티티 및 관계 수정 완료
     *
     * 7/9 - 수정 완료
     * 가입 인원 수 + 1 구현 필요
     * joinRequest 를 추가하기
     */
    @PostMapping("joinMember")
    public ResponseEntity<?> joinMember(@RequestParam long ownerId ,
                                        @RequestParam long articleId ,
                                        @RequestParam long memberId) {
        joinMateService.ToJoin(
                ownerId , articleId , memberId);
        return ResponseEntity.ok("신청 완료");
    }


    /**
     * 7/1 - 구현 완료
     * 가입 수락 / 거절 버튼
     * 가입 희망자 ID , 방 ID 받아오기
     *
     * 7/9 - 수정 완료 , 테스트 완료
     * 예외 처리 완료
     * 예외 처리구문 구현 완료
     */
    @PostMapping("requests/accept")
    public ResponseEntity<?> acceptMember(
            @RequestParam Long articleId,
            @RequestParam Long memberId) {
        ownerService.Request_To_Join(articleId , memberId , JoinStatus.ACCEPTED);

        return ResponseEntity.ok("가입 수락 완료");
    }

    @PostMapping("requests/reject")
    public ResponseEntity<?> rejectMember(
            @RequestParam Long articleId,
            @RequestParam Long memberId) {
        ownerService.Request_To_Join(articleId , memberId , JoinStatus.REJECTED);

        return ResponseEntity.ok("가입 거절 완료");
    }

    /**
     * 7/1 - 구현 완료
     * 매일 새벽 4시에 초기화
     * Transactional 사용해서 cronTab 이 자동적으로 수행 하도록 구성
     *
     * 테스트 하기 힘들어서 이건 보류
     */
    @DeleteMapping
    public void expiration() {
        ownerService.deleteExpiredRequests();
    }

}
