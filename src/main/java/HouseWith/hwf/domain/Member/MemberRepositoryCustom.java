package HouseWith.hwf.domain.Member;

import HouseWith.hwf.DTO.MemberDTO;

import java.time.LocalDateTime;
import java.util.List;

public interface MemberRepositoryCustom {
    List<Member> findAllRequestByArticleId(Long articleId);
    void updateOverThreshold(LocalDateTime threshold);
    Member findByMemberId(Long memberId);
}
