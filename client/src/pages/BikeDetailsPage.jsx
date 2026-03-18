import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import BikePreview from '../components/BikePreview'
import { deleteCustomItem, getCustomItem } from '../services/customItems'
import { formatCurrency, normalizeBike } from '../utilities/builder'

const BikeDetailsPage = () => {
  const { bikeId } = useParams()
  const navigate = useNavigate()
  const [bike, setBike] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    const loadBike = async () => {
      try {
        const data = await getCustomItem(bikeId)
        setBike(normalizeBike(data))
      } catch (loadError) {
        setError(loadError.message)
      } finally {
        setLoading(false)
      }
    }

    loadBike()
  }, [bikeId])

  const handleDelete = async () => {
    try {
      setBusy(true)
      await deleteCustomItem(bikeId)
      navigate('/')
    } catch (deleteError) {
      setError(deleteError.message)
      setBusy(false)
    }
  }

  if (loading) {
    return <div className="glass-panel empty-state"><h2>Loading build...</h2></div>
  }

  if (!bike) {
    return <div className="glass-panel empty-state"><h2>Build not found.</h2><p>{error || 'Try returning to the garage list.'}</p></div>
  }

  return (
    <div className="details-layout">
      <BikePreview
        bike={bike}
        heading={bike.name}
        subheading="Every saved configuration can be reviewed, updated, or removed from the garage."
      />

      <section className="details-panel glass-panel">
        <div className="details-header">
          <div>
            <p className="eyebrow">Build details</p>
            <h2>{bike.name}</h2>
          </div>
          <div className="details-actions">
            <Link className="secondary-button" to={`/bikes/${bike.id}/edit`}>
              Edit build
            </Link>
            <button className="danger-button" disabled={busy} onClick={handleDelete} type="button">
              {busy ? 'Deleting...' : 'Delete build'}
            </button>
          </div>
        </div>

        {error && <div className="banner-error">{error}</div>}

        <dl className="details-grid">
          <div>
            <dt>Total price</dt>
            <dd>{formatCurrency(bike.total_price)}</dd>
          </div>
          <div>
            <dt>Frame</dt>
            <dd>{bike.frame_style}</dd>
          </div>
          <div>
            <dt>Paint</dt>
            <dd>{bike.paint_color}</dd>
          </div>
          <div>
            <dt>Wheelset</dt>
            <dd>{bike.wheelset}</dd>
          </div>
          <div>
            <dt>Seat</dt>
            <dd>{bike.seat_type}</dd>
          </div>
          <div>
            <dt>Accessory</dt>
            <dd>{bike.accessory}</dd>
          </div>
        </dl>

        <div className="notes-panel">
          <h3>Builder notes</h3>
          <p>{bike.notes || 'No notes added for this build yet.'}</p>
        </div>
      </section>
    </div>
  )
}

export default BikeDetailsPage
