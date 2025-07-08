package HouseWith.hwf.web.ArticleManagement.Controller;

import HouseWith.hwf.DTO.DormitoryDTO;
import HouseWith.hwf.domain.JoinRequest.Custom.JoinStatus;
import HouseWith.hwf.web.ArticleManagement.Service.ArticleManageService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("management")
public class ArticleManageController {
    private final ArticleManageService articleManageService;

    @GetMapping("room/{articleId}")
    public Optional<DormitoryDTO> DormitoryDetail(@PathVariable Long articleId) {
        return articleManageService.getArticleDetail(articleId);
    }

    @GetMapping("room/status")
    public JoinStatus getJoinStatus(
            @RequestParam Long articleId ,
            @RequestParam Long memberId) {
        return articleManageService.getStatus(articleId , memberId);
    }
}
