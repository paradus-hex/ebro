import { useEffect, useState } from 'react';
import Image from 'next/image';
import '@splidejs/react-splide/css';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { useCreatePageStore } from '../stores/createPageStore';
import { getImageUrlsFromCloud } from '../lib/firebasedb';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import { Pagination } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { get } from 'http';
import { set } from 'zod';
import React from 'react';
// import Splide from '@splidejs/splide';
const ImageUpload = ({
  projectName,
  prev,
  intention,
}: {
  projectName: string;
  prev: string;
  intention: string;
}) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const swiperRef = React.useRef(null);
  const {
    getImageUrls,
    setImageUrls,
    getImages,
    getImageDesc,
    setImageDesc,
    delImageDesc,
    setImages,
    delImageUrls,
  } = useCreatePageStore();

  const loadImages = async () => {
    if (prev === 'home' && intention === 'update') {
      await getImageUrlsFromCloud(`images/${projectName}`).then((urls) => {
        setSelectedImages(urls);
        setImageUrls(urls);
      });
    } else {
      if (intention === 'create' && prev === 'home') setImageUrls([]);
      else {
        const imageUrls = await getImageUrls();
        setSelectedImages(imageUrls);
      }
    }
  };

  console.log(selectedImages);
  const deleteImageFromState = (index: number) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    if (swiperRef.current) {
      swiperRef.current.update();
    }
    console.log(swiperRef.current.activeIndex, 'delete hoche');
    swiperRef.current.activeIndex != 0 &&
    swiperRef.current.activeIndex != selectedImages.length - 1
      ? (document.getElementById('imageDesc').value =
          getImageDesc()[swiperRef.current.activeIndex + 1].desc)
      : swiperRef.current.activeIndex != 0
      ? (document.getElementById('imageDesc').value =
          getImageDesc()[swiperRef.current.activeIndex - 1].desc)
      : selectedImages.length > 1
      ? (document.getElementById('imageDesc').value =
          getImageDesc()[swiperRef.current.activeIndex + 1].desc)
      : ' ';

    delImageDesc(index);
    setSelectedImages(newImages);
    setImageUrls(newImages);
    console.log(getImageDesc());
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files);
    setImages(getImages().concat(files));
    if (files.length > 0) {
      const imageUrls = files.map((file) => URL.createObjectURL(file));
      setSelectedImages([...selectedImages, ...imageUrls]);
      setImageUrls([...selectedImages, ...imageUrls]);
      setImageDesc([
        ...getImageDesc(),
        ...Array.from({ length: files.length }, (_, index) => ({
          desc: '',
        })),
      ]);
    }
  };

  useEffect(() => {
    // if (intention === 'create') {
    //   setImages([]);
    //   setSelectedImages([]);
    //   setImageUrls([]);
    //   setCurrentImageIndex(0);
    //   setImageDesc([]);
    // }
    loadImages();
  }, []);

  return (
    <div className="mx-5 mt-7 max-w-xs">
      {selectedImages.length === 0 ? (
        <div className="flex flex-col items-center h-[295px] cursor-pointer">
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
            modules={[Pagination]}
            className="mySwiper"
            onSlideChange={(swiper) => {
              setCurrentImageIndex(swiper.activeIndex);
              console.log(swiper.activeIndex);
              document.getElementById('imageDesc').value =
                getImageDesc()[swiper.activeIndex].desc;
              console.log(getImageDesc());
              // console.log(swiper.activeIndex);
            }}
          >
            {selectedImages.map((image, index) => (
              <SwiperSlide key={image}>
                <div className=" relative w-[320px] h-[200px]">
                  <button
                    onClick={(e) => {
                      delImageUrls(index);
                      deleteImageFromState(index);
                    }}
                    className="absolute top-2 text-center right-2 bg-red-800 hover:bg-red-500 text-white hover:scale-105 text-sm h-[20px] w-[20px] "
                  >
                    x
                  </button>
                  <img src={image} alt="Preview" className="object-cover" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <input
            type="text"
            className="mt-8"
            id="imageDesc"
            onChange={(e) => {
              const newImageDesc = [...getImageDesc()];
              console.log(currentImageIndex);
              newImageDesc[currentImageIndex] = { desc: e.target.value };
              setImageDesc(newImageDesc);
              console.log(getImageDesc());
            }}
          />
          <div>
            <label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
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
                setSelectedImages([]);
                setImageUrls([]);
                setCurrentImageIndex(0);
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
