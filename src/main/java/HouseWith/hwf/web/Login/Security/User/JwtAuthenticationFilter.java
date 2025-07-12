//package HouseWith.hwf.web.Login.Security.User;
//
//import HouseWith.hwf.web.Login.Security.JWT.JwtUtil;
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import java.io.IOException;
//
//@RequiredArgsConstructor
//public class JwtAuthenticationFilter  extends OncePerRequestFilter {
//    private final JwtUtil jwtUtil;
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request,
//                                    HttpServletResponse response,
//                                    FilterChain filterChain) throws ServletException, IOException {
//        String authHeader = request.getHeader("Authorization");
//        System.out.println("Authorization 헤더: " + authHeader);
//        if (authHeader != null && authHeader.startsWith("Bearer ")) {
//            String jwt = authHeader.substring(7);
//            try {
//                Long userId = jwtUtil.parseUserId(jwt);
//                String email = jwtUtil.parseEmail(jwt);
//                String nickname = jwtUtil.parseNickname(jwt);
//
//                CustomUserDetails userDetails = new CustomUserDetails(userId, email, nickname);
//
//                UsernamePasswordAuthenticationToken authentication =
//                        new UsernamePasswordAuthenticationToken(userDetails ,
//                                null ,
//                                userDetails.getAuthorities());
//                SecurityContextHolder.getContext()
//                        .setAuthentication(authentication);
//
//            } catch (Exception e) {
//                throw new ServletException(e);
//            }
//
//            filterChain.doFilter(request, response);
//        }
//    }
//
//}
