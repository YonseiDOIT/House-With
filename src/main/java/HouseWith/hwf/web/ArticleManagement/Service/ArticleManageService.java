package HouseWith.hwf.web.ArticleManagement.Service;

import HouseWith.hwf.DTO.DormitoryDTO;
import HouseWith.hwf.domain.Article.ArticleRepository;
import HouseWith.hwf.domain.JoinRequest.Custom.JoinStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ArticleManageService {
    private final ArticleRepository articleRepository;

    public Optional<DormitoryDTO> getArticleDetail(Long articleId) {
        return articleRepository.findArticleByAcceptedMember(articleId);
    }

    public JoinStatus getStatus(Long articleId , Long memberId) {
        return articleRepository.findJoinStatus(articleId , memberId);
    }
}
