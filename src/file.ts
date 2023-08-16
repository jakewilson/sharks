interface PredictResult {
  shark_type: string
  prob: number
}

async function predict(file: File): Promise<PredictResult> {
  const formData = new FormData()
  formData.append('file', file)

  return fetch('/api/predict', {
    method: 'POST',
    body: formData,
    mode: 'cors',
  })
    .then(resp => resp.json())
    .then((resp: PredictResult) => resp)
    // TODO
    // .catch(err => {
    //   console.log('uh oh!', err)
    // })
}

export {
  predict
}

export type { PredictResult }
