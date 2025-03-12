const Footer = () => {
  return (
    <div className=" border-2  pt-4 text-center bg-gray-500 m-0.5">
      <p className="text-1xl">Contact Us</p>
      <div className="flex gap-5 justify-center text-lg ">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono hover:text-violet-900"
        >
          Facebook
        </a>
        <a
          href="https://www.youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono hover:text-violet-900"
        >
          YouTube
        </a>
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono hover:text-violet-900"
        >
          LinkedIn
        </a>
        <a
          href="mailto:mohithkolli@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono hover:text-violet-900"
        >
          Email
        </a>
        <a
          href="https://wa.me/91737260670"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono hover:text-violet-900"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
};

export default Footer;
