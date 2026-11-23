import { useState } from "react";
import { Link } from "react-router-dom";

import api, { getErrorMessage } from "../services/api";
import Alert from "../components/Alert";

export default function AIAdvisor() {
  const [goal, setGoal] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setRecommendation("");
    setSubmitting(true);

    try {
      const response = await api.post("/ai/recommend", {
        goal,
      });

      setRecommendation(response.data.recommendation);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="section">
      <div className="container advisor-grid">
        <section>
          <span className="eyebrow">AI-powered guidance</span>
          <h1>Which tutoring service should you choose?</h1>

          <p className="lead">
            Describe your current experience, the problem you are
            facing, and what you want to accomplish.
          </p>

          <div className="info-box">
            <h2>Example</h2>
            <p>
              “I understand basic JavaScript, but I am confused about
              React state and useEffect. I need help finishing a
              dashboard project.”
            </p>
          </div>
        </section>

        <section className="advisor-card">
          <form onSubmit={handleSubmit}>
            <label htmlFor="goal">Describe your learning goal</label>

            <textarea
              id="goal"
              value={goal}
              onChange={(event) => setGoal(event.target.value)}
              minLength="15"
              maxLength="700"
              rows="8"
              placeholder="Tell the advisor what you are learning and where you are stuck..."
              required
            />

            <div className="character-count">
              {goal.length}/700 characters
            </div>

            <button
              className="button button-block"
              disabled={submitting}
              type="submit"
            >
              {submitting
                ? "Preparing recommendation..."
                : "Get AI recommendation"}
            </button>
          </form>

          <Alert>{error}</Alert>

          {recommendation && (
            <div className="ai-result">
              <span className="ai-label">BookWise AI recommendation</span>

              <div className="ai-text">{recommendation}</div>

              <Link className="button button-block" to="/services">
                View available services
              </Link>
            </div>
          )}

          <p className="ai-disclaimer">
            AI recommendations may be imperfect. Review the service
            details before booking.
          </p>
        </section>
      </div>
    </main>
  );
}