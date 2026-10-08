/**
 * SINGLE SOURCE OF TRUTH FOR ALL SITE CONTENT.
 * ---------------------------------------------------------------------------
 * Everything here comes from the team's existing website
 * (https://iitbh-fi.vercel.app). Nothing has been invented — the copy has been
 * cut down, but no fact has been added.
 *
 * Some values on the source site are themselves unfilled placeholders
 * (e.g. "MEMBER NAME", "+91 XXX XXX XXXX", sponsor names, car specs). Those
 * carry `tbc: true` so they stay visibly identifiable instead of reading as
 * fact. Search for `tbc` to find every outstanding item.
 */

export const team = {
  name: 'TEAM AGNISHUL',
  org: 'IIT BHILAI MOTORSPORTS',
  shortOrg: 'IIT BHILAI',
  tagline: 'ENGINEERING EXCELLENCE IN MOTION',
  locale: 'BHILAI / INDIA',
  founded: '2010',

  /**
   * Club logo. Both files are generated from the supplied artwork: the white
   * background is knocked out, and in the dark variant the black "IIT BHILAI"
   * lettering and car outline are remapped to off-white so they stay legible.
   * The red is untouched in both.
   */
  logo: '/images/logo-dark.png', // navbar (dark grounds)
  logoLight: '/images/logo.png', // original colours, for light grounds

  /**
   * The loading screen spins the logo's wheels, so it uses a split version:
   * the mark with both wheels lifted out, plus each wheel as its own square
   * sprite. Stacking them reproduces `logo` exactly. Offsets are percentages
   * of the logo box, so they hold at any size.
   */
  logoBase: '/images/logo-dark-base.png',
  logoWheels: [
    { src: '/images/wheel-front.png', left: 28.0, top: 39.826, width: 11.167 },
    { src: '/images/wheel-rear.png', left: 58.25, top: 39.826, width: 11.167 },
  ],

  blurb: 'We design, build and race formula cars at IIT Bhilai.',
}

export const contact = {
  address: ['IIT BHILAI, 6TH LANE ROAD', 'JEVRA, CHHATTISGARH — 491002'],
  // Both addresses below are unfilled placeholders on the current live site.
  emailGeneral: { value: 'email@iitbhilai.ac.in', tbc: true },
  emailTeam: { value: 'team@agnishul.com', tbc: true },
  phone: { value: '+91 XXX XXX XXXX', tbc: true },
  socials: [
    // Live site links all point at "#" — no handles published yet.
    { label: 'INSTAGRAM', short: 'IG', href: '#', tbc: true },
    { label: 'LINKEDIN', short: 'IN', href: '#', tbc: true },
    { label: 'TWITTER', short: 'X', href: '#', tbc: true },
  ],
}

/** The three things the team points at from the home page. */
export const pillars = [
  {
    index: '01',
    key: 'cars',
    label: 'THE CARS',
    to: '/cars',
    cta: 'SEE THE CARS',
    body: 'We started on combustion engines. Now we build electric.',
  },
  {
    index: '02',
    key: 'crew',
    label: 'THE TEAM',
    to: '/team',
    cta: 'MEET THE TEAM',
    body: 'Mechanical, electrical and software students, one car.',
  },
  {
    index: '03',
    key: 'mission',
    label: 'THE MISSION',
    to: '/team',
    cta: 'LEARN MORE',
    body: 'Build engineers who can design, build and race.',
  },
]

/** Four stages of how a car gets made. */
export const cycle = [
  { step: '01', name: 'DESIGN', body: 'CAD and simulation before anything is cut.' },
  { step: '02', name: 'BUILD', body: 'Fabricated and assembled in our own workshop.' },
  { step: '03', name: 'TEST', body: 'Shakedown runs. Data from every lap.' },
  { step: '04', name: 'RACE', body: 'Against the best engineering teams in India.' },
]

export const timeline = [
  { year: '2010', title: 'FOUNDED', body: 'The team starts at IIT Bhilai.' },
  { year: '2015', title: 'FIRST WIN', body: 'We win Formula Bharat.' },
  { year: '2020', title: 'GOES ELECTRIC', body: 'The programme switches to electric powertrains.' },
  { year: '2024', title: 'TODAY', body: 'Still designing, building and racing.' },
]

export const teamStats = [
  { value: 4, suffix: '', label: 'SUBSYSTEMS' },
  { value: 30, suffix: '+', label: 'MEMBERS' },
  { value: 3, suffix: '', label: 'CARS BUILT' },
]

/**
 * The source site states "4 subsystems" but never names them.
 * The structure is here; the names are deliberately blank.
 */
export const subsystems = [
  { id: '01', name: null, tbc: true },
  { id: '02', name: null, tbc: true },
  { id: '03', name: null, tbc: true },
  { id: '04', name: null, tbc: true },
]

export const coreTeam = [
  { no: '01', name: 'DURGANSH MISHRA', role: 'SECRETARY' },
  { no: '02', name: null, role: 'TEAM LEAD', tbc: true },
  { no: '03', name: null, role: 'TECHNICAL HEAD', tbc: true },
  { no: '04', name: null, role: 'DESIGN HEAD', tbc: true },
]

/**
 * Car registry. Names and spec values are what the current site publishes —
 * they read as unfilled template defaults (CAR1/CAR2/CAR3), so each is marked
 * `tbc` and shown with a visible marker.
 */
export const cars = [
  {
    no: '01',
    code: 'CAR1',
    name: 'CAR 1',
    tbc: true,
    powertrain: 'COMBUSTION',
    body: 'Our first car. Built around aerodynamics and power delivery.',
    specs: [
      { k: 'ENGINE', v: 'V8 TWIN-TURBO', tbc: true },
      { k: 'TOP SPEED', v: '380 KM/H', tbc: true },
    ],
  },
  {
    no: '02',
    code: 'CAR2',
    name: 'CAR 2',
    tbc: true,
    powertrain: 'ELECTRIC',
    body: 'Electric powertrain. Instant torque, no emissions.',
    specs: [
      { k: 'ENGINE', v: 'ELECTRIC DRIVE', tbc: true },
      { k: 'TOP SPEED', v: '340 KM/H', tbc: true },
    ],
  },
  {
    no: '03',
    code: 'CAR3',
    name: 'CAR 3',
    tbc: true,
    powertrain: 'HYBRID',
    body: 'Combustion and electric together, built for efficiency.',
    specs: [
      { k: 'ENGINE', v: 'HYBRID UNIT', tbc: true },
      { k: 'TOP SPEED', v: '360 KM/H', tbc: true },
    ],
  },
]

export const sponsorTiers = [
  {
    tier: 'TITLE',
    sponsors: [{ name: 'TECHCORP INDIA' }, { name: 'AUTOTECH SOLUTIONS' }],
  },
  {
    tier: 'TECHNICAL',
    sponsors: [
      { name: 'BATTERY SYSTEMS LTD' },
      { name: 'CARBON FIBER CO' },
      { name: 'MOTOR CONTROLS INC' },
      { name: 'SENSOR TECH' },
    ],
  },
  {
    tier: 'SUPPORTING',
    sponsors: [
      { name: 'ENGINEERING TOOLS' },
      { name: 'CAD SOFTWARE PRO' },
      { name: 'MACHINING WORKS' },
      { name: 'ELECTRONICS HUB' },
      { name: 'RACING TIRES CO' },
      { name: 'SAFETY GEAR LTD' },
    ],
  },
]

/** Every sponsor name above is still a placeholder on the live site. */
export const sponsorsArePlaceholder = true

export const news = [
  {
    no: '01',
    date: '10 JAN 2026',
    iso: '2026-01-10',
    title: 'WE UNVEIL THE 2026 ELECTRIC CAR',
    body: 'A redesigned powertrain, better aerodynamics and new telemetry.',
    tag: 'CAR',
  },
  {
    no: '02',
    date: '22 DEC 2025',
    iso: '2025-12-22',
    title: 'PODIUM AT THE NATIONAL MOTORSPORTS MEET',
    body: 'We finished on the podium against top engineering institutes.',
    tag: 'RESULT',
  },
  {
    no: '03',
    date: '5 DEC 2025',
    iso: '2025-12-05',
    title: 'NEW TECHNICAL PARTNER',
    body: 'A new industry partner joins us on battery and drivetrain work.',
    tag: 'PARTNER',
  },
]

export const galleryFilters = ['ALL', 'RACING', 'TEAM', 'WORKSHOP', 'EVENTS']

/**
 * Captions come from the source gallery. `src` stays null until real photos
 * are added to /public/images — tiles then show the photo; until then they
 * show a plain placeholder rather than stock imagery.
 */
export const gallery = [
  { no: '01', caption: 'ON TRACK', cat: 'RACING', src: null },
  { no: '02', caption: 'TEAM WORK', cat: 'TEAM', src: null },
  { no: '03', caption: 'WORKSHOP', cat: 'WORKSHOP', src: null },
  { no: '04', caption: 'COMPETITION 2024', cat: 'EVENTS', src: null },
  { no: '05', caption: 'VICTORY MOMENT', cat: 'EVENTS', src: null },
  { no: '06', caption: 'TEAM ASSEMBLY', cat: 'TEAM', src: null },
  { no: '07', caption: 'PIT STOP', cat: 'WORKSHOP', src: null },
  { no: '08', caption: 'TESTING DAY', cat: 'WORKSHOP', src: null },
  { no: '09', caption: 'ENGINE CLOSE-UP', cat: 'RACING', src: null },
  { no: '10', caption: 'TRACK BATTLE', cat: 'RACING', src: null },
]

export const nav = [
  { label: 'HOME', to: '/', no: '01' },
  { label: 'CARS', to: '/cars', no: '02' },
  { label: 'TEAM', to: '/team', no: '03' },
  { label: 'SPONSORS', to: '/sponsors', no: '04' },
  { label: 'GALLERY', to: '/gallery', no: '05' },
  { label: 'CONTACT', to: '/contact', no: '06' },
]
