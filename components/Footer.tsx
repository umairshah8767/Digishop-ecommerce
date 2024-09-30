import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <div>
      {/* Footer Section */}
      <div className="bg-gradient-to-r from-[#232F3E] via-[#FEBD69] to-[#f3951a] shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between w-[90%] mx-auto py-6">
          
          {/* Logo */}
          <Link href={"/"} className="w-full md:w-auto">
            <Image
              className="cursor-pointer"
              src="/logos.png"
              alt="Logo"
              width={150}
              height={100}
            />
          </Link>

          {/* Footer Links */}
          <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
            {Array(4).fill(0).map((_, index) => (
              <div key={index} className="lg:w-1/4 md:w-1/2 w-full px-4">
                <h2 className="title-font font-bold text-[#FFFFFF] tracking-widest text-lg mb-3">CATEGORIES</h2>
                <nav className="list-none mb-10">
                  {['First Link', 'Second Link', 'Third Link', 'Fourth Link'].map((link, i) => (
                    <li key={i}>
                      <Link href="/" className="text-gray-200 hover:text-[#FF8C00] text-md transition-all duration-300">{link}</Link>
                    </li>
                  ))}
                </nav>
              </div>
            ))}
          </div>

          {/* Account Section */}
          <div className="text-center text-white cursor-pointer mt-4 md:mt-0">
            <h1 className="text-lg font-semibold hover:underline hover:text-[#FF8C00] transition-all duration-300">
              Sign in
            </h1>
            <h2 className="text-xl font-bold hover:text-[#FF8C00] transition-all duration-300">
              Account & Lists
            </h2>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-900">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-300 text-sm text-center sm:text-left">
            © 2020 Tailblocks —
            <a href="/" rel="noopener noreferrer" className="text-[#FF8C00] ml-1 font-medium" target="_blank">@knyttneve</a>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
            {/* Social Media Icons */}
            {['facebook', 'twitter', 'instagram', 'linkedin'].map((platform, index) => (
              <a key={index} className="ml-3 text-gray-300 hover:text-[#FF8C00] transition-all duration-300">
                {/* Example SVG for Facebook */}
                <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                  <circle cx="4" cy="4" r="2" stroke="none"></circle>
                </svg>
              </a>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
  