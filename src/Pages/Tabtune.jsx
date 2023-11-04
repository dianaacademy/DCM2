import React from 'react';

function App() {
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const date = document.getElementById("date").value;
    const certname = document.getElementById("certname").value;
    const recognized = document.getElementById("recognized").value;

    // Build the query string
    const queryString = `?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&recognized=${encodeURIComponent(recognized)}&date=${encodeURIComponent(date)}&certname=${encodeURIComponent(certname)}`;

    // Redirect to the "Kanban" page with the query string
    window.location.href = `Kanban${queryString}`;
  };

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Bootstrap demo</title>
        <link rel="stylesheet" href="style.css" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Diana
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    All Certificate
                  </a>
                </li>
              </ul>
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search Issued Certificate"
                  aria-label="Search"
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </nav>
        <div className="container">
          <form id="myForm" action="Kanban" method="GET">
            <div className="row g-3">
              <div className="col-md-4">
                <label for="name" className="form-label">
                  Full Name
                </label>
                <input type="text" className="form-control" id="name" name="name" />
              </div>
              <div className="col-md-4">
                <label for="programname" className="form-label">
                  Enter Program Name
                </label>
                <input type="text" className="form-control" id="email" name="email" />
              </div>
              <div className="col-md-4">
                <label for="programname" className="form-label">
                  Recognized as
                </label>
                <input type="text" className="form-control" id="recognized" name="recognized" />
              </div>
              <div className="col-md-4">
                <label for="inputdate4" className="form-label">
                  Date of issue
                </label>
                <input type="date" className="form-control" id="date" name="date" />
              </div>
              <div className="col-md-4">
                <label for="inputcert" className="form-label">
                  Enter Certificate Number
                </label>
                <input type="text" className="form-control" id="certname" name="certname" />
              </div>
              <div className="col-12">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="gridCheck" />
                  <label className="form-check-label" for="gridCheck">
                    Check me out
                  </label>
                </div>
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                  Generate Certificate
                </button>
              </div>
            </div>
          </form>
        </div>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
          crossOrigin="anonymous"
        ></script>
      </body>
    </html>
  );
}

export default App;
