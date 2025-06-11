import { useEffect, useState } from "react";
import useAppContext from "../../hooks/useAppContext";
import { Search, ChevronRight, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetItems } from "../../hooks/useItem";
import { useGetCategory } from "../../hooks/useCategory";
import type { ApiResponse } from "../../helpers/data";
import type { Item, ItemPageable } from "../../api/itemApi";
import itemDefaultImg from "../../assets/items-default-avt/default.jpg";
import { Spinner } from "../../components/Spiner";

const HomePage = () => {
  const { setIsLogin } = useAppContext();
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch new arrivals
  const { isLoading: isLoadingNew, data: newItems } = useGetItems({
    page: 1,
    size: 5,
    sort: "createdAt",
    direction: "desc",
  }) as { isLoading: boolean; data: ApiResponse<ItemPageable<Item>> };

  // Fetch categories
  const { data: categories } = useGetCategory();

  useEffect(() => {
    setIsLogin(false);
  }, [setIsLogin]);

  return (
    <div className="flex flex-col w-full bg-white">
      {/* Banner Section */}
      <div className="bg-gradient-to-r from-yellow-200 to-red-900 text-white py-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-500">
              Discover the Latest Tech Devices
            </h2>

            <Link
              to="/product"
              className="inline-block bg-white text-red-600 hover:bg-gray-100 py-3 px-8 rounded-md font-medium transition duration-300"
            >
              Shop Now
            </Link>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=600&auto=format&fit=crop"
              alt="Latest Tech Devices"
              className="rounded-lg shadow-lg max-w-sm"
            />
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-row py-4 items-center justify-center w-full max-w-3xl mx-auto">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 focus:outline-none border border-gray-300 rounded-l-md px-4 shadow-sm"
          />
          <Link
            to={`/product?search=${searchQuery}`}
            className="h-12 bg-red-600 hover:bg-red-700 flex items-center justify-center px-6 rounded-r-md transition-colors duration-300 text-white"
          >
            <Search className="mr-2" />
            <span>Search</span>
          </Link>
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories?.data?.slice(0, 6).map((category) => (
              <Link
                key={category.category_id}
                to={`/product?category=${category.category_id}`}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 flex flex-col items-center justify-center aspect-square"
              >
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                  {/* This would ideally be a category icon */}
                  <span className="text-blue-600 text-xl font-bold">
                    {category.category_name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-sm md:text-base font-medium text-center">
                  {category.category_name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* New Arrivals */}
      <div className="container mx-auto py-12 px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">New Arrivals</h2>
          <Link
            to="/product?sort=createdAt&direction=desc"
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
          >
            View All <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>

        {isLoadingNew ? (
          <div className="flex justify-center py-10">
            <Spinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {newItems?.data?.content.slice(0, 5).map((item) => (
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
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded">
                    New
                  </div>
                </Link>
                <div className="p-4 flex flex-col flex-grow">
                  <Link to={`/product/${item.id}`} className="block flex-grow">
                    <h3 className="font-medium text-gray-800 hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                      {item.item_name}
                    </h3>
                  </Link>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="font-bold">
                      {item.public_price.toLocaleString()} VND
                    </span>
                    <button className="text-red-600 hover:text-red-800">
                      <ShoppingCart size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
