'use client'

import React, { useState } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import { Item, ItemActions, ItemContent, ItemTitle } from '../ui/item';
import { FaFilePdf } from "react-icons/fa6";
import { FaCloudUploadAlt } from "react-icons/fa";
import { RiFileExcel2Fill } from "react-icons/ri";
import ErrorMessage from './ErrorMessage';


// Define the type for the file select callback prop
interface FileUploadProps {
  setSelectedFiles: (files: File[]) => void;
  selectedFiles: File[];
}

const FileUpload: React.FC<FileUploadProps> = ({ setSelectedFiles, selectedFiles }) => {

  const [error, setError] = useState<string>('');
  console.log("error:", error)
  const MAX_FILES = 10;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      if (selectedFiles.length + newFiles.length > MAX_FILES) {
        setError(`You can only upload up to ${MAX_FILES} files.`);
        return;
      }
      setSelectedFiles([...selectedFiles, ...newFiles]);
      setError('');
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (selectedFiles.length + files.length > MAX_FILES) {
      setError(`You can only upload up to ${MAX_FILES} files.`);
      return;
    } else {}
    setSelectedFiles([...selectedFiles, ...files]);
    setError('');
  };


  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // Remove a specific file
  const handleRemoveFile = (fileToRemove: File) => {
    setSelectedFiles(selectedFiles.filter((file) => file !== fileToRemove)); // Directly pass updated array
  };

  return (
    <div className="flex flex-col items-center justify-center pt-30 px-10 pb-0">
      <h1 className='mt-8 font-semibold text-4xl max-w-4xl text-center'>
        Upload your PDF bank statement...
      </h1>


      {/* Upload component */}
      {error && <ErrorMessage message={error} />}


      <div
        className={`
          w-full max-w-4xl mt-12 py-10
          flex flex-col items-center justify-center gap-4
          rounded-2xl border-2 border-dashed border-gray-300
          bg-linear-to-br from-green-50 to-green-100
          
          transition-all duration-300
          ${selectedFiles.length >= 10 ? "opacity-50 cursor-not-allowed " : "hover:border-green-400 hover:bg-green-50 cursor-pointer "}

        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {/* Icon */}
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600">
          <FaCloudUploadAlt size={28} />
        </div>

        {/* Text */}
        <div className="text-center space-y-1">
          <p className="text-lg font-semibold text-gray-800">
            Drag & drop your PDFs
          </p>
          <p className="text-sm text-gray-500">
            Bank statements only · PDF format
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center w-full gap-3 px-20">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-sm text-gray-400 whitespace-nowrap">or</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* Button */}
        <button
          type="button"
          onClick={() => document.getElementById('fileInput')?.click()}
          disabled={selectedFiles.length >= 10} // disable if 10 files are selected
          className={`
            px-4 py-2
            rounded-md
            text-green-600 font-medium
            border-2 border-green-600 bg-white
            transition
            ${selectedFiles.length >= 10 ? "opacity-50 cursor-not-allowed" : "hover:bg-green-200"}
          `}
        >
          {selectedFiles.length > 0 ? 'Add more files' : 'Browse files'}
        </button>



      </div>


      {/* Display selected files */}
      {selectedFiles.length > 0 && (
        <div className="my-15 text-center">
          <div className=" flex flex-wrap justify-center gap-3 max-w-4xl mx-auto ">
            {selectedFiles.map((file, index) => (
              <Item key={index} variant="outline" className='py-2 px-3 gap-2 shadow-lg rounded-full bg-linear-to-br from-green-50 to-green-100'>
                <ItemContent className='flex flex-row items-center justify-start gap-3 font-bold'>
                  <FaFilePdf className='text-red-500' />
                  <ItemTitle className='font-semibold max-w-45 text-start line-clamp-1'>{file.name}</ItemTitle>
                </ItemContent>
                <ItemActions>
                  <button
                    className="text-red-500 hover:text-red-700 font-semibold text-lg p-1 border rounded-full "
                    onClick={() => handleRemoveFile(file)}
                  >
                    <IoCloseSharp size={15} />
                  </button>
                </ItemActions>
              </Item>
            ))}
          </div>

          <button
            type="button"
            className="
              mt-20 mx-auto
              px-8 py-3.5
              rounded-xl
              bg-linear-to-r from-green-600 to-green-700
              text-white font-semibold
              flex items-center gap-3
              shadow-lg shadow-green-500/30
              hover:from-green-700 hover:to-green-800
              hover:shadow-green-600/40
              active:scale-[0.98]
              transition-all duration-100
              animate-bounce
            "
          >
            <RiFileExcel2Fill className="size-6" />
            Convert to Excel
          </button>

        </div>
      )
      }


      <input
        name="fileInput"
        id="fileInput"
        type="file"
        accept=".pdf"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default FileUpload;
