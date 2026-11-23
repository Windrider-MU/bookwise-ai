import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Smarter tutoring decisions</span>

            <h1>Find the right coding tutor with help from AI.</h1>

            <p className="hero-text">
              Explore personalized software-development tutoring,
              receive an AI-powered recommendation, and book a session
              in minutes.
            </p>

            <div className="hero-actions">
              <Link className="button" to="/services">
                Browse services
              </Link>

              <Link className="button button-outline" to="/advisor">
                Ask the AI advisor
              </Link>
            </div>
          </div>

          <div className="hero-panel">
            <span className="hero-icon">✦</span>
            <h2>Unsure what to book?</h2>
            <p>
              Describe your current challenge and the BookWise AI
              Advisor will recommend one of the services in our catalog.
            </p>
            <Link to="/advisor">Get a recommendation →</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">How it works</span>
            <h2>From learning challenge to confirmed appointment</h2>
          </div>

          <div className="feature-grid">
            <article className="feature-card">
              <span>01</span>
              <h3>Browse</h3>
              <p>
                Compare tutoring services by topic, level, duration,
                and price.
              </p>
            </article>

            <article className="feature-card">
              <span>02</span>
              <h3>Ask AI</h3>
              <p>
                Describe your learning goal and receive a personalized
                recommendation.
              </p>
            </article>

            <article className="feature-card">
              <span>03</span>
              <h3>Book</h3>
              <p>
                Choose your preferred date and time and manage it from
                your dashboard.
              </p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}