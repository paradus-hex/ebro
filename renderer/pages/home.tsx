import React from 'react';
import Head from 'next/head';
import MyProjectSlider from '../components/myProjectSlider';
import ImageUpload from '../components/imageUpload';
import MyProjectSlider2 from '../components/myProjectSlider2';
import { Button } from '../components/ui/button';
import { useRouter } from 'next/router';

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
      <div className="w-full flex justify-center">
        <div className="max-w-[80%]">
          <MyProjectSlider />
          {/* <MyProjectSlider2 /> */}
        </div>
      </div>
      <Button className="w-[90px] h-[50px]" onClick={handleCreateClick}>
        Create
      </Button>
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
