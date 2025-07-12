package HouseWith.hwf.domain.JoinRequest;

import HouseWith.hwf.domain.Article.Article;
import HouseWith.hwf.domain.Member.Member;

public interface JoinRequestRepositoryCustom {
    Long countByMember(Long memberId);
    Long countByArticle(Long articleId);
    JoinRequest findByMember(long memberId , long articleId);
}
