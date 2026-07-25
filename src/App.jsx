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
            <img
              className="project-logo"
              src="/squrvebridge-logo.png"
              alt="SqurveBridge"
            />
            <h1>{SITE.title}</h1>
            <span className="title-rule" aria-hidden="true" />
          </div>

          <div className="hero-meta-panel">
            <div className="paper-meta">
              <p className="authors">
                {SITE.authors.join(', ')}
              </p>
              {SITE.affiliation ? (
                <p className="affiliation">{SITE.affiliation}</p>
              ) : null}
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
        <section className="intro-section" aria-labelledby="intro-heading">
          <div className="section-heading">
            <p className="section-label">Introduction</p>
            <h2 id="intro-heading">Text-to-SQL, from request to verified query</h2>
            <p>
              A visual introduction to the three-stage workflow behind the
              system: understand the database context, generate SQL, and verify
              the result before delivery.
            </p>
          </div>
          <div className="video-frame intro-video-frame">
            <video controls preload="metadata" playsInline>
              <source src="/intro-demo.mp4" type="video/mp4" />
              Your browser does not support HTML5 video.
            </video>
          </div>
        </section>

        <section className="architecture-section" aria-labelledby="architecture-heading">
          <div className="section-heading architecture-heading">
            <p className="section-label">System Architecture</p>
            <h2 id="architecture-heading">One traceable path from integration to validation</h2>
            <p>
              SqurveBridge connects method and benchmark integration with unified
              evaluation, recorded evidence, and optional metric-guided loop
              engineering.
            </p>
          </div>
          <div className="architecture-layout">
            <figure className="architecture-figure">
              <img
                src="/squrvebridge-architecture.png"
                alt="SqurveBridge architecture: integration harness, unified evaluation system, recorded evidence, and optional metric-guided loop engineering."
              />
            </figure>
            <div className="architecture-explainer">
              <p className="architecture-overline">How to read the platform</p>
              <article>
                <span>01</span>
                <div>
                  <h3>Integrate</h3>
                  <p>
                    Method and benchmark adapters convert released systems and
                    external datasets into a shared runnable configuration.
                  </p>
                </div>
              </article>
              <article>
                <span>02</span>
                <div>
                  <h3>Evaluate and diagnose</h3>
                  <p>
                    A unified evaluation system records SQL quality, runtime
                    cost, structural behavior, and attributed errors together.
                  </p>
                </div>
              </article>
              <article>
                <span>03</span>
                <div>
                  <h3>Improve with evidence</h3>
                  <p>
                    The optional loop scopes candidates, applies bounded gates,
                    and preserves the decision record for review.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

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
