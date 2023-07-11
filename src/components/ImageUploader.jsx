import React from 'react';
import { UserApis } from '../apis/apis';
import LoadingSpinner from './LoadingSpinner';

const ImageUploader = ({
  isDisabled,
  handleUploadFinnish,
  setIsDisabled,
  text,
}) => {
  const handleFileUpload = async (e) => {
    setIsDisabled(true);
    const file = e.target.files || [];
    const formData = new FormData();
    formData.append('file', file[0]);
    const result = await UserApis.uploadImg(formData);
    const { status = false, message = '上傳發生異常' } = result;
    handleUploadFinnish(status, message);
  };

  return (
    <label
      htmlFor='upload'
      className={`px-4 py-1 rounded-sm text-center cursor-pointer mb-4 mt-5 flex hover:scale-95 ${
        isDisabled
          ? 'pointer-events-none cursor-not-allowed bg-gray-500'
          : 'bg-black text-white'
      }`}
    >
      {text}
      {isDisabled ? <LoadingSpinner /> : ''}
      <input
        type='file'
        className='hidden'
        id='upload'
        name='upload'
        onChange={handleFileUpload}
      />
    </label>
  );
};

export default ImageUploader;
