import React, { useState, useEffect } from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, Day,Week,WorkWeek, Month,Agenda,Inject,Resize,DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { scheduleData } from '../data/dummy';
import { Header } from '../components';
import axios from 'axios';



const Calendar = () => {
  const [gridData, setGridData] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:3001/Calendar')
      .then((result) => {
        setGridData(result.data);
        console.log(result.data); // Add this line to log the fetched data
      })
      .catch((err) => console.log(err));
  }, []);


  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="App"  title="Calendar"  />

      <ScheduleComponent
      height="650px"
      // eventSettings={{dataSource:scheduleData}}
      eventSettings={{dataSource:gridData}}
      selectedDate={new Date (2023,10,10)}
      >
        <Inject  services={ [Day, Week, WorkWeek, Month,Agenda,Resize, DragAndDrop]}/>
      </ScheduleComponent>



    </div>
  )
}

export default Calendar