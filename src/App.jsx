import { SiGithub } from 'react-icons/si'
import { HiOutlineArrowUpRight } from 'react-icons/hi2'

import { ABSTRACT, PROJECT_LINKS, SITE } from './siteContent.js'

function ExternalLink({ className = '', href, icon: Icon, iconAsset, label }) {
  return (
    <a
      className={`project-link ${className}`.trim()}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {iconAsset ? (
        <img className="project-icon-logo" src={iconAsset} alt="" aria-hidden="true" />
      ) : (
        <Icon className="project-icon" aria-hidden="true" />
      )}
      <span>{label}</span>
      <HiOutlineArrowUpRight className="project-arrow" aria-hidden="true" />
    </a>
  )
}

export default function App() {
  return (
    <div className="site-shell">
      <header className="hero">
        <div className="hero-surface">
          <div className="hero-title-panel">
            <h1>{SITE.title}</h1>
            <span className="title-rule" aria-hidden="true" />
          </div>

          <div className="hero-meta-panel">
            <div className="paper-meta">
              <p className="authors">
                {SITE.authors.map((author, index) => (
                  <span key={author}>
                    {author}<sup>1</sup>
                    {index < SITE.authors.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </p>
              <p className="affiliation">
                <sup>1</sup>
                {SITE.affiliation}
              </p>
            </div>
            <nav className="project-links" aria-label="Project links">
              <ExternalLink
                href={PROJECT_LINKS.github.href}
                icon={SiGithub}
                label={PROJECT_LINKS.github.label}
              />
              <ExternalLink
                className="live-demo"
                href={PROJECT_LINKS.huggingFace.href}
                iconAsset={PROJECT_LINKS.huggingFace.iconAsset}
                label={PROJECT_LINKS.huggingFace.label}
              />
            </nav>
          </div>
        </div>
      </header>

      <main className="paper-content">
        <section className="demo-section" aria-labelledby="demo-heading">
          <h2 className="section-kicker" id="demo-heading">Demo Video</h2>
          <div className="video-frame">
            <video controls preload="metadata" playsInline>
              <source src="/demo.mp4" type="video/mp4" />
              Your browser does not support HTML5 video.
            </video>
          </div>
        </section>

        <section className="abstract-section" aria-labelledby="abstract-heading">
          <p className="section-number" aria-hidden="true">01</p>
          <div className="abstract-content">
            <h2 id="abstract-heading">Abstract</h2>
            <p className="abstract">{ABSTRACT}</p>
          </div>
        </section>
      </main>

      <footer>
        <p>{SITE.footer}</p>
      </footer>
    </div>
  )
}
