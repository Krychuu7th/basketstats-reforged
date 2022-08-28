INSERT INTO leagues (id, name)VALUES('1', 'Liga amatorska');
INSERT INTO leagues (id, name)VALUES('2', 'Ekstraliga');

INSERT INTO teams (id, name, logo, league_id)VALUES('1','Red Capes','redcapes.jpg', '1');
INSERT INTO teams (id, name, logo, league_id)VALUES('2','EXOD','exod.png', '1');
INSERT INTO teams (id, name, logo, league_id)VALUES('3','Cryptic', 'cryptic.png', '1');
INSERT INTO teams (id, name, logo, league_id)VALUES('4','PHILA Jabronis', 'jabronis.png', '2');
INSERT INTO teams (id, name, logo, league_id)VALUES('5','Nomads', 'nomads.png', '1');
INSERT INTO teams (id, name, logo, league_id)VALUES('6','Raptors', 'raptors.jpg', '1');
INSERT INTO teams (id, name, logo, league_id)VALUES('7','Red Samurai', 'redsamurai.jpg', '1');
INSERT INTO teams (id, name, logo, league_id)VALUES('8','Drużyna A', null, '2');
INSERT INTO teams (id, name, logo, league_id)VALUES('9','Drużyna B', null, '2');

INSERT INTO users (id, username, password, email, first_name, last_name, create_date, enabled)VALUES('1', 'admin', '$2a$10$rMV9u6ZvhNvxRJnUJzArUe/LrFlnK9kSKS/cjv3zMWUKKmWseYHUy', 'admin@example.com', 'Marcin', 'Krysiak', '2020-08-31', 'true');
INSERT INTO users (id, username, password, email, first_name, last_name, create_date, enabled)VALUES('2', 'user1', '$2a$10$rMV9u6ZvhNvxRJnUJzArUe/LrFlnK9kSKS/cjv3zMWUKKmWseYHUy', 'user1@example.com', 'Jan', 'Kowalski', '2020-09-02', 'true');
INSERT INTO users (id, username, password, email, first_name, last_name, create_date, enabled)VALUES('3', 'user2', '$2a$10$TFh4.S40gYCoAobL7chl9evUNy11aNp37/mNAt.EJmmLx4r/wke2O', 'user2@example.com', 'Janusz', 'Kowal', '2020-09-02', 'true');

INSERT INTO roles(id ,name)VALUES('1' ,'ROLE_ADMIN');
INSERT INTO roles(id, name)VALUES('2', 'ROLE_USER');

INSERT INTO users_roles(users_id, roles_id)VALUES('1', '1');
INSERT INTO users_roles(users_id, roles_id)VALUES('1', '2');
INSERT INTO users_roles(users_id, roles_id)VALUES('2', '2');
INSERT INTO users_roles(users_id, roles_id)VALUES('3', '2');
