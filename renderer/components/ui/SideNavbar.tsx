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

export default function SideNavbar({ open }) {
  return (
    <div
      className={`fixed inset-y-0 left-0 w-1/6 text-white transition-transform duration-300 transform ${
        open ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="py-8 px-6 h-screen bg-back z-20 fixed top-0 left-0 w-60 peer-focus:left-0 peer:transition duration-300">
        <div className="flex flex-col justify-start item-center">
          <h1 className="text-base text-center cursor-pointer font-bold text-blue-900 border-b border-gray-100 pb-4 w-full"></h1>
          <div className=" my-4 border-b border-gray-100 pb-4">
            <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
              <MdOutlineSpaceDashboard className="text-2xl text-gray-600 group-hover:text-white " />
              <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                Dashboard
              </h3>
            </div>
            <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
              <CgProfile className="text-2xl text-gray-600 group-hover:text-white " />
              <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                Profile
              </h3>
            </div>
            <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
              <FaRegComments className="text-2xl text-gray-600 group-hover:text-white " />
              <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                Comments
              </h3>
            </div>
            <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
              <MdOutlineAnalytics className="text-2xl text-gray-600 group-hover:text-white " />
              <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                Analytics
              </h3>
            </div>
            <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
              <BiMessageSquareDots className="text-2xl text-gray-600 group-hover:text-white " />
              <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                Messages
              </h3>
            </div>
          </div>
          {/* setting  */}
          <div className=" my-4 border-b border-gray-100 pb-4">
            <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
              <MdOutlineSettings className="text-2xl text-gray-600 group-hover:text-white " />
              <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                Settings
              </h3>
            </div>
            <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
              <MdOutlineMoreHoriz className="text-2xl text-gray-600 group-hover:text-white " />
              <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                More
              </h3>
            </div>
          </div>
          {/* logout */}
          <div className=" my-4">
            <div className="flex mb-2 justify-start items-center gap-4 pl-5 border border-gray-200  hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
              <MdOutlineLogout className="text-2xl text-gray-600 group-hover:text-white " />
              <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                Logout
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
