import React, { useState, useEffect } from 'react';
import { ScheduleComponent, ExcelExport,ViewsDirective, ViewDirective, Day,Week,WorkWeek, Month,Agenda,Inject,Resize,DragAndDrop,Tollbar } from '@syncfusion/ej2-react-schedule';
import { useRef } from 'react';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { scheduleData } from '../data/dummy';
import { Header } from '../components';
import axios from 'axios';



const Calendar = () => {
  const [gridData, setGridData] = useState([]);
  const scheduleObj = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const eventSettings = { dataSource: gridData };
  const editOptions = { allowEditing: true, allowAdding: true, allowDeleting: true };
  let gridcomp;



  //new

  const onActionBegin = (args) => {
    if (args.requestType === 'toolbarItemRendering') {
        let exportItem = {
            align: 'Right', showTextOn: 'Both', prefixIcon: 'e-icon-schedule-excel-export',
            text: 'Excel Export', cssClass: 'e-excel-export', click: onExportClick
        };
        args.items.push(exportItem);
    }
}
const onExportClick = () => {
    let customFields = [
        { name: 'Subject', text: 'Summary' },
        { name: 'StartTime', text: 'First Date' },
        { name: 'EndTime', text: 'Last Date' },
        { name: 'Location', text: 'Place' },
        { name: 'Description', text: 'Assigned'},
        { name: 'MeetingHead', text: 'Meeting Head'}

    ];
    let exportValues = { fieldsInfo: customFields };
    scheduleObj.current.exportToExcel(exportValues);
}
//end


  const toolbar = [
    {
      text: 'Export CSV',
      tooltipText: 'Export to Excel',
      prefixIcon: 'e-btn-icon e-excelexport e-icons e-icon-left',
      id: 'gridcomp_excelexport',
      style: {
        background: 'blue',
        color: 'white',
        padding: '10px 20px',
        cursor: 'pointer',
        fontSize: '16px',
        display: 'inline-block',
      },
    },
    'Search','Edit', 'Delete', 'Update', 'Cancel '
  ];


  useEffect(() => {
    axios
      .get('http://localhost:3001/Calendar')
      .then((result) => {
        setGridData(result.data);
        console.log(result.data); // Add this line to log the fetched data
      })
      .catch((err) => console.log(err));
  }, []);

  const actionCompleteHandler = (args) => {
    if (args.requestType === 'save') {
      const updatedData = args.data;
      const calendarId = updatedData._id;
      updateCourse(calendarId, updatedData);
    }
  };

  const updateCourse = async (_id, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:3001/Calendar/update/${_id}`, updatedData);
      if (response.status === 200) {
        // Update gridData state after successfully updating a record
        setGridData((prevGridData) => {
          return prevGridData.map((calendar) => {
            if (calendar._id === _id) {
              return updatedData;
            }
            return calendar;
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
        .delete(`http://localhost:3001/Calendar/delete/${recordId}`)
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

  //Excel Upload 

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    };
 
  const handleFileUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      
 
      axios.post('http://localhost:3001/Calendar/upload', formData)
        .then((result) => {
         console.log(result);
         // Reload the grid data after adding a new record
         axios.get('http://localhost:3001/Calendar').then((result) => setGridData(result.data));
         setShowModal(false);
       })
        .catch((error) => {
          console.error('Error uploading CSV file:', error);
          // Handle error, if needed
        });
    }
    
  };
 
 // Excel Upload End



  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="App"  title="Calendar"  />
      {/* Upload file Frontend */}

<h1 className=" mt-10 text-xl font-bold mb-5">Add More Events</h1>
        <input className="mb-5" type="file" accept=".csv" onChange={handleFileSelect} />
        {selectedFile && (
          <button
            className="bg-green-500 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 mb-5 ml-5"
            onClick={handleFileUpload}
          >
            Upload CSV
          </button>
        )}

      <ScheduleComponent
      cssClass='excel-export' width='100%' height='650px' id='schedule' ref={scheduleObj} selectedDate={new Date(2023,10,10)} eventSettings={eventSettings} 
      editSettings={editOptions}
      actionBegin={onActionBegin}
      // height="650px"
      // id="gridcomp"
      // cssClass='excel-export'
      // eventSettings={{dataSource:scheduleData}}
      toolbar={toolbar}
        allowExcelExport={true}
      //   ref={(g) => (gridcomp = g)}
      // eventSettings={{dataSource:gridData}}
      // selectedDate={new Date (2023,10,10)}
      >
         <ViewsDirective>
            <ViewDirective option='Month' />
        </ViewsDirective>
        <Inject  services={ [Day, Week, WorkWeek, Month,Agenda,Resize, DragAndDrop,ExcelExport]}/>
      </ScheduleComponent>



    </div>
  )
}

export default Calendar