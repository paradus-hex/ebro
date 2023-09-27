import React from 'react';
import Head from 'next/head';
import MyProjectSlider from '../components/myProjectSlider';
import ImageUpload from '../components/imageUpload';
import MyProjectSlider2 from '../components/myProjectSlider2';
import Search from '../components/search';

function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>Nor SAAS</title>
      </Head>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="mt-10 flex flex-row ">
          <Search />
          <div>
            <div className="bg-white w-full p-4 rounded-md">
              <div className="flex flex-row justify-between w-[250px]  bg-white">
                <p className="text-sm font-semibold">Your storage</p>
                <p className="text-sm font-semibold">25% left</p>
              </div>
              <div className="text-left text-sm font-semibold pt-5">
                <p>75 GB of 100 GB is being used</p>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-[80%]">
          <MyProjectSlider />
          {/* <MyProjectSlider2 /> */}
        </div>
      </div>
      <div className="w-full flex justify-center">
        <div className="max-w-[80%]">
          <ImageUpload />
        </div>
      </div>
      {/* <ImageUpload /> */}
    </React.Fragment>
  );
}

export default Home;
