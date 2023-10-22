import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import {
  deleteImagesFromCloud,
  saveImagesToCloud,
  setImagesDescToCloud,
  setProjects,
  updateProjectDetails,
} from '../lib/firebasedb';
import { useRouter } from 'next/router';
import { useCreatePageStore } from '../stores/createPageStore';
import { useImageStore } from '../stores/imageStore';
import EditModal from './finalpageModal';

export default function FinalModal() {
  const router = useRouter();
  const [cloudSaveDisabled, setCloudSaveDisabled] = useState<boolean>(false);
  const [editDisabled, setEditDisabled] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [buttonsDisabled, setButtonsDisabled] = useState<boolean>(false);
  const {
    getResponse,
    setResponse,
    getValues,
    getNote,
    projectId,
    projectName,
    intention,
    userId,
  } = useCreatePageStore();
  const { getImageArray, getImagesToDel } = useImageStore();
  const [feedback, setFeedback] = useState<string>('');
  const [text, setText] = useState<string>(getResponse());
  // const { append, isLoading } = useChat({
  //   onFinish: (message) => {
  //     setResponse(message.content.slice(1, -1));
  //   },
  // });
  const { params } = router.query;
  // const parsedParams: Params = params
  //   ? JSON.parse(decodeURIComponent(params as string))
  //   : {};
  // const { projectId, projectName, intention, userId } = parsedParams;
  // const { projectId, projectName, intention, userId } = {
  //   projectId: 'asdf',
  //   projectName: 'Asdf',
  //   intention: 'asdf',
  //   userId: 'Asdfsd',
  // };
  // const handleGoBack = () => {
  //   router.push(
  //     `/create?params=${encodeURIComponent(
  //       JSON.stringify({
  //         passedProjectName: projectName,
  //         intention,
  //         projectId,
  //         userId,
  //         prev: 'finalpage',
  //       }),
  //     )}`,
  //   );
  // };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setResponse(text);
    setIsEditing(false);
    setCloudSaveDisabled(false);
  };

  const handleAISubmitClick = async () => {
    // append({
    //   role: 'user',
    //   content: JSON.stringify(text + '$$$' + feedback),
    // });
    handleCloseModal();
    setButtonsDisabled(true);
    // setText(
    //   await chat(
    //     JSON.stringify(
    //       text +
    //         '$$$' +
    //         feedback +
    //         '.\n Keep every other information as it is.',
    //     ),
    //   ),
    // );
    fetch('https://cyan-important-rattlesnake.cyclic.app', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prev: text,
        feedback: `${feedback}. Keep every other information as it is.`,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log(response);
        return response.json();
      })
      .then((data) => {
        setText(data.message);
      })
      .catch((error) => {
        console.error('API error:', error);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleAIPromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(e.target.value);
  };

  const handleSaveToCloudClick = async () => {
    setCloudSaveDisabled(true);
    setEditDisabled(true);
    const imagesDesc = getImageArray().map(({ url, desc }) => ({ url, desc }));
    const uploadedFiles = getImageArray()
      .map(({ file }) => file)
      .filter((file) => file !== undefined);

    if (intention === 'create') {
      await setProjects({
        ...getValues(),
        imagesDesc,
        response: getResponse(),
        projectName,
        note: getNote(),
      })
        .then(async (docRef) => {
          const downloadUrls = await saveImagesToCloud(
            userId,
            `${projectName}_${docRef.id}`,
            uploadedFiles,
          );
          return { downloadUrls, docRef };
        })
        .then(({ downloadUrls, docRef }) => {
          setImagesDescToCloud(docRef.id, imagesDesc, downloadUrls);
        });
    } else {
      updateProjectDetails(projectId, {
        ...getValues(),
        imagesDesc,
        response: getResponse(),
        projectName,
        note: getNote(),
      });
      saveImagesToCloud(
        userId,
        `${projectName}_${projectId}`,
        uploadedFiles,
      ).then(async (downloadUrls) => {
        deleteImagesFromCloud(getImagesToDel().map((image) => image.url));
        setImagesDescToCloud(projectId, imagesDesc, downloadUrls);
        console.log('done uploading image to cloud');
      });
    }
    router.push('/home');
  };

  const handleAIButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    setResponse(text);
    setButtonsDisabled(false);
  }, [text]);

  return (
    <div className="flex flex-col w-full max-h-[700px] justify-center  overflow-hidden">
      {/* <Button
        className="sticky top-5 w-24 h-12"
        onClick={handleGoBack}
        disabled={editDisabled || isEditing || buttonsDisabled}
      >
        Go back
      </Button> */}
      {<div> `${projectId}`</div>}
      <h1 className="font-extrabold mt-4 ml-3 mb-4 ">
        {projectName || 'Project Name'}
      </h1>
      <div className="grid grid-cols-12 w-full   h-screen">
        <div className="col-span-8 bg-transparent overflow-hidden rounded  max-h-[600px] flex justify-center items-start ">
          {isEditing ? (
            <div className="w-full relative">
              <Button
                className="absolute top-3 right-0 px-0 w-[80px] h-[30px] text-black bg-transparent hover:bg-transparent "
                onClick={handleSaveClick}
              >
                <div className="flex flex-row gap-1 items-center text-[#06367a] font-bold">
                  <img src="/images/done.svg" alt="edit" />
                  <p className="tracking-wide">Save</p>
                </div>
              </Button>
              <textarea
                className="w-full flex rounded-md h-[500px] mt-2 p-3 px-5 text-sm text-black outline-1 border border-1 border-gray-400 pt-[40px]"
                value={text}
                onChange={handleChange}
                placeholder="Write here...."
                required
              ></textarea>
            </div>
          ) : (
            <div className="w-full relative">
              <Button
                disabled={editDisabled || buttonsDisabled}
                className="absolute top-3 right-0 px-0 w-[80px] h-[30px] text-black bg-transparent hover:bg-transparent"
                onClick={handleEditClick}
              >
                <div className="flex flex-row gap-1 items-center text-[#06367a] font-bold">
                  <img src="/images/edit.svg" alt="edit" />
                  <p className="tracking-wide">Edit</p>
                </div>
              </Button>
              <div className="w-full flex rounded-md h-[550px] mt-2 p-3 px-5 text-sm text-black outline-0 bg-gray-300/50 overflow-auto text-left pt-[40px]">
                <p>{text}</p>
              </div>
            </div>
          )}
        </div>
        <div className="col-span-4  max-h-[550px] flex justify-center items-center ">
          <div className="max-w-screen-2xl  px-4 py-16 lg:py-24 relative  m-2 rounded mr-5 flex  flex-col space-y-5 items-center justify-center">
            <div className="flex flex-wrap w-full max-h-[550px] gap-2 items-center justify-center overflow-auto">
              {getImageArray().map((image, index) => (
                <div className="border-red-700">
                  <img
                    className="object-cover w-[320px] h-[200px]"
                    src={image.url}
                    key={image.url}
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-12  flex justify-between ">
          <div className="flex flex-row w-full justify-between">
            <Button
              disabled={editDisabled || isEditing || buttonsDisabled}
              className="ml-4 my-2 bg-nav_primary text-white w-[200px] rounded-xl text-sm px-2 h-10  m-auto"
              onClick={handleAIButtonClick}
            >
              AI Modification
            </Button>
            <Button
              disabled={
                text.length === 0 ||
                cloudSaveDisabled ||
                isEditing ||
                buttonsDisabled
              }
              className="mr-4 my-2 bg-nav_primary w-[200px] text-white rounded-xl text-sm px-2 h-10 flex m-auto "
              onClick={handleSaveToCloudClick}
            >
              Save to Cloud
            </Button>
            <Button
              disabled={editDisabled || isEditing || buttonsDisabled}
              className="mr-4 my-2 bg-nav_primary w-[200px] text-white rounded-xl text-sm px-2 h-10  m-auto"
            >
              Export
            </Button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <EditModal
          text={text}
          feedback={feedback}
          isEditing={isEditing}
          buttonsDisabled={buttonsDisabled}
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
}
