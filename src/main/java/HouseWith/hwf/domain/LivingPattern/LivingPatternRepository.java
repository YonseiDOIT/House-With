package HouseWith.hwf.domain.LivingPattern;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LivingPatternRepository extends JpaRepository<LivingPattern , Long> , LivingPatternRepositoryCustom {
}
