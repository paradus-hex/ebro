import { useState } from 'react';
import Image from 'next/image';

const ImageUpload = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files);

    if (files.length > 0) {
      const imageUrls = files.map((file) => URL.createObjectURL(file));
      setSelectedImages([...selectedImages, ...imageUrls]);
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

  return (
    <div className="mx-5 my-2 max-w-xs">
      {selectedImages.length === 0 ? (
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
                src="/images/upload_image.svg"
                height={100}
                width={100}
                alt="upload image"
              />
            </div>
          </label>
          <div>Upload Image</div>
        </form>
      ) : (
        <div className="flex flex-col items-center">
          <div className="flex flex-row gap-3">
            <button
              className=" bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
              onClick={handlePrevImage}
            >
              &larr;
            </button>
            <div>
              <img
                src={selectedImages[currentImageIndex]}
                alt="Preview"
                className="object-cover"
                style={{ width: '250px', height: '200px' }}
              />
            </div>
            <button
              className=" bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
              onClick={handleNextImage}
            >
              &rarr;
            </button>
          </div>
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
                setSelectedImages([]); // Clear all selected images
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
