package HouseWith.hwf.Config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenAPIConfig {
    @Value("${github.url}")
    private String githubUrl;

    @Bean
    public OpenAPI customOpenAPI(){
        return new OpenAPI()
                .info(new Info()
                        .title("HouseWith API")
                        .version("v0.02")
                        .description("7/10일 수정사항 입니다. GitHub URL : " + githubUrl)
                );
    }
}
