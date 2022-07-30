drop schema if exists studentBook;
create schema studentBook;
use studentBook;


create table user
(
	id int auto_increment
		primary key,
	name varchar(50) null,
	status varchar(50) null default 'Offline',
	loggedIn boolean null
);

INSERT INTO studentBook.user (id, name, loggedIn) VALUES (1, 'Marlène', 0);
INSERT INTO studentBook.user (id, name, loggedIn) VALUES (2, 'Marina', 0);


create table message
(
	id int auto_increment primary key,
	dateSent date null,
	text varchar(256) null,
	type varchar(50) null,

	author_id int,
	constraint message_userid_fk foreign key (author_id) references user (id)
);

INSERT INTO studentBook.message (id, dateSent, text, type, author_id) VALUES (1, '2022-07-28 12:30:10', 'Dit is een test', 'public', 1);
INSERT INTO studentBook.message (id, dateSent, text, type, author_id) VALUES (2, '2022-07-29 12:31:10', 'Dit is de tweede test', 'public', 1);
INSERT INTO studentBook.message (id, dateSent, text, type, author_id) VALUES (3, '2022-07-30 12:32:10', 'Dit is de derde test', 'public', 1);
INSERT INTO studentBook.message (id, dateSent, text, type, author_id) VALUES (4, '2022-07-30 12:33:10', 'Dit is de vierde test', 'public', 1);
INSERT INTO studentBook.message (id, dateSent, text, type, author_id) VALUES (5, '2022-07-31 12:34:10', 'Dit is de vijfde test', 'public', 1);
INSERT INTO studentBook.message (id, dateSent, text, type, author_id) VALUES (6, '2022-07-31 12:35:10', 'Dit is de zesde test', 'public', 1);
INSERT INTO studentBook.message (id, dateSent, text, type, author_id) VALUES (8, '2022-07-31 12:35:10', 'Dit is de zevende test', 'private', 1);
INSERT INTO studentBook.message (id, dateSent, text, type, author_id) VALUES (7, '2022-07-29 12:31:20', 'Dit is een test', 'public', 2);

