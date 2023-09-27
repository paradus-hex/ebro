import React from 'react';
import Head from 'next/head';
import MyProjectSlider from '../components/myProjectSlider';
import ImageUpload from '../components/imageUpload';
import MyProjectSlider2 from '../components/myProjectSlider2';

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
    </React.Fragment>
  );
}

export default Home;
