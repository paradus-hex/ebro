import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import ProjectSlider from '../components/ProjectSlider';
import { Button } from '../components/ui/button';
import { useRouter } from 'next/router';
import Search from '../components/search';
import Layout from '../components/Layout';
import { useImageStore } from '../stores/imageStore';
import useStore from '../stores/useStore';

function Home() {
  const { setImageArray, setImagesToDel } = useImageStore();
  const router = useRouter();
  const [projectName, setProjectName] = React.useState<string>('');
  const handleProjectNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
  };
  const handleCreateClick = () => {
    router.push(
      `/create?params=${encodeURIComponent(
        JSON.stringify({
          passedProjectName: projectName,
          intention: 'create',
          prev: 'home',
        }),
      )}`,
    );
  };
  useEffect(() => {
    setImageArray([]);
    setImagesToDel([]);
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
          className="w-[300px] bg-white rounded-md shadow p-2 input"
        />

        <Button
          className="mt-10 text-xl rounded-md px-8 py-6 tracking-wider w-[300px]"
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
