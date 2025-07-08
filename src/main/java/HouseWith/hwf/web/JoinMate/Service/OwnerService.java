package HouseWith.hwf.web.JoinMate.Service;

import HouseWith.hwf.Exceptions.RequestExceptioons.IllegalJoinStatusException;
import HouseWith.hwf.Exceptions.RequestExceptioons.MemberNotFoundException;
import HouseWith.hwf.domain.JoinRequest.Custom.JoinStatus;
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

    static String ERROR = "사용할 수 없는 요청입니다. ERROR CODE : ";
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
     * @param memberId : 신청한 인원의 memberId
     * @param joinStatus : 요청 종류 -> ACCEPTED , REJECTED
     */

    public void Request_To_Join(
            Long memberId ,
            String joinStatus
    ) {
        Member member =
                memberRepository.findByMemberId(memberId);

        if (member == null) throw new MemberNotFoundException(ERROR + error_NULL);
        else if (
                member.getMemberStatus() == JoinStatus.REJECTED ||
                member.getMemberStatus() == JoinStatus.ACCEPTED ||
                member.getMemberStatus() == JoinStatus.OWNER) {
            throw new IllegalJoinStatusException(ERROR + request_ERROR);
        }

        if (joinStatus.equals("ACCEPT")) {
            member.change_Accept();

        }
        else if (joinStatus.equals("REJECT")) member.change_Reject();
        else throw new IllegalJoinStatusException(ERROR + param_ERROR);

        memberRepository.save(member);
    }
}
