import React, { useEffect, useState } from 'react';
import EditModal from '../components/finalpageModal';
import { Button } from '../components/ui/button';
import { useCreatePageStore } from '../stores/createPageStore';
import { useRouter } from 'next/router';
import { useChat } from 'ai/react';

type Props = {};

const FinalPage = (props: Props) => {
  const router = useRouter();
  const [text, setText] = useState<string>('Initial text');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { getResponse, setResponse } = useCreatePageStore();
  const [feedback, setFeedback] = useState<string>('');
  const { append, isLoading, setMessages } = useChat({
    onFinish: (message) => {
      setResponse(message.content.slice(1, -1));
    },
  });

  const handleGoBack = () => {
    router.push('/create');
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setResponse(text);
    setIsEditing(false);
  };

  const handleAISubmitClick = () => {
    append({
      role: 'user',
      content: JSON.stringify(text + '$$$' + feedback),
    });
    handleCloseModal();
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleAIPromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(e.target.value);
  };

  const handleAIButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    const data = getResponse();
    setText(data);
  }, [setResponse, handleAISubmitClick]);

  return (
    <div className="flex flex-col w-full h-screen  justify-center">
      <Button
        className="sticky text-xl top-0 left-2 w-28 h-12"
        onClick={handleGoBack}
      >
        Go back
      </Button>
      <h1 className="font-extrabold mb-10">Project Name</h1>
      <div className="grid grid-cols-12 w-full gap-2 mx-2 h-3/5">
        <div className="col-span-8 bg-transparent rounded">
          {isEditing ? (
            <div className="w-full">
              <textarea
                className="w-full flex rounded-md h-[500px] mt-2 p-3 px-5 text-sm text-black outline-1 border border-1 border-gray-400"
                value={text}
                onChange={handleChange}
                placeholder="Write here...."
                required
              ></textarea>
              <Button className="mt-5 w-full" onClick={handleSaveClick}>
                Save
              </Button>
              {/* <button onClick={handleSaveClick}>Save</button> */}
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="rounded-md h-[500px] mt-2 p-3 px-5 text-sm text-black outline-0 bg-gray-300/50 overflow-auto text-left">
                <p>{text}</p>
              </div>
              <Button className="mt-5" onClick={handleEditClick}>
                Edit
              </Button>
            </div>
          )}
        </div>
        <div className="col-span-4 h-[500px] m-2 bg-white rounded mr-5">
          Image
        </div>
      </div>
      <div className="  flex flex-row w-full justify-between items-center">
        <Button
          className="ml-4 bg-nav_primary text-white w-[200px] rounded-xl text-sm px-2 h-10 "
          onClick={handleAIButtonClick}
        >
          AI Modification
        </Button>
        <Button className="mr-4 bg-nav_primary w-[200px] text-white rounded-xl text-sm px-2 h-10 ">
          Export
        </Button>
      </div>

      {/* <div className="flex flex-row justify-between bg-white h-20 gap-10 items-center">
        <button
          className="ml-4 bg-nav_primary text-white rounded-xl text-sm px-2 h-10 flex-grow"
          onClick={handleAIButtonClick}
        >
          AI Modification
        </button>
        <button className="mr-4 bg-nav_primary text-white rounded-xl text-sm px-2 h-10 flex-grow">
          Export
        </button>
      </div> */}
      {isModalOpen && (
        <EditModal
          text={text}
          feedback={feedback}
          isEditing={isEditing}
          setText={setText}
          setIsEditing={setIsEditing}
          handleChange={handleChange}
          handleAIPromptChange={handleAIPromptChange}
          handleSaveClick={handleSaveClick}
          handleCloseModal={handleCloseModal}
          handleEditClick={handleEditClick}
          handleAISubmitClick={handleAISubmitClick}
        />
      )}
    </div>
  );
};

export default FinalPage;
