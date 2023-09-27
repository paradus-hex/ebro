import React from 'react';
import Head from 'next/head';
import MyProjectSlider from '../components/ui/myProjectSlider';
import ImageUpload from '../components/imageUpload';

function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>Nor SAAS</title>
      </Head>
      <div className="w-full flex justify-center">
        <div className="max-w-[80%]">
          <MyProjectSlider />
        </div>
      </div>
      {/* <ImageUpload /> */}
    </React.Fragment>
  );
}

export default Home;
