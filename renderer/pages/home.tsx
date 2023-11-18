import React, { ReactElement, useEffect, useState } from 'react';
import Head from 'next/head';
import ProjectSlider from '../components/ProjectSlider';
import { Button } from '../components/ui/button';
import { useRouter } from 'next/router';
import Search from '../components/search';
import Layout from '../components/Layout';
import { useImageStore } from '../stores/imageStore';
import useStore from '../stores/useStore';
import { useSignInPageStore } from '../stores/signInPageStore';
import { useCreatePageStore } from '../stores/createPageStore';
import { set } from 'zod';

function Home() {
  const { setImageArray, setImagesToDel } = useImageStore();
  const {
    setProjectId,
    setUserId,
    setIntentions,
    setPrev,
    projectName,
    setMapLocation,
    setProjectName,
    setResponse,
  } = useCreatePageStore();
  const [message, setMessage] = React.useState('No message found');
  const [imageSrc, setImageSrc] = useState('');
  const [file, setFile] = React.useState<File | null>(null);

  const { getValues, getUser_id } = useSignInPageStore();
  const router = useRouter();
  const handleProjectNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
  };
  React.useEffect(() => {
    window.ipc.on('retrieve', (message: string) => {
      // const base64String = btoa(String.fromCharCode(...new Uint8Array(message)));
      setMessage(message);
    });
    window.ipc.on('message', (message: string) => {
      setMessage(message);
    });
  }, []);
  const handleCreateClick = () => {
    setIntentions('create');
    setProjectId('');
    setPrev('home');
    setUserId(`${getValues().email}_${getUser_id()}`);
    router.push(
      `/create?params=${encodeURIComponent(
        JSON.stringify({
          projectName: projectName,
          intention: 'create',
          prev: 'home',
          userID: `${getValues().email}_${getUser_id()}`,
          test: 'test',
        }),
      )}`,
    );
  };
  useEffect(() => {
    setResponse('');
    setImageArray([]);
    setImagesToDel([]);
    setMapLocation({ lat: 60.472, lng: 8.4689 });
    window.ipc.on('save', (message: string) => {
      console.log(message);
    });
    window.ipc.on('retrieve', (message: string) => {
      setImageSrc(`data:image/jpeg;base64,${message}`);
    });
  }, []);
  return (
    <React.Fragment>
      <Head>
        <title>Ebro App</title>
      </Head>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="mt-10 flex flex-row justify-between w-[80%]">
          <Search />
          <div>
            <div className="bg-white w-full p-4 rounded-lg shadow-md shadow-gray-300">
              <div className="flex flex-row justify-between w-[250px]  bg-white ">
                <p className="text-sm font-semibold">Your storage</p>
                <p className="text-sm font-bold text_grad_1">25% left</p>
              </div>
              <div className="text-left text-sm font-semibold pt-5">
                <p>75 GB of 100 GB is being used</p>
              </div>
              {/* <button onClick={()=>window.ipc.send('message','hoise ki?')}>send</button> */}
              <input type="file" onChange={(e) => setFile(e.target.files[0])} />
              <div>
                <Button
                  onClick={() => {
                    window.ipc.send('save', file.path);
                  }}
                >
                  Test IPC
                </Button>
                <Button
                  onClick={() =>
                    window.ipc.send(
                      'retrieve',
                      `D://Javascript/test-app/images/test2/1700065754526.jpg`,
                    )
                  }
                >
                  test render
                </Button>
                <img src={imageSrc} alt="From Server" />
                {/* <img src={`../../images/test2/1700065830898.jpg`} alt="From Server" />; */}
                {/* <p>{message}</p> */}
                {/* <p>{imageSrc}</p> */}
              </div>
            </div>
          </div>
        </div>
        <div className="w-[80%]">
          <ProjectSlider />
        </div>
      </div>
      <div className="w-full  flex flex-col justify-center items-center space-y-10 mt-16 min-h-[300px]">
        <h1 className="font-extrabold">Lets Get To Work!</h1>

        <input
          type="text"
          placeholder="Project Name"
          onChange={handleProjectNameChange}
          className="w-[300px] bg-white rounded-md shadow p-2 input border focus:border focus:outline-[#06367a]"
        />

        <Button
          className="mt-10 text-xl rounded-md px-8 py-6 tracking-wider w-[300px] primary_grad shadow-lg shadow-gray-500"
          onClick={handleCreateClick}
          disabled={projectName.length === 0}
        >
          Create New
        </Button>
      </div>
    </React.Fragment>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
