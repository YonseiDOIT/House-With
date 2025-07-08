package HouseWith.hwf.web.JoinMate.Controller;

import HouseWith.hwf.DTO.ArticleDTO;
import HouseWith.hwf.DTO.MemberDTO;
import HouseWith.hwf.domain.Article.ArticleRepository;
import HouseWith.hwf.domain.JoinRequest.JoinRequest;
import HouseWith.hwf.domain.JoinRequest.JoinRequestRepository;
import HouseWith.hwf.domain.Member.Member;
import HouseWith.hwf.web.JoinMate.Service.JoinMateService;
import HouseWith.hwf.web.JoinMate.Service.OwnerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
@Slf4j
@RequestMapping("mate")
public class JoinController {
    private final JoinMateService joinMateService;
    private final OwnerService ownerService;
    private final ArticleRepository articleRepository;

    /**
     * 6/26 -
     * 가입한 멤버들의 목록을 받아오는 로직
     * @param articleId
     * @return
     */
    @GetMapping("requests")
    public List<Member> getRequests(@RequestParam Long articleId) {
        return ownerService.getRequest_All(articleId);
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
     */
    @PostMapping("joinMember")
    public ResponseEntity<?> joinMember(@RequestParam Long articleId ,
                                        @RequestParam Long memberId) {
        joinMateService.ToJoin(articleId, memberId);
        return ResponseEntity.ok("신청 완료");
    }


    /**
     * 가입 수락 / 거절 버튼
     *
     */
    @PostMapping("requests/accept")
    public ResponseEntity<?> acceptMember(@RequestParam Long memberId ,
                                          @RequestParam String joinStatus) {
        ownerService.Request_To_Join(memberId , joinStatus);

        return ResponseEntity.ok("가입 수락 완료");
    }

    @PostMapping("requests/reject")
    public ResponseEntity<?> rejectMember(@RequestParam Long memberId ,
                                          @RequestParam String joinStatus) {
        ownerService.Request_To_Join(memberId , joinStatus);

        return ResponseEntity.ok("가입 수락 완료");
    }

    /**
     *
     * 매일 새벽 4시에 초기화
     *
     */
    @DeleteMapping
    public void expiration() {
        ownerService.deleteExpiredRequests();
    }

}
