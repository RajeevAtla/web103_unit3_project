import {
  ACCESSORIES,
  DEFAULT_BIKE,
  FRAME_STYLES,
  PAINT_COLORS,
  SEAT_TYPES,
  WHEELSETS
} from '../data/bikeOptions'

const optionMap = {
  frame_style: FRAME_STYLES,
  paint_color: PAINT_COLORS,
  wheelset: WHEELSETS,
  seat_type: SEAT_TYPES,
  accessory: ACCESSORIES
}

const impossibleComboRules = [
  {
    test: (bike) => bike.frame_style === 'racing' && bike.accessory === 'basket',
    message: 'Sprint Cut frames cannot mount a front basket without compromising steering clearance.'
  },
  {
    test: (bike) => bike.frame_style === 'mountain' && bike.wheelset === 'road',
    message: 'Trail Forge frames require gravel or off-road wheels to match the fork spacing.'
  },
  {
    test: (bike) => bike.frame_style === 'racing' && bike.seat_type === 'cargo',
    message: 'Utility saddles are not supported on the Sprint Cut racing rail system.'
  }
]

export const getOptionById = (field, id) =>
  optionMap[field]?.find((option) => option.id === id) ?? null

export const normalizeBike = (bike = {}) => ({
  ...DEFAULT_BIKE,
  ...bike,
  notes: bike.notes ?? ''
})

export const getBikePrice = (bike) =>
  ['frame_style', 'paint_color', 'wheelset', 'seat_type', 'accessory'].reduce((total, field) => {
    const option = getOptionById(field, bike[field])
    return total + (option?.price ?? 0)
  }, 0)

export const getBikeConflicts = (bike) =>
  impossibleComboRules.filter((rule) => rule.test(bike)).map((rule) => rule.message)

export const isOptionDisabled = (field, optionId, bike) => {
  const draft = { ...bike, [field]: optionId }
  return getBikeConflicts(draft).length > 0
}

export const buildBikePayload = (bike) => {
  const normalized = normalizeBike(bike)
  const conflicts = getBikeConflicts(normalized)

  return {
    payload: {
      ...normalized,
      total_price: getBikePrice(normalized)
    },
    conflicts
  }
}

export const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value)
