package HouseWith.hwf.web.JoinMate.Service;

import HouseWith.hwf.Exceptions.RequestExceptioons.IllegalJoinStatusException;
import HouseWith.hwf.Exceptions.RequestExceptioons.MemberNotFoundException;
import HouseWith.hwf.domain.Article.ArticleRepository;
import HouseWith.hwf.domain.JoinRequest.Custom.JoinStatus;
import HouseWith.hwf.domain.JoinRequest.JoinRequest;
import HouseWith.hwf.domain.JoinRequest.JoinRequestRepository;
import HouseWith.hwf.domain.Member.Member;
import HouseWith.hwf.domain.Member.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OwnerService {
    private final MemberRepository memberRepository;
    private final ArticleRepository articleRepository;

    static String ERROR = "사용할 수 없는 요청입니다. ERROR CODE : ";
    private final JoinRequestRepository joinRequestRepository;
    @Value("${ErrorCode.Request.UNAVAILABLE_REQUEST_STATUS}")
    private String request_ERROR;

    @Value("${ErrorCode.Param.INVALID_JOIN_STATUS}")
    private String param_ERROR;

    @Value("${ErrorCode.Request.UNAVAILABLE_REQUEST_NULL}")
    private String error_NULL;


    public List<Member> getRequest_All(Long articleId) {
        return memberRepository
                .findAllRequestByArticleId(articleId);
    }

    /**
     * 컨트롤러에 @Scheduled , @Transactional 붙이지 말기 -> 컨트롤러는 http 요청 처리용이기 때문
     */
    @Scheduled(cron = "0 0 4 * * *")
    @Transactional
    public void deleteExpiredRequests() {
        LocalDateTime threshold = LocalDateTime.now().minusDays(2);
        memberRepository
                .updateOverThreshold(threshold);
    }

    /**
     * @param articleId : 가입 신청한 방의 ID
     * @param memberId : 가입 신청한 사람의 ID
     * @param status : 해당 로직에 맞게 업데이트 될 상태 (WAITING -> ACCEPTED)
     *
     * 7/9 - 수정 완료 + 테스트 완료
     * 중복된 요청에 대한 예외 처리 완료
     * 수락 / 거절 요청 구현 완료
     */

    public void Request_To_Join(
            Long articleId,
            Long memberId ,
            JoinStatus status
    ) {
        //신청자
        Member member =
                memberRepository.findByMemberId(memberId);
        JoinRequest request =
                joinRequestRepository.findByMember(memberId , articleId);

        //신청자의 지원 사항
        JoinStatus joinStatus =
                articleRepository.findJoinStatus(articleId , memberId);

        if (member == null)
            throw new MemberNotFoundException(ERROR + error_NULL + " : 해당 멤버가 존재하지 않습니다.");
        else if (
                request.getJoinStatus() == JoinStatus.REJECTED ||
                request.getJoinStatus() == JoinStatus.ACCEPTED ||
                request.getJoinStatus() == JoinStatus.OWNER) {
            throw new IllegalJoinStatusException(ERROR + request_ERROR + " : 신청자가 지원을 할 수 없는 상태입니다.");
        }

        if (joinStatus == JoinStatus.WAITING && status == JoinStatus.ACCEPTED) {
            member.change_Accept();
            request.join_accept();
        }
        else if (joinStatus == JoinStatus.WAITING && status == JoinStatus.REJECTED) {
            member.change_Reject();
            request.join_reject();
        }
        else throw new IllegalJoinStatusException(ERROR + param_ERROR + " : 신청 상황을 확인해주세요");

        joinRequestRepository.save(request);
        memberRepository.save(member);

    }
}
