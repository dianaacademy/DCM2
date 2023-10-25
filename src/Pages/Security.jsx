import React from "react";

export default function Modal() {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <> 
    <div flex flex-col items-center	>
      <button
        className="w-1/5  h-20 bg-yellow-500 text-white active:bg-indigo-600 font-bold uppercase text-sm px-6 py-5 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-5 ml-5 mt-10 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Data Security
      </button>
      <button
        className="w-1/5 h-20 bg-pink-500 text-white active:bg-indigo-600 font-bold uppercase text-sm px-6 py-5 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-5 ml-5 mt-10 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Data Privacy 
      </button>

      <button
        className="w-1/5 h-20 bg-green-500 text-white active:bg-indigo-600 font-bold uppercase px-6 py-5 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-5 ml-5 mt-10 mb-1 ease-linear transition-all duration-150 text-xs"
        type="button"
        onClick={() => setShowModal(true)}
      >
       Compliance with Regulations
      </button>
      <button
        className="w-1/5 h-20 bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-sm px-6 py-5 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-5 ml-5 mt-10 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        User Data Control
      </button>
      <button
        className="w-1/5 h-20 bg-sky-500 text-white active:bg-indigo-600 font-bold uppercase px-6 py-5 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-5 ml-5 mt-10 mb-1 ease-linear transition-all duration-150 text-xs"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Frequently Asked Questions (FAQ)
      </button>
      <button
        className="w-1/5 h-20 bg-cyan-500 text-white active:bg-indigo-600 font-bold uppercase text-sm px-6 py-5 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-5 ml-5 mt-10 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Contact Information
      </button>
      <button
        className="w-1/5 h-20 bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-sm px-6 py-5 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-5 ml-5 mt-10 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Legal Disclaimers
      </button>
      <button
        className="w-1/5 h-20 bg-violet-500 text-white active:bg-indigo-600 font-bold uppercase text-sm px-6 py-5 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-5 ml-5 mt-10 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Incident Reporting
      </button>
      <button
        className="w-1/5 h-20 bg-purple-500 text-white active:bg-indigo-600 font-bold uppercase text-sm px-6 py-5 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-5 ml-5 mt-10 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Client Responsibilities
      </button>
      <button
        className="w-1/5 h-20 bg-Rose-500 text-white active:bg-indigo-600 font-bold uppercase px-6 py-5 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-5 ml-5 mt-10 mb-1 ease-linear transition-all duration-150 text-xs"
        type="button"
        onClick={() => setShowModal(true)}
      >
       Updates and Notification
      </button>

      </div>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Template 
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    This is the Template we Change Later
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}