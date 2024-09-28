import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 text-center bottom-0 w-full mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h2 className="text-xl font-bold mb-2">About Us</h2>
            <p className="text-xs text-left">
             Education Tracker is dedicated to helping individuals keep track of their reading journey, explore new books, and manage their educational pursuits.
           </p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">Contact Us</h2>
            <p className="text-sm">Email: dr.white004@gmail.com</p>
            <p className="text-sm">Phone: 08147486541</p>
          </div>
          <div className="text-center">
              <h2 className="text-xl font-bold mb-2">Follow Us</h2>
              <div className="flex justify-center space-x-4">
                <a href="#" className="text-sm hover:text-blue-400">Facebook</a>
                <a href="#" className="text-sm hover:text-blue-400">Twitter : @AdemolaAbdulka7</a>
                <a href="#" className="text-sm hover:text-blue-400">Instagram</a>
              </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
