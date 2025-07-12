package HouseWith.hwf.web.Dormitory;

import HouseWith.hwf.DTO.ArticleDTO;
import HouseWith.hwf.DTO.JoinRequestDTO;
import HouseWith.hwf.DTO.MemberDTO;
import HouseWith.hwf.DTO.RoomKeywordDTO;
import HouseWith.hwf.domain.Article.Article;
import HouseWith.hwf.domain.Article.ArticleRepository;
import HouseWith.hwf.domain.JoinRequest.Custom.JoinStatus;
import HouseWith.hwf.domain.Member.Member;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class DormitoryArticleController {
    private final DormitoryArticleService dormitoryArticleService;
    private final ArticleRepository articleRepository;

    /**
     * @param articleDTO : articleId , createdTime(수정된 시간으로 변경) , dormitory , title , quarter , access_max , comment , open_url
     * @param roomKeywordDTO : dormitory , motion , smoke , sleep_time , available_eat
     * @param ownerId : 소유자 개인정보 받아오기
     * @param joinRequestDTO : 방을 생성한 사람에게 OWNER 부여 , 방 소유자는 다른 방 가입 못하게 제거
     * @return : 방이 정상적으로 생성됨
     *
     * 7/9 - 수정 사항
     * 중복된 인원이 방을 하나 더 생성하는 경우 예외처리 (REQUEST OVERFLOW : 방을 한 개 이상 생성하였습니다.)
     *
     */
    @PostMapping(value = "createRoom" , consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> CreateRoom(
            @RequestPart(value = "ownerId") String ownerId ,
            @RequestPart(value = "article") ArticleDTO articleDTO ,
            @RequestPart(value = "roomKeyword") RoomKeywordDTO roomKeywordDTO ,
            @RequestPart(value = "join")JoinRequestDTO joinRequestDTO) {
        System.out.println("memberId: " + ownerId);
        Article newRoom = dormitoryArticleService.createRoom(
                Long.parseLong(ownerId) ,
                articleDTO ,
                roomKeywordDTO ,
                joinRequestDTO
        );

        articleRepository.save(newRoom);
        return ResponseEntity.ok("저장 완료");
    }




    /**
     * 6/25 -
     * @param articleDTO -> articleId , createdTime(수정된 시간으로 변경) , dormitory , title , quarter , access_max , comment , open_url
     * @param roomKeywordDTO -> dormitory , motion , smoke , sleep_time , available_eat
     * 6/28 - 테스트 완료
     */

    @PostMapping(value = "modifyRoom" , consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> modifyRoom(
            @RequestPart("memberId") String memberId ,
            @RequestPart("articleId") String articleId ,
            @RequestPart("article") ArticleDTO articleDTO,
            @RequestPart("roomKeyword") RoomKeywordDTO roomKeywordDTO) {
        Article newRoom = dormitoryArticleService.modifyRoom(
                Long.parseLong(articleId) ,
                Long.parseLong(memberId) ,
                articleDTO ,
                roomKeywordDTO
        );
        articleRepository.save(newRoom);

        return ResponseEntity.ok().build();
    }

    /**
     * @param articleId : 방 id 조회용
     * @return : articleId 를 이용해 방 검색 후 삭제
     * 7/6 - 테스트 완료
     */
    @DeleteMapping("deleteRoom/{articleId}")
    @Transactional
    public ResponseEntity<Void> deleteRoom(@PathVariable Long articleId) {
        articleRepository.deleteById(articleId);
        return ResponseEntity.ok().build();
    }
}
