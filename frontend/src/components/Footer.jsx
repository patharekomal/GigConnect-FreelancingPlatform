function Footer() {
  return (
    <div className="bg-dark text-white mt-5 pt-4">
      <div className="container">
        <div className="row">

          <div className="col-md-3">
            <h5>GigConnect</h5>
            <p>Bridging the gap between clients and freelancers</p>
          </div>

          <div className="col-md-3">
            <h6>For Clients</h6>
            <p>How to Hire</p>
            <p>Talent Marketplace</p>
            <p>Enterprise</p>
          </div>

          <div className="col-md-3">
            <h6>For Freelancers</h6>
            <p>Find Work</p>
            <p>Direct Contracts</p>
            <p>Project Catalog</p>
          </div>

          <div className="col-md-3">
            <h6>Company</h6>
            <p>About Us</p>
            <p>Contact</p>
            <p>Privacy Policy</p>
          </div>

        </div>

        <hr />
        <p className="text-center pb-3">
          © 2026 GigConnect. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;