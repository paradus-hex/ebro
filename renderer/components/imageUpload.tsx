import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import '@splidejs/react-splide/css';
import { Pagination } from 'swiper/modules';
import { useCreatePageStore } from '../stores/createPageStore';
import {
  getImageDescFromCloud,
  getImageUrlsFromCloud,
  getProjectImageDesc,
  updateProjectImageDesc,
  createProjectImageDesc,
} from '../lib/firebasedb';
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
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [expriment, setExperiment] = useState<{
    id: string;
    data: { url: string; descArr: string }[];
  }>({ id: '', data: [] });

  const [getImageDescObjState, setImageDescObjState] = useState<any>({});
  const [projectIdImageUpload, setProjectIdImageUpload] = useState<string>('');

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
    delIndiSwiperImageDescObj,
    delIndiImageDescObj,
  } = useCreatePageStore();

  const loadImages = async (
    projectID: string,
    passedProjectName: string,
    intention: string,
    prev: string,
  ) => {
    if (prev === 'home' && intention === 'update') {
      // console.log(projectID, passedProjectName, intention, prev);

      await getImageUrlsFromCloud(
        `images/user1/${passedProjectName}_${projectID}`,
      ).then((urls) => {
        console.log('urls', urls);

        const getUrlFileName = (url) => {
          const urlParts = url.split('/');

          const lastPart = urlParts[urlParts.length - 1];
          const fileName = lastPart.split('?')[0];

          let temp = decodeURIComponent(fileName);
          let name = temp.split('/');
          let name1 = name[name.length - 1];

          return name1;
        };

        urls.downloadURLs.forEach((url, index) => {
          setImageDescObj(getUrlFileName(url), {
            desc: index.toString(),
            name: getUrlFileName(url),
            url: url,
          });
          setSwiperImageDescObj(index.toString(), getUrlFileName(url));
        });

        console.log('mapping in progress');

        getImageDescFromCloud(projectID).then((desc) => {
          let keys = Object.keys(desc);
          keys.forEach((element) => {
            console.log('element', element);
            console.log('desc', desc[element]);
            setImageDescObj(element, {
              ...getImageDescObj()[element],
              desc: desc[element].desc,
            });
          });

          console.log('desc', desc);
        });
        console.log('imageDescObj', getImageDescObj());
        console.log('getSwiperImageDescObj', getSwiperImageDescObj());
        setSelectedImages(urls);
        // setImageUrls(urls);
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
      // console.log('inside load image');
      // console.log(intention, prev);
      // if (intention == 'update' && (prev === 'home' || prev === 'finalpage')) {
      //   console.log('inside update');
      //   getImageDescFromCloud(getProjectKey()).then((desc) => {
      //     setImageDesc(desc);
      //     getImageDesc.length;
      //     inputElement.current.value = getImageDesc()[0].desc;
      //   });
      // }
    }

    if (intention == 'update' && (prev === 'home' || prev === 'finalpage')) {
      console.log('inside update');
      inputElement.current.value =
        getImageDescObj()[getSwiperImageDescObj()['0']];
    }
    if (intention == 'create' && prev === 'finalpage') {
      console.log('inside update');
      inputElement.current.value =
        getImageDescObj()[getSwiperImageDescObj()['0']];
    }
  };

  const deleteImageFromState = (index: number) => {
    console.log('deleteImageFromState');
    delIndiImageDescObj(getSwiperImageDescObj()[index.toString()]);
    delIndiSwiperImageDescObj(index.toString());

    console.log(getSwiperImageDescObj());
    console.log(getImageDescObj());
    console.log('length', Object.keys(getImageDescObj()).length);
    console.log('length', Object.keys(getImageDescObj()).length == 0);
    if (Object.keys(getImageDescObj()).length == 0) {
      inputElement.current.value = '';
      console.log('inside if');
      setSelectedImages([]);
    }
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files);
    console.log('files', files[0]);
    setImages(getImages().concat(files));

    if (files.length > 0) {
      const imageUrls = files.map((file) => URL.createObjectURL(file));
      imageUrls.forEach((url, index) => {
        setImageDescObj(files[index].name, {
          desc: '',
          name: files[index].name,
          url: url,
        });
        setSwiperImageDescObj(index.toString(), files[index].name);
        let temp = { ...expriment };
        temp.data.push({ url: url, descArr: '' });
        setExperiment(temp);
        console.log('experiment', expriment);
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
    }
  };
  const handleImageMoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filesIndex = Object.keys(getImageDescObj()).length;
    const files = Array.from(e.target.files);
    console.log('files', files[0]);
    setImages(getImages().concat(files));
    if (files.length > 0) {
      const imageUrls = files.map((file) => URL.createObjectURL(file));
      imageUrls.forEach((url, index) => {
        setImageDescObj(files[index].name, {
          desc: '',
          name: files[index].name,
          url: url,
        });
        setSwiperImageDescObj(
          (index + filesIndex).toString(),
          files[index].name,
        );
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
    }
  };

  useEffect(() => {
    const { params } = router.query;
    const parsedParams: Params = params
      ? JSON.parse(decodeURIComponent(params as string))
      : {};
    const { projectID, passedProjectName, intention, prev } = parsedParams;
    setProjectIdImageUpload(projectID);
    loadImages(projectID, passedProjectName, intention, prev);
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
              console.log('inside swipper ', getSwiperImageDescObj());
              setKey(swiper.activeIndex.toString());
              inputElement.current.value =
                getImageDescObj()[
                  getSwiperImageDescObj()[swiper.activeIndex.toString()]
                ].desc;
              // getImageDesc()[swiper.activeIndex].desc;

              console.log(swiper.activeIndex);
              console.log('This should be the url', getSwiperImageDescObj());
            }}
          >
            {Object.values(getImageDescObj()).map((image, index) => (
              <SwiperSlide key={image.url}>
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
            onChange={(e) => {
              const newImageDesc = [...getImageDesc()];
              console.log('inside ', getImageDescObj());
              getSwiperImageDescObj()[imageKey.toString()]
                ? setImageDescObj(
                    getSwiperImageDescObj()[imageKey.toString()],
                    {
                      ...getImageDescObj()[getSwiperImageDescObj()[imageKey]],
                      desc: e.target.value,
                    },
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
