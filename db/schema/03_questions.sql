DROP TABLE IF EXISTS questions CASCADE;

CREATE TABLE questions (
  id SERIAL PRIMARY KEY NOT NULL,
  quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  question VARCHAR(1000) NOT NULL,
  answer_id INTEGER REFERENCES
);
