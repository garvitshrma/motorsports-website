/**
 * SINGLE SOURCE OF TRUTH FOR ALL SITE CONTENT.
 * ---------------------------------------------------------------------------
 * Everything here was transcribed from the team's existing website
 * (https://iitbh-fi.vercel.app). Nothing has been invented.
 *
 * Some values on the source site are themselves unfilled placeholders
 * (e.g. "MEMBER NAME", "+91 XXX XXX XXXX", sponsor names, car spec numbers).
 * Those are flagged with `tbc: true` so they are visibly identifiable in the
 * UI and trivially greppable here. Replace them with real data before launch —
 * do not ship them as facts.
 *
 * Search this file for `tbc` to find every outstanding item.
 */

export const team = {
  name: 'TEAM AGNISHUL',
  org: 'IIT BHILAI MOTORSPORTS',
  shortOrg: 'IIT BHILAI',
  tagline: 'ENGINEERING EXCELLENCE IN MOTION',
  motto: 'IGNITING EXCELLENCE',
  locale: 'BHILAI / INDIA',
  founded: '2010',

  /**
   * Club logo shown in the navbar badge.
   * Put the file in /public/images and point at it here, e.g. '/images/logo.png'.
   * While this is null the badge falls back to the red "A" mark.
   */
  logo: null,

  /**
   * How the logo sits in the badge:
   *   'bare'  — logo alone on the dark bar. Best for white / light marks.
   *   'plate' — logo on an off-white square. Use for dark or full-colour marks.
   *   'red'   — logo knocked out on the racing-red square.
   */
  logoStyle: 'bare',
  blurb:
    'Pioneering excellence in formula racing with innovative engineering and sustainable technology at IIT Bhilai.',
}

export const contact = {
  address: ['IIT BHILAI, 6TH LANE ROAD', 'JEVRA, CHHATTISGARH — 491002'],
  campus: ['IIT BHILAI CAMPUS', 'CHHATTISGARH, INDIA'],
  // Both addresses below are unfilled placeholders on the current live site.
  emailGeneral: { value: 'email@iitbhilai.ac.in', tbc: true },
  emailTeam: { value: 'team@agnishul.com', tbc: true },
  phone: { value: '+91 XXX XXX XXXX', tbc: true },
  socials: [
    // Live site links all point at "#" — no handles published yet.
    { label: 'INSTAGRAM', short: 'IG', href: '#', tbc: true },
    { label: 'LINKEDIN', short: 'IN', href: '#', tbc: true },
    { label: 'TWITTER', short: 'X', href: '#', tbc: true },
    { label: 'FACEBOOK', short: 'FB', href: '#', tbc: true },
  ],
}

/** Three pillars carried over from the source home page. */
export const pillars = [
  {
    index: '01',
    key: 'cars',
    label: 'THE CARS',
    to: '/cars',
    cta: 'VIEW CARS',
    body: "Our journey began with internal combustion engines, pushing the limits of performance and efficiency. Today, we've evolved to electric powertrains, pioneering sustainable racing technology without compromising on speed and innovation.",
  },
  {
    index: '02',
    key: 'crew',
    label: 'THE TEAM',
    to: '/team',
    cta: 'MEET THE TEAM',
    body: 'Behind every car is a dedicated team of engineers, designers, and innovators. Our members collaborate across disciplines, bringing together mechanical, electrical, and software expertise to build championship-winning formula cars.',
  },
  {
    index: '03',
    key: 'mission',
    label: 'OUR MISSION',
    to: '/team',
    cta: 'LEARN MORE',
    body: 'To push the boundaries of motorsports engineering while fostering innovation and sustainability. We aim to create future-ready engineers who lead the automotive revolution with cutting-edge technology and sustainable practices.',
  },
]

/** Four-stage development cycle — the spine of the Engineering section. */
export const cycle = [
  {
    step: '01',
    name: 'DESIGN',
    body: 'Concept, simulation and CAD. Components are modelled and validated before a single part is cut.',
  },
  {
    step: '02',
    name: 'BUILD',
    body: 'Fabrication and assembly in-house. Mechanical, electrical and software subsystems become one vehicle.',
  },
  {
    step: '03',
    name: 'TEST',
    body: 'Shakedown runs, telemetry capture and iteration. Data from every lap feeds back into the design loop.',
  },
  {
    step: '04',
    name: 'RACE',
    body: 'Competition. Static and dynamic events against the best engineering institutes in the country.',
  },
]

export const timeline = [
  {
    year: '2010',
    title: 'FOUNDATION',
    body: 'Motorsports-IITBH established with a vision to revolutionize student formula racing. Started with passionate engineers determined to make their mark in the automotive world.',
  },
  {
    year: '2015',
    title: 'FIRST VICTORY',
    body: 'Won Formula Bharat competition, marking our first major breakthrough. This victory validated our engineering excellence and innovative approach to racing.',
  },
  {
    year: '2020',
    title: 'ELECTRIC TRANSITION',
    body: 'Shifted to electric vehicles, pioneering sustainable racing technology. Led the way in combining high performance with environmental responsibility.',
  },
  {
    year: '2024',
    title: 'PRESENT DAY',
    body: 'Leading innovation in motorsports with cutting-edge designs and performance. Continuously pushing boundaries with advanced technology and engineering excellence.',
  },
]

export const teamStats = [
  { value: 4, suffix: '', label: 'SUBSYSTEMS' },
  { value: 30, suffix: '+', label: 'ENGINEERS' },
  { value: 1, suffix: '', label: 'SHARED VISION' },
]

/**
 * The source site states "4 SUBSYSTEMS" but never names them.
 * The structure is built; names are deliberately left blank.
 */
export const subsystems = [
  { id: 'SS-01', name: null, tbc: true },
  { id: 'SS-02', name: null, tbc: true },
  { id: 'SS-03', name: null, tbc: true },
  { id: 'SS-04', name: null, tbc: true },
]

export const coreTeam = [
  { no: '01', name: 'DURGANSH MISHRA', role: 'SECRETARY' },
  { no: '02', name: null, role: 'TEAM LEAD', tbc: true },
  { no: '03', name: null, role: 'TECHNICAL HEAD', tbc: true },
  { no: '04', name: null, role: 'DESIGN HEAD', tbc: true },
]

/**
 * Vehicle registry. Names and spec values below are exactly what the current
 * site publishes — they read as unfilled template defaults (CAR1/CAR2/CAR3),
 * so each is marked `tbc` and rendered with a visible TBC marker.
 */
export const cars = [
  {
    no: '01',
    code: 'CAR1',
    name: 'MODEL CAR1',
    tbc: true,
    powertrain: 'COMBUSTION',
    body: 'Our flagship racing machine with cutting-edge aerodynamics and unmatched power delivery.',
    specs: [
      { k: 'ENGINE', v: 'V8 TWIN-TURBO', tbc: true },
      { k: 'TOP SPEED', v: '380 KM/H', tbc: true },
      { k: 'DIVISION', v: 'RACING DIVISION ALPHA', tbc: true },
    ],
  },
  {
    no: '02',
    code: 'CAR2',
    name: 'MODEL CAR2',
    tbc: true,
    powertrain: 'ELECTRIC',
    body: 'Revolutionary electric powertrain delivering instant torque and sustainable performance.',
    specs: [
      { k: 'ENGINE', v: 'ELEC DRIVE', tbc: true },
      { k: 'TOP SPEED', v: '340 KM/H', tbc: true },
      { k: 'DIVISION', v: 'ELECTRIC PERFORMANCE TEAM', tbc: true },
    ],
  },
  {
    no: '03',
    code: 'CAR3',
    name: 'MODEL CAR3',
    tbc: true,
    powertrain: 'HYBRID',
    body: 'Perfect blend of combustion and electric technology for optimal efficiency.',
    specs: [
      { k: 'ENGINE', v: 'HYBRID POWER UNIT', tbc: true },
      { k: 'TOP SPEED', v: '360 KM/H', tbc: true },
      { k: 'DIVISION', v: 'INNOVATION SQUAD BETA', tbc: true },
    ],
  },
]

/** Derived from the registry above. Competition count is not published anywhere. */
export const carStats = [
  { value: cars.length, suffix: '', label: 'VEHICLES BUILT' },
  { value: 3, suffix: '', label: 'POWERTRAIN TYPES' },
  { value: null, suffix: '', label: 'COMPETITIONS', tbc: true },
]

export const sponsorTiers = [
  {
    tier: 'TITLE SPONSOR',
    code: 'T1',
    sponsors: [
      { name: 'TECHCORP INDIA', tbc: true },
      { name: 'AUTOTECH SOLUTIONS', tbc: true },
    ],
  },
  {
    tier: 'TECHNICAL PARTNER',
    code: 'T2',
    sponsors: [
      { name: 'BATTERY SYSTEMS LTD', tbc: true },
      { name: 'CARBON FIBER CO', tbc: true },
      { name: 'MOTOR CONTROLS INC', tbc: true },
      { name: 'SENSOR TECH', tbc: true },
    ],
  },
  {
    tier: 'SUPPORTING SPONSOR',
    code: 'T3',
    sponsors: [
      { name: 'ENGINEERING TOOLS', tbc: true },
      { name: 'CAD SOFTWARE PRO', tbc: true },
      { name: 'MACHINING WORKS', tbc: true },
      { name: 'ELECTRONICS HUB', tbc: true },
      { name: 'RACING TIRES CO', tbc: true },
      { name: 'SAFETY GEAR LTD', tbc: true },
    ],
  },
]

export const news = [
  {
    no: '001',
    date: 'JANUARY 10, 2026',
    iso: '2026-01-10',
    title: 'TEAM UNVEILS 2026 ELECTRIC RACE CAR',
    body: 'Our latest electric race car features a redesigned powertrain, improved aerodynamics, and cutting-edge telemetry.',
    tag: 'VEHICLE',
  },
  {
    no: '002',
    date: 'DECEMBER 22, 2025',
    iso: '2025-12-22',
    title: 'PODIUM FINISH AT NATIONAL MOTORSPORTS MEET',
    body: 'A proud moment for the team as we secured a podium finish against top engineering institutes.',
    tag: 'RESULT',
  },
  {
    no: '003',
    date: 'DECEMBER 5, 2025',
    iso: '2025-12-05',
    title: 'NEW TECHNICAL PARTNERSHIP ANNOUNCED',
    body: 'We welcome a new industry partner supporting our battery and drivetrain R&D.',
    tag: 'PARTNERSHIP',
  },
]

export const galleryFilters = [
  'ALL',
  'RACING',
  'TEAM',
  'BEHIND THE SCENES',
  'EVENTS',
  'ACHIEVEMENTS',
]

/**
 * Captions carried over from the source gallery. `src` stays null until real
 * photographs are dropped into /public/images — each tile then renders the
 * photo; until then it renders a labelled technical placeholder plate rather
 * than stock imagery.
 */
export const gallery = [
  { no: '01', caption: 'ON TRACK', cat: 'RACING', src: null },
  { no: '02', caption: 'TEAM WORK', cat: 'TEAM', src: null },
  { no: '03', caption: 'WORKSHOP', cat: 'BEHIND THE SCENES', src: null },
  { no: '04', caption: 'COMPETITION 2024', cat: 'EVENTS', src: null },
  { no: '05', caption: 'VICTORY MOMENT', cat: 'ACHIEVEMENTS', src: null },
  { no: '06', caption: 'TEAM ASSEMBLY', cat: 'TEAM', src: null },
  { no: '07', caption: 'PIT STOP', cat: 'BEHIND THE SCENES', src: null },
  { no: '08', caption: 'TESTING DAY', cat: 'BEHIND THE SCENES', src: null },
  { no: '09', caption: 'ENGINE CLOSE-UP', cat: 'RACING', src: null },
  { no: '10', caption: 'TRACK BATTLE', cat: 'RACING', src: null },
]

export const nav = [
  { label: 'INDEX', to: '/', no: '00' },
  { label: 'VEHICLES', to: '/cars', no: '01' },
  { label: 'CREW', to: '/team', no: '02' },
  { label: 'PARTNERS', to: '/sponsors', no: '03' },
  { label: 'ARCHIVE', to: '/gallery', no: '04' },
  { label: 'DISPATCH', to: '/news', no: '05' },
  { label: 'CONTACT', to: '/contact', no: '06' },
]
