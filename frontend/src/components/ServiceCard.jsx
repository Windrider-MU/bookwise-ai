import { Link } from "react-router-dom";

export default function ServiceCard({ service }) {
  return (
    <article className="service-card">
      <span className="category-label">{service.category}</span>

      <h2>{service.name}</h2>

      <p>{service.shortDescription}</p>

      <div className="service-meta">
        <span>{service.duration} minutes</span>
        <span>${service.price}</span>
        <span>{service.level}</span>
      </div>

      <Link className="button button-block" to={`/services/${service._id}`}>
        View service
      </Link>
    </article>
  );
}