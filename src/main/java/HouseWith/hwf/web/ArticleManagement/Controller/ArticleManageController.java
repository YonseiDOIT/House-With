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

    /**
     * 7/8 - 생성 완료 / 테스트 완료
     * @param articleId : 방 검색 ID
     * @return : 방 세부 정보 반환 , 방 미리보기 영역을 누르면 나오는 디테일 화면
     */
    @GetMapping("room/{articleId}")
    public Optional<DormitoryDTO> DormitoryDetail(@PathVariable Long articleId) {
        return articleManageService.getArticleDetail(articleId);
    }

    /**
     * 7/8 - 생성 완료 /
     * @param articleId : 방 검색을 위한 ID
     * @param memberId : 해당 방에 속한 인원 검색을 위한 ID
     * @return : 검색 후 해당 방에 속한 인원의 JoinStatus 를 반환
     */
    @GetMapping("room/status")
    public JoinStatus getJoinStatus(
            @RequestParam Long articleId ,
            @RequestParam Long memberId) {
        return articleManageService.getStatus(articleId , memberId);
    }
}
