import React, { useState } from 'react';

const CopyToClipboardButton = ({ textToCopy }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset the "Copied" state after 2 seconds
      })
      .catch(err => console.error('Failed to copy text: ', err));
  };

  return (
    <div className="relative">
      <button
        className="bg-blue-500 mt-5 text-white font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg cursor-pointer"
        onClick={handleCopyToClipboard}
      >
        {isCopied ? 'Copied!' : 'Copy to Clipboard'}
      </button>
    </div>
  );
};

const App = () => {
  const sampleCode = `function sayHello() {
    console.log('Hello, World!');
  }`;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Code Sharing Page</h1>
      <div className="border border-gray-300 p-4 rounded-lg bg-gray-100">
        <pre className="whitespace-pre-wrap">
          <code>{sampleCode}</code>
        </pre>
        <CopyToClipboardButton textToCopy={sampleCode} />
      </div>
    </div>
  );
};

export default App;