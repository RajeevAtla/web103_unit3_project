import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BikePreview from '../components/BikePreview'
import BuilderForm from '../components/BuilderForm'
import { getCustomItem, updateCustomItem } from '../services/customItems'
import { buildBikePayload, normalizeBike } from '../utilities/builder'

const EditBikePage = () => {
  const { bikeId } = useParams()
  const navigate = useNavigate()
  const [bike, setBike] = useState(null)
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const loadBike = async () => {
      try {
        const data = await getCustomItem(bikeId)
        setBike(normalizeBike(data))
      } catch (loadError) {
        setErrorMessage(loadError.message)
      } finally {
        setLoading(false)
      }
    }

    loadBike()
  }, [bikeId])

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
      const updatedBike = await updateCustomItem(bikeId, payload)
      setStatusMessage('Build updated. Redirecting to the refreshed detail page.')
      navigate(`/bikes/${updatedBike.id}`)
    } catch (updateError) {
      setErrorMessage(updateError.message)
    } finally {
      setBusy(false)
    }
  }

  if (loading || !bike) {
    return <div className="glass-panel empty-state"><h2>Loading editor...</h2>{errorMessage && <p>{errorMessage}</p>}</div>
  }

  return (
    <div className="editor-layout">
      <BikePreview bike={bike} heading="Refine the saved build" subheading="Editing uses the same pricing and validation rules as creation." />
      <BuilderForm
        bike={bike}
        busy={busy}
        errorMessage={errorMessage}
        onChange={handleChange}
        onSubmit={handleSubmit}
        statusMessage={statusMessage}
        submitLabel="Update build"
      />
    </div>
  )
}

export default EditBikePage
