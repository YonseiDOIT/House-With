package HouseWith.hwf.web.MainContext;

import HouseWith.hwf.DTO.ArticleDTO;
import HouseWith.hwf.DTO.DormitoryDTO;
import HouseWith.hwf.DTO.RoomKeywordDTO;
import HouseWith.hwf.domain.Article.Article;
import jakarta.annotation.Nullable;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("dormitory")
public class MainContextController {
    private final MainContextService articleService;

    /**
     * 6/28 - 테스트 완료
     * 모든 글들을 desc 로 정렬하여 전달 (시간 순으로 정렬)
     */
    @GetMapping("list")
    public List<ArticleDTO> Main() {
        return articleService.getAllArticles();
    }

    @GetMapping("list/{articleId}")
    public Optional<DormitoryDTO> view(@PathVariable Long articleId) {
        return articleService.getArticleDetail(articleId);
    }

    /**
     * @param search_key -> 검색어 키워드
     * @param roomKeyword -> 방 검색 키워드들
     * @param dormitory -> 나중에 검색하는 경우 기숙사 검색 방식
     * @return -> List 형식으로 반환
     *
     * 6/29 : service 에서 null 이 가능하도록 변경 (null 상태를 넘겨받아도 변수처리 되도록)
     *        fetch join 빼기 -> DTO 패턴에선 fetch join 을 사용하지 않는다
     *        테스트 완료
     */
    @PostMapping("/search")
    public List<ArticleDTO> search(@RequestParam(required = false) String search_key ,
                                   @RequestParam(required = false) String dormitory ,
                                   @RequestBody(required = false) RoomKeywordDTO roomKeyword){
        return articleService.getArticleByKeywords(
                search_key ,
                roomKeyword ,
                dormitory
        );
    }
}
