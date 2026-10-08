import './PageHead.css'

/**
 * Masthead for the routed pages.
 *
 * Shared framing — big index number, oversized title, margin rail — but each
 * page passes its own aside content, so no two read identically.
 */
export default function PageHead({ index, kicker, title, lede, aside }) {
  return (
    <header className="phead on-ink blueprint">

      <div className="shell phead__inner">
        <div className="phead__main">
          <p className="eyebrow">{kicker}</p>
          <h1 className="display phead__title">{title}</h1>
          {lede && <p className="body-lg phead__lede">{lede}</p>}
        </div>

        <div className="phead__side">
          <span className="phead__index display" aria-hidden="true">
            {index}
          </span>
          {aside}
        </div>
      </div>

      <div className="phead__ruler ruler" aria-hidden="true" />
    </header>
  )
}
