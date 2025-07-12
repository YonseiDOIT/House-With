package HouseWith.hwf.web.MainContext;

import HouseWith.hwf.DTO.*;
import HouseWith.hwf.Exceptions.RequestExceptioons.ArticleNotFoundException;
import HouseWith.hwf.domain.Article.Article;
import HouseWith.hwf.domain.Article.ArticleRepository;
import HouseWith.hwf.domain.Article.ArticleRepositoryCustom;
import HouseWith.hwf.domain.JoinRequest.JoinRequestRepository;
import HouseWith.hwf.domain.Member.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MainContextService {
    private final ArticleRepository articleRepository;
    private final JoinRequestRepository joinRequestRepository;
    static String ERROR = "잘못된 요청입니다. ERROR CODE : ";

    @Value("${ErrorCode.Request.UNAVAILABLE_REQUEST_NULL}")
    private String error_NULL;

    /**
     * 6/29 - 개발 완료
     * @return : 모든 글을 최신순으로 반환
     *
     * 7/9 - 수정 완료
     * 그냥 전체 데이터를 반환하지 않고 날짜 별 다른 텍스트 반환
     * articleId 를 통해 방에 속한 인원 반환 후 전달
     * 리스트화 해서 (stream) 전달 완료
     */
    public List<ArticlePreviewDTO> getAllArticles() {
        List<ArticleDTO> articleDTOS =
                articleRepository.findArticles();


        return articleDTOS.stream()
                .map(article -> new ArticlePreviewDTO(
                        Times_Ago(article.getCreatedTime()) ,
                        article.getOwner_nickname() ,
                        article.getOwner() ,
                        article.getDormitory() ,
                        article.getTitle() ,
                        article.getQuarter() ,
                        article.getJoin_member_count() ,
                        article.getAccess_max() ,
                        article.getComment()
                )).collect(Collectors.toList());
    }

    public static String Times_Ago(LocalDateTime localDateTime) {
        LocalDateTime now = LocalDateTime.now();
        Duration duration = Duration.between(localDateTime, now);

        long days = duration.toDays();
        long hours = duration.toHours();
        long minutes = duration.toMinutes();
        long seconds = duration.getSeconds();

        //데이터를 저장하는 기한이 1년으로 정할거라 이 이상은 X
        if (days > 30 && days < 331) return (days / 30) + "달 전";
        else if (days > 0) return days + "일 전";
        else if (hours < 24) return hours + "시간 전";
        else if (minutes < 60) return minutes + "분 전";
        else if (seconds < 60) return "방금 전";
        //그 이상이면 날짜 표시하기
        return localDateTime.toLocalTime().toString();
    }


    /**
     * 7/1 - 개발 완료
     * @param articleId : 방 ID를 통헤 받아오고 싶은 방을 검색
     * @return : 방 정보를 전달하는 DTO 반환 (article + roomKeyWord + member)
     */
    public Optional<DormitoryDTO> getArticleDetail(Long articleId) {
        Optional<DormitoryDTO> dormitoryDTO = articleRepository
                .findArticleByAcceptedMember(articleId);

        if (dormitoryDTO.isEmpty())
            throw new ArticleNotFoundException(ERROR + error_NULL + " : " + articleId + "에 해당하는 방이 존재하지 않습니다.");

        return dormitoryDTO;
    }


    /**
     * @param search_key : 검색창에 들어가는 키워드
     * @param roomKeywordDTO : 방 조건 검색 키워드
     * @param dormitory : 기숙사 검색 키워드
     * @return : 키워드들 바탕으로 검색한 방들 반환
     */
    public List<ArticleDTO> getArticleByKeywords(
            String search_key,
            RoomKeywordDTO roomKeywordDTO,
            String dormitory) {
        // DTO가 null일 경우 각 필드도 null로 세팅
        String motion = null;
        String smoke = null;
        String sleep_time = null;
        String available_at = null;

        if (roomKeywordDTO != null) {
            motion = roomKeywordDTO.getMotion();
            smoke = roomKeywordDTO.getSmoke();
            sleep_time = roomKeywordDTO.getSleep_time();
            available_at = roomKeywordDTO.getAvailable_eat();
        }

        return articleRepository.findArticleByKeywords(
                search_key,
                motion,
                smoke,
                sleep_time,
                available_at,
                dormitory
        );
    }
}
