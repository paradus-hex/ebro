import React, { ReactElement, useEffect, useState } from 'react';
import EditModal from '../components/finalpageModal';
import { Button } from '../components/ui/button';
import { useCreatePageStore } from '../stores/createPageStore';
import { useRouter } from 'next/router';
import { useChat } from 'ai/react';
import {
  saveImagesToCloud,
  setProjects,
  updateProjectDetails,
} from '../lib/firebasedb';
import Layout from '../components/Layout';
import { NextPageWithLayout } from './_app';

interface Params {
  key: string;
  projectName: string;
  intention: string;
}

const FinalPage: NextPageWithLayout = () => {
  const router = useRouter();
  const [text, setText] = useState<string>('Initial text');
  const [cloudSaveDisabled, setCloudSaveDisabled] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // const getImages = useCreatePageStore((state) => state.getImages);
  const {
    getResponse,
    setResponse,
    getValues,
    getImages,
    getImageUrls,
    getImageDesc,
    getImageDescObj,
    // getImageDescObj
  } = useCreatePageStore();
  const [feedback, setFeedback] = useState<string>('');
  const { append, isLoading } = useChat({
    onFinish: (message) => {
      setResponse(message.content.slice(1, -1));
    },
  });
  const [imagesUrls, setImagesUrls] = useState<string[]>(getImageUrls());
  const { params } = router.query;
  const parsedParams: Params = params
    ? JSON.parse(decodeURIComponent(params as string))
    : {};
  const { key, projectName, intention } = parsedParams;
  // console.log(key);

  const handleGoBack = () => {
    router.push(
      `/create?params=${encodeURIComponent(
        JSON.stringify({
          passedProjectName: projectName,
          intention,
          key,
          prev: 'finalpage',
        }),
      )}`,
    );
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setResponse(text);
    setIsEditing(false);
    setCloudSaveDisabled(false);
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

  const handleSaveToCloudClick = async () => {
    if (intention === 'create') {
      await setProjects({
        ...getValues(),
        // imagesDesc: getImageDesc(),
        imagesDesc: getImageDescObj(),
        response: getResponse(),
        projectName,
      }).then((docRef) => {
        console.log(docRef.id);

        saveImagesToCloud('user1', `${projectName}_${docRef.id}`, getImages());
      });
    } else {
      updateProjectDetails(key, {
        ...getValues(),
        imagesDesc: getImageDesc(),
        response: getResponse(),
        projectName,
      });
      saveImagesToCloud('user1', `${projectName}_${key}`, getImages());
    }
    setCloudSaveDisabled(true);
    router.push('/home');
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
  }, [isLoading, getResponse, setText]);

  return (
    <div className="flex flex-col w-full h-screen  justify-center">
      <Button
        className="sticky top-5 w-24 h-12"
        onClick={handleGoBack}
        disabled={isLoading}
      >
        Go back
      </Button>
      <h1 className="font-extrabold mb-10">{projectName || 'Project Name'}</h1>
      <div className="grid grid-cols-12 w-full gap-2 mx-2 h-screen">
        <div className="col-span-8 bg-transparent rounded">
          {isEditing ? (
            <div className="w-full">
              <textarea
                className="w-full flex rounded-md h-[600px] mt-2 p-3 px-5 text-sm text-black outline-1 border border-1 border-gray-400"
                disabled={isLoading}
                value={text}
                onChange={handleChange}
                placeholder="Write here...."
                required
              ></textarea>
              <Button
                disabled={isLoading}
                className="mt-5 w-full"
                onClick={handleSaveClick}
              >
                Save
              </Button>
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="rounded-md h-[600px] mt-2 p-3 px-5 text-sm text-black outline-0 bg-gray-300/50 overflow-auto text-left">
                <p>{text}</p>
              </div>
              <Button
                disabled={isLoading}
                className="mt-5"
                onClick={handleEditClick}
              >
                Edit
              </Button>
            </div>
          )}
        </div>
        <div className="col-span-4 ">
          <div>
            <div className="max-w-screen-2xl mx-auto px-4 py-16 lg:py-24 relative bg-white h-[600px] m-2 bg-white rounded mr-5 flex overflow-auto flex-col space-y-5 items-center justify-center">
              <div className="flex flex-col md:flex-row gap-2">
                {/* <div className="flex flex-1 flex-col">
                  <div className="flex flex-1 flex-col">
                
                    <img
                      className="object-cover h-full"
                      src="https://images.unsplash.com/photo-1664764119004-999a3f80a1b8?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NjY2NDEzMDc&ixlib=rb-4.0.3&q=80"
                      alt=""
                    />
                  </div>
                </div> */}
                <div className="flex flex-1">
                  <div className="grid grid-cols-2 gap-2 overflow-auto">
                    {Object.values(getImageDescObj()).map((image) => (
                      <div className="border-red-700">
                        {/* <!-- img_02 --> */}
                        <img
                          className="object-cover h-full"
                          src={image.url}
                          alt=""
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="h-[600px] m-2 bg-white rounded mr-5 flex overflow-auto flex-col space-y-5 items-center justify-center">
            <ImageUpload projectName="" prev="" intention="" />
          </div> */}
          <Button
            disabled={isLoading || text.length === 0 || cloudSaveDisabled}
            className="mt-3 w-full"
            onClick={handleSaveToCloudClick}
          >
            Save to Cloud
          </Button>
        </div>
      </div>
      <div className="flex flex-row w-full justify-between">
        <Button
          disabled={isLoading}
          className="ml-4 my-2 bg-nav_primary text-white w-[200px] rounded-xl text-sm px-2 h-10 "
          onClick={handleAIButtonClick}
        >
          AI Modification
        </Button>
        <Button
          disabled={isLoading}
          className="mr-4 my-2 bg-nav_primary w-[200px] text-white rounded-xl text-sm px-2 h-10 "
        >
          Export
        </Button>
      </div>
      {isModalOpen && (
        <EditModal
          text={text}
          feedback={feedback}
          isEditing={isEditing}
          isLoading={isLoading}
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

FinalPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default FinalPage;
