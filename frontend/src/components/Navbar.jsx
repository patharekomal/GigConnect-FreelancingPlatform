import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-light bg-white shadow-sm px-4">
      <div>
        <h4 className="text-success fw-bold mb-0">GigConnect</h4>
        <small className="text-muted">
          Bridging the gap between clients and freelancers
        </small>
      </div>


      <div>
        <Link to="/" className="me-3 text-decoration-none text-dark">Home</Link>
        <Link to="/about" className="me-3 text-decoration-none text-dark">About</Link>
        <Link to="/how-it-works" className="me-3 text-decoration-none text-dark">How It Works</Link>
        <Link to="/contact" className="me-3 text-decoration-none text-dark">Contact</Link>

        <Link to="/login" className="btn btn-outline-dark me-2">Log In</Link>
        <Link to="/register" className="btn btn-dark">Sign Up</Link>
</div>
    </nav>
  );
}

export default Navbar;