// EditModal.tsx

import React from 'react';

interface EditModalProps {
  text: string;
  isEditing: boolean;
  setText: React.Dispatch<React.SetStateAction<string>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSaveClick: () => void;
  handleCloseModal: () => void;
  handleEditClick: () => void;
}

const EditModal: React.FC<EditModalProps> = ({
  text,
  isEditing,
  setText,
  setIsEditing,
  handleChange,
  handleSaveClick,
  handleCloseModal,
  handleEditClick,
}) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Content</h2>
        {isEditing ? (
          <div>
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
        <button onClick={handleCloseModal}>Close</button>
      </div>
    </div>
  );
};

export default EditModal;
