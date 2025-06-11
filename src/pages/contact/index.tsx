const ContactPage = () => {
  return (
    <div className="flex flex-col w-full h-full items-center justify-start pt-2 gap-5 bg-gray-50">
      <div className="flex flex-col w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Contact Us
        </h2>
        <div className="flex flex-col border border-gray-200 rounded-lg p-8 bg-white shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label
                htmlFor="companyName"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Company
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v4H7V5zm8 8v2h1v1H4v-1h1v-2a1 1 0 011-1h8a1 1 0 011 1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  name="companyName"
                  id="companyName"
                  value="MTV Corporation"
                  readOnly
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-800 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value="mtv.corporation@gmail.com"
                  readOnly
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-800 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="tel"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Tel
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="tel"
                  id="tel"
                  value="+84 123 456 789"
                  readOnly
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-800 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="address"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value="Da Nang city, Viet Nam"
                  readOnly
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-800 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col md:col-span-2">
              <label
                htmlFor="linkedIn"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                LinkedIn
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="linkedIn"
                  id="linkedIn"
                  value="MTV Corporation"
                  readOnly
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-800 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-xl w-full">
        <div className="flex flex-col w-full p-6 bg-gradient-to-b from-gray-50 to-white rounded-lg gap-4 shadow-md border border-gray-200 mb-6">
          <div className="flex flex-col items-center text-center mb-2">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Join Our Newsletter
            </h2>
            <p className="text-gray-600 text-sm">
              Stay updated with our latest products and exclusive offers.
            </p>
          </div>

          <div className="flex flex-col md:flex-row w-full gap-3 items-center">
            <div className="relative w-full">
              <input
                type="email"
                name="usermail"
                id="usermail"
                placeholder="Enter your email address"
                className="w-full py-3 px-4 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 bg-white shadow-sm"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>

            <button className="w-full md:w-auto bg-gray-800 text-white font-medium py-3 px-6 rounded-md hover:bg-gray-700 transition-colors shadow-sm hover:shadow">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContactPage;
