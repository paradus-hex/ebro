import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import '@splidejs/react-splide/css';
import { Pagination } from 'swiper/modules';
import { useCreatePageStore } from '../stores/createPageStore';
import {
  getImageDescFromCloud,
  getImageUrlsFromCloud,
} from '../lib/firebasedb';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import React from 'react';
import { set } from 'zod';
interface Params {
  key: string;
  projectName: string;
  intention: string;
  prev: string;
  passedProjectName: string;
}
const ImageUpload = () =>
  //   {
  //   projectName,
  //   prev,
  //   intention,
  //   key,
  // }: {
  //   projectName: string;
  //   prev: string;
  //   intention: string;
  //   key: string;
  // }
  {
    const [selectedImages, setSelectedImages] = useState<string[]>([]);

    const [getImageDescObjState, setImageDescObjState] = useState<any>({});
    const [getSwiperImageDescObjState, setSwiperImageDescObjState] =
      useState<any>({});
    const [imageKey, setKey] = useState<string>('0');
    const swiperRef = React.useRef(null);
    const inputElement = useRef(null);
    const router = useRouter();

    const {
      getImageUrls,
      setImageUrls,
      getImages,
      getImageDesc,
      setImageDesc,
      delImageDesc,
      setImages,
      delImageUrls,
      getProjectKey,
      getImageDescObj,
      setImageDescObj,
      delImageDescObj,
      getSwiperImageDescObj,
      setSwiperImageDescObj,
      delSwiperImageDescObj,
    } = useCreatePageStore();

    const loadImages = async (
      key: string,
      passedProjectName: string,
      intention: string,
      prev: string,
    ) => {
      if (prev === 'home' && intention === 'update') {
        await getImageUrlsFromCloud(
          `images/user1/${passedProjectName}_${getProjectKey()}`,
        ).then((urls) => {
          setSelectedImages(urls);
          setImageUrls(urls);
        });
      } else {
        if (intention === 'create' && prev === 'home') {
          setImageUrls([]);
          delImageDescObj();
          delSwiperImageDescObj();
        } else {
          const imageUrls = await getImageUrls();
          setSelectedImages(imageUrls);
        }
      }

      if (intention == 'update' && (prev === 'home' || prev === 'finalpage')) {
        console.log('inside update');
        getImageDescFromCloud(getProjectKey()).then((desc) => {
          setImageDesc(desc);
          inputElement.current.value = getImageDesc()[0].desc;
        });
      }
    };

    const deleteImageFromState = (index: number) => {
      const newImages = [...selectedImages];
      newImages.splice(index, 1);
      if (swiperRef.current) {
        swiperRef.current.update();
      }

      if (
        swiperRef.current.activeIndex != 0 &&
        swiperRef.current.activeIndex != selectedImages.length - 1
      ) {
        inputElement.current.value =
          getImageDesc()[swiperRef.current.activeIndex + 1].desc;
      } else if (swiperRef.current.activeIndex != 0) {
        inputElement.current.value =
          getImageDesc()[swiperRef.current.activeIndex - 1].desc;
      } else if (selectedImages.length > 1) {
        inputElement.current.value =
          getImageDesc()[swiperRef.current.activeIndex + 1].desc;
      }

      delImageDesc(index);
      setSelectedImages(newImages);
      setImageUrls(newImages);
    };
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // e.target.files.map()

      const files = Array.from(e.target.files);
      setImages(getImages().concat(files));
      if (files.length > 0) {
        const imageUrls = files.map((file) => URL.createObjectURL(file));
        imageUrls.forEach((url, index) => {
          setImageDescObj(url, '');
          setSwiperImageDescObj(index.toString(), url);
        });
        setSelectedImages([...selectedImages, ...imageUrls]);
        setImageUrls([...selectedImages, ...imageUrls]);
        setImageDesc([
          ...getImageDesc(),
          ...Array.from({ length: files.length }, (_, index) => ({
            desc: '',
          })),
        ]);
        setImageDescObjState(getImageDescObj());
        setSwiperImageDescObjState(getSwiperImageDescObj());
        // getImageDescObj();
      }
    };

    useEffect(() => {
      const { params } = router.query;
      const parsedParams: Params = params
        ? JSON.parse(decodeURIComponent(params as string))
        : {};
      const { key, passedProjectName, intention, prev } = parsedParams;
      loadImages(key, passedProjectName, intention, prev);
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
                // setCurrentImageIndex(swiper.activeIndex);

                console.log(getImageDescObj());
                setKey(swiper.activeIndex.toString());
                inputElement.current.value =
                  getImageDescObj()[
                    getSwiperImageDescObj()[swiper.activeIndex.toString()]
                  ];
                // getImageDesc()[swiper.activeIndex].desc;

                console.log(swiper.activeIndex);
                console.log(
                  'This should be the url',
                  getSwiperImageDescObjState,
                );
              }}
            >
              {Object.keys(getImageDescObj()).map((image, index) => (
                <SwiperSlide key={image as string}>
                  <div className="relative w-[320px] h-[200px]">
                    <button
                      onClick={(e) => {
                        delImageUrls(index);
                        deleteImageFromState(index);
                      }}
                      className="absolute top-2 text-center right-2 bg-red-800 hover:bg-red-500 text-white hover:scale-105 text-sm h-[20px] w-[20px] "
                    >
                      x
                    </button>
                    <img
                      src={image as string}
                      alt="Preview"
                      className="object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <input
              type="text"
              className="mt-8"
              id="imageDesc"
              ref={inputElement}
              onChange={(e) => {
                const newImageDesc = [...getImageDesc()];
                getSwiperImageDescObjState[imageKey.toString()]
                  ? setImageDescObj(
                      getSwiperImageDescObjState[imageKey.toString()],
                      e.target.value,
                    )
                  : ' ';
                console.log(getImageDescObj());

                // newImageDesc[currentImageIndex] = { desc: e.target.value };
                // setImageDesc(newImageDesc);
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
                  setSwiperImageDescObjState({});
                  setImageDescObjState({});
                  delSwiperImageDescObj();
                  delImageDescObj();
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
