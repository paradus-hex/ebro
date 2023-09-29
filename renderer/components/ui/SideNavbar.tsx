import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import {
  MdOutlineSpaceDashboard,
  MdOutlineAnalytics,
  MdOutlineIntegrationInstructions,
  MdOutlineMoreHoriz,
  MdOutlineSettings,
  MdOutlineLogout,
} from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { FaRegComments } from 'react-icons/fa';
import { BiMessageSquareDots } from 'react-icons/bi';
import { useRouter } from 'next/router';
import LiveClock from '../LiveClock';

export default function SideNavbar({ open }) {
  const router = useRouter();
  const handleClick = (e) => {
    e.target.id === 'dashboardBtn' && router.push('/home');
  };
  return (
    <div
      className={`fixed inset-y-0 left-0 w-1/6 text-white transition-transform duration-300 transform nav_bg ${
        open ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="py-8 px-6 h-screen border border-r-2 border-nav_color bg-[#06367A] z-20 fixed top-0 left-0 w-full peer-focus:left-0 peer:transition duration-300">
        <div className="flex flex-col justify-start item-center">
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
                Home
              </h3>
            </div>
            <div className="flex mb-2 justify-start gap-1 lg:gap-4 -translate-x-2 lg:translate-x-0 hover:primary_grad p-2 rounded-lg group cursor-pointer hover:shadow-lg m-auto">
              <CgProfile className="text-2xl text-gray-200 group-hover:text-white shrink-0" />
              <h3 className="text-base text-gray-200 group-hover:text-white font-normal ">
                Profile
              </h3>
            </div>
            {/* <div className="flex mb-2 justify-start gap-1 lg:gap-4 -translate-x-2 lg:translate-x-0 hover:primary_grad p-2 rounded-lg group cursor-pointer hover:shadow-lg m-auto">
              <FaRegComments className="text-2xl text-gray-200 group-hover:text-white shrink-0" />
              <h3 className="text-base text-gray-200 group-hover:text-white font-normal ">
                Comments
              </h3>
            </div>
            <div className="flex mb-2 justify-start gap-1 lg:gap-4 -translate-x-2 lg:translate-x-0 hover:primary_grad p-2 rounded-lg group cursor-pointer hover:shadow-lg m-auto">
              <MdOutlineAnalytics className="text-2xl text-gray-200 group-hover:text-white shrink-0" />
              <h3 className="text-base text-gray-200 group-hover:text-white font-normal ">
                Analytics
              </h3>
            </div>
            <div className="flex mb-2 justify-start gap-1 lg:gap-4 -translate-x-2 lg:translate-x-0 hover:primary_grad p-2 rounded-lg group cursor-pointer hover:shadow-lg m-auto">
              <BiMessageSquareDots className="text-2xl text-gray-200 group-hover:text-white shrink-0" />
              <h3 className="text-base text-gray-200 group-hover:text-white font-normal ">
                Messages
              </h3>
            </div> */}
          </div>
          {/* setting  */}
          <div className=" my-4 border-b border-gray-300 pb-4">
            <div className="flex mb-2 justify-start gap-1 lg:gap-4 -translate-x-2 lg:translate-x-0 hover:primary_grad p-2 rounded-lg group cursor-pointer hover:shadow-lg m-auto">
              <MdOutlineSettings className="text-2xl text-gray-200 group-hover:text-white shrink-0" />
              <h3 className="text-base text-gray-200 group-hover:text-white font-normal ">
                Settings
              </h3>
            </div>
            <div className="flex mb-2 justify-start gap-1 lg:gap-4 -translate-x-2 lg:translate-x-0 hover:primary_grad p-2 rounded-lg group cursor-pointer hover:shadow-lg m-auto">
              <MdOutlineMoreHoriz className="text-2xl text-gray-200 group-hover:text-white shrink-0" />
              <h3 className="text-base text-gray-200 group-hover:text-white font-normal ">
                More
              </h3>
            </div>
          </div>
          {/* logout */}
          <div className="my-4">
            <div className="flex my-4 mb-2 justify-start gap-1 lg:gap-4 -translate-x-2 lg:translate-x-0 border border-gray-200 hover:border-none  hover:primary_grad p-2 rounded-lg group cursor-pointer hover:shadow-lg m-auto hover:bg-red-700">
              <MdOutlineLogout className="text-2xl text-gray-200 group-hover:text-white shrink-0" />
              <h3 className="text-base text-gray-200 group-hover:text-white font-normal">
                Logout
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
