import { Link } from 'react-router-dom'
import { ACCESSORIES, FRAME_STYLES, PAINT_COLORS, WHEELSETS } from '../data/bikeOptions'
import { formatCurrency } from '../utilities/builder'

const frameLookup = Object.fromEntries(FRAME_STYLES.map((option) => [option.id, option]))
const paintLookup = Object.fromEntries(PAINT_COLORS.map((option) => [option.id, option]))
const wheelLookup = Object.fromEntries(WHEELSETS.map((option) => [option.id, option]))
const accessoryLookup = Object.fromEntries(ACCESSORIES.map((option) => [option.id, option]))

const SavedBikeCard = ({ bike, onDelete, deleting = false }) => (
  <article className="saved-bike-card glass-panel">
    <div className="saved-bike-swatch" style={{ background: paintLookup[bike.paint_color]?.hex ?? '#231815' }} />

    <div className="saved-bike-copy">
      <div>
        <p className="eyebrow">Saved Build</p>
        <h3>{bike.name}</h3>
      </div>

      <ul className="saved-bike-specs">
        <li>{frameLookup[bike.frame_style]?.name}</li>
        <li>{wheelLookup[bike.wheelset]?.name}</li>
        <li>{accessoryLookup[bike.accessory]?.name}</li>
      </ul>
    </div>

    <div className="saved-bike-footer">
      <span>{formatCurrency(bike.total_price)}</span>
      <div className="saved-bike-actions">
        <Link className="secondary-button" to={`/bikes/${bike.id}`}>
          Review build
        </Link>
        <button className="danger-button" disabled={deleting} onClick={() => onDelete(bike.id)} type="button">
          {deleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  </article>
)

export default SavedBikeCard
