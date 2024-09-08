import Link from 'next/link'
import postgres from 'postgres'
import { Suspense } from 'react'
import QuizForm from './quiz-form'

/**
 * Special file allows us to show different routes in the app. Page.tsx is a reserved file name in Next.js.
 * The Link component is used for internal navigation in Next.js. For external links, use the <a> tag.
 */

async function getData() {
  const sql = postgres(process.env.DATABASE_URL!)
  const quizzes: Quiz[] = await sql`SELECT * FROM quizzes`
  return quizzes
}
type Quiz = {
  quiz_id: number
  title: string
}

async function Quizzes() {
  const quizzes = await getData()

  return (
    <ul>
      {quizzes.map((quiz) => (
        <li key={quiz.quiz_id}>
          <Link href={`/quiz/${quiz.quiz_id}`} className="underline">
            {quiz.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}

/**
 * We wrap the Quizzes and QuizForm component in a Suspense component to handle the loading state.
 */

export default function Home() {
  return (
    <section>
      <h1 className="text-2xl font-smibold">All Quizzes</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <Quizzes />
        <QuizForm />
      </Suspense>
    </section>
  )
}
