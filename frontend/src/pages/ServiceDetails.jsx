import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import api, { getErrorMessage } from "../services/api";
import { useAuth } from "../context/AuthContext";
import Alert from "../components/Alert";
import Loading from "../components/Loading";

function todayString() {
  const today = new Date();
  return today.toISOString().split("T")[0];
}

export default function ServiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [service, setService] = useState(null);
  const [form, setForm] = useState({
    appointmentDate: "",
    appointmentTime: "",
    notes: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function loadService() {
      try {
        const response = await api.get(`/services/${id}`);
        setService(response.data.service);
      } catch (requestError) {
        setError(getErrorMessage(requestError));
      } finally {
        setLoading(false);
      }
    }

    loadService();
  }, [id]);

  function handleChange(event) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!isAuthenticated) {
      navigate("/login", {
        state: {
          from: `/services/${id}`,
        },
      });
      return;
    }

    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      await api.post("/bookings", {
        serviceId: id,
        ...form,
      });

      setSuccess("Your appointment has been booked.");

      setTimeout(() => {
        navigate("/dashboard");
      }, 900);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <main className="section container">
        <Loading text="Loading service..." />
      </main>
    );
  }

  if (!service) {
    return (
      <main className="section container">
        <Alert>{error || "Service not found."}</Alert>
        <Link to="/services">Return to services</Link>
      </main>
    );
  }

  return (
    <main className="section">
      <div className="container detail-grid">
        <section className="detail-content">
          <Link className="back-link" to="/services">
            ← All services
          </Link>

          <span className="category-label">{service.category}</span>
          <h1>{service.name}</h1>

          <div className="service-meta large">
            <span>{service.duration} minutes</span>
            <span>${service.price}</span>
            <span>{service.level}</span>
          </div>

          <p className="detail-description">{service.description}</p>

          <div className="info-box">
            <h2>What to bring</h2>
            <ul>
              <li>Your questions or learning objective</li>
              <li>Relevant code, assignment, or error messages</li>
              <li>A short explanation of what you have already tried</li>
            </ul>
          </div>
        </section>

        <aside className="booking-card">
          <h2>Book this service</h2>
          <p>Select a future appointment date and time.</p>

          <Alert>{error}</Alert>
          <Alert type="success">{success}</Alert>

          {!isAuthenticated && (
            <Alert type="info">
              You will be asked to log in before completing your booking.
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <label htmlFor="appointmentDate">Appointment date</label>
            <input
              id="appointmentDate"
              name="appointmentDate"
              type="date"
              min={todayString()}
              value={form.appointmentDate}
              onChange={handleChange}
              required
            />

            <label htmlFor="appointmentTime">Appointment time</label>
            <input
              id="appointmentTime"
              name="appointmentTime"
              type="time"
              value={form.appointmentTime}
              onChange={handleChange}
              required
            />

            <label htmlFor="notes">
              Notes <span className="optional">(optional)</span>
            </label>
            <textarea
              id="notes"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              maxLength="500"
              rows="5"
              placeholder="What would you like help with?"
            />

            <button
              className="button button-block"
              disabled={submitting}
              type="submit"
            >
              {submitting ? "Booking..." : "Book appointment"}
            </button>
          </form>
        </aside>
      </div>
    </main>
  );
}