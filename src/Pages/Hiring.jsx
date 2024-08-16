import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  Reorder,
  ContextMenu,
  Filter,
  Page,
  Edit,
  Inject,
  Toolbar,
} from '@syncfusion/ej2-react-grids';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { Header } from '../components';
import "../components/style.css";
import Papa from 'papaparse';

const Hiring = () => {
  const [showModal, setShowModal] = useState(false);
  const [candidateName, setcandidateName] = useState('');
  const [candidateEmail, setcandidateEmail] = useState('');
  const [candidatePhone, setcandidatePhone] = useState('');
  const [Location, setLocation] = useState('');
  const [StatusBro, setStatusBro] = useState('');
  const [interviewround, setinterviewround] = useState('');
  const [updated, setupdated] = useState('');
  const [specialized, setspecialized] = useState('');
  const [candidateID, setcandidateID] = useState('');
  const [gridData, setGridData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
//   const [TrainingID, setTrainingID] = useState('');
  const editOptions = { allowEditing: true, allowAdding: true, allowDeleting: true };
  const toolbar = ['Search', 'Edit', 'Delete', 'Update', 'Cancel'];

  useEffect(() => {
    axios
      .get('https://server-beta-wheat-43.vercel.app/hirings')
      .then((result) => setGridData(result.data))
      .catch((err) => console.log(err));
  }, []);

    const Submit = (e) => {
      e.preventDefault();
  
      // Validate input fields
      if (candidateName.trim() === '' || candidateEmail.trim() === '') {
        // Display an error message or handle the validation as needed
        console.log('Please fill in all fields.');
        return;
      }
    axios
      .post('https://server-beta-wheat-43.vercel.app/CoursesandProgrammanagement', { candidateName, candidateEmail,candidatePhone,StatusBro,Location,updated,interviewround,candidateID })
      .then((result) => {
        console.log(result);
        // Reload the grid data after adding a new record
        axios.get('https://server-beta-wheat-43.vercel.app').then((result) => setGridData(result.data));
        setShowModal(false);
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
      const response = await axios.put(`https://server-beta-wheat-43.vercel.app/update/${_id}`, updatedData);
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
      const recordId = record._id ; // Assuming "_id" is the unique identifier

      // Send a delete request to the server
      axios
        .delete(`https://server-beta-wheat-43.vercel.app/delete/${recordId}`)
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

      axios.post('https://server-beta-wheat-43.vercel.app/clients/upload', formData)
        .then((response) => {
          console.log(response.data);
          // Handle success, if needed
        })
        .catch((error) => {
          console.error('Error uploading CSV file:', error);
          // Handle error, if needed
        });
    }
  };
// Excel Upload End

 //dropdown edit start
 let StatusElem;
 let statusObj;
 const statusParams = {
       create: () => {
        StatusElem = document.createElement('input');
           return StatusElem;
       },
       destroy: () => {
        statusObj.destroy();
       },
       read: () => {
           return statusObj.text;
       },
       write: () => {
        statusObj = new DropDownList({
               change: () => {
                  const tempQuery = new Query().where('countryId', 'equal', statusObj.value); },
               dataSource: new DataManager(status),
               fields: { value: 'statusId', text: 'statusName' },
               floatLabelType: 'Never',
               placeholder: 'Status'
           });
           statusObj.appendTo(StatusElem);
       }
   };
 
   const status = [
     { statusName: 'interview schedule', statusId: '1' },
     { statusName: 'interview Done', statusId: '2' }
 ];
 
  //dropdown edit End

  
  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Hiring Candidate List" />
      {/* <button
        className="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-  mb-5 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        + Add Record
      </button> */}
      {showModal && (
        <>
       <div
            className="  justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none  pt-60"
          >
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0  rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start ">
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  </span>
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
              <div class="relative flex  flex-wrap items-stretch mb-3 w-80">
                 <input type="text" placeholder="Candidate Name" class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white  rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"
                 value={candidateName}
                 onChange={(e) => setcandidateName(e.target.value)}
                 />
                 <span class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300  bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                </span>
              </div>
              <div class="relative flex  flex-wrap items-stretch mb-3 w-80">
                 <input type="text" placeholder="Candidate ID" class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white  rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"
                 value={candidateID}
                 onChange={(e) => setcandidateID(e.target.value)}/>
                 <span class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300  bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                </span>
              </div>
              <div class="relative flex  flex-wrap items-stretch mb-3 w-80">
                 <input type="text" placeholder="Candidate Email" class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"
                 value={candidateEmail}
                 onChange={(e) => setcandidateEmail(e.target.value)}/>
                 <span class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300  bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                </span>
              </div>
              <div class="relative flex  flex-wrap items-stretch mb-3 w-80">
                 <input type="text" placeholder="Candidate Phone" class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"
                 value={candidatePhone}
                 onChange={(e) => setcandidatePhone(e.target.value)}/>
                 <span class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300  bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                </span>
              </div>     
            <div>
            <label for="countriess" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
             <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
             value={status}
            onChange={(e) => StatusBro(e.target.value)}>
            <option value="Ongoing">Ongoing</option>
             <option value="Completed">Completed</option>
            </select>
              </div>
              <label for="message" class="block  mt-5 mb-2 text-sm font-medium text-gray-900 dark:text-white">Specialized</label>
              <div class=" mt-2 relative flex  flex-wrap items-stretch mb-3 w-80">
                 <input type="Date" placeholder="StartDate" class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"
                 value={specialized}
                 onChange={(e) => setspecialized(e.target.value)}/>
                 <span class="z-10 h-full leading-snug font-normal text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                </span>
              </div>
              <label for="message" class="block  mt-5 mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
              <div class=" mt-2 relative flex  flex-wrap items-stretch mb-3 w-80">
                 <input type="Date" placeholder="EndDate" class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"
                 value={Location}
                 onChange={(e) => setLocation(e.target.value)}/>
                 <span class="z-10 h-full leading-snug font-normal text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                </span>
              </div>
              <label for="message" class="block  mt-5 mb-2 text-sm font-medium text-gray-900 dark:text-white">interview round</label>
              <div class=" mt-2 relative flex  flex-wrap items-stretch mb-3 w-80">
                 <input type="Date" placeholder="StartDate" class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"
                 value={interviewround}
                 onChange={(e) => setinterviewround(e.target.value)}/>
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
      )}

      {/* Upload file Frontend */}
{/* 
<h1 className=" mt-10 text-xl font-bold mb-5">Add More Data</h1>
        <input className="mb-5" type="file" accept=".csv" onChange={handleFileSelect} />
        {selectedFile && (
          <button
            className="bg-green-500 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 mb-5 ml-5"
            onClick={handleFileUpload}
          >
            Upload CSV
          </button>
        )} */}

      <GridComponent
        dataSource={gridData}
        allowPaging
        toolbar={toolbar}
        allowSorting
        allowReordering={true}
        allowResizing
        editSettings={editOptions}
        actionComplete={actionCompleteHandler}
        actionBegin={handleGridActionBegin}
      >
        <ColumnsDirective>
          <ColumnDirective field="candidateID" headerText="Candidate ID" />
          <ColumnDirective field="candidateName" headerText="Candidate Name" />
          <ColumnDirective field="candidateEmail" headerText="Candidate Email" />
          <ColumnDirective  field='candidatePhone' headerText="Candidate Phone"/>
          <ColumnDirective field="specialized" headerText="Specialized" />
          <ColumnDirective field="Status" headerText="Status" />
          <ColumnDirective field="Location" headerText="Location" />
          <ColumnDirective field="updated" headerText="Updated Date" />
          <ColumnDirective field="interviewround" headerText="interview round" />
          {/* <ColumnDirective field="StatusBro" headerText="Status" /> */}
          
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Reorder, Filter, Page, Edit, Toolbar]} />
      </GridComponent>
    </div>
  );
};

export default Hiring;
