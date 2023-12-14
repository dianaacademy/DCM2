import React, { useState, useEffect } from 'react';
import html2pdf from 'html2pdf.js';
import '../Pages/Sleep.css';
import QR from '../data/qr.png';
import border from '../data/border.svg';
import Cert from '../data/cert.png';
import lloyd from '../data/lloyd.png';
import logojs from '../data/logojs.webp';
import sign from '../data/sign.png';
import signceo from '../data/signceo.png';
import topd from '../data/topd.png';
import ukas from '../data/ukas.png';
import headernfooter from '../data/headernfooter.png';
import hrsignature from '../data/hrsignature.PNG';


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
      fullname: urlParams.get('fullname'),
      title: urlParams.get('title'),
      recognized: urlParams.get('recognized'),
      date: urlParams.get('date'),
      sdate: urlParams.get('sdate'),
      enddate: urlParams.get('enddate'),
      keynotes:urlParams.get('keynotes'),
    });
  }, []);

  const exportAsPDF = () => {
    const element = document.getElementById('Ukasuni2');
    const opt = {
      margin: 0.5,
      filename: 'internship_letter.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 5 },
      // Remove the jsPDF section or set it to default values
    };
  
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
            <div id="Ukasuni2">
            <div class="thecontainer">
                <div class="topheader">
                    <img src={headernfooter} alt="" srcset="" width="850px"/>
                </div>
                <div class="box">
            
                </div>
                    <div class="marqueezx">
                         <div class="assifnment56">
                            Diana Advanced Tech Academy Pvt. Ltd. </div>
                            <div class="assifnment55">
                            {formData.date}
                             </div>
                       
                        
                        
                       
                   
                    <div class="marquee3zx">
                        TO WHOMSOEVER IT MAY COONCERN
                    </div>
            
                    <div class="assignmentzx">
                        This is to certify that {formData.title}{' '} {formData.fullname} has completed his internship as {formData.recognized}{' '}
                       at DIANA ADVANCED TECH ACADEMY PVT. LTD., London, from {formData.sdate} to {formData.enddate}
                    </div>
                    <div class="assignment2zx">
                        {formData.keynotes}
                    </div>
                    <div class="assignment3zx">
                        We Belive that the skills and knowlwde you've gained during your time with us will serve as a solid foundation for your career in the field of {formData.recognized}{'.'}
                        <div class="assignment4zx">
                        We wish him all the best for his upcoming career. </div>
                    </div>
                    
                    <div class="bottomzx">
                        <div class="directorzx">
                            <div class="direcsignzx">
                                <img src={hrsignature} alt="" srcset="" width="300px"/> </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
     
    </div>
    
  );
  
}

export default App;
