CREATE TABLE article (
                         article_id BIGSERIAL PRIMARY KEY,
                         owner_nickname VARCHAR(255),
                         owner BIGINT,
                         created_time TIMESTAMP,
                         dormitory VARCHAR(255),
                         title VARCHAR(255),
                         quarter VARCHAR(50),
                         join_member_count INT,
                         access_max INT,
                         comment VARCHAR(255),
                         open_url VARCHAR(255)
);

CREATE TABLE room_keyword (
                              keyword_id BIGSERIAL PRIMARY KEY,
                              article_id BIGINT UNIQUE,  -- 1:1 관계, 유니크
                              dormitory VARCHAR(255),
                              motion VARCHAR(255),
                              smoke VARCHAR(255),
                              sleep_time VARCHAR(255),
                              available_eat VARCHAR(255),
                              CONSTRAINT fk_roomkeyword_article
                                  FOREIGN KEY (article_id)
                                      REFERENCES article(article_id)
                                      ON DELETE CASCADE
);

CREATE TABLE member (
                        member_id BIGSERIAL PRIMARY KEY,
                        username VARCHAR(255),
                        password VARCHAR(255),
                        member_status VARCHAR(50) DEFAULT 'NON',
                        name VARCHAR(255),
                        phone VARCHAR(255),
                        email VARCHAR(255),
                        nickname VARCHAR(255),
                        sex VARCHAR(20),
                        dormitory_name VARCHAR(255),
                        living_pattern_id INT UNIQUE  -- 1:1 관계 (추가적으로 FK 필요)
    -- livingPattern과 1:1, 아래 ALTER문 참고
);

CREATE TABLE join_request (
                              roomjoin_id BIGSERIAL PRIMARY KEY,
                              local_date_time TIMESTAMP,
                              join_status VARCHAR(50),
                              article_id BIGINT,
                              member_id BIGINT,
                              CONSTRAINT fk_joinrequest_article
                                  FOREIGN KEY (article_id)
                                      REFERENCES article(article_id)
                                      ON DELETE CASCADE,
                              CONSTRAINT fk_joinrequest_member
                                  FOREIGN KEY (member_id)
                                      REFERENCES member(member_id)
                                      ON DELETE CASCADE
);

CREATE TABLE living_pattern (
                                pattern_id BIGSERIAL PRIMARY KEY,
                                member_id BIGINT UNIQUE,  -- 1:1 관계, 유니크
                                sleep_pattern VARCHAR(255),
                                snoring VARCHAR(255),
                                night_work VARCHAR(255),
                                home_leaving VARCHAR(255),
                                shower_pattern VARCHAR(255),
                                sharing VARCHAR(255),
                                speaker_use VARCHAR(255),
                                call_pattern VARCHAR(255),
                                introvert VARCHAR(255),
                                sanitary VARCHAR(255),
                                smoke VARCHAR(255),
                                available_eat VARCHAR(255),
                                CONSTRAINT fk_livingpattern_member
                                    FOREIGN KEY (member_id)
                                        REFERENCES member(member_id)
                                        ON DELETE CASCADE
);

