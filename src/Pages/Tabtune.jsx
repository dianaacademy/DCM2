import React, {useState} from 'react';
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


function generateCertificateNumber( firstName, lastName, recognized, date) {
  const recognizedAsPrefix = recognized.slice(0, 3).toUpperCase();
  const recognizedAsSuffix = getFirstThreeLettersOfSecondWord(recognized);
  const lastNamePrefix = lastName[0].toUpperCase();
  const firstNamePrefix = firstName[0].toUpperCase();

  // Check if a date is provided, otherwise, use the current date and time
  let dateFormatted;
  if (date) {
    const dateParts = date.split("-");
    const today = new Date();
    const hours = String(today.getUTCHours()).padStart(2, '0');
    const minutes = String(today.getUTCMinutes()).padStart(2, '0');
    dateFormatted = `${dateParts[2]}${dateParts[1]}${dateParts[0]}-${hours}${minutes}`;
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
  const [domain, setDomain] = useState('Cyber Security');
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Get form values
    const title = document.getElementById("title").value;
    const firstName = document.getElementById("Firstname").value;
    const lastName = document.getElementById("Lastname").value;
    const recognized = document.getElementById("recognized").value;
    const date = document.getElementById("date").value;
    const email = document.getElementById("email").value;

    // Generate the certificate number
    const certname = generateCertificateNumber(firstName, lastName, recognized, date);
    
    // Set the certificate number in the input field
    document.getElementById("certname").value = certname;

    // Build the query string
    const queryString = `?title=${encodeURIComponent(title)}&name=${encodeURIComponent(firstName)}&name2=${encodeURIComponent(lastName)}&recognized=${encodeURIComponent(recognized)}&date=${encodeURIComponent(date)}&certname=${encodeURIComponent(certname)}&email=${encodeURIComponent(email)}`;

    // Redirect to the "Kanban" page with the query string
    window.location.href = `Kanban${queryString}`;
  };
  const handleDomainChange = (event) => {
    setDomain(event.target.value);
  };

  return (
    <div className="container4 m-20">
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
        crossOrigin="anonymous"
      />
      <form id="myForm">
        <div className="row g-3">
          <div className="col-md-4 ">
            <label htmlFor="title">Title</label>
            <select
              className="form-control mt-2"
              id="title"
              name="title"
            >
              <option value="Mr.">Mr.</option>
              <option value="Miss">Miss</option>
              <option value="Mrs.">Mrs.</option>
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
          {/* <div className="col-md-4">
            <label htmlFor="email" className="form-label">
              Enter Program Name
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
            />
          </div> */}
          <div className="col-md-4">
            <label htmlFor="domain">Domain</label>
            <select
              className="form-control mt-2"
              id="domain"
              name="domain"
              onChange={handleDomainChange}
            >
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
            <label htmlFor="CyberSecUab">Choose Releated Program</label>
            <select
              className="form-control mt-2"
              id="email"
              name="email"
            >
              <option value="CERTIFIED A+ PROFESSIONAL">DIANA'S CERTIFIED A+ CERTIFICATION</option>
              <option value="DIANA'S SYSTEMS CERTIFIED SECURITY PROFESSIONAL">DIANA'S SYSTEMS CERTIFIED SECURITY PROFESSIONAL SSCP </option>
              <option value="DIANA CERTIFIED WIRESHARK PROFESSIONAL"> DIANA CERTIFIED WIRESHARK PROFESSIONAL DCWP</option>
              <option value="DIANA'S CYBERARK ADMINSTRATION CERTIFICATION PAM">DIANA'S CYBERARK ADMINSTRATION CERTIFICATION PAM (DCPAM)</option>
              <option value="DIANA'S CYBERARK ADMINSTRATION CERTIFICATION EPM">DIANA'S CYBERARK ADMINSTRATION CERTIFICATION EPM (DCEPM)</option>
              <option value="DIANA CERTIFIED CYBER FORENSICS PROFESSIONAL">DIANA CERTIFIED CYBER FORENSICS PROFESSIONAL (DCFP)</option>
              <option value="DIANA'S COMPLETE CYBER SECURITY BOOTCAMP">DIANA'S COMPLETE CYBER SECURITY BOOTCAMP (DCSB)</option>
              <option value="DIANA'S CERTIFIED CYBER SECURITY ANALYST">DIANA'S CERTIFIED CYBER SECURITY ANALYST+(DCYSA+)</option>
              <option value="DIANA'S CERTIFIED ETHICAL HACKER">DIANA'S CERTIFIED ETHICAL HACKER(DCEH)</option>
              <option value="DIANA'S MCAFEE/TRELLIX CERTIFIED SECURITY PROFESSIONAL">DIANA'S MCAFEE/TRELLIX CERTIFIED SECURITY PROFESSIONAL (DMCSP)</option>
              <option value="DIANA'S CERTIFIED PALO ALTO'S NETSECURITY ADMINSTRATOR">DIANA'S CERTIFIED PALO ALTO'S NETSECURITY ADMINSTRATOR (DCPA)</option>
              <option value="DIANA'S CERTIFIED ADVANCED PENETRATION TESTER">DIANA'S CERTIFIED ADVANCED PENETRATION TESTER (DAPT)</option>
              <option value="DIANA'S CERTIFIED QRADAR ADMINISTRATOR">DIANA'S CERTIFIED QRADAR ADMINISTRATOR (DCQAD)</option>
              <option value="DIANA'S CERTIFIED QRADAR APPRENTICE">DIANA'S CERTIFIED QRADAR APPRENTICE (DCQAP)</option>
              <option value="Diana's Saviyant Collaboration IGA Professional">Diana's Saviyant Collaboration IGA Professional</option>
              <option value="Diana's certified Cisco Network Associate">Diana's certified Cisco Network Associate</option>
            </select>
          </div>
          )}
          
          {domain === 'AI' && (
            <div className="col-md-4">
            <label htmlFor="Blockchain">Choose Releated Program</label>
            <select
              className="form-control mt-2"
              id="email"
              name="email"
            >
              <option value="Diana Certified Artificial Intelligence Fundamentals
">Diana Certified Artificial Intelligence Fundamentals</option>
              <option value="Diana Certified Machine Learning Specialist
">Diana Certified Machine Learning Specialist
</option>
              <option value="Diana Certified NLP Practitioner
">Diana Certified NLP Practitioner</option>
              <option value="Diana Certified AI Computer Vision Engineer
">Diana Certified AI Computer Vision Engineer</option>
              <option value="Diana Certified Deep Reinforcement Learning Specialist
">Diana Certified Deep Reinforcement Learning Specialist</option>
              <option value="Diana Certified Deep Learning Architect">Diana Certified Deep Learning Architect</option>
              <option value="Diana Certified AI Ethics Consultant">Diana Certified AI Ethics Consultant</option>
              <option value="Diana Certified AI Robotics Engineer">Diana Certified AI Robotics Engineer</option>
              <option value="Diana Certified AI Healthcare Specialist">Diana Certified AI Healthcare Specialist</option>
              <option value="Diana Certified AI Business Strategist">Diana Certified AI Business Strategist</option>
              <option value="Diana Certified AI Big Data Analyst">Diana Certified AI Big Data Analyst</option>
              <option value="Diana Certified AI Recommender Systems Expert">Diana Certified AI Recommender Systems Expert</option>
              <option value="Diana Certified AI Autonomous Vehicle Engineer">Diana Certified AI Autonomous Vehicle Engineer</option>
              <option value="Diana Certified AI Game Developer">Diana Certified AI Game Developer</option>
              <option value="Diana Certified AI for Social Good Practitioner">Diana Certified AI for Social Good Practitioner</option>
              <option value="Diana Certified GANs Expert">Diana Certified GANs Expert</option>
              <option value="Diana Certified Explainable AI Practitioner">Diana Certified Explainable AI Practitioner</option>
              <option value="Diana Certified Natural Language Generation Engineer">Diana Certified Natural Language Generation Engineer</option>
              <option value="Diana Certified Edge AI Developer">Diana Certified Edge AI Developer</option>
              <option value="Diana Certified AI Cybersecurity Professional">Diana Certified AI Cybersecurity Professional</option>
              <option value="Diana Certified AI Financial Services Specialist">Diana Certified AI Financial Services Specialist</option>
            </select>
          </div>
          )}


          {domain === 'BIG DATA' && (
            <div className="col-md-4">
            <label htmlFor="Big Data">Choose Related Program</label>
            <select
              className="form-control mt-2"
              id="email"
              name="email"
            >
              <option value="Diana's Certified Big Data Analyst">Diana's Certified Big Data Analyst</option>
              <option value="Diana's Certified Data Science Specialist">Diana's Certified Data Science Specialist</option>
              <option value="Diana's Certified Certified Big Data Engineer">Diana's Certified Certified Big Data Engineer</option>
              <option value="Diana's Certified Cloud Data Integration Specialist">Diana's Certified Cloud Data Integration Specialist</option>
              <option value="Diana's Certified Big Data Machine Learning Expert">Diana's Certified Big Data Machine Learning Expert</option>
              <option value="Diana's Certified Data Visualization Strategist">Diana's Certified Data Visualization Strategist</option>
              <option value="Diana's Certified Real-Time Data Analyst">Diana's Certified Real-Time Data Analyst</option>
              <option value="Diana's Certified Big Data Security Professional">Diana's Certified Big Data Security Professional</option>
              <option value="Diana's Certified IoT Data Architect">Diana's Certified IoT Data Architect</option>
              <option value="Diana's Certified Big Data Ethics and Governance Specialist">Diana's Certified Big Data Ethics and Governance Specialist</option>
            </select>
          </div>
          )}



          {domain === 'DevOps' && (
            <div className="col-md-4">
            <label htmlFor="DevOps">Choose Releated Program</label>
            <select
              className="form-control mt-2"
              id="email"
              name="email"
            >
              <option value="Diana Certified Cloud Architect Pro">Diana Certified Cloud Architect Pro</option>
              <option value="Diana Certified DevOps 101: From Novice to CI/CD Pro">Diana Certified DevOps 101: From Novice to CI/CD Pro</option>
              <option value="Diana Devops Mastery Bootcamp Future Sysadmins">Diana Devops Mastery Bootcamp Future Sysadmins</option>
              <option value="Diana Certified Kubernetes Ultimate Certification - Kuber101Ultimate ">Diana Certified Kubernetes Ultimate Certification - Kuber101Ultimate</option>
              <option value="Diana's  Future-Ready DevOps Professional Building CI/CD Pipelines with Jenkins, Ansible, and Kubernetes">Diana's  Future-Ready DevOps Professional Building CI/CD Pipelines with Jenkins, Ansible, and Kubernetes</option>
              <option value="Diana Certified Infrastructure Automation -TerraformExpert">Diana Certified Infrastructure Automation -TerraformExpert</option>
              <option value="Diana Certified Devops Docker Container Orchestration Pro - Docker Mastery with Kubernetes and Swarm">Diana Certified Devops Docker Container Orchestration Pro - Docker Mastery with Kubernetes and Swarm</option>
              <option value="Diana Jenkins Master Certification : From Zero to Hero in DevOps">Diana Jenkins Master Certification : From Zero to Hero in DevOps</option>
              <option value="Diana Certified AWS DevOps Maestro : AWS for DevOps Practitioners">Diana Certified AWS DevOps Maestro : AWS for DevOps Practitioner</option>
              <option value="Diana Certified Cloud DevOps Pro: Google Cloud Engineer Certification">Diana Certified Cloud DevOps Pro: Google Cloud Engineer Certification</option>
              <option value="Diana Academy's DevOps Champion Certification: Microsoft Certified Engineer Expert in DevOps">Diana Academy's DevOps Champion Certification: Microsoft Certified Engineer Expert in DevOps</option>
              <option value="Diana Certified Cloud-Native Architect: Building Cloud-Native Applications with Microservices">Diana Certified Cloud-Native Architect: Building Cloud-Native Applications with Microservices</option>
              <option value="Diana Academy's Azure DevOps Pro: Mastering Azure DevOps Solutions">Diana Academy's Azure DevOps Pro: Mastering Azure DevOps Solutions</option>
              <option value="Diana Certified Puppet Professional for Infrastructure Automation">Diana Certified Puppet Professional for Infrastructure Automation</option>
              <option value="Diana Certified Ansible Elite Certification : Advanced DevOps Automationwith playbooks">Diana Certified Ansible Elite Certification : Advanced DevOps Automationwith playbooks</option>
              <option value="Diana Certified Git Maestro: Expert-Level Version Control Training">Diana Certified Git Maestro: Expert-Level Version Control Training</option>
            </select >
          </div>
          )}


          {domain === 'Blockchain' && (
            <div className="col-md-4">
            <label htmlFor="Blockchain">Choose Releated Program</label>
            <select
              className="form-control mt-2"
              id="email"
              name="email"
            >
              <option value="DIANA BLOCKCHAIN PLUS PYTHON CERTIFICATION">DIANA BLOCKCHAIN PLUS PYTHON CERTIFICATION</option>
              <option value="DIANA CERTIFIED ENTERPRISE BLOCKCHAIN ARCHITECT">DIANA CERTIFIED ENTERPRISE BLOCKCHAIN ARCHITECT</option>
              <option value="DIANA CERTIFIED BLOCKCHAIN EXPERT PLUS CERTIFICATION">DIANA CERTIFIED BLOCKCHAIN EXPERT PLUS CERTIFICATION</option>
              <option value="DIANA'S BLOCKCHAIN FOUNDATION CERTIFICATION">DIANA'S BLOCKCHAIN FOUNDATION CERTIFICATION</option>
              <option value="DIANA SPECIALISED BLOCKCHAIN PROFESSIONAL">DIANA SPECIALISED BLOCKCHAIN PROFESSIONAL</option>
              <option value="DIANA’S BLOCKCHAIN CRYPTO POWER CERTIFICATION">DIANA’S BLOCKCHAIN CRYPTO POWER CERTIFICATION</option>
              <option value="DIANA’S BLOCKCHAIN FUNDAMENTALS NOVA CERTIFICATION">DIANA’S BLOCKCHAIN FUNDAMENTALS NOVA CERTIFICATION</option>
              <option value="DIANA’S CERTIFIED BLOCKCHAIN DEVELOPER ENIGMA">DIANA’S CERTIFIED BLOCKCHAIN DEVELOPER ENIGMA</option>
              <option value="DIANA’S CRYPTOCURRENCENCY FUNDAMENTALS COURSE">DIANA’S CRYPTOCURRENCENCY FUNDAMENTALS COURSE</option>
              <option value="DIANA CERTIFIED BLOCKCHAIN BUSINESS FOUNDATIONS">DIANA CERTIFIED BLOCKCHAIN BUSINESS FOUNDATIONS</option>
              <option value="DIANA'S BUILD YOUR FIRST BLOCKCHAIN CERTIFICATION">DIANA'S BUILD YOUR FIRST BLOCKCHAIN CERTIFICATION</option>
              <option value="DIANA's BLOCKCHAIN BITCOIN MASTER CERTIFICATION">DIANA's BLOCKCHAIN BITCOIN MASTER CERTIFICATION</option>
              <option value="DIANA BLOCKCHAIN DEVELOPER PROFESSIONAL WITH ETHSOL">DIANA BLOCKCHAIN DEVELOPER PROFESSIONAL WITH ETHSOL</option>
            </select>
          </div>
          )}

          {domain === 'AWS' && (
            <div className="col-md-4">
            <label htmlFor="AWS">Choose Releated Program</label>
            <select
              className="form-control mt-2"
              id="email"
              name="email"
            >
              <option value="Diana's Certified VMware Professional">Diana's Certified VMware Professional</option>
              <option value="Diana's Certified VMware Advanced Professional">Diana's Certified VMware Advanced Professional</option>
              <option value="Diana's Certified VMware Design Expert">Diana's Certified VMware Design Expert</option>
              <option value="Diana's Certified VMware Implementation Expert">Diana's Certified VMware Implementation Expert</option>
              <option value="Diana's Certified VMware Associate">Diana's Certified VMware Associate</option>
            </select>
          </div>
          )}
          {domain === 'Diana Internship Program' && (
            <div className="col-md-4">
            <label htmlFor="Choose Program">Choose Program</label>
            <select
              className="form-control mt-2"
              id="email"
              name="email"
            >
              
              <option value="Diana Internship Program">Diana Internship Program</option>
            </select>
          </div>
          )}
          {domain === 'Diana Employee Elevate Program' && (
            <div className="col-md-4">
            <label htmlFor="Choose Program">Choose Program</label>
            <select
              className="form-control mt-2"
              id="email"
              name="email"
            >
              
              <option value="Diana Employee Elevate Program">Diana Employee Elevate Program</option>
            </select>
          </div>
          )}
          {/* <div className="col-md-4">
            <label htmlFor="recognized" className="form-label">
              Recognized as
            </label>
            <input
              type="text"
              className="form-control"
              id="recognized"
              name="recognized"
            />
          </div> */}
          <div className="col-md-4 hidden">
  <label htmlFor="recognized" className="form-label">
    Recognized as
  </label>
  <input
    type="text"
    className="form-control"
    id="recognized"
    name="recognized"
    defaultValue="abc" // Add defaultValue attribute with the value "abc"
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
          <div className="col-md-4 hidden">
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