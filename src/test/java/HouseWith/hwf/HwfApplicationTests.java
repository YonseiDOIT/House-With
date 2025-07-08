package HouseWith.hwf;

import HouseWith.hwf.domain.Article.Article;
import HouseWith.hwf.domain.Article.QArticle;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Tuple;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static HouseWith.hwf.domain.Article.QArticle.article;

@SpringBootTest
@Transactional
class HwfApplicationTests {

	@Test
	void contextLoads() {
	}

	@PersistenceContext
	EntityManager em;

	JPAQueryFactory queryFactory;




	@Test
	public void test_1_for_dormitory() throws Exception {
	    //given
		List<Article> result = queryFactory
				.selectFrom(article)
				.where(article.id.eq(1L))
				.fetch();

	    //when

	    //then
		for (Article article1 : result) {
			System.out.println(article1);
		}
	}


}
