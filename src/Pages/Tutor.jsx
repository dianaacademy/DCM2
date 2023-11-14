import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {GridComponent, ColumnsDirective,ColumnDirective, Search,Resize,Reorder, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport,Edit, Inject,Toolbar} from '@syncfusion/ej2-react-grids';
import {customersData, customersGrid , } from '../data/dummy';
import { Header } from '../components';
import { showGrandTotals } from '@syncfusion/ej2/pivotview';
import "../components/style.css";


const Tutor = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [InstructorName, setInstructorName] = useState('');
  const [InstructorStatus, setInstructorStatus] = useState('');
  const [InstructorEmail, setInstructorEmail] = useState('');
  const [InstructorPhone, setInstructorPhone] = useState('');
  const [Specialisations, setSpecialisations] = useState('');
  const [ProjectName, setProjectName] = useState('');
  const [Status, setStatus] = useState('');
  const [Weeks, setWeeks] = useState('');
  const [ShiftTimings, setShiftTimings] = useState('');
  const [Location, setLocation] = useState('');
  const [DateAdded, setDateAdded] = useState('');
  const [InstructorID, seInstructorID] = useState('');
  const [gridData, setGridData] = useState([]);
  const [StatusBg, setStatusBg] = useState('');
  const [InstructorImage, setInstructorImage] = useState('');
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
      const fileName = `Tutor_${currentDateTime}.xlsx`;
      const excelExportProperties = {
        fileName: fileName,
      };

      gridcomp.excelExport(excelExportProperties);
    }
  };

//Server Code 

useEffect(() => {
  axios
    .get('http://localhost:3001/instructor')
    .then((result) => {
      setGridData(result.data);
    })
    .catch((err) => console.log(err));
}, []);

  const Submit = (e) => {
    e.preventDefault();

    // Validate input fields
    if (InstructorName.trim() === '' || InstructorID.trim() === '') {
      // Display an error message or handle the validation as needed
      console.log('Please fill in all fields.');
      return;
    }
  axios
    .post('http://localhost:3001/instructorandtrainer', { InstructorName, InstructorImage,StatusBg,InstructorID,DateAdded,Location,ShiftTimings,Weeks,Status,ProjectName,Specialisations,InstructorPhone,InstructorEmail,InstructorStatus })
    .then((result) => {
      console.log(result);
      // Reload the grid data after adding a new record
      axios.get('http://localhost:3001/instructor').then((result) => setGridData(result.data));
      setShowModal(false);
    })
    .catch((err) => console.log(err));
};

const actionCompleteHandler = (args) => {
  if (args.requestType === 'save') {
    const updatedData = args.data;
    const instructorId = updatedData._id;
    updateinstructor(instructorId, updatedData);
  }
};

const updateinstructor = async (_id, updatedData) => {
  try {
    const response = await axios.put(`http://localhost:3001/instructor/update/${_id}`, updatedData);
    if (response.status === 200) {
      // Update gridData state after successfully updating a record
      setGridData((prevGridData) => {
        return prevGridData.map((instructor) => {
          if (instructor._id === _id) {
            return updatedData;
          }
          return instructor;
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
      .delete(`http://localhost:3001/instructor/delete/${recordId}`)
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

 //Server Code End


  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category= "Page" title="Instructor"/>

      <button
        className="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-  mb-5 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        + Add Record
      </button>
      {showModal ? (
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
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                <div class="relative flex  flex-wrap items-stretch mb-3 w-80">
                   <input type="text" placeholder="Instructor Name" class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"/>
                   <span class="z-10 h-full leading-snug font-normal text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3"
                    value={InstructorName}
                    onChange={(e) => setInstructorName(e.target.value)}>
                  </span>
                </div>
                <div class="relative flex  flex-wrap items-stretch mb-3 w-80">
                   <input type="text" placeholder="Instructor Email" class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"/>
                   <span class="z-10 h-full leading-snug font-normal text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3"
                    value={InstructorEmail}
                    onChange={(e) => setInstructorEmail(e.target.value)}>
                  </span>
                </div>
                <div class="relative flex  flex-wrap items-stretch mb-3 w-80">
                   <input type="text" placeholder="Instructor Phone" class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"/>
                   <span class="z-10 h-full leading-snug font-normal text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3"
                    value={InstructorPhone}
                    onChange={(e) => setInstructorPhone(e.target.value)}>
                  </span>
                </div>
                <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Instructor</label>
<textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Add Specialisation Seperate by Comma(,) "value={Specialisations}
    onChange={(e) => setSpecialisations(e.target.value)}></textarea> 

<div class=" mt-2 relative flex  flex-wrap items-stretch mb-3 w-80">
                   <input type="text" placeholder="Project Name" class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"
                   value={ProjectName}
                   onChange={(e) => setProjectName(e.target.value)}/>
                   <span class="z-10 h-full leading-snug font-normal text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                  </span>
                </div>
                <div class=" mt-2 relative flex  flex-wrap items-stretch mb-3 w-80">
                   <input type="text" placeholder="Location" class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"
                   value={Location}
                   onChange={(e) => setLocation(e.target.value)}/>
                   <span class="z-10 h-full leading-snug font-normal text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                  </span>
                </div>
                <div class=" mt-2 relative flex  flex-wrap items-stretch mb-3 w-80">
                   <input type="text" placeholder="Shift Timings" class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"
                   value={ShiftTimings}
                   onChange={(e) => setShiftTimings(e.target.value)}/>
                   <span class="z-10 h-full leading-snug font-normal text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                  </span>
                </div>
              <div>
                <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
               <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
               "
               value={InstructorStatus}
                    onChange={(e) => setInstructorStatus(e.target.value)}>
               <option value="Active">Active</option>
               <option value="Inactive">Inactive</option>
              </select>
                </div>
                <label for="message" class="block  mt-5 mb-2 text-sm font-medium text-gray-900 dark:text-white">Date Added</label>
                <div class=" mt-2 relative flex  flex-wrap items-stretch mb-3 w-80"
                value={DateAdded}
                onChange={(e) => setDateAdded(e.target.value)}>
                   <input type="Date" placeholder="Date Added" class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"/>
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
      ) : null}

      <GridComponent  toolbar={toolbar} allowExcelExport={true} toolbarClick={toolbarClick} ref={g => gridcomp = g}
      dataSource={gridData}
      allowPaging
      allowSorting
      allowReordering={true} allowDrop={true}
      allowResizing
      editSettings={{allowDeleting:true, allowEditing:true}}
      width="auto"
      actionComplete={actionCompleteHandler}
        actionBegin={handleGridActionBegin}>
        <ColumnsDirective>
        {/* {customersGrid.map((item,index) => (<ColumnDirective key= {index}  {...item}/>
        ))} */}



          <ColumnDirective field="InstructorID" headerText="Instructor ID" />
          <ColumnDirective field="InstructorName" headerText="Instructor Name" />
          <ColumnDirective field="InstructorEmail" headerText="Instructor Email" />
          <ColumnDirective field="InstructorPhone" headerText="Instructor Phone" />
          <ColumnDirective field="Specialisations" headerText="Specialisations" />
          <ColumnDirective field="ProjectName" headerText="Project Name" />
          <ColumnDirective field="Weeks" headerText="Weeks" />
          <ColumnDirective field="ShiftTimings" headerText="Shift Timings" />
          <ColumnDirective field="Location" headerText="Location" />
          <ColumnDirective field="DateAdded" headerText="DateAdded" />
        </ColumnsDirective>
        <Inject services = {[ Reorder,Resize,Sort,ContextMenu, Filter,Page, ExcelExport, Edit,PdfExport,Search,Toolbar ]}/>
      </GridComponent>
    </div>
  )
}

export default Tutor