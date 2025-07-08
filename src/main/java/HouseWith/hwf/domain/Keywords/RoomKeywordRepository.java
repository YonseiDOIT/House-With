package HouseWith.hwf.domain.Keywords;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomKeywordRepository extends JpaRepository<RoomKeyword, Long> , RoomKeywordRepositoryCustom {
}
