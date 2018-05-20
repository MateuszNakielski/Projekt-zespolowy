insert into ROLES values(1,"STANDARD_USER");
insert into ROLES values(2,"USER_MANAGER");
insert into ROLES values(3,"EVENT_MANAGER");
insert into ROLES values(4,"ADMIN");

insert into USERS values(1,'mt.nakielski@gmail.com', null, 'Mateusz', '$2a$10$hj1TMtgPMKW9rD9EwKeGcub1uYYOYxDjIvlejsV/c7KbHiNb4dPOy', '608 618 673', 'Nakielski', 3, 'mnaki', null,null);
insert into USERS values(2,'mt@gmail.com', null, 'Mateusz', '$2a$10$hj1TMtgPMKW9rD9EwKeGcub1uYYOYxDjIvlejsV/c7KbHiNb4dPOy', '608 618 673', 'Nakielski', 3, 'mnak', null,null);
-- haslo: razdwatrzy
insert into USERS_ROLES values(1,1);
insert into USERS_ROLES values(2,1);
insert into USERS_ROLES values(1,2);
insert into USERS_ROLES values(1,3);
insert into USERS_ROLES values(1,4);