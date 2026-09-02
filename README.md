# TEAM AGNISHUL — IIT Bhilai Motorsports

Complete redesign of the team site. Industrial motorsport × neubrutalism: thick
rules, hard block shadows, oversized condensed display type, blueprint underlays
and a restrained ink / paper / grey palette with racing red used only for
accents, active states and figures that matter.

Stack: **React 19 + Vite 7 + React Three Fiber + drei + three + Framer Motion**,
hand-authored CSS (no utility framework — the layouts are too editorial for one).

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

---

## The 3D car

Drop the team's model at:

```
public/models/car.glb
```

Nothing else needs to change. The site detects the file at runtime and swaps
from the fallback drawing to the live scene.

**Geometry is never modified** — the model is only centred, seated on the ground
plane, and uniformly scaled so its longest horizontal axis is a known size, which
keeps framing consistent whatever units the export used.

All tuning lives in [`src/three/carConfig.js`](src/three/carConfig.js):

| Setting | What it does |
| --- | --- |
| `MODEL_URL` | Path to the asset |
| `TARGET_LENGTH` | World size the car is normalised to |
| `BASE_YAW` | Resting angle (default is a 3/4 front view) |
| `SCROLL_YAW` | How far it rotates toward profile as the hero scrolls away |
| `PITCH` / `ROLL` | Corrections if the export is not Y-up |
| `OFFSET` | Nudges the car off the layout centre |
| `POINTER_YAW` / `POINTER_PITCH` | Cursor response (kept restrained) |
| `PLAY_CLIPS` / `CLIP_NAME` | Animation clips — see below |
| `CAMERA.*` | Framing, dolly and sway |

If the `.glb` ships animation clips they are **inspected but not played**. Their
names are logged to the console on load (`[CarScene] clips available…`); set
`PLAY_CLIPS: true` (optionally with `CLIP_NAME`) once you have checked that a
clip actually improves the shot rather than fighting the scroll choreography.

### Rendering

- Lighting is a pit-garage setup: hard key from high front-left, cool rim behind
  to carve out the silhouette, low warm fill. Reflections come from a
  procedurally generated `RoomEnvironment` — **no external HDR download**.
- `ContactShadows` ground the car so it doesn't read as a floating render.
- Tone mapping is ACES Filmic.

### Performance and fallbacks

The whole three.js stack is a **lazy chunk** — it is not fetched until the stage
scrolls into view, so the rest of the site paints without it.

`src/components/CarStage.jsx` decides what to render:

| Condition | Result |
| --- | --- |
| Desktop, WebGL, model present | Full scene: shadows, DPR ≤ 2, antialiasing |
| Narrow screen / ≤ 4 cores | Reduced: no shadow maps, DPR ≤ 1.5, single-frame contact shadow |
| `deviceMemory` < 4, or no WebGL | Scene skipped entirely |
| `car.glb` missing | Technical side-elevation drawing |
| Scene throws at runtime | Error boundary inside the Canvas swaps to the drawing |

The frame loop is also suspended (`frameloop="never"`) whenever the stage is off
screen, and scroll and pointer values are held in refs so neither ever triggers a
React re-render.

The fallback is a real drawing ([`src/three/VehicleDrawing.jsx`](src/three/VehicleDrawing.jsx)),
not a stand-in 3D object — an unfinished spec sheet is honest in a way a grey box
is not. It is also reused as the watermark on the recruitment section and 404.

---

## Content — please read

**All copy comes from the existing site** (`iitbh-fi.vercel.app`) and lives in one
file: [`src/data/site.js`](src/data/site.js). No team members, results, dates,
sponsors or statistics have been invented.

A number of values on the current live site are themselves unfilled template
defaults. Rather than dress those up as facts, they are carried across and
**flagged**:

```js
{ name: null, role: 'TEAM LEAD', tbc: true }
```

Anything marked `tbc: true` renders with a visible red **TBC** marker, and empty
fields render as `POSITION OPEN` / `AWAITING NAME` rather than filler. Grep for
`tbc` to find every outstanding item. The current list:

- **Crew** — only `DURGANSH MISHRA (SECRETARY)` is confirmed. Team Lead,
  Technical Head and Design Head are unnamed on the source site.
- **Subsystems** — the site publishes "4 subsystems" but never names them, so
  four empty slots exist.
- **Vehicles** — `CAR1 / CAR2 / CAR3` and their specs (V8 twin-turbo, 380 km/h,
  "Racing Division Alpha") read as template defaults. Every spec is marked TBC.
- **Sponsors** — all twelve names are placeholders across three tiers.
- **Contact** — `team@agnishul.com`, `email@iitbhilai.ac.in` and
  `+91 XXX XXX XXXX` are placeholders; all social links point at `#`.
- **Competitions count** on the vehicles page is not published anywhere, so it
  renders as `—`.
- **Gallery** — captions are real, images are not published. Set `src` on any
  entry in `gallery` to a file in `public/images/` and that tile renders the
  photograph instead of a placeholder plate.

Confirmed content carried over unchanged: the 2010 / 2015 / 2020 / 2024 timeline,
the three pillars (cars / team / mission), all three news entries, the campus
address, and the 4 subsystems / 30+ engineers / 1 shared vision figures.

---

## Structure

```
src/
  components/     Navbar, Footer, PageHead, CarStage, ui primitives
  sections/       Home sections — Hero, About, Engineering, Journey,
                  Achievements, PartnersStrip, Join
  pages/          Routed pages — Home, Vehicles, Crew, Partners,
                  Archive, Dispatch, Contact, NotFound
  three/          carConfig, CarScene, CarModel, VehicleDrawing
  data/site.js    ALL content
  styles/base.css Design tokens, reset, type scale, primitives
  lib/            usePageTitle
```

Routes preserve the original URLs (`/cars`, `/team`, `/sponsors`, `/gallery`,
`/news`, `/contact`) so existing links keep working. The nav labels them
Vehicles / Crew / Partners / Archive / Dispatch.

`vercel.json` adds the SPA rewrite the current deployment is missing — today
`iitbh-fi.vercel.app/team` returns a 404 on direct load.

### Design system

Tokens and primitives are in `src/styles/base.css`. The useful ones:

- `.display` + `.d-xxl … .d-sm` — condensed 900-weight headline scale
- `.slab` / `.plate` — bordered blocks with offset shadows (ink and paper grounds)
- `.eyebrow`, `.tag`, `.tbc`, `.racenum` — technical labelling
- `.blueprint`, `.metal`, `.ruler`, `.hazard` — surfaces and markings
- `.sec--ink` / `.sec--paper` — the alternating section grounds

Type is one superfamily plus a mono: **Archivo** (variable width axis, run at 62%
width / 900 weight for display) and **JetBrains Mono** for technical labels.

---

## Contact form

There is no backend. `FORM_ENDPOINT` in
[`src/pages/Contact.jsx`](src/pages/Contact.jsx) is `null`, so the form composes a
message in the visitor's own mail client and says so on the page rather than
pretending to send. Set it to a form service or API route and it POSTs JSON
(`name`, `email`, `subject`, `message`) instead.

## Accessibility

Skip link, focus-visible outlines, labelled form fields, `aria-*` on the mobile
nav and filters, 44–48px minimum touch targets, and `prefers-reduced-motion`
honoured — reveals, counters and the marquee all stop.
