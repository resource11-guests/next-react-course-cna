import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL!);

type Quiz = {
  quiz_id: number;
  title: string;
};

async function Quiz({ id }: { id: string }) {
  
  const quiz = await sql<Quiz>`SELECT * FROM quizzes WHERE quiz_id = ${id}`;

  return (
    <h1>{quiz[0].title}</h1>
  );
}

export default function QuizPage({ params } : { params:  { id: string } }) {
    return (
    <section>
      <Quiz id={params.id} />
    </section>
    );
}