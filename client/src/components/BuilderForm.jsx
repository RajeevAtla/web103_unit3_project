import { FEATURE_GROUPS } from '../data/bikeOptions'
import { formatCurrency, getBikeConflicts, getBikePrice, isOptionDisabled } from '../utilities/builder'

const BuilderForm = ({
  bike,
  submitLabel,
  onChange,
  onSubmit,
  statusMessage,
  errorMessage,
  busy = false
}) => {
  const conflicts = getBikeConflicts(bike)

  return (
    <form className="builder-form glass-panel" onSubmit={onSubmit}>
      <div className="builder-form-heading">
        <p className="eyebrow">Build Sheet</p>
        <h2>{submitLabel}</h2>
        <p>Every option affects the look, utility, or price of the final bike before it reaches the garage list.</p>
      </div>

      <div className="input-grid">
        <label className="field-label">
          <span>Bike name</span>
          <input
            type="text"
            name="name"
            value={bike.name}
            onChange={onChange}
            autoComplete="off"
            maxLength={60}
            placeholder="Name this build"
            required
          />
        </label>

        <label className="field-label">
          <span>Notes</span>
          <textarea
            name="notes"
            value={bike.notes}
            onChange={onChange}
            autoComplete="off"
            maxLength={220}
            placeholder="Add a quick note about why you built it this way."
          />
        </label>
      </div>

      <div className="feature-groups">
        {FEATURE_GROUPS.map((group) => (
          <section className="feature-group" key={group.field}>
            <div className="feature-group-copy">
              <h3>{group.title}</h3>
              <p>{group.copy}</p>
            </div>

            <div className="feature-options">
              {group.options.map((option) => {
                const selected = bike[group.field] === option.id
                const disabled = !selected && isOptionDisabled(group.field, option.id, bike)

                return (
                  <label
                    className={selected ? 'feature-card feature-card-selected' : 'feature-card'}
                    data-disabled={disabled}
                    key={option.id}
                  >
                    <input
                      type="radio"
                      name={group.field}
                      value={option.id}
                      checked={selected}
                      disabled={disabled}
                      onChange={onChange}
                    />
                    <div className="feature-card-header">
                      <strong>{option.name}</strong>
                      <span>{formatCurrency(option.price)}</span>
                    </div>
                    <p>{option.blurb}</p>
                  </label>
                )
              })}
            </div>
          </section>
        ))}
      </div>

      <div className="builder-meta">
        <div className="price-callout">
          <span>Total</span>
          <strong>{formatCurrency(getBikePrice(bike))}</strong>
        </div>

        {conflicts.length > 0 && (
          <div className="banner-error" role="alert">
            {conflicts.join(' ')}
          </div>
        )}

        {errorMessage && (
          <div className="banner-error" role="alert">
            {errorMessage}
          </div>
        )}

        {statusMessage && <div className="banner-info">{statusMessage}</div>}

        <button className="primary-button" disabled={busy || conflicts.length > 0} type="submit">
          {busy ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  )
}

export default BuilderForm
