import { ChevronDown, ChevronUp, Heart, ShoppingCart } from "lucide-react";
import itemDefaultImg from "../../assets/items-default-avt/default.jpg";
import Pagination from "../../components/Pagination";
import { useState } from "react";
import { Link } from "react-router-dom";

const ProductPage = () => {
  const [price, setPrice] = useState(500);
  const [showCategories, setShowCategories] = useState(true);
  const [showPrice, setShowPrice] = useState(false);
  const [showSort, setShowSort] = useState(false);
  return (
    <div className="flex flex-col md:flex-row items-start justify-center h-screen overflow-y-auto">
      <div className="flex flex-col h-auto w-full md:w-1/5 items-center justify-start p-2 md:h-full">
        <div className="flex flex-col w-full p-2 md:mt-6">
          <div
            className="cursor-pointer flex gap-2"
            onClick={() => setShowCategories(!showCategories)}
          >
            <h3 className="text-start font-medium">Categories</h3>
            {showCategories ? <ChevronUp /> : <ChevronDown />}
          </div>
          {showCategories ? (
            <ul className="list-none">
              <li className="p-2 hover:bg-slate-200 gap-2 flex items-center justify-start">
                <input type="checkbox" name="category-1" id="category-1" />
                <a href="#" className="font-normal text-sm">
                  Category 1
                </a>
              </li>
              <li className="p-2 hover:bg-slate-200 gap-2 flex items-center justify-start">
                <input type="checkbox" name="category-1" id="category-1" />
                <a href="#" className="font-normal text-sm">
                  Category 2
                </a>
              </li>
              <li className="p-2 hover:bg-slate-200 gap-2 flex items-center justify-start">
                <input type="checkbox" name="category-1" id="category-1" />
                <a href="#" className="font-normal text-sm">
                  Category 3
                </a>
              </li>
              <li className="p-2 hover:bg-slate-200 gap-2 flex items-center justify-start">
                <input type="checkbox" name="category-1" id="category-1" />
                <a href="#" className="font-normal text-sm">
                  Category 4
                </a>
              </li>
            </ul>
          ) : (
            <></>
          )}
        </div>
        <div className="flex flex-col w-full p-2">
          <div
            className="cursor-pointer flex gap-2"
            onClick={() => setShowPrice(!showPrice)}
          >
            <h3 className="text-start font-medium">Price</h3>
            {showPrice ? <ChevronUp /> : <ChevronDown />}
          </div>
          {showPrice ? (
            <>
              <div className="flex justify-center p-2">
                <input
                  className="w-4/5"
                  type="range"
                  min="0"
                  max="1000"
                  step="100"
                  value={price}
                  onChange={(e) =>
                    setPrice(e.target.value as unknown as number)
                  }
                />
              </div>

              <div className="flex flex-row gap-3 justify-center p-2">
                <div className="flex flex-row gap-2">
                  <span className="font-normal text-sm">Less</span>
                  <input type="radio" name="" id="less" />
                </div>
                <div className="flex flex-row gap-2">
                  <span className="font-normal text-sm">Greater</span>
                  <input type="radio" name="" id="greater" />
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="flex flex-col w-full p-2">
          <div
            className="cursor-pointer flex gap-2"
            onClick={() => setShowSort(!showSort)}
          >
            <h3 className="text-start font-medium">Sort</h3>
            {showSort ? <ChevronUp /> : <ChevronDown />}
          </div>
          {showSort ? (
            <ul className="list-none">
              <li className="p-2 hover:bg-slate-200 gap-2 flex items-center justify-start">
                <input type="checkbox" name="category-1" id="category-1" />
                <a href="#" className="font-normal text-sm">
                  Most Popular
                </a>
              </li>
              <li className="p-2 hover:bg-slate-200 gap-2 flex items-center justify-start">
                <input type="checkbox" name="category-1" id="category-1" />
                <a href="#" className="font-normal text-sm">
                  Newest
                </a>
              </li>
              <li className="p-2 hover:bg-slate-200 gap-2 flex items-center justify-start">
                <input type="checkbox" name="category-1" id="category-1" />
                <a href="#" className="font-normal text-sm">
                  Price: Low to high
                </a>
              </li>
              <li className="p-2 hover:bg-slate-200 gap-2 flex items-center justify-start">
                <input type="checkbox" name="category-1" id="category-1" />
                <a href="#" className="font-normal text-sm">
                  Price: High to low
                </a>
              </li>
            </ul>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="flex flex-col w-full md:w-4/5 overflow-y-auto">
        <div className="flex flex-col md:grid md:grid-cols-5 gap-4 p-4 ">
          <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-4 border border-slate-200">
            <Link to="/product/1">
              <img
                src={itemDefaultImg}
                alt="item1"
                className="w-[150px] h-auto"
              />
            </Link>
            <h3>
              <Link to="/product/1" className="font-bold hover:text-blue-500">
                Item 1
              </Link>
            </h3>
            <div className="flex flex-row justify-end gap-4">
              <Heart />
              <ShoppingCart />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-4 border border-slate-200">
            <img
              src={itemDefaultImg}
              alt="item1"
              className="w-[150px] h-auto"
            />
            <h3>
              <span className="font-bold">Item 1</span>
            </h3>
            <div className="flex flex-row justify-end gap-4">
              <Heart />
              <ShoppingCart />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-4 border border-slate-200">
            <img
              src={itemDefaultImg}
              alt="item1"
              className="w-[150px] h-auto"
            />
            <h3>
              <span className="font-bold">Item 1</span>
            </h3>
            <div className="flex flex-row justify-end gap-4">
              <Heart />
              <ShoppingCart />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-4 border border-slate-200">
            <img
              src={itemDefaultImg}
              alt="item1"
              className="w-[150px] h-auto"
            />
            <h3>
              <span className="font-bold">Item 1</span>
            </h3>
            <div className="flex flex-row justify-end gap-4">
              <Heart />
              <ShoppingCart />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-4 border border-slate-200">
            <img
              src={itemDefaultImg}
              alt="item1"
              className="w-[150px] h-auto"
            />
            <h3>
              <span className="font-bold">Item 1</span>
            </h3>
            <div className="flex flex-row justify-end gap-4">
              <Heart />
              <ShoppingCart />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-4 border border-slate-200">
            <img
              src={itemDefaultImg}
              alt="item1"
              className="w-[150px] h-auto"
            />
            <h3>
              <span className="font-bold">Item 1</span>
            </h3>
            <div className="flex flex-row justify-end gap-4">
              <Heart />
              <ShoppingCart />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-4 border border-slate-200">
            <img
              src={itemDefaultImg}
              alt="item1"
              className="w-[150px] h-auto"
            />
            <h3>
              <span className="font-bold">Item 1</span>
            </h3>
            <div className="flex flex-row justify-end gap-4">
              <Heart />
              <ShoppingCart />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-4 border border-slate-200">
            <img
              src={itemDefaultImg}
              alt="item1"
              className="w-[150px] h-auto"
            />
            <h3>
              <span className="font-bold">Item 1</span>
            </h3>
            <div className="flex flex-row justify-end gap-4">
              <Heart />
              <ShoppingCart />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-4 border border-slate-200">
            <img
              src={itemDefaultImg}
              alt="item1"
              className="w-[150px] h-auto"
            />
            <h3>
              <span className="font-bold">Item 1</span>
            </h3>
            <div className="flex flex-row w-full justify-end gap-4">
              <Heart />
              <ShoppingCart />
            </div>
          </div>
        </div>
        <Pagination />
      </div>
    </div>
  );
};
export default ProductPage;
