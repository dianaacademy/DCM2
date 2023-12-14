import React, { useState, useEffect } from 'react';
import { GridComponent, ColumnsDirective,ColumnDirective,Search , Page, ExcelExport,Selection,Sort,Filter, PdfExport,Edit, Inject,Toolbar,Reorder,showGrandTotals } from '@syncfusion/ej2-react-grids';
import { employeesData,contextMenuItems, clientGrid,customersData,supportGrid, CampainGrid } from '../data/dummy';
import { Header } from '../components';
import { Html } from '../components';
import "../components/style.css";
import { GrapesMain } from "../components";
import axios from 'axios';

export default function Modal() {
  const [gridData, setGridData] = useState([]);

    const pageOptions = {
        pageSize: 8,
    };
  const [showModal, setShowModal] = React.useState(false);
  const [activeTab, setActiveTab] = useState('EmailEdit');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedUrl, setselectedUrl] = useState(null);


  let gridcomp;
  const toolbar = [
    {
      text: 'Export CSV',
      tooltipText: 'Export to Excel',
      prefixIcon: 'e-btn-icon e-excelexport e-icons e-icon-left',
      id: 'gridcomp_excelexport',
    },
    'Search', 'Delete'
  ];
  const getCurrentDateTime = () => {
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 19).replace(/:/g, '-');
    return formattedDate;
  };

  const toolbarClick = (args) => {
    if (gridcomp && args.item.id === 'gridcomp_excelexport') {
      const currentDateTime = getCurrentDateTime();
      const fileName = `Campaign_${currentDateTime}.xlsx`;
      const excelExportProperties = {
      fileName: fileName,
      };

      gridcomp.excelExport(excelExportProperties);
    }
  };
  const handleTabClick = (tabName) => {
  setActiveTab(tabName);
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setActiveTab('preview');
    setShowModal(true);
  };
  const handleUrlClick = (Url) => {
    setselectedUrl(Url);
    setShowModal(true);
  };
  
  return ( 
    <> 
    <div className="text-center text-3xl pt-10 pb-10 font-bold">
        <h1> All templates </h1>
      </div>

 
   <div className="flex flex-wrap justify-center">
  <div className="w-1/3 p-5">
    <div
      className="bg-indigo-500 text-white font-bold uppercase text-sm  shadow hover:shadow-lg cursor-pointer rounded-md"
      onClick={() => {setShowModal(true);
        handleImageClick('https://ik.imagekit.io/kkb/px-conversions%20(28)/weeee?updatedAt=1697019040527');
        handleUrlClick('https://dianaadvancedtechacademy.uk/subscribe-to-webinars-and-blog-updates/');

    }}
    >
      <img className="rounded-md"
        src="https://ik.imagekit.io/kkb/px-conversions%20(28)/weeee?updatedAt=1697019040527"
        alt="Data Privacy"
      />
      <p className="text-center pt-5  pb-5">Subscribe to webinars and blog updates</p>
    </div>
  </div>

  

  <div className="w-1/3 p-5">
    <div
      className="bg-indigo-500 text-white font-bold uppercase text-sm  shadow hover:shadow-lg cursor-pointer rounded-md "
      onClick={() => {setShowModal(true);
        handleImageClick('https://ik.imagekit.io/kkb/px-conversions%20(28)/5.webp?updatedAt=1697018949453');
        handleUrlClick('https://dianaadvancedtechacademy.uk/apply-for-program/');
    }}
    >
      <img className="rounded-md"
        src="https://ik.imagekit.io/kkb/px-conversions%20(28)/5.webp?updatedAt=1697018949453"
        alt="Data Privacy"
      />
      <p className="text-center pt-5  pb-5">Full information About Program</p>
    </div>
  </div>


  <div className="w-1/3 p-5">
    <div
      className="bg-indigo-500 text-white font-bold uppercase text-sm  shadow hover:shadow-lg cursor-pointer rounded-md      "
      onClick={() => {setShowModal(true);
        handleImageClick('https://ik.imagekit.io/kkb/px-conversions%20(28)/1.webp?updatedAt=1697018954407');
        handleUrlClick('https://dianaadvancedtechacademy.uk/book-a-free-consultation-with-our-course-advisors/');
    }}
    >
      <img className="rounded-md"
        src="https://ik.imagekit.io/kkb/px-conversions%20(28)/1.webp?updatedAt=1697018954407"
        alt="Data Privacy"
      />
      <p className="text-center pt-5  pb-5">Book a Free consultation</p>
    </div>
  </div>



  <div className="w-1/3 p-5">
    <div
      className="bg-indigo-500 text-white font-bold uppercase text-sm  shadow hover:shadow-lg cursor-pointer rounded-md      "
      onClick={() => {setShowModal(true);
        handleImageClick('https://ik.imagekit.io/kkb/px-conversions%20(28)/4.webp?updatedAt=1697018965526');
        handleUrlClick('https://dianaadvancedtechacademy.uk/apply-for-program/');
    }}
    >
      <img className="rounded-md"
        src="https://ik.imagekit.io/kkb/px-conversions%20(28)/4.webp?updatedAt=1697018965526"
        alt="Data Privacy"
      />
      <p className="text-center pt-5  pb-5">Apply for Program</p>
    </div>
  </div>


  <div className="w-1/3 p-5">
    <div
      className="bg-indigo-500 text-white font-bold uppercase text-sm  shadow hover:shadow-lg cursor-pointer rounded-md      "
      onClick={() => {setShowModal(true);
        handleImageClick('https://ik.imagekit.io/kkb/px-conversions%20(28)/3.webp?updatedAt=1697018965529');
        handleUrlClick('https://dianaadvancedtechacademy.uk/book-a-free-consultation-with-our-course-advisors/');
    }}
    >
      <img className ="rounded-md"
        src="https://ik.imagekit.io/kkb/px-conversions%20(28)/3.webp?updatedAt=1697018965529"
        alt="Data Privacy"
      />
      <p className="text-center pt-5  pb-5">Book a call with an Advisor</p>
    </div>
  </div>



  {/* <div className="w-1/3 p-5">
    <div
      className="bg-indigo-500 text-white font-bold uppercase text-sm  shadow hover:shadow-lg cursor-pointer rounded-md      "
      onClick={() => {setShowModal(true);
        handleImageClick('https://ik.imagekit.io/kkb/px-conversions%20(28)/weeee?updatedAt=1697019040527');
    }}
    >
      <img className="rounded-md"
        src="https://ik.imagekit.io/kkb/px-conversions%20(28)/weeee?updatedAt=1697019040527"
        alt="Data Privacy"
      />     
      <p className="text-center pt-5  pb-5">Whatsapp Group Joining Link</p>
    </div>
  </div> */}
  
  
  
</div>


{/* {activeTab === 'EmailEdit' && (
          <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
            <GrapesMain /></div> )} */}


{/* modal setting */}

      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "
          >
            <div className="relative w-4/5 my-6 mx-auto max-w-6xl  h-4/6 justify-center">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none justify-center">
                {/*header*/}
                <div className="flex items-start justify-center">
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none justify-center"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>

             <div className="bg-gray-100  flex flex-col pl-10 pt-10">
             <div className="flex">
                <button
                     className={`w-300 text-center  font-serif font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal relative ml-7 mr-20 mb-10 ${
                       activeTab === 'preview' ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-700'
                        }`}
                        onClick={() => handleTabClick('preview')}
                          >
                     <div className="flex flex-col  text-left"> {/* Add a flex container */}
                  <span>Preview</span>
                </div>
            </button>
            <button
                     className={`w-300 text-left  font-serif font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal  relative ml-20 mr-7 mb-10 ${
                       activeTab === 'html' ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-700'
                        }`}
                        onClick={() => handleTabClick('html')}
                          >
                     <div className="flex flex-col  text-left"> {/* Add a flex container */}
                  <span>Link </span>
                </div>
            </button>
           </div>
        </div>

     {/* Previw and Html template */}

     <div className="p-4">
        {activeTab === 'preview' && (
          <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
             <img className="rounded-md"
                 src={selectedImage}
                  alt="Image Preview"
                   />
            </div>
        )}
     </div>

     <div className="p-4">
        {activeTab === 'html' && (
            <button
            className="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 m-2 ml-10"
            type="button"
            onClick={() => {
              window.open(selectedUrl, '_blank');
            }}      
           >
          Click here to go to the link
         </button>
            
          )
        }
     </div>
            {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>

        
      ) : null}
 
    </>
   

    
  );
}