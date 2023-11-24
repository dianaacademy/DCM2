import React, {useEffect} from 'react'
import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { MdKeyboardArrowDown } from 'react-icons/md';
import {BsChatLeft} from 'react-icons/bs';
import {RiNotification3Line} from 'react-icons/ri';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import avatar from '../data/avatar.jpg';
import {Cart,Chat,Notification  } from '.';
import { useStateContext } from '../contexts/ContextProvider';
// if you want to add userprofile layout when user click on her profile kindly imprt "UserProfile" and attached "{isClicked.UserProfile && <UserProfile/>}" where "<Notification Added/>"

const NavButton = ({title,customFunc, icon, color, dotcolor}) => (
  <TooltipComponent content = {title} position="BottomCenter">
    <button type="button" onClick={customFunc} style={{color}}
    className="relative text-x1 rounded-full p-3 hover:bg-light-gray ">
      <span style={{background:dotcolor}}
      className="absolute inline-flex rounded-full  h-2 w-2 right-2 top-2 "  />
       {icon}

    </button>

  </TooltipComponent>


)

const Navbar = () => {
const {activeMenu, setActiveMenu , isClicked, SetisClicked, handleClick} = useStateContext();



// return (

//     <div className="flex justify-between p-2 md:mx-6 relative">
  

//       <div className="flex">

//       <NavButton title ="Cart" customFunc={() => handleClick('Cart')}
//        color="blue" icon = {<FiShoppingCart/>} />


//       <NavButton title ="Chat" customFunc={() => handleClick('Chat')} dotcolor= "#03C907"
//        color="blue" icon = {<BsChatLeft/>}  />

//        <TooltipComponent content= "Profile"
//        position="BottomCenter">

//         <div className=" flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
//         onClick={() => handleClick ('UserProfile')}>

//           <img className="rounded-full w-8 h-8 "
//           src={avatar}
//           />
//           <p>
//             <span  className="text-gray-400 text-14 "> Hi,</span> {' '}
//             <span className="text-gray-400 font-bold ml-1">Leo,</span> {' '}
//           </p>

//           <MdKeyboardArrowDown
//           className="text-gray-400 text-14"/>

//         </div>
//        </TooltipComponent>

//       {/* {isClicked.Cart && <Cart/>}
//       {isClicked.Chat && <Chat/>}
//       {isClicked.Notification && <Notification/>} */}
      



//       </div>
//  </div>

//   )
// }

  return (
    <div className="flex justify-between p-2 md:mx-6 relative">
      <div className="flex items-center">
        {/* Place the Notification icon */}
        <NavButton title ="Menu" customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)} color="blue" icon = {<AiOutlineMenu/>}  />
        <button
  className="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 m-2 ml-5"
  type="button"
  onClick={() => {
    window.location.href = '/campaign';
  }}
>
  + Add campaigns
</button>

        <button
               className="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 m-2 ml-5"
               type="button"
               onClick={() => {
                window.location.href = '/campaign';
              }}
              >
             Leads
            </button>
      </div>

      {/* Spacer for centering other icons */}
      <div className="flex items-center">
        {/* Other icons (Menu, Cart, Chat, UserProfile) */}
        <NavButton
          title="Cart"
          customFunc={() => handleClick('Cart')}
          color="blue"
          icon={<FiShoppingCart />}
        />
        <NavButton
          title="Chat"
          customFunc={() => handleClick('Chat')}
          dotcolor="#03C907"
          color="blue"
          icon={<BsChatLeft />}
        />
       <TooltipComponent content= "Profile"
       position="BottomCenter">

        <div className=" flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
        onClick={() => handleClick ('UserProfile')}>

          <img className="rounded-full w-8 h-8 "
          src={avatar}
          />
          <p>
            <span  className="text-gray-400 text-14 "> Hi,</span> {' '}
            <span className="text-gray-400 font-bold ml-1">Leo,</span> {' '}
          </p>

          <MdKeyboardArrowDown
          className="text-gray-400 text-14"/>

        </div>
        </TooltipComponent>
      </div>
    </div>
  );
};


export default Navbar