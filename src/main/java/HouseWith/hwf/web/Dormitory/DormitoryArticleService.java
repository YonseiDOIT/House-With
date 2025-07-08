package HouseWith.hwf.web.Dormitory;

import HouseWith.hwf.DTO.ArticleDTO;
import HouseWith.hwf.DTO.JoinRequestDTO;
import HouseWith.hwf.DTO.MemberDTO;
import HouseWith.hwf.DTO.RoomKeywordDTO;
import HouseWith.hwf.domain.Article.Article;
import HouseWith.hwf.domain.JoinRequest.Custom.JoinStatus;
import HouseWith.hwf.domain.JoinRequest.JoinRequest;
import HouseWith.hwf.domain.Keywords.RoomKeyword;
import HouseWith.hwf.domain.Member.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DormitoryArticleService {

    public Article createRoom(
            ArticleDTO articleDTO ,
            RoomKeywordDTO roomKeywordDTO ,
            MemberDTO memberDTO ,
            JoinRequestDTO joinRequestDTO) {
        Article newRoom = new Article(
                articleDTO.getCreatedTime() ,
                articleDTO.getDormitory() ,
                articleDTO.getTitle() ,
                articleDTO.getQuarter() ,
                articleDTO.getAccess_max() ,
                articleDTO.getComment() ,
                articleDTO.getOpen_url()
        );

        RoomKeyword roomKeyword = new RoomKeyword(
                roomKeywordDTO.getDormitory() ,
                roomKeywordDTO.getMotion() ,
                roomKeywordDTO.getSmoke() ,
                roomKeywordDTO.getSleep_time() ,
                roomKeywordDTO.getAvailable_eat()
        );

        Member owner = new Member(
                memberDTO.getId() ,
                memberDTO.getMemberStatus() ,
                memberDTO.getName() ,
                memberDTO.getPhone() ,
                memberDTO.getEmail()
        );

        JoinRequest joinRequest = new JoinRequest(
                joinRequestDTO.getLocalDateTime() ,
                JoinStatus.OWNER
        );

        newRoom.set_roomKeyword(roomKeyword);
        newRoom.set_joinRequest(joinRequest);

        return newRoom;
    }

    public Article modifyRoom(
            ArticleDTO articleDTO ,
            RoomKeywordDTO roomKeywordDTO) {

        Article newRoom = new Article(
                articleDTO.getArticleId() ,
                articleDTO.getCreatedTime() ,
                articleDTO.getDormitory() ,
                articleDTO.getTitle() ,
                articleDTO.getQuarter() ,
                articleDTO.getAccess_max() ,
                articleDTO.getComment() ,
                articleDTO.getOpen_url()
        );

        RoomKeyword roomKeyword = new RoomKeyword(
                roomKeywordDTO.getDormitory() ,
                roomKeywordDTO.getMotion() ,
                roomKeywordDTO.getSmoke() ,
                roomKeywordDTO.getSleep_time() ,
                roomKeywordDTO.getAvailable_eat()
        );

        //키워드 입력
        newRoom.set_roomKeyword(roomKeyword);
        return newRoom;
    }
}
