export const FRAME_STYLES = [
  {
    id: 'city',
    name: 'City Glide',
    price: 860,
    blurb: 'Relaxed geometry for downtown miles and cafe stops.',
    topTube: '270,250 405,170 565,170 455,250',
    seatStay: '410,170 338,310',
    chainStay: '450,250 338,310',
    handlebarY: 138
  },
  {
    id: 'mountain',
    name: 'Trail Forge',
    price: 1040,
    blurb: 'Sturdier stance with more clearance for rough terrain.',
    topTube: '260,250 400,154 570,166 462,250',
    seatStay: '405,154 330,314',
    chainStay: '462,250 330,314',
    handlebarY: 126
  },
  {
    id: 'racing',
    name: 'Sprint Cut',
    price: 1280,
    blurb: 'Aggressive posture and lighter tubing for speed days.',
    topTube: '290,252 432,162 592,180 464,252',
    seatStay: '430,162 340,312',
    chainStay: '464,252 340,312',
    handlebarY: 148
  }
]

export const PAINT_COLORS = [
  { id: 'ember', name: 'Ember Orange', price: 90, hex: '#d85d2b' },
  { id: 'tide', name: 'Tidal Teal', price: 90, hex: '#198c84' },
  { id: 'midnight', name: 'Midnight Ink', price: 120, hex: '#2b3547' }
]

export const WHEELSETS = [
  { id: 'road', name: 'Road Slicks', price: 180, blurb: 'Fast rolling with a narrow profile.', tireWidth: 10 },
  { id: 'gravel', name: 'Gravel Mix', price: 240, blurb: 'Balanced tread for mixed surfaces.', tireWidth: 14 },
  { id: 'offroad', name: 'Off-Road Knobbies', price: 320, blurb: 'Chunky tread for dirt and loose terrain.', tireWidth: 18 }
]

export const SEAT_TYPES = [
  { id: 'comfort', name: 'Comfort Saddle', price: 75, blurb: 'Upright and padded for longer rides.' },
  { id: 'aero', name: 'Aero Saddle', price: 140, blurb: 'Trim profile for a fast fit.' },
  { id: 'cargo', name: 'Utility Saddle', price: 110, blurb: 'Built for baskets, bags, and errands.' }
]

export const ACCESSORIES = [
  { id: 'none', name: 'None', price: 0, blurb: 'Leave the frame clean and minimal.' },
  { id: 'basket', name: 'Front Basket', price: 60, blurb: 'Perfect for flowers, books, and groceries.' },
  { id: 'bottle', name: 'Bottle Cage', price: 30, blurb: 'A compact hydration mount.' },
  { id: 'headlight', name: 'Turbo Light', price: 45, blurb: 'Night-ready front light.' }
]

export const DEFAULT_BIKE = {
  name: 'Sunrise Special',
  frame_style: 'city',
  paint_color: 'ember',
  wheelset: 'gravel',
  seat_type: 'comfort',
  accessory: 'basket',
  notes: ''
}

export const FEATURE_GROUPS = [
  {
    field: 'frame_style',
    title: 'Frame',
    copy: 'Choose the silhouette that sets the ride posture and personality.',
    options: FRAME_STYLES
  },
  {
    field: 'paint_color',
    title: 'Paint',
    copy: 'Apply the studio finish that defines the whole bike.',
    options: PAINT_COLORS
  },
  {
    field: 'wheelset',
    title: 'Wheelset',
    copy: 'Balance grip, speed, and terrain with the right tread.',
    options: WHEELSETS
  },
  {
    field: 'seat_type',
    title: 'Seat',
    copy: 'Dial in comfort or efficiency depending on the build intent.',
    options: SEAT_TYPES
  },
  {
    field: 'accessory',
    title: 'Accessory',
    copy: 'Finish the bike with a practical or night-riding add-on.',
    options: ACCESSORIES
  }
]
