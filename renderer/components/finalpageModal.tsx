// EditModal.tsx

import { useRef, useEffect } from 'react';
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
  const modalRef = useRef(null);
  const handleClickOutsideModal = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleCloseModal();
    }
  };
  useEffect(() => {
    if (modalRef.current) {
      document.addEventListener('mousedown', handleClickOutsideModal);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideModal);
    };
  }, []);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-500/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
      <div
        className="bg-white p-8 rounded-2xl shadow-md flex flex-col items-center border border-slate-700 w-5/6 h-4/6"
        ref={modalRef}
      >
        <h2>Edit Content</h2>
        {isEditing ? (
          <div className="w-full">
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
          <div className="flex flex-col w-full">
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
