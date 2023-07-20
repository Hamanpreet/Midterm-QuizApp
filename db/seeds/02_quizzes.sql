-- quizzes table seeds here only users 1-3 have created a quiz and only 1 quiz is private
INSERT INTO quizzes (owner_id, title, description, private) VALUES (1, "test 1",'eget nunc lobortis mattis aliquam faucibus purus in massa tempor nec feugiat nisl pretium fusce', 0);
INSERT INTO quizzes (owner_id, title, description, private) VALUES (2, 'History Quiz', 'Test your knowledge of historical events.', 0);
INSERT INTO quizzes (owner_id, title, description, private) VALUES (3, 'Science Trivia', 'Challenge yourself with some science-related questions.', 0);
INSERT INTO quizzes (owner_id, title, description, private) VALUES (1, 'Private Quiz', 'This quiz is only visible to the owner and people who have the link.', 1);
