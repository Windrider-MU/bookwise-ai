import { useEffect, useState } from "react";
import api, { getErrorMessage } from "../services/api";
import ServiceCard from "../components/ServiceCard";
import Loading from "../components/Loading";
import Alert from "../components/Alert";

export default function Services() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadServices() {
      try {
        const response = await api.get("/services");
        setServices(response.data.services);
      } catch (requestError) {
        setError(getErrorMessage(requestError));
      } finally {
        setLoading(false);
      }
    }

    loadServices();
  }, []);

  return (
    <main className="section">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">Tutoring catalog</span>
          <h1>Choose the support that fits your goal</h1>
          <p>
            Every session can be tailored around your project,
            assignment, or learning plan.
          </p>
        </div>

        <Alert>{error}</Alert>

        {loading ? (
          <Loading text="Loading services..." />
        ) : (
          <div className="service-grid">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
