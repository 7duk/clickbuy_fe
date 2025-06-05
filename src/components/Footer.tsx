const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="text-center justify-center items-center h-full w-full">
        <p className="flexjustify-center items-center">
          &copy; {new Date().getFullYear()} Side Project.
        </p>
        <p className="flex justify-center items-center">
          <a href="/privacy-policy" className="text-gray-400 hover:text-white">
            Privacy Policy
          </a>{" "}
          |{" "}
          <a
            href="/terms-of-service"
            className="text-gray-400 hover:text-white"
          >
            Terms of Service
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
