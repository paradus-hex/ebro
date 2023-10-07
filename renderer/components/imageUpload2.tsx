import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import '@splidejs/react-splide/css';
import { Pagination, Navigation } from 'swiper/modules';
import { useImageStore } from '../stores/imageStore';
import { getImageDescFromCloud } from '../lib/firebasedb';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import React from 'react';

interface Params {
  projectID: string;
  projectName: string;
  intention: string;
  prev: string;
  passedProjectName: string;
}

const ImageUpload = () => {
  const swiperRef = React.useRef(null);
  const inputElement = useRef(null);
  const router = useRouter();

  const {
    setImageArray,
    getImageArray,
    pushImageArray,
    getImagesToDel,
    onAddDesc,
    onDelete,
  } = useImageStore();

  const loadImages = async (
    projectID: string,
    passedProjectName: string,
    intention: string,
    prev: string,
  ) => {
    if (prev === 'home' && intention === 'update') {
      const imageDesc = await getImageDescFromCloud(projectID);
      setImageArray(imageDesc);
    } else {
      setImageArray(getImageArray());
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const url = URL.createObjectURL(file);
        pushImageArray({ url, desc: '', file });
      }
    }
  };

  const handleImageMoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const url = URL.createObjectURL(file);
        pushImageArray({ url, desc: '', file });
      }
    }
  };

  useEffect(() => {
    const { params } = router.query;
    const parsedParams: Params = params
      ? JSON.parse(decodeURIComponent(params as string))
      : {};
    const { projectID, passedProjectName, intention, prev } = parsedParams;
    loadImages(projectID, passedProjectName, intention, prev);
  }, []);
  return (
    <div className="mx-5 mt-7 max-w-xs">
      {getImageArray()?.length === 0 ? (
        <div className="flex flex-col items-center w-[320px] h-[360px] cursor-pointer">
          <form>
            <label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
              <div>
                <Image
                  className="cursor-pointer"
                  src="/images/upload_image.svg"
                  height={100}
                  width={100}
                  alt="upload image"
                />
              </div>
            </label>
            <div>Upload Image</div>
          </form>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full overflow-visible image-uploader">
          <Swiper
            slidesPerView={1}
            centeredSlides={true}
            spaceBetween={10}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
            onSlideChange={(swiper) => {
              inputElement.current.value =
                getImageArray()[swiper.activeIndex].desc;
            }}
          >
            {getImageArray()?.map((image, index) => (
              <SwiperSlide key={image.url}>
                <div className="relative w-[320px] h-[200px]">
                  <button
                    onClick={(e) => {
                      onDelete(swiperRef.current.activeIndex);
                    }}
                    className="absolute top-2 text-center right-2 bg-red-800 hover:bg-red-500 text-white hover:scale-105 text-sm h-[20px] w-[20px] "
                  >
                    x
                  </button>
                  <img src={image.url} alt="Preview" className="object-cover" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <input
            type="text"
            className="mt-8"
            id="imageDesc"
            ref={inputElement}
            value={getImageArray()[swiperRef.current?.activeIndex]?.desc}
            onChange={(e) => {
              onAddDesc(swiperRef.current.activeIndex, e.target.value);
            }}
          />
          <div>
            <label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageMoreChange}
              />
              <div className="flex gap-2">
                <Image
                  src="/images/upload_image.svg"
                  height={22}
                  width={22}
                  alt="upload image"
                />
                <span className="text-lg"> Upload More</span>
              </div>
            </label>
            <button
              onClick={() => {
                setImageArray([]);
              }}
            >
              <div className="flex gap-2">
                <Image
                  src="/images/reset.svg"
                  height={22}
                  width={22}
                  alt="upload image"
                />
                <span className="text-lg"> Reset</span>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
