import { redirect } from "next/navigation";
import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

// type Quiz = {
//   quiz_id: number;
//   title: string;
// };

async function Quiz({ id, searchParams }: { id: string, searchParams: { show?: string } }) {
  
  let answers = await sql`
  SELECT
    q.quiz_id,
    q.title AS quiz_title,
    q.description AS quiz_description,
    q.question_text AS quiz_question,
    a.answer_id,
    a.answer_text,
    a.is_correct 
  FROM quizzes AS q
  JOIN answers AS a ON q.quiz_id = a.quiz_id
  WHERE q.quiz_id = ${id}`;

  return (
    <div>
      <h1 className="text-2xl">{answers[0].quiz_title}</h1>
      <p className="text-2xl text-gray-700">{answers[0].quiz_description}</p>
      <p className="text-xl my-4">{answers[0].quiz_question}</p>
      <ul>
        {answers.map((answer) => (
          <li key={answer.answer_id}>
            <p>
              {answer.answer_text}
              {searchParams.show === 'true' && answer.is_correct && '✅'}
              </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function QuizPage({ 
  params,
  searchParams }: { 
    params:  { id: string };
    searchParams: { show?: string };
 }) {
    return (
    <section>
      <Quiz id={params.id} searchParams={searchParams}/>
      {/* React server action that updates the URL.
      'use server' is a magic directive tells the NextJS compiler the server action should be pulled out and turned into an API for me, rather than requiring me to create backend code. This code could be pulled in a separate file as well. */}
      <form action={async () => {
        'use server';
        redirect(`/quiz/${params.id}?show=true`);
      }}>
        <button className="bg-gray-200 p-2 m-2 rounded hover:bg-gray-300 transition-all">Show answer</button>
      </form>
    </section>
    );
}