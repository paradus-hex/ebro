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
      <div className="py-8 px-6 h-screen border border-r-2 border-nav_color nav_bg z-20 fixed top-0 left-0 w-full peer-focus:left-0 peer:transition duration-300">
        <div className="flex flex-col justify-start item-center">
          <h1 className="text-base text-center cursor-pointer text-blue-900 border-b border-nav_color pb-4 w-full"></h1>
          <div className=" my-4 border-b border-gray-500 pb-4">
            <div
              id="dashboardBtn"
              onClick={handleClick}
              className="flex mb-2 justify-start items-center gap-4 pl-5 hover:primary_grad p-2 rounded-lg group cursor-pointer hover:shadow-lg m-auto"
            >
              <MdOutlineSpaceDashboard
                id="dashboardBtn"
                onClick={handleClick}
                className="text-2xl text-gray-200 group-hover:text-white "
              />
              <h3
                id="dashboardBtn"
                onClick={handleClick}
                className="text-base text-gray-200 group-hover:text-white font-normal "
              >
                Dashboard
              </h3>
            </div>
            <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:primary_grad p-2 rounded-lg group cursor-pointer hover:shadow-lg m-auto">
              <CgProfile className="text-2xl text-gray-200 group-hover:text-white " />
              <h3 className="text-base text-gray-200 group-hover:text-white font-normal ">
                Profile
              </h3>
            </div>
            <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:primary_grad p-2 rounded-lg group cursor-pointer hover:shadow-lg m-auto">
              <FaRegComments className="text-2xl text-gray-200 group-hover:text-white " />
              <h3 className="text-base text-gray-200 group-hover:text-white font-normal ">
                Comments
              </h3>
            </div>
            <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:primary_grad p-2 rounded-lg group cursor-pointer hover:shadow-lg m-auto">
              <MdOutlineAnalytics className="text-2xl text-gray-200 group-hover:text-white " />
              <h3 className="text-base text-gray-200 group-hover:text-white font-normal ">
                Analytics
              </h3>
            </div>
            <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:primary_grad p-2 rounded-lg group cursor-pointer hover:shadow-lg m-auto">
              <BiMessageSquareDots className="text-2xl text-gray-200 group-hover:text-white " />
              <h3 className="text-base text-gray-200 group-hover:text-white font-normal ">
                Messages
              </h3>
            </div>
          </div>
          {/* setting  */}
          <div className=" my-4 border-b border-gray-500 pb-4">
            <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:primary_grad p-2 rounded-lg group cursor-pointer hover:shadow-lg m-auto">
              <MdOutlineSettings className="text-2xl text-gray-200 group-hover:text-white " />
              <h3 className="text-base text-gray-200 group-hover:text-white font-normal ">
                Settings
              </h3>
            </div>
            <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:primary_grad p-2 rounded-lg group cursor-pointer hover:shadow-lg m-auto">
              <MdOutlineMoreHoriz className="text-2xl text-gray-200 group-hover:text-white " />
              <h3 className="text-base text-gray-200 group-hover:text-white font-normal ">
                More
              </h3>
            </div>
          </div>
          {/* logout */}
          <div className=" my-4">
            <div className="flex mb-2 justify-start items-center gap-4 pl-5 border border-gray-500  hover:primary_grad p-2 rounded-lg group cursor-pointer hover:shadow-lg m-auto">
              <MdOutlineLogout className="text-2xl text-gray-200 group-hover:text-white " />
              <h3 className="text-base text-gray-200 group-hover:text-white font-normal ">
                Logout
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
