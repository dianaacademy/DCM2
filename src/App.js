import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { Navbar, Footer, Sidebar, ThemeSettings, GrapesMain } from './components';
import {
  Leadgenerate, Clientsprofile, Registration, CoursesProgrm, Mangement,
  Ecommerce, Orders, Calendar, Employees, Stacked, Pyramid, Customers,
  Line, Kanban, Area, Campains, Security, Bar, Pie, Financial, ColorPicker,
  ColorMapping, Editor, Tutor, Ticketandsupport, Tabtune, Lmsdcm, Editdrop,
  Internshipl, Lettership, Hiring, LoginForm
} from './Pages';
import { useStateContext } from './contexts/ContextProvider';
import FolderList from './components/FolderList';
import TemplatePage from './components/TemplatePage';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
import './App.css';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const { activeMenu, themeSettings, setThemeSettings, currentColor, currentMode } = useStateContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <div className="flex relative dark:bg-main-dark-bg">
        <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
          <TooltipComponent content="Settings" position="Top">
            
          </TooltipComponent>
        </div>
        {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        )}
        <div
          className={
            activeMenu
              ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
              : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
          }
        >
          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
            <Navbar />
          </div>
          <div>
            {themeSettings && (<ThemeSettings />)}
            {children}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();

  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Protected routes */}
          <Route path="/ecommerce" element={<PrivateRoute><Ecommerce /></PrivateRoute>} />
          <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
          <Route path="/campaign" element={<PrivateRoute><Campains /></PrivateRoute>} />
          <Route path="/Security" element={<PrivateRoute><Security /></PrivateRoute>} />
          <Route path="/Employees" element={<PrivateRoute><Employees /></PrivateRoute>} />
          <Route path="/Customers" element={<PrivateRoute><Customers /></PrivateRoute>} />
          <Route path="/Clientsprofiles" element={<PrivateRoute><Clientsprofile /></PrivateRoute>} />
          <Route path="/EnrollmentandRegistration" element={<PrivateRoute><Registration /></PrivateRoute>} />
          <Route path="/CoursesandProgrammanagement" element={<PrivateRoute><CoursesProgrm /></PrivateRoute>} />
          <Route path="/LEADMANAGEMENT" element={<PrivateRoute><Leadgenerate /></PrivateRoute>} />
          <Route path="/instructorandtrainer" element={<PrivateRoute><Tutor /></PrivateRoute>} />
          <Route path="/GrapesMain" element={<PrivateRoute><GrapesMain /></PrivateRoute>} />
          <Route path="/LMSLogin" element={<PrivateRoute><Lmsdcm /></PrivateRoute>} />
          <Route path="/Kanban" element={<PrivateRoute><Kanban /></PrivateRoute>} />
          <Route path="/Editor" element={<PrivateRoute><Editor /></PrivateRoute>} />
          <Route path="/Calendar" element={<PrivateRoute><Calendar /></PrivateRoute>} />
          <Route path="/Color-picker" element={<PrivateRoute><ColorPicker /></PrivateRoute>} />
          <Route path="/Document_Management" element={<PrivateRoute><Mangement /></PrivateRoute>} />
          <Route path="/Line" element={<PrivateRoute><Line /></PrivateRoute>} />
          <Route path="/drop" element={<PrivateRoute><Editdrop /></PrivateRoute>} />
          <Route path="/Generate-Certificate" element={<PrivateRoute><Tabtune /></PrivateRoute>} />
          <Route path="/Area" element={<PrivateRoute><Area /></PrivateRoute>} />
          <Route path="/Bar" element={<PrivateRoute><Bar /></PrivateRoute>} />
          <Route path="/Pie" element={<PrivateRoute><Pie /></PrivateRoute>} />
          <Route path="/Financial" element={<PrivateRoute><Financial /></PrivateRoute>} />
          <Route path="/Pyramid" element={<PrivateRoute><Pyramid /></PrivateRoute>} />
          <Route path="/Stacked" element={<PrivateRoute><Stacked /></PrivateRoute>} />
          <Route path="/support" element={<PrivateRoute><Ticketandsupport /></PrivateRoute>} />
          <Route path="/internship" element={<PrivateRoute><Internshipl /></PrivateRoute>} />
          <Route path="/hiring" element={<PrivateRoute><Hiring /></PrivateRoute>} />
          <Route path="/internshipLetter" element={<PrivateRoute><Lettership /></PrivateRoute>} />
          <Route path="/templates" element={<PrivateRoute><TemplatePage /></PrivateRoute>} />
          <Route path="/folder-list" element={<PrivateRoute><FolderList /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;