//package HouseWith.hwf.web.Login.Security.Config;
//
//import HouseWith.hwf.web.Login.Security.JWT.JwtUtil;
//import HouseWith.hwf.web.Login.Security.User.JwtAuthenticationFilter;
//import lombok.RequiredArgsConstructor;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.web.SecurityFilterChain;
//
//@Configuration
//@EnableWebSecurity
//@RequiredArgsConstructor
//public class SecurityConfig {
//    private final JwtUtil jwtUtil;
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http.csrf(AbstractHttpConfigurer::disable)
//                .formLogin(AbstractHttpConfigurer::disable) //  폼 로그인 사용 X
//                .httpBasic(AbstractHttpConfigurer::disable)
//                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//                .authorizeHttpRequests(auth -> auth
//                .requestMatchers(
//                        "/mate" ,"/mate/" , "/mate/requests" , "/mate/requests/" ,
//                        "/mate/joinMember" , "/mate/requests/accept" , "/mate/requests/reject" ,
//                        "/dormitory/" , "/dormitory/list/" , "/dormitory/list/" , "/dormitory/search" ,
//                        "/user-info/patternInfo" , "/user-info/" , "/user-info/basicInfo" , "/user-info/nickDup" ,
//                        "/management/" , "/management/room/" , "/management/room/status" ,
//                        "/modifyRoom" , "/createRoom" , "/deleteRoom/").permitAll()
//                .anyRequest().authenticated()
//        ).addFilterBefore(new JwtAuthenticationFilter(jwtUtil),
//                org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class);
//
//        return http.build();
//    }
//}
