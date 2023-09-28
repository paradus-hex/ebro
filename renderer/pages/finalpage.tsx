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
    <div className="flex flex-col w-full h-screen">
      <div>Project Name</div>
      <div className="grid grid-cols-12 w-full gap-2 mx-2 mt-8 h-3/5">
        <div className="col-span-8 bg-white rounded-lg">
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
            <div className="">
              <p className="w-full flex rounded-lg h-[200px] mt-2 p-3 text-sm text-gray-500 outline-0">
                {text}
              </p>
              <button onClick={handleEditClick}>Edit</button>
            </div>
          )}
        </div>
        <div className="col-span-4 bg-white">Image</div>
      </div>
    </div>
  );
};

export default FinalPage;
