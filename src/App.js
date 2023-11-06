import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import{Navbar, Footer, Sidebar, ThemeSettings, GrapesMain} from './components';
import { Leadgenerate ,Clientsprofile,Registration,CoursesProgrm ,Mangement,Ecommerce, Orders, Calendar, Employees, Stacked, Pyramid, Customers, Line, Kanban, Area,Campains, Security,Bar, Pie, Financial, ColorPicker, ColorMapping, Editor,Tutor,Ticketandsupport,Tabtune,Lmsdcm,Editdrop} from './Pages';
import { useStateContext } from './contexts/ContextProvider';
import './App.css'



const App = () => {
    const {activeMenu,themeSetting,SetThemeSettings} = useStateContext();

return (
   <div>
    <BrowserRouter>
       <div
        className= "flex relative dark:bg-main-dark-bg">
            <div className="fixed right-4 bottom-4" style={{zIndex:'1000'}}>
                <TooltipComponent content = "settings" position="Top">
                    <button
                    type="button" className="text-3xl  p-3 hover:drop-shadow-xl hover:bg-light-gray text-white"
                    onClick={() => SetThemeSettings(true)}
                    style={{background:'blue', borderRadius: '50%'}}>
                        <FiSettings/>
                    </button>
                </TooltipComponent>
            </div>
                     {activeMenu ?(
            <div className="w-72 fixed sidebar dark:bg-secendary-dark-bg bg-white">
                < Sidebar />
        </div>
          )  : (
            <div className="w-0 dark:bg-secondary-dark-bg">
                 < Sidebar />
            </div>
          )}
          <div className={
                `dark:bg-main-bg bg-main-bg min-h-screen w-full ${activeMenu ? 'md:ml-72' : 'flex-2'}`
            }>
                <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
                < Navbar />

                </div>

                

            

        

            <div>

               {themeSetting && <ThemeSettings/>} 
                <Routes>
                    {/* dashboard */}
                    <Route path="/" element={<Ecommerce/>} />
                    <Route path= "/ecommerce" element = {<Ecommerce/>} />


                    {/* Pages */}
                    <Route path= "/orders" element = {<Orders/>} />
                    <Route path= "/campaign" element = {<Campains/>} />
                    <Route path= "/Security" element = {<Security/>} />
                    <Route path= "/Employees" element = {<Employees/>} />
                    <Route path= "/Customers" element = {<Customers/>} />
                    <Route path= "/Clientsprofiles" element = {<Clientsprofile/>} />
                    <Route path= "/EnrollmentandRegistration" element = {<Registration/>} />
                    <Route path= "/CoursesandProgrammanagement" element = {<CoursesProgrm/>} />
                    <Route path= "/LEADMANAGEMENT" element = {<Leadgenerate/>} />
                    <Route path= "/instructorandtrainer" element = {<Tutor/>} />
                    <Route path= "/GrapesMain" element = {<GrapesMain/>} />
                    <Route path= "/LMSLogin" element = {<Lmsdcm/>} />

                     {/* Apps */}
                     <Route path= "/Kanban" element = {<Kanban/>} />
                     <Route path= "/leads" element =  {<leads/>} />
                     <Route path= "/Editor" element = {<Editor/>} />
                     <Route path= "/Calendar" element = {<Calendar/>} />
                     <Route path= "/Color picker" element = {<ColorPicker/>} />
                     <Route path= "/Document_Management" element = {<Mangement/>} />
                    {/* Charts */}
                    <Route path= "/Line" element = {<Line/>} />
                    <Route path= "/drop" element = {<Editdrop/>} />
                    <Route path= "/Generate-Certificate" element = {<Tabtune/>} />
                    <Route path= "/Area" element = {<Area/>} />
                    <Route path= "/Bar" element = {<Bar/>} />
                    <Route path= "/Pie" element = {<Pie/>} />
                    <Route path= "/Fiential" element = {<Financial/>} />
                    <Route path= "/Pyramid" element = {<Pyramid/>} />
                    <Route path= "/Stacked" element = {<Stacked/>} />
                    <Route path= "/support" element = {<Ticketandsupport/>} />
                    <Route path= "/Tabtune" element = {<Tabtune/>} />

                </Routes>
            </div>

        </div>    

         
         
     </div>
     
    </BrowserRouter>
   </div>
)
}

export default App