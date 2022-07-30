drop schema if exists studentBook;
create schema studentBook;
use studentBook;


create table user
(

	name varchar(50) not null primary key,
	status varchar(50) null default 'Offline',
	loggedIn boolean null
);

INSERT INTO studentBook.user (name, loggedIn) VALUES ('Marlène', 0);
INSERT INTO studentBook.user (name, loggedIn) VALUES ('Marina', 0);


create table message
(
	id int auto_increment primary key,
	dateSent date null,
	text varchar(256) null,
	type varchar(50) null,

	author_id varchar(50),
	constraint message_userid_fk foreign key (author_id) references user (name)
);

INSERT INTO studentBook.message (id, dateSent, text, type, author_id) VALUES (1, '2022-07-28 12:30:10', 'Dit is een test', 'public', 'Marlène');
INSERT INTO studentBook.message (id, dateSent, text, type, author_id) VALUES (2, '2022-07-29 12:31:10', 'Dit is de tweede test', 'public', 'Marlène');
INSERT INTO studentBook.message (id, dateSent, text, type, author_id) VALUES (3, '2022-07-30 12:32:10', 'Dit is de derde test', 'public', 'Marlène');
INSERT INTO studentBook.message (id, dateSent, text, type, author_id) VALUES (4, '2022-07-30 12:33:10', 'Dit is de vierde test', 'public', 'Marlène');
INSERT INTO studentBook.message (id, dateSent, text, type, author_id) VALUES (5, '2022-07-31 12:34:10', 'Dit is de vijfde test', 'public', 'Marlène');
INSERT INTO studentBook.message (id, dateSent, text, type, author_id) VALUES (6, '2022-07-31 12:35:10', 'Dit is de zesde test', 'public', 'Marlène');
INSERT INTO studentBook.message (id, dateSent, text, type, author_id) VALUES (8, '2022-07-31 12:35:10', 'Dit is de zevende test', 'private', 'Marlène');
INSERT INTO studentBook.message (id, dateSent, text, type, author_id) VALUES (7, '2022-07-29 12:31:20', 'Dit is een test', 'public', 'Marina');

create table friend
(
	user_name varchar(50),
	friend_name varchar(50),
	CONSTRAINT friend_pk PRIMARY KEY CLUSTERED (user_name, friend_name),
	constraint friend_userName_fk foreign key (user_name) references user (name),
	constraint friend_friendName_fk foreign key (friend_name) references user (name)
);

INSERT INTO studentBook.friend (user_name,friend_name) VALUES ('Marlène','Marina');
INSERT INTO studentBook.friend (user_name,friend_name) VALUES ('Marina','Marlène');