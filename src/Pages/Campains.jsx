import React, { useState, useEffect } from 'react';
import { GridComponent, ColumnsDirective,ColumnDirective,Search , Page, ExcelExport,Selection,Sort,Filter, PdfExport,Edit, Inject,Toolbar,Reorder,showGrandTotals } from '@syncfusion/ej2-react-grids';
import { employeesData,contextMenuItems, clientGrid,customersData,supportGrid, CampainGrid } from '../data/dummy';
import { Header } from '../components';
import Backup2x from './Backup2x.jsx';
import { Html } from '../components';
import "../components/style.css";
import { GrapesMain } from "../components";
import axios from 'axios';

export default function Modal() {
  const [gridData, setGridData] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:3001/campaigns')
      .then((result) => {
        setGridData(result.data);
        console.log(result.data); // Add this line to log the fetched data
      })
      .catch((err) => console.log(err));
  }, []);

    const pageOptions = {
        pageSize: 8,
    };
  const [showModal, setShowModal] = React.useState(false);
  const [activeTab, setActiveTab] = useState('EmailEdit');
  const [selectedImage, setSelectedImage] = useState(null);


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
  
  return (
    <> 
    <div className="text-center text-3xl pt-10 pb-10 font-bold">
        <h1> Campaign insights </h1>
      </div>


      

<GridComponent id='gridcomp'  toolbar={toolbar} allowExcelExport={true} toolbarClick={toolbarClick} ref={g => gridcomp = g}
      dataSource={gridData}
      allowPaging
      allowSorting
      pageSettings={pageOptions}
      allowReordering={true} allowDrop={true}
      allowResizing
      editSettings={{allowDeleting:true, allowEditing:true, pageSizes: true}}
      width="auto"
      >
        
        <ColumnsDirective>
        {CampainGrid.map((item,index) => (<ColumnDirective key= {index}  {...item}/>
        ))}
        </ColumnsDirective>
        
        <Inject services = {[ Page, Toolbar,Reorder,Selection,Edit,Sort,Filter , ExcelExport]}/>
        
      </GridComponent>
 
   <div className="flex flex-wrap justify-center">
  <div className="w-1/3 p-5">
    <div
      className="bg-indigo-500 text-white font-bold uppercase text-sm  shadow hover:shadow-lg cursor-pointer rounded-md"
      onClick={() => {setShowModal(true);
        handleImageClick('https://ik.imagekit.io/kkb/px-conversions%20(28)/weeee?updatedAt=1697019040527');
    }}
    >
      <img className="rounded-md"
        src="https://ik.imagekit.io/kkb/px-conversions%20(28)/weeee?updatedAt=1697019040527"
        alt="Data Privacy"
      />
      <p className="text-center pt-5  pb-5">New Course Template</p>
    </div>
  </div>

  

  <div className="w-1/3 p-5">
    <div
      className="bg-indigo-500 text-white font-bold uppercase text-sm  shadow hover:shadow-lg cursor-pointer rounded-md "
      onClick={() => {setShowModal(true);
        handleImageClick('https://ik.imagekit.io/kkb/px-conversions%20(28)/5.webp?updatedAt=1697018949453');
    }}
    >
      <img className="rounded-md"
        src="https://ik.imagekit.io/kkb/px-conversions%20(28)/5.webp?updatedAt=1697018949453"
        alt="Data Privacy"
      />
      <p className="text-center pt-5  pb-5">Welcome Bonus</p>
    </div>
  </div>


  <div className="w-1/3 p-5">
    <div
      className="bg-indigo-500 text-white font-bold uppercase text-sm  shadow hover:shadow-lg cursor-pointer rounded-md      "
      onClick={() => {setShowModal(true);
        handleImageClick('https://ik.imagekit.io/kkb/px-conversions%20(28)/1.webp?updatedAt=1697018954407');
    }}
    >
      <img className="rounded-md"
        src="https://ik.imagekit.io/kkb/px-conversions%20(28)/1.webp?updatedAt=1697018954407"
        alt="Data Privacy"
      />
      <p className="text-center pt-5  pb-5">Zoom Link</p>
    </div>
  </div>



  <div className="w-1/3 p-5">
    <div
      className="bg-indigo-500 text-white font-bold uppercase text-sm  shadow hover:shadow-lg cursor-pointer rounded-md      "
      onClick={() => {setShowModal(true);
        handleImageClick('https://ik.imagekit.io/kkb/px-conversions%20(28)/4.webp?updatedAt=1697018965526');
    }}
    >
      <img className="rounded-md"
        src="https://ik.imagekit.io/kkb/px-conversions%20(28)/4.webp?updatedAt=1697018965526"
        alt="Data Privacy"
      />
      <p className="text-center pt-5  pb-5">Final Certificate</p>
    </div>
  </div>


  <div className="w-1/3 p-5">
    <div
      className="bg-indigo-500 text-white font-bold uppercase text-sm  shadow hover:shadow-lg cursor-pointer rounded-md      "
      onClick={() => {setShowModal(true);
        handleImageClick('https://ik.imagekit.io/kkb/px-conversions%20(28)/3.webp?updatedAt=1697018965529');
    }}
    >
      <img className="rounded-md"
        src="https://ik.imagekit.io/kkb/px-conversions%20(28)/3.webp?updatedAt=1697018965529"
        alt="Data Privacy"
      />
      <p className="text-center pt-5  pb-5">Activation Link</p>
    </div>
  </div>



  <div className="w-1/3 p-5">
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
  </div>
  
  <div className="w-1/3 p-5">
    <div
      className="bg-indigo-500 text-white font-bold uppercase text-sm  shadow hover:shadow-lg cursor-pointer rounded-md      "

    >
      <img className="rounded-md"
        src="https://ik.imagekit.io/kkb/Email.webp?updatedAt=1698764270931"
        alt="Data Privacy"
        onClick={() => handleTabClick('EmailEdit')}
      />
      <p className="text-center pt-5  pb-5">Email Editor</p>
    </div>
  </div>
  
</div>


{activeTab === 'EmailEdit' && (
          <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
            <GrapesMain />; </div> )}


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
                  <span>HTML Code </span>
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
            <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
                <Html/>
            </div>
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