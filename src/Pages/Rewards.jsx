import React, { useState } from 'react';
import { Html } from '../components';

export default function Modal() {
  const [showModal, setShowModal] = React.useState(false);
  const [activeTab, setActiveTab] = useState('preview');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setActiveTab('preview');
    setShowModal(true);
  };

  return (
    <>
      <div className="flex flex-wrap justify-center">
        <div className="w-1/3 p-5">
          <div
            className="bg-indigo-500 text-white font-bold uppercase text-sm shadow hover:shadow-lg cursor-pointer rounded-md p-4"
            onClick={() =>
              handleImageClick(
                'https://ik.imagekit.io/kkb/px-conversions%20(28)/weeee?updatedAt=1697019040527'
              )
            }
          >
            <img
              className="rounded-md"
              src="https://ik.imagekit.io/kkb/px-conversions%20(28)/weeee?updatedAt=1697019040527"
              alt="Data Privacy"
            />
            <p className="text-center pt-5 pb-5">Hello</p>
          </div>
        </div>
        {/* Add more image boxes with similar onClick handlers */}
      </div>

      {/* Modal Content */}
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-4/5 my-6 mx-auto max-w-6xl h-4/6 justify-center">
              {/* ... (previous modal code with tabs and buttons) */}
              <div className="p-4">
                {activeTab === 'preview' && (
                  <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
                    <img
                      className="rounded-md"
                      src={selectedImage}
                      alt="Data Privacy"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
