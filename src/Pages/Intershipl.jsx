import React, { useState, useEffect } from 'react';
import html2pdf from 'html2pdf.js';
import QR from '../data/qr.png';
import border from '../data/border.svg';
import Cert from '../data/cert.png';
import dianat from '../data/dianat.png';
import lloyd from '../data/lloyd.png';
import logojs from '../data/logojs.webp';
import sign from '../data/sign.png';
import signceo from '../data/signceo.png';
import topd from '../data/topd.png';
import ukas from '../data/ukas.png';

function App() {
  // State to hold form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    recognized: '',
    date: '',
    certname: '',
    title: '',
    name2: '',
  });

  useEffect(() => {
    // Get the query parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    
    // Update the formData state with the captured data
    setFormData ({
      name: urlParams.get('name'),
      email: urlParams.get('email'),
      recognized: urlParams.get('recognized'),
      date: urlParams.get('date'),
      certname: urlParams.get('certname'),
      title: urlParams.get('title'),
      name2:urlParams.get('name2'),
    });
  }, []);

  const exportAsPDF = () => {
    const element = document.getElementById('Ukasuni');
    const opt = {
      margin: 0.5,
      filename: 'certificate.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'px', format: [1300, 1250], orientation: 'landscape' },
    };
  
    // Get the dimensions of the content to be exported
    const contentWidth = element.offsetWidth;
    const contentHeight = element.offsetHeight;
  
    // Get the dimensions of the PDF
    const pdfWidth = opt.jsPDF.format[0];
    const pdfHeight = opt.jsPDF.format[1];
  
    // Calculate margins for centering content in the PDF
    const horizontalMargin = (pdfWidth - contentWidth) / 2;
    const verticalMargin = (pdfHeight - contentHeight) / 2;
  
    // Apply translation to the content for centering in the PDF
    element.style.transform = `translate(${horizontalMargin}px, ${verticalMargin}px)`;
  
    // Generate the PDF and save
    html2pdf().from(element).set(opt).save();
  };

  return (
    <div className="App">
      <button
               className="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-  mb-5 ease-linear transition-all duration-150 ml-10 mt-2"
               type="button"
               onClick={exportAsPDF}
              >
             Download PDF
            </button>
      <div id="Ukasuni">
        <div className="tophead">
          <img src={topd} alt="" width="500px"/>
        </div>

        <div className="certnumber">
          <h1>
            CERTIFICATE NO. <span id="certname">{formData.certname}</span>
          </h1>
        </div>

        <div className="container">
          <div className="logo2">
            <img src={logojs} alt="" width="200px" />
          </div>
          <div className="logo5">
            <img src={lloyd} alt="" width="90px" />
            <img src={ukas} alt="" width="70px" />
          </div>

          <div className="marquee">
            <div className="marquee3">Certificate</div>
          </div>

          <div className="border5">
            <img src={border} alt="" width="350px" />
          </div>
          {/* <div className="border2">
            <img src={border} alt="" width="350px" />
          </div> */}

          <div className="marquee2">of Completion</div>
          <div className="assignment">This certificate is presented to </div>
          <div className="assignment1">This is to certify that <span id="title">{ formData.title }</span> </div>
            

          <div className="person">
            <span id="name">{formData.name}</span>
            <span id="name2">&nbsp;{formData.name2}</span>
            
          </div>
          <div className="assignment2 ">
          
          has successfully completed the Diana Internship Program and is recognized as{' '}
          <span id="email">{formData.email}</span> with Diana Advanced Tech Academy
          </div>
          <div className="qrcode">
            <img src={QR} alt="" width="100px" />
          </div>

          <div className="certdate">
            <h1>
              Date:- <span id="date">{formData.date}</span>
              <br />
            </h1>
          </div>

          <div className="bottom">
            <div className="director">
              <div className="direcsign">
                <img src={sign} alt="" width="200px" />
              </div>
              <div className="h1">DIRECTOR</div>
              <div className="border2">
            <img src={border} alt="" width="350px" />
          </div>
            </div>

            <div className="logo1">
              <img src={Cert} alt="" width="200px" />
            </div>

            <div className="sinature">
              <div className="ceosign">
                <img src={signceo} alt="" width="250px" />
              </div>
              <div className="h1">CEO</div>
            </div>
          </div>

          <div className="section"></div>
        </div>
      </div>
     
    </div>
    
  );
  
}

export default App;
