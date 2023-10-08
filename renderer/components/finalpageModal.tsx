// EditModal.tsx

import { useRef, useEffect } from 'react';
import React from 'react';
import { Button } from './ui/button';

interface EditModalProps {
  text: string;
  feedback: string;
  isEditing: boolean;
  buttonsDisabled: boolean;
  setText: React.Dispatch<React.SetStateAction<string>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleAIPromptChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSaveClick: () => void;
  handleCloseModal: () => void;
  handleEditClick: () => void;
  handleAISubmitClick: () => void;
}

const EditModal: React.FC<EditModalProps> = ({
  text,
  feedback,
  isEditing,
  buttonsDisabled,
  setText,
  setIsEditing,
  handleChange,
  handleAIPromptChange,
  handleSaveClick,
  handleCloseModal,
  handleEditClick,
  handleAISubmitClick,
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
        className="bg-white p-8 rounded shadow-md flex flex-col items-center border border-slate-700 w-5/6"
        ref={modalRef}
      >
        {/* <h2>Edit Content</h2> */}
        <h1 className="font-extrabold">Edit Content</h1>
        <div className="flex flex-col w-full h-full">
          {isEditing ? (
            <div className="w-full flex-1">
              <textarea
                className="w-full flex rounded h-[200px] mt-2 p-3 text-sm text-black outline-1 border border-1 border-gray-400"
                value={text}
                onChange={handleChange}
                placeholder="Write here...."
                required
              ></textarea>
              <Button className="mt-3 w-full" onClick={handleSaveClick}>
                Save
              </Button>
            </div>
          ) : (
            <div className="flex flex-col w-full flex-1">
              <div className="rounded h-[200px] mt-2 p-3 text-sm text-black outline-0 bg-gray-300/50 overflow-auto text-left">
                <p>{text}</p>
              </div>
              <Button className="mt-3" onClick={handleEditClick}>
                Edit
              </Button>
            </div>
          )}
          <div className="w-full flex-1">
            <textarea
              className="w-full flex rounded h-[200px] mt-2 p-3 text-sm text-black outline-1 border border-1 border-gray-400"
              onChange={handleAIPromptChange}
              placeholder="AI Prompt"
              value={feedback}
              required
            ></textarea>
            <Button onClick={handleAISubmitClick} className="mt-2 w-full">
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;

{
  /* <button onClick={handleCloseModal}>Close</button> */
}
