import React, { useEffect, useState } from 'react';
import {
  MdOutlineSpaceDashboard,
  MdOutlineSettings,
  MdOutlineLogout,
} from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { useRouter } from 'next/router';
import LiveClock from '../LiveClock';
import { Button } from './button';
import { logout } from '../../lib/firebasedb';
import { useSignInPageStore } from '../../stores/signInPageStore';
export default function SideNavbar() {
  const router = useRouter();
  const { setSignedIn, getValues, sideBarIsOpen, setSideBarIsOpen } =
    useSignInPageStore();
  const handleClick = (e) => {
    e.target.id === 'dashboardBtn' && router.push('/home');
  };
  const [time, setTime] = useState(new Date());
  const toggleSidebar = () => {
    setSideBarIsOpen(!sideBarIsOpen);
  };
  useEffect(() => {}, [sideBarIsOpen]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 200000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  let greeting;
  if (time.getHours() > 5) {
    greeting = 'Good Morning';
  } else if (time.getHours() > 12) {
    greeting = 'Good Noon';
  } else if (time.getHours() > 16) {
    greeting = 'Good Afternoon';
  } else {
    greeting = 'Good Evening';
  }
  return (
    <div
      className={`fixed z-20 inset-y-0 left-0 w-1/6 text-white transition-transform duration-300 transform nav_bg ${
        sideBarIsOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="py-8 px-6 h-screen border border-r-2 border-[#06367A] bg-[#06367A] z-20 overflow-auto fixed top-0 left-0 w-full peer-focus:left-0 peer:transition duration-300">
        <button
          className="fixed z-30 -translate-y-5 translate-x-1 w-9 h-9 flex justify-center items-center text-center text-white bg-gray-700 rounded-full hover:bg-gray-600"
          onClick={toggleSidebar}
        >
          <img src="/images/avatar.png" alt="alt" className="w-14 h-10" />
        </button>
        <div className="flex flex-col justify-start item-center">
          <p className="m-0 text-lg p-0 translate-y-8 overflow-hidden">
            {greeting} {getValues().email.split('@')[0]}
          </p>
          <h1 className="mt-10 text-base text-center cursor-pointer text-blue-900 border-b border-gray-300 pb-4 w-full"></h1>
          <div className="my-4 border-b border-gray-300 pb-4">
            <LiveClock className="flex justify-start px-0 mx-0 mt-2 mb-4 text-xl lg:text-2xl text-back translate-x-0 lg:translate-x-2" />
            <div
              id="dashboardBtn"
              onClick={handleClick}
              className="flex mb-2 justify-start gap-1 lg:gap-4 -translate-x-2 lg:translate-x-0 hover:primary_grad p-2 rounded-lg group cursor-pointer hover:shadow-lg m-auto"
            >
              <MdOutlineSpaceDashboard
                id="dashboardBtn"
                onClick={handleClick}
                className="text-2xl text-gray-200 group-hover:text-white shrink-0"
              />
              <h3
                id="dashboardBtn"
                onClick={handleClick}
                className="text-base text-gray-200 group-hover:text-white font-normal whitespace-nowrap"
              >
                Dashboard
              </h3>
            </div>
            <div className="flex mb-2 justify-start gap-1 lg:gap-4 -translate-x-2 lg:translate-x-0 hover:primary_grad p-2 rounded-lg group cursor-pointer hover:shadow-lg m-auto">
              <CgProfile className="text-2xl text-gray-200 group-hover:text-white shrink-0" />
              <h3 className="text-base text-gray-200 group-hover:text-white font-normal ">
                Profile
              </h3>
            </div>
          </div>
          {/* setting  */}
          <div className=" my-4 border-b border-gray-300 pb-4">
            <div className="flex mb-2 justify-start gap-1 lg:gap-4 -translate-x-2 lg:translate-x-0 hover:primary_grad p-2 rounded-lg group cursor-pointer hover:shadow-lg m-auto">
              <MdOutlineSettings className="text-2xl text-gray-200 group-hover:text-white shrink-0" />
              <h3 className="text-base text-gray-200 group-hover:text-white font-normal ">
                Settings
              </h3>
            </div>
          </div>
          {/* logout */}
          <div className="my-4">
            <Button
              onClick={(e) => {
                logout().then((e) => {
                  setSignedIn(false);
                  router.push('/signin');
                });
              }}
              className="flex my-4 mb-2 justify-start gap-1 lg:gap-4 -translate-x-2 lg:translate-x-0 hover:border-none hover:primary_grad p-2 rounded-lg group cursor-pointer hover:shadow-lg m-auto w-full bg-transparent"
            >
              <MdOutlineLogout className="text-2xl text-gray-200 group-hover:text-white shrink-0" />
              <h3 className="text-base text-gray-200 group-hover:text-white font-normal">
                Logout
              </h3>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
