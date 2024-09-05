-- Seed data into quizzes table
INSERT INTO quizzes (title, description, question_text)
VALUES 
('General Knowledge', 'A quiz about general knowledge', 'What is the capital of France?'),
('Science Quiz', 'A quiz about basic science', 'What is the chemical symbol for water?'),
('Alicante Knowledge', 'A quiz about general knowledge of Alicante, Spain', 'What is the main beach in Alicante?');

-- Seed data into answers table
INSERT INTO answers (quiz_id, answer_text, is_correct)
VALUES 
(1, 'Paris', TRUE),
(1, 'London', FALSE),
(1, 'Berlin', FALSE),
(2, 'H2O', TRUE),
(2, 'O2', FALSE),
(2, 'CO2', FALSE),
(3, 'Postiguet Beach', TRUE),
(3, 'San Juan Beach', FALSE),
(3, 'Albufereta Beach', FALSE);