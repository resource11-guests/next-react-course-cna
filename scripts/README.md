# Example SQL table creation script

```sql
CREATE TABLE IF NOT EXISTS quizzes (
    quiz_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    question_text TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS answers (
    answer_id SERIAL PRIMARY KEY,
    quiz_id INT REFERENCES quizzes(quiz_id) ON DELETE CASCADE,
    answer_text TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL
);

-- Insert data into quizzes table
INSERT INTO quizzes (title, description, question_text)
VALUES 
('General Knowledge', 'A quiz about general knowledge', 'What is the capital of France?'),
('Science Quiz', 'A quiz about basic science', 'What is the chemical symbol for water?');

-- Insert data into answers table
INSERT INTO answers (quiz_id, answer_text, is_correct)
VALUES 
(1, 'Paris', TRUE),
(1, 'London', FALSE),
(1, 'Berlin', FALSE),
(2, 'H2O', TRUE),
(2, 'O2', FALSE),
(2, 'CO2', FALSE);
```
