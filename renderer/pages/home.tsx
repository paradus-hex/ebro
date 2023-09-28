import React from 'react';
import Head from 'next/head';

import ImageUpload from '../components/ImageUpload';
import ProjectSlider from '../components/ProjectSlider';
import { Button } from '../components/ui/Button';
import { useRouter } from 'next/router';
import Search from '../components/Search';
import Slider from '../components/Slider';

function Home() {
  const router = useRouter();
  const handleCreateClick = () => {
    router.push('/create');
  };
  return (
    <React.Fragment>
      <Head>
        <title>Nor SAAS</title>
      </Head>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="mt-10 flex flex-row ">
          <Search />
          <div>
            <div className="bg-white w-full p-4 rounded-md shadow">
              <div className="flex flex-row justify-between w-[250px]  bg-white ">
                <p className="text-sm font-semibold">Your storage</p>
                <p className="text-sm font-semibold">25% left</p>
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
      <Button
        className="mt-10 w-[90px] h-[50px] text-xl"
        onClick={handleCreateClick}
      >
        Create
      </Button>

      {/* <ImageUpload /> */}
    </React.Fragment>
  );
}

export default Home;
