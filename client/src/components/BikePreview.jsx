import {
  ACCESSORIES,
  FRAME_STYLES,
  PAINT_COLORS,
  SEAT_TYPES,
  WHEELSETS
} from '../data/bikeOptions'
import { formatCurrency, getBikePrice } from '../utilities/builder'

const frameLookup = Object.fromEntries(FRAME_STYLES.map((option) => [option.id, option]))
const paintLookup = Object.fromEntries(PAINT_COLORS.map((option) => [option.id, option]))
const wheelLookup = Object.fromEntries(WHEELSETS.map((option) => [option.id, option]))
const seatLookup = Object.fromEntries(SEAT_TYPES.map((option) => [option.id, option]))
const accessoryLookup = Object.fromEntries(ACCESSORIES.map((option) => [option.id, option]))

const BikePreview = ({ bike, heading = 'Live preview', subheading = 'Your build updates as you tune each feature.' }) => {
  const frame = frameLookup[bike.frame_style]
  const paint = paintLookup[bike.paint_color]
  const wheelset = wheelLookup[bike.wheelset]
  const seat = seatLookup[bike.seat_type]
  const accessory = accessoryLookup[bike.accessory]
  const total = getBikePrice(bike)

  return (
    <section className="bike-preview glass-panel">
      <div className="bike-preview-copy">
        <p className="eyebrow">Visual Studio</p>
        <h2>{heading}</h2>
        <p>{subheading}</p>
      </div>

      <div className="bike-canvas">
        <div className="bike-price-chip">{formatCurrency(total)}</div>

        <svg className="bike-illustration" viewBox="0 0 900 520" role="img" aria-label={`Preview of ${bike.name}`}>
          <defs>
            <linearGradient id="floorGlow" x1="0%" x2="100%">
              <stop offset="0%" stopColor="rgba(25, 140, 132, 0.05)" />
              <stop offset="50%" stopColor="rgba(216, 93, 43, 0.22)" />
              <stop offset="100%" stopColor="rgba(25, 140, 132, 0.05)" />
            </linearGradient>
          </defs>

          <ellipse cx="450" cy="420" rx="255" ry="42" fill="url(#floorGlow)" />

          <circle cx="340" cy="320" r="93" fill="#fff8f1" stroke="#231815" strokeWidth="12" />
          <circle cx="650" cy="320" r="93" fill="#fff8f1" stroke="#231815" strokeWidth="12" />
          <circle cx="340" cy="320" r={wheelset.tireWidth + 32} fill="none" stroke="#3e3a38" strokeWidth={wheelset.tireWidth} />
          <circle cx="650" cy="320" r={wheelset.tireWidth + 32} fill="none" stroke="#3e3a38" strokeWidth={wheelset.tireWidth} />

          <path d="M340 320 L430 170 L650 320" fill="none" stroke={paint.hex} strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" />
          <polyline
            points={frame.topTube}
            fill="none"
            stroke={paint.hex}
            strokeWidth="24"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points={frame.seatStay}
            fill="none"
            stroke={paint.hex}
            strokeWidth="18"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points={frame.chainStay}
            fill="none"
            stroke={paint.hex}
            strokeWidth="18"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M468 250 L495 122" fill="none" stroke={paint.hex} strokeWidth="20" strokeLinecap="round" />
          <path d={`M495 122 L565 ${frame.handlebarY} L590 ${frame.handlebarY + 6}`} fill="none" stroke="#231815" strokeWidth="16" strokeLinecap="round" />

          <path
            d={seat.id === 'aero' ? 'M402 138 Q450 112 493 136 L494 147 Q454 158 404 144 Z' : seat.id === 'cargo' ? 'M390 134 H500 L514 152 H394 Z' : 'M396 138 Q450 104 504 138 L494 154 Q446 164 394 148 Z'}
            fill="#231815"
          />

          <circle cx="495" cy="250" r="18" fill="#f8f1e7" stroke="#231815" strokeWidth="10" />
          <path d="M495 250 L468 320" fill="none" stroke="#231815" strokeWidth="10" strokeLinecap="round" />
          <path d="M495 250 L558 285" fill="none" stroke="#231815" strokeWidth="10" strokeLinecap="round" />

          {accessory.id === 'basket' && (
            <g>
              <rect x="575" y="168" width="72" height="52" rx="10" fill="#d8aa36" stroke="#7a5a22" strokeWidth="6" />
              <path d="M588 178 H634 M588 192 H634 M588 206 H634" stroke="#7a5a22" strokeWidth="4" />
            </g>
          )}

          {accessory.id === 'bottle' && (
            <g>
              <rect x="508" y="220" width="24" height="54" rx="10" fill="#198c84" stroke="#0f4f4a" strokeWidth="5" />
              <rect x="514" y="208" width="12" height="14" rx="4" fill="#198c84" />
            </g>
          )}

          {accessory.id === 'headlight' && (
            <g>
              <circle cx="602" cy="150" r="18" fill="#f8f1e7" stroke="#231815" strokeWidth="6" />
              <path d="M612 150 L672 132 L672 168 Z" fill="#f7d880" opacity="0.85" />
            </g>
          )}
        </svg>
      </div>

      <div className="bike-spec-strip">
        <div>
          <span>Frame</span>
          <strong>{frame.name}</strong>
        </div>
        <div>
          <span>Paint</span>
          <strong>{paint.name}</strong>
        </div>
        <div>
          <span>Wheels</span>
          <strong>{wheelset.name}</strong>
        </div>
        <div>
          <span>Accessory</span>
          <strong>{accessory.name}</strong>
        </div>
      </div>
    </section>
  )
}

export default BikePreview
