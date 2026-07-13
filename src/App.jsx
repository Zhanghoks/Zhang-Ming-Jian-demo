const CODE_URL = 'https://anonymous.4open.science/r/SqurveBridge-470E/'

const STORY_STEPS = [
  {
    number: '01',
    title: 'Integrate',
    body: 'Rewrite released methods as Squrve-native Actor workflows and normalize external benchmarks into a shared data contract.',
  },
  {
    number: '02',
    title: 'Evaluate & Diagnose',
    body: 'Record SQL quality, runtime cost, structural behavior, and attributed errors beyond a single accuracy score.',
  },
  {
    number: '03',
    title: 'Improve & Validate',
    body: 'Test limited local changes and retain before/after evidence with paired target and general-domain monitoring.',
  },
]

const PIPELINE = [
  {
    title: 'Method adapter',
    detail: 'Reasoning flow · prompts · retrieval · SQL refinement',
  },
  {
    title: 'Benchmark adapter',
    detail: 'Database · schema · split · execution · scoring',
  },
  {
    title: 'Unified evaluation',
    detail: 'L1 SQL quality · L2 cost · L3 components · L4 errors',
  },
  {
    title: 'Recorded evidence',
    detail: 'Scores · detailed report · trace · evaluation store',
    green: true,
  },
]

const CONTRIBUTIONS = [
  {
    index: 'Contribution 01',
    title: 'Unified integration and evaluation',
    body: 'Convert existing Text-to-SQL methods into modular workflows and standardize databases, schemas, splits, execution environments, and evaluation protocols under one runtime.',
    chips: ['Reproduction', 'Cross-domain testing', 'Fair comparison'],
  },
  {
    index: 'Contribution 02',
    title: 'Targeted domain improvement',
    body: 'Use diagnostic evidence beyond final accuracy to guide bounded updates, while preserving before/after validation and visible rejected candidates.',
    chips: ['SQL quality', 'Runtime cost', 'Structural behavior', 'Error types'],
  },
]

const RESULTS = [
  {
    label: 'Source alignment',
    value: '4',
    body: 'Matched origin settings within a 2.75-point EX range.',
    tone: 'accent',
  },
  {
    label: 'Cross-domain coverage',
    value: '12',
    body: 'Additional non-origin method–benchmark executions.',
  },
  {
    label: 'DAILSQL → BULL-en',
    value: '+10.24',
    body: 'Target EX with paired Spider monitoring.',
    tone: 'green',
  },
  {
    label: 'DINSQL → EHRSQL',
    value: '+8.71',
    body: 'Target EX after six bounded update iterations.',
    tone: 'green',
  },
]

export default function App() {
  return (
    <>
      <header className="hero">
        <div className="hero-inner">
          <p className="venue">EMNLP 2026 · System Demonstrations</p>
          <h1>
            SqurveBridge: A Harness-Centered Platform for Cross-Domain Text-to-SQL
            Evaluation and Metric-Guided Loop Engineering
          </h1>
          <p className="authors">
            Mingjian Zhang<sup>1</sup>, Zihan Chen<sup>1</sup>, Zhe Li<sup>1</sup>,
            Peiyu Liu<sup>1</sup>
          </p>
          <p className="affiliation">
            <sup>1</sup>University of International Business and Economics
          </p>
          <nav className="actions" aria-label="Project links">
            <a
              className="button primary"
              href={CODE_URL}
              target="_blank"
              rel="noreferrer"
            >
              Code <span className="arrow" aria-hidden="true">↗</span>
            </a>
            <a className="button" href="#demo-video">
              Live Demo <span className="arrow" aria-hidden="true">↓</span>
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section id="demo-video">
          <h2>Demo Video</h2>
          <div className="video-shell">
            <video controls preload="metadata" playsInline>
              <source src="/demo.mp4" type="video/mp4" />
              Your browser does not support HTML5 video.{' '}
              <a href="/demo.mp4">Download the demo video.</a>
            </video>
            <div className="video-caption">
              A 102-second walkthrough of method integration, unified evaluation,
              diagnostic evidence, and bounded target-domain improvement.
            </div>
          </div>
        </section>

        <section>
          <div className="overview-grid">
            <div>
              <h2>What SqurveBridge Does</h2>
              <p className="lead">
                SqurveBridge closes the last-mile gap between released Text-to-SQL
                methods and real-world database scenarios. It preserves methods and
                benchmarks as runnable integration artifacts, evaluates them under one
                runtime, and turns recorded evidence into bounded, reviewable updates.
              </p>
              <div className="story" style={{ marginTop: 30 }}>
                {STORY_STEPS.map((step) => (
                  <article className="story-step" key={step.number}>
                    <span className="step-number">{step.number}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.body}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <aside className="pipeline" aria-label="SqurveBridge workflow">
              <div className="pipeline-label">System workflow</div>
              <div className="pipeline-flow">
                {PIPELINE.map((node, index) => (
                  <div key={node.title}>
                    {index > 0 ? <div className="connector" /> : null}
                    <div className={node.green ? 'node green' : 'node'}>
                      <strong>{node.title}</strong>
                      <span>{node.detail}</span>
                    </div>
                  </div>
                ))}
                <div className="optional">OPTIONAL ↓</div>
                <div className="node green">
                  <strong>Metric-guided loop</strong>
                  <span>Bounded candidates · paired validation · human review</span>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section>
          <h2>Two Contributions</h2>
          <div className="contributions">
            {CONTRIBUTIONS.map((item) => (
              <article className="contribution" key={item.index}>
                <div className="contribution-index">{item.index}</div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <div className="chips">
                  {item.chips.map((chip) => (
                    <span className="chip" key={chip}>
                      {chip}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2>Results at a Glance</h2>
          <div className="results-grid">
            {RESULTS.map((result) => (
              <article
                className={result.tone ? `result ${result.tone}` : 'result'}
                key={result.label}
              >
                <small>{result.label}</small>
                <strong>{result.value}</strong>
                <p>{result.body}</p>
              </article>
            ))}
          </div>
          <p className="fineprint">
            Non-origin runs demonstrate execution coverage, not superiority. Loop
            cases are analyzed independently because their target benchmarks differ.
          </p>
        </section>
      </main>

      <footer>SqurveBridge · EMNLP 2026 System Demonstrations</footer>
    </>
  )
}
