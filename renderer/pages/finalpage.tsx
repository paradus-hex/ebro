import React, { ReactElement, useEffect, useState } from 'react';
import EditModal from '../components/finalpageModal';
import { Button } from '../components/ui/button';
import { useCreatePageStore } from '../stores/createPageStore';
import { useRouter } from 'next/router';
import {
  saveImagesToCloud,
  setProjects,
  updateProjectDetails,
  setImagesDescToCloud,
  deleteProjectPhotosFromCloud,
  deleteImagesFromCloud,
} from '../lib/firebasedb';
import Layout from '../components/Layout';
import { NextPageWithLayout } from './_app';
import { useImageStore } from '../stores/imageStore';
interface Params {
  projectID: string;
  userID: string;
  projectName: string;
  intention: string;
}

const FinalPage: NextPageWithLayout = () => {
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
    setProjectId,
    userId,
    setUserId,
    setIntentions,
    setProjectName,
    setPrev,
    mapLocation,
  } = useCreatePageStore();
  const { getImageArray, getImagesToDel } = useImageStore();
  const [feedback, setFeedback] = useState<string>('');
  const [text, setText] = useState<string>(getResponse());

  const { params } = router.query;
  const parsedParams: Params = params
    ? JSON.parse(decodeURIComponent(params as string))
    : {};
  const { projectID, projectName, intention } = parsedParams;
  const handleGoBack = () => {
    setProjectId(projectID);
    setPrev('finalpage');
    setUserId(userId);
    setIntentions(intention as 'create' | 'update' | 'edit' | '');
    setProjectName(projectName);

    router.push(
      `/create?params=${encodeURIComponent(
        JSON.stringify({
          passedProjectName: projectName,
          intention,
          projectID,
          userId,
          prev: 'finalpage',
        }),
      )}`,
    );
  };
  React.useEffect(() => {
    window.ipc.on('retrieve', (message: any) => {
      // setMessage(message);
    });
    window.ipc.on('save2', (message: any) => {
      // setMessage(message);
      console.log('save2', message);
    });
  }, []);
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setResponse(text);
    setIsEditing(false);
    setCloudSaveDisabled(false);
  };

  const handleAISubmitClick = async () => {
    handleCloseModal();
    setButtonsDisabled(true);

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
  const filesystemUpload = () => {
    const uploadedFiles = getImageArray()
      .map(({ file }) => file)
      .filter((file) => file !== undefined)
      .map((el) => el?.path);
    console.log('getImageArray', getImageArray());
    console.log('filesystemUpload', uploadedFiles);
    let folderName = `project_id`;
    try {
      window.ipc.send('save2', [userId, folderName, uploadedFiles]);
    } catch {
      console.log('eroor in ipc error');
    }
    return;
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
        mapLocation,
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
          try {
            let obj = JSON.stringify({
              userId: userId,
              folderName: `${projectName}_project_id}`,
              files: uploadedFiles,
            });
            await window.ipc.send('save2', obj);
          } catch {
            console.log('error');
          }
          return { downloadUrls, docRef };
        })
        .then(({ downloadUrls, docRef }) => {
          setImagesDescToCloud(docRef.id, imagesDesc, downloadUrls);
        });
    } else {
      updateProjectDetails(projectID, {
        ...getValues(),
        mapLocation,
        imagesDesc,
        response: getResponse(),
        projectName,
        note: getNote(),
      });

      const uploadedFilesName = getImageArray()
        .map(({ file }) => file)
        .filter((file) => file !== undefined)
        .map((el) => {
          return {
            path: el?.path,
            name: new Date().getTime().toString() + '.jpg',
          };
        });
      let folderName = `project_id`;
      try {
        window.ipc.send('save2', [userId, folderName, uploadedFilesName]);
      } catch {
        console.log('eroor in ipc error');
      }

      // console.log('res', res);
      saveImagesToCloud(
        userId,
        `${projectName}_${projectID}`,
        uploadedFiles,
      ).then(async (downloadUrls) => {
        deleteImagesFromCloud(getImagesToDel().map((image) => image.url));
        setImagesDescToCloud(projectID, imagesDesc, downloadUrls);
      });
    }
    // router.push('/home');
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
    <div className="flex flex-col w-full h-full ml-2 justify-between">
      <Button
        className="z-20 w-24 h-12 translate-y-16"
        onClick={handleGoBack}
        disabled={editDisabled || isEditing || buttonsDisabled}
      >
        Go back
      </Button>
      <h1 className="font-extrabold mb-10">{projectName || 'Project Name'}</h1>
      <div className="grid grid-cols-12 w-full gap-2 h-full content-start overflow-y-auto">
        <div className="col-span-8 bg-transparent rounded h-full">
          {isEditing ? (
            <div className="w-full relative">
              <Button
                className="absolute top-0 right-0 px-0 w-[80px] h-[30px] text-black bg-transparent hover:bg-transparent "
                onClick={handleSaveClick}
              >
                <div className="flex flex-row gap-1 items-center text-[#06367a] font-bold">
                  <img src="/images/done.svg" alt="edit" />
                  <p className="tracking-wide">Save</p>
                </div>
              </Button>
              <textarea
                className="w-full h-[600px] flex rounded-md p-3 px-5 text-sm text-black outline-1 border border-1 border-gray-400 pt-[40px]"
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
                className="absolute top-0 right-0 px-0 w-[80px] h-[30px] text-black bg-transparent hover:bg-transparent"
                onClick={handleEditClick}
              >
                <div className="flex flex-row gap-1 items-center text-[#06367a] font-bold">
                  <img src="/images/edit.svg" alt="edit" />
                  <p className="tracking-wide">Edit</p>
                </div>
              </Button>
              <div className="w-full flex rounded-md h-[600px] p-3 px-5 text-sm text-black outline-0 bg-gray-300/50 overflow-auto text-left pt-[40px]">
                <p>{text}</p>
              </div>
            </div>
          )}
        </div>
        <div className="col-span-4">
          <div className="mx-auto mr-2 relative max-h-[600px] rounded flex overflow-y-auto flex-col items-center justify-center">
            <div className="flex flex-wrap w-full gap-2 items-center justify-center overflow-auto">
              {getImageArray().map((image) => (
                <div key={image.url} className="border-red-700">
                  <img className="object-cover " src={image.url} alt="" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-12 flex justify-around">
          <Button
            disabled={editDisabled || isEditing || buttonsDisabled}
            className=" bg-nav_primary text-white w-[200px] rounded-xl text-sm px-2 h-10 mb-5"
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
            className=" bg-nav_primary text-white w-[200px] rounded-xl text-sm px-2 h-10 mb-5"
            onClick={() => {
              handleSaveToCloudClick();
              // filesystemUpload();
            }}
          >
            Save to Cloud
          </Button>

          <Button
            // disabled={editDisabled || isEditing || buttonsDisabled}
            disabled
            className=" bg-nav_primary w-[200px] text-white rounded-xl text-sm px-2 h-10 mb-5"
          >
            Export
          </Button>
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
};

FinalPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default FinalPage;
