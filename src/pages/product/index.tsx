import { ChevronDown, ChevronUp } from "lucide-react";
import itemDefaultImg from "../../assets/items-default-avt/default.jpg";
import Pagination from "../../components/Pagination";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetCategory } from "../../hooks/useCategory";
import { useGetItems } from "../../hooks/useItem";
import type { CategoryResponse } from "../../api/categoryApi";
import type { Item, ItemPageable } from "../../api/itemApi";
import type { ApiResponse } from "../../helpers/data";

const ProductPage = () => {
  const [price, setPrice] = useState(500);
  const [priceType, setPriceType] = useState<"less" | "greater">("less");
  const [showCategories, setShowCategories] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [showSort, setShowSort] = useState(false);

  const [page, setPage] = useState(1);
  const [size] = useState(10);
  const [sort, setSort] = useState<string | undefined>(undefined);
  const [direction, setDirection] = useState<"asc" | "desc" | undefined>(
    undefined
  );
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
  const { data: categories } = useGetCategory();
  const { isLoading, data: items } = useGetItems({
    page,
    size,
    sort,
    direction,
    category_ids: categoryId,
  }) as { isLoading: boolean; data: ApiResponse<ItemPageable<Item>> };
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
              {categories?.data?.map((category: CategoryResponse) => (
                <li
                  key={category.category_id}
                  className="p-2 hover:bg-slate-200 gap-2 flex items-center justify-start"
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
                  <input
                    type="radio"
                    name="priceType"
                    id="less"
                    value="less"
                    checked={priceType === "less"}
                    onChange={() => setPriceType("less")}
                  />
                </div>
                <div className="flex flex-row gap-2">
                  <span className="font-normal text-sm">Greater</span>
                  <input
                    type="radio"
                    name="priceType"
                    id="greater"
                    value="greater"
                    checked={priceType === "greater"}
                    onChange={() => setPriceType("greater")}
                  />
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
                <input
                  type="checkbox"
                  name="category-1"
                  id="category-1"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSort("create_at");
                      setDirection("desc");
                    }
                  }}
                />
                <p className="text-start font-normal text-sm">Newest</p>
              </li>
              <li className="p-2 hover:bg-slate-200 gap-2 flex items-center justify-start">
                <input
                  type="checkbox"
                  name="category-1"
                  id="category-1"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSort("public_price");
                      setDirection("asc");
                    }
                  }}
                />
                <p className="text-start font-normal text-sm">
                  Price: Low to high
                </p>
              </li>
              <li className="p-2 hover:bg-slate-200 gap-2 flex items-center justify-start">
                <input
                  type="checkbox"
                  name="category-1"
                  id="category-1"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSort("public_price");
                      setDirection("desc");
                    }
                  }}
                />
                <p className="text-start font-normal text-sm">
                  Price: High to low
                </p>
              </li>
            </ul>
          ) : (
            <></>
          )}
        </div>
      </div>
      {!isLoading ? (
        <div className="flex flex-col w-full md:w-4/5 overflow-y-auto">
          <div className="flex flex-col md:grid md:grid-cols-5 gap-4 p-4 ">
            {items?.data?.content.map((item) => (
              <div
                className="flex flex-col items-center justify-between bg-white shadow-md rounded-lg p-4 border border-slate-200"
                key={item.id}
              >
                <Link to={`/product/${item.id}`}>
                  <img
                    src={item.images[0]?.image_link || itemDefaultImg}
                    key={item.images[0]?.image_id}
                    className="w-[150px] h-[150px] object-cover rounded-md mb-2 hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                <h3 className="flex justify-start h-full">
                  <Link
                    to={`/product/${item.id}`}
                    className="font-bold hover:text-blue-500 break-keep"
                  >
                    {item.item_name}
                  </Link>
                </h3>
                <div className="flex flex-row justify-end gap-4">
                  <span className="font-bold text-xs cursor-default">
                    {item.public_price.toLocaleString()} VND
                  </span>
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
        <></>
      )}
    </div>
  );
};
export default ProductPage;
