import { useEffect, useState } from 'react';
import Image from 'next/image';
import '@splidejs/react-splide/css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useCreatePageStore } from '../stores/createPageStore';
import { getImageUrlsFromCloud } from '../lib/firebasedb';
import { set } from 'zod';

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
  const { getImageUrls, setImageUrls, getImages, setImages } =
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

  useEffect(() => {
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
        <div className="flex flex-col items-center">
          <Splide
            hasTrack={true}
            options={{
              perPage: 1,
              gap: '1rem',
              autoWidth: true,
              arrows: false,
            }}
            aria-label="My Favorite Images"
          >
            {selectedImages.map((image) => (
              <SplideSlide key={image} className="m-5 shadow-md rounded-xl">
                <img
                  src={image}
                  alt="Preview"
                  className="object-cover"
                  style={{ width: '250px', height: '200px' }}
                />
              </SplideSlide>
            ))}
          </Splide>
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
