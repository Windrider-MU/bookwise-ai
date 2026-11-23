import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="not-found">
      <div>
        <span className="eyebrow">404 error</span>
        <h1>That page could not be found.</h1>
        <p>The address may be incorrect or the page may have moved.</p>
        <Link className="button" to="/">
          Return home
        </Link>
      </div>
    </main>
  );
}