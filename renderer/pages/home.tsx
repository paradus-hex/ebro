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
      <div className="w-full flex justify-center items-center flex-col mt-16">
        <div className="max-w-[80%] flex justify-center">
          {/* <Search /> */}
        </div>

        <div className="max-w-[80%] flex justify-center">
          <MyProjectSlider />
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
