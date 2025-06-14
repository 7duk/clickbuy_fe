import { ChevronDown, ChevronUp, ShoppingCart } from "lucide-react";
import itemDefaultImg from "../../assets/items-default-avt/default.jpg";
import Pagination from "../../components/Pagination";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useGetCategory } from "../../hooks/useCategory";
import { useGetItems } from "../../hooks/useItem";
import type { CategoryResponse } from "../../api/categoryApi";
import type { Item, ItemPageable } from "../../api/itemApi";
import type { ApiResponse } from "../../helpers/data";
import { Spinner } from "../../components/Spiner";
import { useAddItemInCart } from "../../hooks/useCart";
import useAppContext from "../../hooks/useAppContext";

const ProductPage = () => {
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [priceType, setPriceType] = useState<
    "less_than" | "greater_than" | undefined
  >(undefined);
  const [showCategories, setShowCategories] = useState(true);
  const [showPrice, setShowPrice] = useState(false);
  const [showSort, setShowSort] = useState(true);

  const [page, setPage] = useState(1);
  const [size] = useState(10);
  const [sort, setSort] = useState<string>("createdAt");
  const [direction, setDirection] = useState<"asc" | "desc">("desc");
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
  const { data: categories } = useGetCategory();
  const { isLoading, data: items } = useGetItems({
    page,
    size,
    sort,
    direction,
    category_ids: categoryId,
    price: price,
    price_comparision: priceType,
  }) as { isLoading: boolean; data: ApiResponse<ItemPageable<Item>> };
  const location = useLocation();
  const { selectedCategory } = location.state || {};

  const { setCurrentItemsInCart } = useAppContext();
  const { mutate, isSuccess } = useAddItemInCart();

  const handleAddItemInCart = (itemId: number) => {
    mutate({ itemId: itemId, quantity: 1 });
  };

  useEffect(() => {
    if (isSuccess) {
      setCurrentItemsInCart((prev) => prev + 1);
      console.log("Item added to cart successfully");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (selectedCategory) {
      setCategoryId(selectedCategory);
      console.log("Category ID set to:", selectedCategory);
      const checkbox = document.getElementById(
        `category-${selectedCategory}`
      ) as HTMLInputElement;
      if (checkbox) {
        checkbox.checked = true;
      }
    }
  }, [selectedCategory]);
  useEffect(() => {
    if (showPrice) {
      setPrice(10000000);
      setPriceType("less_than");
    } else {
      setPrice(undefined);
      setPriceType(undefined);
    }
  }, [showPrice]);

  useEffect(() => {
    // Function to check screen size and update state
    const handleResize = () => {
      if (window.innerWidth > 640) {
        setShowCategories(true);
        setShowSort(true);
      } else {
        setShowCategories(false);
        setShowSort(false);
      }
    };

    // Call the function initially
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-start justify-start h-screen overflow-y-auto">
      <div className="flex flex-col h-auto w-full md:w-1/5 items-center justify-start p-2 md:h-full">
        <div className="flex flex-col w-full p-2 md:mt-6">
          <div
            className="cursor-pointer flex gap-2 hover:bg-gray-50 w-fit p-1 rounded-md"
            onClick={() => setShowCategories(!showCategories)}
          >
            <h3 className="text-start font-medium">Categories</h3>
            {showCategories ? <ChevronUp /> : <ChevronDown />}
          </div>
          {showCategories ? (
            <ul className="list-none">
              {categories?.data?.map((category: CategoryResponse) => (
                <li
                  key={category.category_id}
                  className="p-2 hover:bg-slate-50 gap-2 flex items-center justify-start"
                >
                  <input
                    type="checkbox"
                    name={`category-${category.category_id}`}
                    id={`category-${category.category_id}`}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCategoryId((prev) =>
                          prev
                            ? `${prev},${category.category_id}`
                            : `${category.category_id}`
                        );
                      } else {
                        setCategoryId((prev) => {
                          if (!prev) return undefined;
                          const categories = prev.split(",");
                          const filteredCategories = categories.filter(
                            (id) => id !== category.category_id.toString()
                          );
                          return filteredCategories.length > 0
                            ? filteredCategories.join(",")
                            : undefined;
                        });
                      }
                    }}
                  />
                  <p className="text-start font-normal text-sm">
                    {category.category_name}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <></>
          )}
        </div>
        <div className="flex flex-col w-full p-2">
          <div
            className="cursor-pointer flex gap-2  hover:bg-gray-50 w-fit p-1 rounded-md"
            onClick={() => setShowPrice(!showPrice)}
          >
            <h3 className="text-start font-medium">Price</h3>
            {showPrice ? <ChevronUp /> : <ChevronDown />}
          </div>
          {showPrice ? (
            <>
              <div className="p-2 space-y-4">
                {/* Price Range Display */}
                <div className="flex justify-between items-center w-full mx-auto text-sm">
                  <span className="font-medium">Range:</span>
                  <span className="text-blue-600 font-medium">
                    {Number(price).toLocaleString()} VND
                  </span>
                </div>

                {/* Slider */}
                <div className="flex justify-center">
                  <input
                    className="w-full appearance-none h-2 rounded-lg bg-gray-200 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md"
                    type="range"
                    min="1000000"
                    max="50000000"
                    step="5000000"
                    value={price}
                    onChange={(e) =>
                      setPrice(e.target.value as unknown as number)
                    }
                    style={{
                      background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
                        (((price ?? 1000000) - 1000000) /
                          (50000000 - 1000000)) *
                        100
                      }%, #e5e7eb ${
                        (((price ?? 1000000) - 1000000) /
                          (50000000 - 1000000)) *
                        100
                      }%, #e5e7eb 100%)`,
                    }}
                  />
                </div>

                {/* Min/Max Values */}
                <div className="flex justify-between w-full text-xs text-gray-500">
                  <span>1M VND</span>
                  <span>50M VND</span>
                </div>

                {/* Comparison Type */}
                <div className="mt-2">
                  <div className="text-sm font-medium mb-2">
                    Price Comparison:
                  </div>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="priceType"
                        className="accent-blue-500 h-4 w-4"
                        checked={priceType === "less_than"}
                        onChange={() => setPriceType("less_than")}
                      />
                      <span className="text-sm">Less than</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="priceType"
                        className="accent-blue-500 h-4 w-4"
                        checked={priceType === "greater_than"}
                        onChange={() => setPriceType("greater_than")}
                      />
                      <span className="text-sm">Greater than</span>
                    </label>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="flex flex-col w-full p-2">
          <div
            className="cursor-pointer flex gap-2  hover:bg-gray-50 w-fit p-1 rounded-md"
            onClick={() => setShowSort(!showSort)}
          >
            <h3 className="text-start font-medium">Sort</h3>
            {showSort ? <ChevronUp /> : <ChevronDown />}
          </div>
          {showSort ? (
            <div className="p-2 space-y-1">
              <ul className="list-none">
                <li className="p-2 hover:bg-slate-50 rounded-md flex items-center gap-2">
                  <label className="flex items-center gap-2 cursor-pointer w-full">
                    <input
                      type="radio"
                      name="sortOption"
                      id="sort-newest"
                      className="accent-blue-500 h-4 w-4"
                      checked={sort === "createdAt" && direction === "desc"}
                      onChange={() => {
                        setSort("createdAt");
                        setDirection("desc");
                      }}
                    />
                    <span className="text-sm">Newest</span>
                  </label>
                </li>
                <li className="p-2 hover:bg-slate-50 rounded-md flex items-center gap-2">
                  <label className="flex items-center gap-2 cursor-pointer w-full">
                    <input
                      type="radio"
                      name="sortOption"
                      id="sort-price-asc"
                      className="accent-blue-500 h-4 w-4"
                      checked={sort === "publicPrice" && direction === "asc"}
                      onChange={() => {
                        setSort("publicPrice");
                        setDirection("asc");
                      }}
                    />
                    <span className="text-sm">Price: Low to high</span>
                  </label>
                </li>
                <li className="p-2 hover:bg-slate-50 rounded-md flex items-center gap-2">
                  <label className="flex items-center gap-2 cursor-pointer w-full">
                    <input
                      type="radio"
                      name="sortOption"
                      id="sort-price-desc"
                      className="accent-blue-500 h-4 w-4"
                      checked={sort === "publicPrice" && direction === "desc"}
                      onChange={() => {
                        setSort("publicPrice");
                        setDirection("desc");
                      }}
                    />
                    <span className="text-sm">Price: High to low</span>
                  </label>
                </li>
              </ul>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      {!isLoading ? (
        items?.data?.content.length !== 0 ? (
          <div className="flex flex-col w-full md:w-4/5 overflow-y-auto">
            <div className="flex flex-col md:grid md:grid-cols-5 gap-4 p-4 ">
              {items?.data?.content.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
                >
                  <Link
                    to={`/product/${item.id}`}
                    className="block relative overflow-hidden"
                  >
                    <img
                      src={item.images[0]?.image_link || itemDefaultImg}
                      alt={item.item_name}
                      className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-1 right-1  text-white text-xs font-medium px-2 py-1  flex flex-row gap-2">
                      <div className="cursor-pointer p-2 rounded-full  w-[40px] h-[40px] hover:text-red-700  bg-slate-100 hover:bg-slate-200 text-red-600">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleAddItemInCart(item.id);
                          }}
                        >
                          <ShoppingCart />
                        </button>
                      </div>
                    </div>
                  </Link>
                  <div className="p-4 flex flex-col flex-grow">
                    <Link
                      to={`/product/${item.id}`}
                      className="block flex-grow"
                    >
                      <h3 className="font-medium text-gray-800 hover:text-red-600 transition-colors line-clamp-2 mb-2">
                        {item.item_name}
                      </h3>
                    </Link>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="font-bold text-center w-full">
                        {item.public_price.toLocaleString()} VND
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Pagination
              currentPage={page}
              size={size}
              numberOfElements={items.data?.numberOfElements ?? 0}
              totalElements={items.data?.totalElements ?? 0}
              totalPages={items.data?.totalPages ?? 0}
              onPageChange={(newPage) => setPage(newPage)}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full gap-10">
            <h2 className="text-center text-xl mt-10">No products found</h2>
          </div>
        )
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full gap-10">
          <h2 className="text-center text-xl mt-10">Loading products...</h2>
          <Spinner />
        </div>
      )}
    </div>
  );
};
export default ProductPage;
