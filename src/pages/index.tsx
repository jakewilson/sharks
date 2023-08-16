import { PredictResult, predict } from '@/file'
import { ChangeEvent, useState } from 'react'

export default function Home() {
  const [predictResults, setPredictResults] = useState<PredictResult | null>(null)
  const [img, setImg] = useState<string>("")

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      predict(file)
        .then(setPredictResults)
        .then(() => setImg(URL.createObjectURL(file)))
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
        <div className={`flex-col items-center justify-between`}>
          <img src={img} width="224" height="224" />
          <h2 className={`font-bold`}>
            { predictResults.shark_type.toUpperCase() } SHARK: { predictResults.prob.toPrecision(4) }%
          </h2>
        </div>
      )}
    </main>
  )
}
