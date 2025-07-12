package HouseWith.hwf.web.Login.Security.JWT;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.Key;
import java.text.DateFormat;
import java.util.Base64;
import java.util.Date;

import static javax.crypto.Cipher.SECRET_KEY;

@Component
public class JwtUtil {
    private String SECRET_KEY = "pT+HzrT8gQkRpGJzxrfEFiS2yZPLClVhRxn3GuRIq2U=";
    //나중에 OAuth 로 바꿔야 함
    private String TOKEN_PREFIX = "Bearer ";

    //토큰 만료시간 30일
    private final long EXPIRES_IN = 30L * 1000 * 60 * 60 * 24;

    private final Key key = Keys.hmacShaKeyFor(Base64.getDecoder().decode(SECRET_KEY));

    public String genToken(Long userId , String email , String nickname) {
        return Jwts.builder()
                .subject("USER")
                .claim("user_id" , userId)
                .claim("email" , email)
                .claim("nickname" , nickname)
                .expiration(new Date(System.currentTimeMillis() + EXPIRES_IN))
                .signWith(key)
                .compact();
    }

    public Long parseUserId(String token) {
        // jwt 파싱
        var claimsJws = Jwts.parser()
                .verifyWith((SecretKey) key)
                .build()
                .parseSignedClaims(token);

        // 클레임에서 user_id 추출 (Long으로 변환)
        Object userIdObj = claimsJws.getPayload().get("user_id");

        if (userIdObj instanceof Long) {
            return (Long) userIdObj;
        }
        else throw new IllegalArgumentException("user_id가 헤더에 없습니다. 혹은 타입이 다릅니다.");
    }

    public String parseEmail(String token) {
        var claimsJws = Jwts.parser()
                .verifyWith((SecretKey) key)
                .build().parseSignedClaims(token);

        Object obj = claimsJws.getPayload().get("email");
        return obj != null ? obj.toString() : null;
    }

    public String parseNickname(String token) {
        var claimsJws = Jwts.parser()
                .verifyWith((SecretKey) key)
                .build().parseSignedClaims(token);

        Object obj = claimsJws.getPayload().get("nickname");
        return obj != null ? obj.toString() : null;
    }

}
