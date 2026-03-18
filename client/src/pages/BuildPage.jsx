import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BikePreview from '../components/BikePreview'
import BuilderForm from '../components/BuilderForm'
import { DEFAULT_BIKE } from '../data/bikeOptions'
import { createCustomItem } from '../services/customItems'
import { buildBikePayload, normalizeBike } from '../utilities/builder'

const BuildPage = () => {
  const [bike, setBike] = useState(DEFAULT_BIKE)
  const [busy, setBusy] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target
    setBike((currentBike) => normalizeBike({ ...currentBike, [name]: value }))
    setStatusMessage('')
    setErrorMessage('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const { payload, conflicts } = buildBikePayload(bike)
    if (conflicts.length > 0) {
      setErrorMessage(conflicts.join(' '))
      return
    }

    try {
      setBusy(true)
      setErrorMessage('')
      const createdBike = await createCustomItem(payload)
      setStatusMessage('Build saved. Redirecting to the detail page.')
      navigate(`/bikes/${createdBike.id}`)
    } catch (saveError) {
      setErrorMessage(saveError.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="editor-layout">
      <BikePreview bike={bike} />
      <BuilderForm
        bike={bike}
        busy={busy}
        errorMessage={errorMessage}
        onChange={handleChange}
        onSubmit={handleSubmit}
        statusMessage={statusMessage}
        submitLabel="Save to garage"
      />
    </div>
  )
}

export default BuildPage
