import { useNavigate, useParams } from "react-router-dom";
import itemDefaultImg from "../../../assets/items-default-avt/default.jpg";
import { useState } from "react";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingCart,
  Star,
} from "lucide-react";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [images] = useState([
    itemDefaultImg,
    itemDefaultImg,
    itemDefaultImg,
    itemDefaultImg,
    itemDefaultImg,
    itemDefaultImg,
    itemDefaultImg,
    itemDefaultImg,
    itemDefaultImg,
    itemDefaultImg,
  ]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto lg:px-[100px] gap-6">
      <div className="flex gap-2 py-5 items-center">
        <ArrowLeft className="w-[20px] cursor-pointer" onClick={handleGoBack} />
        <h3 className="font-bold  text-xl text-start">Product Detail Page</h3>
      </div>
      <div
        id="image-container"
        className="flex flex-col md:flex-row gap-4 justify-center items-start"
      >
        {/* Main image section with navigation controls */}
        <div
          id="main-img"
          className="w-full md:w-2/3 rounded-md flex flex-row gap-1 items-center"
        >
          <div
            onClick={handlePrevImage}
            className="cursor-pointer hover:bg-slate-100 p-1 rounded-full"
          >
            <ChevronLeft className="w-[20px] h-[50px]" />
          </div>
          <img
            src={images[currentImageIndex]}
            alt="main-img"
            className="flex-grow object-contain w-full max-w-[400px] h-[400px] rounded-md"
          />
          <div
            onClick={handleNextImage}
            className="cursor-pointer hover:bg-slate-100 p-1 rounded-full"
          >
            <ChevronRight className="w-[20px] h-[50px]" />
          </div>
        </div>

        {/* Thumbnails section */}
        <div className="md:h-[400px] w-full md:w-1/3 flex items-end">
          <div
            id="others-img"
            className=" flex flex-row md:flex-row flex-wrap-reverse gap-2 justify-start "
          >
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`product-image-${index}`}
                className={`cursor-pointer w-[70px] h-[70px] object-cover border-2 rounded-md ${
                  index === currentImageIndex
                    ? "border-blue-500"
                    : "border-gray-200 hover:border-blue-300"
                }`}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </div>
        </div>
      </div>
      <div
        className="flex flex-col md:flex-row gap-3 py-3 w-full"
        id="product-info"
      >
        <div className="flex flex-col gap-3 md:w-2/3 w-full">
          <div className="flex justify-start gap-3 w-full">
            <span className="text-gray-500">Name:</span>
            <span className="font-bold text-lg w-full text-start">
              Iphone 11 Pro Max
            </span>
          </div>
          <div className="flex justify-start gap-3 w-full">
            <span className="text-gray-500">Price:</span>
            <span className="font-bold text-lg w-full text-start">100$</span>
          </div>{" "}
          <div className="flex justify-start gap-3 items-center w-full">
            <span className="text-gray-500">Rating:</span>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={20}
                  className={`cursor-pointer ${
                    star <= 4
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600 w-full">
                (4.0/5 - 120 reviews)
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full md:w-1/3">
          <div className="inline-flex gap-2 bg-slate-600  py-2 items-center justify-center rounded cursor-pointer text-white w-full">
            <span>Add to favorites</span>
            <Heart />
          </div>
          <div className="inline-flex gap-2 bg-blue-600 py-2 items-center justify-center rounded cursor-pointer text-white w-full">
            <span>Add to cart</span>
            <ShoppingCart />
          </div>
        </div>
      </div>
      <div id="product-description" className="py-4">
        <div
          className="flex justify-start"
          dangerouslySetInnerHTML={{
            __html: "<pre><code>Product description goes here...</code></pre>",
          }}
        />
      </div>
      <div className="flex flex-col justify-start border-t border-slate-200">
        <div>review</div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
