import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import BikePreview from '../components/BikePreview'
import SavedBikeCard from '../components/SavedBikeCard'
import { DEFAULT_BIKE } from '../data/bikeOptions'
import { deleteCustomItem, getAllCustomItems } from '../services/customItems'

const HomePage = () => {
  const [bikes, setBikes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    const loadBikes = async () => {
      try {
        const data = await getAllCustomItems()
        setBikes(data)
      } catch (loadError) {
        setError(loadError.message)
      } finally {
        setLoading(false)
      }
    }

    loadBikes()
  }, [])

  const handleDelete = async (bikeId) => {
    try {
      setDeletingId(bikeId)
      setError('')
      await deleteCustomItem(bikeId)
      setBikes((currentBikes) => currentBikes.filter((bike) => bike.id !== bikeId))
    } catch (deleteError) {
      setError(deleteError.message)
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="home-layout">
      <section className="hero-panel glass-panel">
        <div className="hero-copy">
          <p className="eyebrow">Project 4</p>
          <h1 className="section-title">Build a bike that shifts shape, price, and attitude as you customize it.</h1>
          <p className="section-copy">
            Velocraft Garage is a Supabase-backed customizer for saving bespoke bike builds. Tune the frame, paint,
            wheelset, seat, and accessories, then review, edit, or delete every saved configuration.
          </p>

          <div className="hero-actions">
            <Link className="primary-button" to="/build">
              Start a build
            </Link>
            <div className="chip">React + Supabase + PostgreSQL</div>
          </div>
        </div>

        <BikePreview
          bike={DEFAULT_BIKE}
          heading="Studio sample"
          subheading="The preview responds to every feature selection in the builder."
        />
      </section>

      <section className="saved-section">
        <div className="saved-section-header">
          <div>
            <p className="eyebrow">Garage Queue</p>
            <h2>Saved custom bikes</h2>
          </div>
          <Link className="secondary-button" to="/build">
            Create another
          </Link>
        </div>

        {error && <div className="banner-error">{error}</div>}

        {loading ? (
          <div className="glass-panel empty-state">
            <h3>Loading your builds...</h3>
          </div>
        ) : bikes.length === 0 ? (
          <div className="glass-panel empty-state">
            <h3>No custom bikes saved yet.</h3>
            <p>Start with the builder to create the first one and send it to the garage list.</p>
          </div>
        ) : (
          <div className="saved-grid">
            {bikes.map((bike) => (
              <SavedBikeCard
                bike={bike}
                deleting={deletingId === bike.id}
                key={bike.id}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default HomePage
