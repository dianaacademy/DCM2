import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { GridComponent, ColumnsDirective,ColumnDirective,Search , Page, ExcelExport,Selection,Sort,Filter, PdfExport,Edit, Inject,Toolbar,showGrandTotals } from '@syncfusion/ej2-react-grids';
import { employeesData,contextMenuItems, clientGrid,customersData,supportGrid } from '../data/dummy';
import { Header } from '../components';
import "../components/style.css";
import Papa from 'papaparse';

function Leadgenerate() {
  const [activeTab, setActiveTab] = useState('tycon');
  const [selectedFile, setSelectedFile] = useState(null);
  const [formFreshLeads, setformFreshLeads] = useState(false);
  const [Name, setName] = useState('');
  const [Designation, setDesignation] = useState('');
  const [Country, setCountry] = useState('');
  const [CompanyName, setCompanyName] = useState('');
  const [TypeofDelegate, setTypeofDelegate] = useState('');
  const [UpdatedDate, setUpdatedDate] = useState('');
  const [gridData, setGridData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  let gridcomp;
  const editOptions = { allowEditing: true, allowAdding: true, allowDeleting: true };
  const toolbar = [
                  {
                  text: 'Export CSV',
                  tooltipText: 'Export to Excel',
                  prefixIcon: 'e-btn-icon e-excelexport e-icons e-icon-left',
                  id: 'gridcomp_excelexport',
                  },
                  'Search','Delete'
                   ];

                   useEffect(() => {
                    axios
                      .get('http://localhost:3001/leads')
                      .then((result) => setGridData(result.data))
                      .catch((err) => console.log(err));
                  }, []);
   //upload excel code start
   const handleFileSelect = (e) => {
   const file = e.target.files[0];
   setSelectedFile(file);
   };

  //Excel file Upload Backend
  
   const handleFileUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      axios.post('http://localhost:3001/leads/upload', formData)
      .then((result) => {
        console.log(result);
        // Reload the grid data after adding a new record
        axios.get('http://localhost:3001/leads').then((result) => setGridData(result.data));
        setShowModal(false);
      })
        .catch((error) => {
          console.error('Error uploading CSV file:', error);
          // Handle error, if needed
        });
    }
  };

   //upload excel code end

  const getCurrentDateTime = () => {
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 19).replace(/:/g, '-');
    return formattedDate;  
  };

  const toolbarClick = (args) => {
    if (gridcomp && args.item.id === 'gridcomp_excelexport') {
      const currentDateTime = getCurrentDateTime();
      const fileName = `Leads-List_${currentDateTime}.xlsx`;
      const excelExportProperties = {
        fileName: fileName,
      };

      gridcomp.excelExport(excelExportProperties);
    }
  };
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  const Submit = (e) => {
    e.preventDefault();

    // Validate input fields
    if (Name.trim() === '' || CompanyName.trim() === '') {
      // Display an error message or handle the validation as needed
      console.log('Please fill in all fields.');
      return;
    }
    axios
      .post('http://localhost:3001/LeadManagement', { Name, Designation, Country,CompanyName,TypeofDelegate,UpdatedDate })
      .then((result) => {
        console.log(result);
        // Reload the grid data after adding a new record
        axios.get('http://localhost:3001/leads').then((result) => setGridData(result.data));
        setformFreshLeads(false);
      })
      .catch((err) => console.log(err));
  };

  const actionCompleteHandler = (args) => {
    if (args.requestType === 'save') {
      const updatedData = args.data;
      const courseId = updatedData._id;
      updateCourse(courseId, updatedData);
    }
  };

  const updateCourse = async (_id, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:3001/leads/update/${_id}`, updatedData);
      if (response.status === 200) {
        // Update gridData state after successfully updating a record
        setGridData((prevGridData) => {
          return prevGridData.map((course) => {
            if (course._id === _id) {
              return updatedData;
            }
            return course;
          });
        });
      } else {
        console.error('Error updating record:', response);
      }
    } catch (error) {
      console.error('Error updating record:', error);
    }
  };

  const handleGridActionBegin = (args) => {
    if (args.requestType === 'delete') {
      // Get the selected record's ID
      const record = args.data[0];
      const recordId = record._id; // Assuming "_id" is the unique identifier

      // Send a delete request to the server
      axios
        .delete(`http://localhost:3001/leads/delete/${recordId}`)
        .then((response) => {
          if (response.status === 200) {
            // Data was successfully deleted, you can update your local state if needed
            // Update gridData state
            const updatedGridData = gridData.filter((data) => data._id !== recordId);
            setGridData(updatedGridData);
          } else {
            console.error('Error deleting record:', response);
          }
        })
        .catch((error) => {
          console.error('Error deleting record:', error);
        });
    }
  };



    function rowNumberTemplate(props) {
      return props.index + 1;
    }
    

  return (
    <div className="bg-gray-100 h-screen flex flex-col pl-10 pt-10 ">
      <div className="flex">
        <button
          className={`w-1/4 text-center font-serif  font-bold uppercase px-5 py-5 shadow-lg rounded block leading-normal mr-5 ${
            activeTab === 'tycon' ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-700'
          }`}
          onClick={() => handleTabClick('tycon')}
        >
          <div className="flex flex-col  text-left"> 
            <span>Fresh leads</span>
           <span className={`mt-2 px-2 py-1 rounded-lg items-center text-left${
            activeTab === 'tycom' ? 'bg-white p-2' : ''
               }`}>63
          </span>
         </div>
        </button>
        <button
       className={`w-1/4 text-left  font-serif font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal mr-5 relative ${
        activeTab === 'tycom' ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-700'
         }`}
       onClick={() => handleTabClick('tycom')}
     >
     <div className="flex flex-col  text-left"> {/* Add a flex container */}
    <span>Follow up Today</span>
    <span className={`mt-2 px-2 py-1 rounded-lg items-center text-left${
      activeTab === 'tycom' ? 'bg-white p-2' : ''
    }`}>63
    </span>
  </div>
</button>


        <button
          className={`w-1/4 text-center font-serif  font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal mr-5 ${
            activeTab === 'styam' ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-700'
          }`}
          onClick={() => handleTabClick('styam')}
        ><div className="flex flex-col  text-left"> {/* Add a flex container */}
        <span>Instrested</span>
        <span className={`mt-2 px-2 py-1 rounded-lg items-center text-left${
          activeTab === 'styam' ? 'bg-white p-2' : ''
        }`}>40
        </span>
      </div>
        </button>
        <button
          className={`w-1/4 text-center font-serif font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal mr-5 ${
            activeTab === 'nine' ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-700'
          }`}
          onClick={() => handleTabClick('nine')}
        ><div className="flex flex-col  text-left"> {/* Add a flex container */}
        <span>Follow up Overdues</span>
        <span className={`mt-2 px-2 py-1 rounded-lg items-center text-left${
          activeTab === 'nine' ? 'bg-white p-2' : ''
        }`}>63
        </span>
      </div>
        </button>
      </div>
      <div className="p-4">
        {activeTab === 'tycon' && (
          <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
            {/* Insert your content for the Tycon tab here */}
            <Header category="Page" title="lead management" />
            <button
               className="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-  mb-5 ease-linear transition-all duration-150"
               type="button"
            onClick={() => setformFreshLeads(true)}
              >
             + Add Record
            </button>
            {/* Frontend of Upload Data Start */}
            <h1 className=" mt-10 text-xl font-bold mb-5">Add More Data</h1>
        <input className="mb-5" type="file" accept=".csv" onChange={handleFileSelect} />
        {selectedFile && (
          <button
            className="bg-green-500 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 mb-5 ml-5"
            onClick={handleFileUpload}
          >
            Upload CSV
          </button>
        )}
      {/* Frontend of Upload Data End */}

      <GridComponent id='gridcomp'  toolbar={toolbar} allowExcelExport={true} toolbarClick={toolbarClick} ref={g => gridcomp = g}
              dataSource={gridData}
              editSettings={editOptions}
              actionComplete={actionCompleteHandler}
              actionBegin={handleGridActionBegin}
              allowPaging
              allowSorting
              width="auto"
            >
              <ColumnsDirective>
              <ColumnDirective headerText="S.No." template={rowNumberTemplate} textAlign="Center" />
          <ColumnDirective field="Name" headerText="Clients Name" />
          <ColumnDirective field="Designation" headerText="Designation" />
          <ColumnDirective field="Country" headerText="Country" />
          <ColumnDirective field="CompanyName" headerText="Company Name" />
          {/* <ColumnDirective field="ClientsID" headerText="Clients ID" /> */}
          <ColumnDirective field="UpdatedDate" headerText="Last UpDate" />
          <ColumnDirective field="TypeofDelegate" headerText="Type of Delegate" />
              </ColumnsDirective>
              <Inject
                services={[
                  Page,
                  Search,
                  Toolbar,
                  ExcelExport,
                  Edit,
                  PdfExport,
                ]}
              />
            </GridComponent>
          </div>
        )}
        {activeTab === 'nine' && (
          <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl ">
            {/* Insert your content for the Tycon tab here */}
            <Header category="Page" title="lead management" />

            <button
               className="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-  mb-5 ease-linear transition-all duration-150"
               type="button"
            onClick={() => setformFreshLeads(true)}
              >
             + Add Record
            </button>
            {formFreshLeads && (
        <>
        <div
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start ">
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setformFreshLeads(false)}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  </span>
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
              <div class="relative flex  flex-wrap items-stretch mb-3 w-80">
                 <input type="text" placeholder="Client Name" class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white  rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"
                 value={Name}
                 onChange={(e) => setName(e.target.value)}
                 />
                 <span class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300  bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                </span>
              </div>
              <div class="relative flex  flex-wrap items-stretch mb-3 w-80">
                 <input type="text" placeholder="Designation" class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white  rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"
                 value={Designation}
                 onChange={(e) => setDesignation(e.target.value)}/>
                 <span class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300  bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                </span>
              </div>
              <div class="relative flex  flex-wrap items-stretch mb-3 w-80">
                 <input type="text" placeholder="Country" class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"
                 value={Country}
                 onChange={(e) => setCountry(e.target.value)}/>
                 <span class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300  bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                </span>
              </div>
              <div class="relative flex  flex-wrap items-stretch mb-3 w-80">
                 <input type="text" placeholder="Company Name" class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"
                 value={CompanyName}
                 onChange={(e) => setCompanyName(e.target.value)}/>
                 <span class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300  bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                </span>
              </div>
            <div>
            <label for="countriess" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type of Delegate</label>
             <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
             value={TypeofDelegate}
            onChange={(e) => setTypeofDelegate(e.target.value)}>
            <option value="Company">Company</option>
             <option value="Students">Students</option>
            </select>
              </div>
              <label for="message" class="block  mt-5 mb-2 text-sm font-medium text-gray-900 dark:text-white">Date Added</label>
              <div class=" mt-2 relative flex  flex-wrap items-stretch mb-3 w-80">
                 <input type="Date" placeholder="Date Added" class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"
                 value={UpdatedDate}
                 onChange={(e) => setUpdatedDate(e.target.value)}/>
                 <span class="z-10 h-full leading-snug font-normal text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                </span>
              </div>
            <button
                  className="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 mt-5"
                  type="submit" // Use lowercase "submit" for the type
                  onClick={Submit}
                >
                Submit
            </button>

              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setformFreshLeads(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
      )}



            {/* Frontend of Upload Data Start */}
            <h1 className=" mt-10 text-xl font-bold mb-5">Add More Data</h1>
        <input className="mb-5" type="file" accept=".csv" onChange={handleFileSelect} />
        {selectedFile && (
          <button
            className="bg-green-500 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 mb-5"
            onClick={handleFileUpload}
          >
            Upload CSV
          </button>
        )}
      {/* Frontend of Upload Data End */}

            <GridComponent id='gridcomp'  toolbar={toolbar} allowExcelExport={true} toolbarClick={toolbarClick} ref={g => gridcomp = g}
              dataSource={gridData}
              editSettings={editOptions}
              actionComplete={actionCompleteHandler}
              actionBegin={handleGridActionBegin}
              allowPaging
              allowSorting
              width="auto"
            >
              <ColumnsDirective>
              <ColumnDirective headerText="S.No." template={rowNumberTemplate} textAlign="Center" />
          <ColumnDirective field="Name" headerText="Clients Name" />
          <ColumnDirective field="Designation" headerText="Designation" />
          <ColumnDirective field="Country" headerText="Country" />
          <ColumnDirective field="CompanyName" headerText="Company Name" />
          {/* <ColumnDirective field="ClientsID" headerText="Clients ID" /> */}
          <ColumnDirective field="UpdatedDate" headerText="Last UpDate" />
          <ColumnDirective field="TypeofDelegate" headerText="Type of Delegate" />
              </ColumnsDirective>
              <Inject
                services={[
                  Page,
                  Search,
                  Toolbar,
                  ExcelExport,
                  Edit,
                  PdfExport,
                ]}
              />
            </GridComponent>
          </div>
        )}
        {/* Render other tab content similarly */}
        {activeTab === 'tycom' && (
          <div>
            <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
            {/* Insert your content for the Tycon tab here */}
            <Header category="Page" title="lead management" />
            {/* Frontend of Upload Data Start */}
            <h1 className=" mt-10 text-xl font-bold mb-5 ml-5">Add More Data</h1>
        <input className="mb-5" type="file" accept=".csv" onChange={handleFileSelect} />
        {selectedFile && (
          <button
            className="bg-green-500 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 mb-5"
            onClick={handleFileUpload}
          >
            Upload CSV
          </button>
        )}
      {/* Frontend of Upload Data End */}
  

      <GridComponent id='gridcomp'  toolbar={toolbar} allowExcelExport={true} toolbarClick={toolbarClick} ref={g => gridcomp = g}
              dataSource={gridData}
              editSettings={editOptions}
              actionComplete={actionCompleteHandler}
              actionBegin={handleGridActionBegin}
              allowPaging
              allowSorting
              width="auto"
            >
              <ColumnsDirective>
              <ColumnDirective headerText="S.No." template={rowNumberTemplate} textAlign="Center" />
          <ColumnDirective field="Name" headerText="Clients Name" />
          <ColumnDirective field="Designation" headerText="Designation" />
          <ColumnDirective field="Country" headerText="Country" />
          <ColumnDirective field="CompanyName" headerText="Company Name" />
          {/* <ColumnDirective field="ClientsID" headerText="Clients ID" /> */}
          <ColumnDirective field="UpdatedDate" headerText="Last UpDate" />
          <ColumnDirective field="TypeofDelegate" headerText="Type of Delegate" />
              </ColumnsDirective>
              <Inject
                services={[
                  Page,
                  Search,
                  Toolbar,
                  ExcelExport,
                  Edit,
                  PdfExport,
                ]}
              />
            </GridComponent>
          </div>
          </div>
        )}
        {activeTab === 'styam' && (
          <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
          <Header category= "Page" title="lead management" />
          <button
               className="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-  mb-5 ease-linear transition-all duration-150"
               type="button"
            onClick={() => setformFreshLeads(true)}
              >
             + Add Record
            </button>
          {/* Frontend of Upload Data Start */}
          <h1 className=" mt-10 text-xl font-bold mb-5">Add More Data</h1>
        <input className="mb-5" type="file" accept=".csv" onChange={handleFileSelect} />
        {selectedFile && (
          <button
            className="bg-green-500 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 mb-5"
            onClick={handleFileUpload}
          >
            Upload CSV
          </button>
        )}
      {/* Frontend of Upload Data End */}
    
      <GridComponent id='gridcomp'  toolbar={toolbar} allowExcelExport={true} toolbarClick={toolbarClick} ref={g => gridcomp = g}
              dataSource={gridData}
              editSettings={editOptions}
              actionComplete={actionCompleteHandler}
              actionBegin={handleGridActionBegin}
              allowPaging
              allowSorting
              width="auto"
            >
              <ColumnsDirective>
              <ColumnDirective headerText="S.No." template={rowNumberTemplate} textAlign="Center" />
          <ColumnDirective field="Name" headerText="Clients Name" />
          <ColumnDirective field="Designation" headerText="Designation" />
          <ColumnDirective field="Country" headerText="Country" />
          <ColumnDirective field="CompanyName" headerText="Company Name" />
          {/* <ColumnDirective field="ClientsID" headerText="Clients ID" /> */}
          <ColumnDirective field="UpdatedDate" headerText="Last UpDate" />
          <ColumnDirective field="TypeofDelegate" headerText="Type of Delegate" />
              </ColumnsDirective>
              <Inject
                services={[
                  Page,
                  Search,
                  Toolbar,
                  ExcelExport,
                  Edit,
                  PdfExport,
                ]}
              />
            </GridComponent>
        </div>
        )}
      </div>
    </div>
  );
}
export default Leadgenerate; 