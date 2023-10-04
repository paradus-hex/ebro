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
  const { getImageUrls, setImageUrls, getImages, setImages, delImageUrls } =
    useCreatePageStore();

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
  const deleteImageFromState = (index) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
    setImageUrls(newImages);
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files);
    setImages(getImages().concat(files));
    if (files.length > 0) {
      const imageUrls = files.map((file) => URL.createObjectURL(file));
      setSelectedImages([...selectedImages, ...imageUrls]);
      setImageUrls([...selectedImages, ...imageUrls]);
      setCurrentImageIndex(selectedImages.length);
    }
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? selectedImages.length - 1 : prevIndex - 1,
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === selectedImages.length - 1 ? 0 : prevIndex + 1,
    );
  };
  // var splide = new Splide('.splide');
  // splide.mount();

  useEffect(() => {
    loadImages();
    // console.log(splide.index());
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
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {selectedImages.map((image, index) => (
              <SwiperSlide
                key={image}
                // className="m-5 shadow-md rounded-xl w-[250px] h-[200px] swipte_slide_test"
              >
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
                  <img
                    src={image}
                    alt="Preview"
                    className="object-cover"
                    style={{ width: '320px', height: '200px' }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <input type="text" className="mt-8" />
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
