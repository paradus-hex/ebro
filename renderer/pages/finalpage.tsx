import React, { useState } from 'react';

type Props = {};

const FinalPage = (props: Props) => {
  const [text, setText] = useState<string>('Initial text');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <div className="flex flex-col w-full h-screen  justify-between">
      <div>Project Name</div>
      <div className="grid grid-cols-12 w-full gap-2 mx-2 h-3/5">
        <div className="col-span-8 bg-transparent rounded-lg">
          {isEditing ? (
            <div className="">
              <textarea
                className="w-full flex rounded-lg h-[200px] mt-2 p-3 text-sm text-black outline-1 border border-1 border-gray-400"
                value={text}
                onChange={handleChange}
                placeholder="Write here...."
                required
              ></textarea>
              <button onClick={handleSaveClick}>Save</button>
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="rounded-lg h-[200px] mt-2 p-3 text-sm text-black outline-0 bg-white/50 overflow-auto text-left">
                <p>{text}</p>
              </div>
              <button onClick={handleEditClick}>Edit</button>
            </div>
          )}
        </div>
        <div className="col-span-4 bg-white rounded-lg">Image</div>
      </div>
      <div className="flex flex-row justify-between bg-white h-20 gap-10 items-center">
        <button className="ml-4 bg-slate-700 text-white rounded-xl text-sm px-2 h-10 flex-grow">
          AI Modification
        </button>
        <button className="mr-4 bg-slate-700 text-white rounded-xl text-sm px-2 h-10 flex-grow">
          Export
        </button>
      </div>
    </div>
  );
};

export default FinalPage;
