import React from 'react';
import '../components/style.css';
function getFirstThreeLettersOfSecondWord(str) {
  // Split the string into words
  const words = str.split(' ');

  // Check if there are at least two words
  if (words.length >= 2) {
    // Get the second word and extract the first 3 letters
    const secondWord = words[1];
    const firstThreeLetters = secondWord.slice(0, 3).toUpperCase();
    return firstThreeLetters;
  }

  // If there are not enough words, return an empty string or handle it as needed
  return '';
}


function generateCertificateNumber(title, firstName, lastName, recognized, date) {
  const recognizedAsPrefix = recognized.slice(0, 3).toUpperCase();
  const recognizedAsSuffix = getFirstThreeLettersOfSecondWord(recognized);
  const lastNamePrefix = lastName[0].toUpperCase();
  const firstNamePrefix = firstName[0].toUpperCase();

  // Check if a date is provided, otherwise, use the current date and time
  let dateFormatted;
  if (date) {
    const dateParts = date.split("-");
    dateFormatted = `${dateParts[2]}${dateParts[1]}${dateParts[0]}`;
  } else {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();

    const hours = String(today.getUTCHours()).padStart(2, '0');
    const minutes = String(today.getUTCMinutes()).padStart(2, '0');

    dateFormatted = `${dd}${mm}${yyyy}-${hours}${minutes}`;
  }

  return `DATA / ${recognizedAsPrefix}-${recognizedAsSuffix} / ${firstNamePrefix}${lastNamePrefix}-${dateFormatted} / DATA`;
}

function App() {
  const [domain, setDomain] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Get form values
    const title = document.getElementById("title").value;
    const firstName = document.getElementById("Firstname").value;
    const lastName = document.getElementById("Lastname").value;
    const recognized = document.getElementById("recognized").value;
    const date = document.getElementById("date").value;

    // Generate the certificate number
    const certname = generateCertificateNumber(title, firstName, lastName, recognized, date);
    
    // Set the certificate number in the input field
    document.getElementById("certname").value = certname;

    // Build the query string
    const queryString = `?title=${encodeURIComponent(title)}&firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}&recognized=${encodeURIComponent(recognized)}&date=${encodeURIComponent(date)}&certname=${encodeURIComponent(certname)}`;

    // Redirect to the "Kanban" page with the query string
    window.location.href = `Kanban${queryString}`;
  };
  const handleDomainChange = (event) => {
    setDomain(event.target.value);
  };

  return (
    <div className="container">
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
        crossOrigin="anonymous"
      />
      <form id="myForm">
        <div className="row g-3">
          <div className="col-md-4">
            <label htmlFor="title">Title</label>
            <select
              className="form-control"
              id="title"
              name="title"
            >
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="Firstname" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="Firstname"
              name="Firstname"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="Lastname" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="Lastname"
              name="Lastname"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="email" className="form-label">
              Enter Program Name
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="domain">Domain</label>
            <select
              className="form-control"
              id="domain"
              name="domain"
              onChange={handleDomainChange}
            >
              <option value="Cyber Security">Cyber Security</option>
              <option value="Cyber Security">Cyber Security</option>
              <option value="Blockchain">Blockchain</option>
              <option value="AI">AI</option>
                  <option value="BIG DATA">BIG DATA</option>
                  <option value="DevOps">DevOps</option>
                  <option value="AWS">AWS</option>
                  <option value="Web Development">Web Development</option>
                  <option value="5G">5G</option>
                  <option value="VM ware">VM ware</option>
                  <option value="Linux">Linux</option>
                  <option value="Azure">Azure</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Oracle">Oracle</option>
                  <option value="Coding">Coding</option>
            </select>
          </div>
          {domain === 'Cyber Security' && (
            <div className="col-md-4">
            <label htmlFor="tyy">yyy</label>
            <select
              className="form-control"
              id="Splecialdf"
              name="Splecialdf"
            >
              <option value="Mdr">Mrd</option>
              <option value="Mrds">Mrds</option>
            </select>
          </div>
          )}
          <div className="col-md-4">
            <label htmlFor="Course">Course</label>
            <select
              className="form-control"
              id="Course"
              name="Course"
            >
              <option value="Diana Internship Program">Diana Internship Program</option>
              {/* Other course options */}
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="recognized" className="form-label">
              Recognized as
            </label>
            <input
              type="text"
              className="form-control"
              id="recognized"
              name="recognized"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="date" className="form-label">
              Date of issue
            </label>
            <input
              type="date"
              className="form-control"
              id="date"
              name="date"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="certname" className="form-label">
              Certificate Number
            </label>
            <input
              type="text"
              className="form-control"
              id="certname"
              name="certname"
              readOnly
            />
          </div>
          <div className="col-12">
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
              Generate Certificate
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
