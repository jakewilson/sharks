import { PredictResult, predict } from '@/file'
import { ChangeEvent, useState } from 'react'

export default function Home() {
  const [predictResults, setPredictResults] = useState<PredictResult | null>(null)

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      predict(e.target.files[0])
        .then(setPredictResults)
    }
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start p-24`}
    >
      <h1 className={`font-bold`}>
        Shark Species Identifier
      </h1>
      <input
        type="file"
        name="fileInput"
        className={`border-2 border-indigo-600 rounded-md p-2 mt-2`}
        onChange={onFileChange}
      />
      { predictResults && (
        <h2>{ predictResults.shark_type }: { predictResults.prob.toPrecision(4) }%</h2>
      )}
    </main>
  )
}
