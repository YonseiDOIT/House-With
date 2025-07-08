package HouseWith.hwf.domain.JoinRequest;

import HouseWith.hwf.DTO.ArticleDTO;
import HouseWith.hwf.DTO.MemberDTO;
import HouseWith.hwf.domain.Member.Member;

import java.time.LocalDateTime;
import java.util.List;

public interface JoinRequestRepositoryCustom {
    Long countByMember(Long memberId);
}
