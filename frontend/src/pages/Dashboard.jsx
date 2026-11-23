import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import api, { getErrorMessage } from "../services/api";
import { useAuth } from "../context/AuthContext";
import Alert from "../components/Alert";
import Loading from "../components/Loading";

function displayDate(dateString) {
  return new Date(`${dateString}T12:00:00`).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
}

function displayTime(timeString) {
  return new Date(`2000-01-01T${timeString}:00`).toLocaleTimeString(
    undefined,
    {
      hour: "numeric",
      minute: "2-digit",
    }
  );
}

export default function Dashboard() {
  const { user } = useAuth();

  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadBookings() {
    try {
      const response = await api.get("/bookings");
      setBookings(response.data.bookings);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBookings();
  }, []);

  const confirmedCount = useMemo(
    () =>
      bookings.filter((booking) => booking.status === "confirmed").length,
    [bookings]
  );

  async function handleCancel(bookingId) {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );

    if (!confirmed) {
      return;
    }

    setError("");
    setMessage("");

    try {
      await api.patch(`/bookings/${bookingId}/cancel`);
      setMessage("Appointment cancelled.");
      await loadBookings();
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    }
  }

  async function handleReschedule(booking) {
    const newDate = window.prompt(
      "Enter a new date using YYYY-MM-DD:",
      booking.appointmentDate
    );

    if (!newDate) {
      return;
    }

    const newTime = window.prompt(
      "Enter a new 24-hour time using HH:MM:",
      booking.appointmentTime
    );

    if (!newTime) {
      return;
    }

    setError("");
    setMessage("");

    try {
      await api.put(`/bookings/${booking._id}`, {
        appointmentDate: newDate,
        appointmentTime: newTime,
      });

      setMessage("Appointment rescheduled.");
      await loadBookings();
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    }
  }

  return (
    <main className="section dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <div>
            <span className="eyebrow">Personal dashboard</span>
            <h1>Welcome, {user?.name}</h1>
            <p>Review and manage your tutoring appointments.</p>
          </div>

          <div className="dashboard-stat">
            <strong>{confirmedCount}</strong>
            <span>Confirmed appointments</span>
          </div>
        </div>

        <Alert>{error}</Alert>
        <Alert type="success">{message}</Alert>

        {loading ? (
          <Loading text="Loading appointments..." />
        ) : bookings.length === 0 ? (
          <section className="empty-state">
            <span>📅</span>
            <h2>No appointments yet</h2>
            <p>Browse the tutoring catalog to schedule your first session.</p>
            <Link className="button" to="/services">
              Browse services
            </Link>
          </section>
        ) : (
          <div className="booking-list">
            {bookings.map((booking) => (
              <article className="booking-item" key={booking._id}>
                <div>
                  <span
                    className={`status status-${booking.status}`}
                  >
                    {booking.status}
                  </span>

                  <h2>
                    {booking.service?.name || "Unavailable service"}
                  </h2>

                  <p>
                    <strong>Date:</strong>{" "}
                    {displayDate(booking.appointmentDate)}
                  </p>

                  <p>
                    <strong>Time:</strong>{" "}
                    {displayTime(booking.appointmentTime)}
                  </p>

                  <p>
                    <strong>Duration:</strong>{" "}
                    {booking.service?.duration} minutes
                  </p>

                  {booking.notes && (
                    <p>
                      <strong>Notes:</strong> {booking.notes}
                    </p>
                  )}
                </div>

                {booking.status === "confirmed" && (
                  <div className="booking-actions">
                    <button
                      className="button button-outline button-small"
                      onClick={() => handleReschedule(booking)}
                      type="button"
                    >
                      Reschedule
                    </button>

                    <button
                      className="button button-danger button-small"
                      onClick={() => handleCancel(booking._id)}
                      type="button"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}