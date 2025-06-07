const Footer = () => {
  return (
    <footer className="bg-slate-500 text-white p-4">
      <div className="text-center justify-center items-center h-full w-full">
        <p className="flexjustify-center items-center">
          &copy; {new Date().getFullYear()} Side Project.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
