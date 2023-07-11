import { useState } from 'react';
import { UserApis } from '../apis/apis';
import ImageUploader from './ImageUploader';

const UserModal = ({ visible, onClose, setVisible, users, setUsers }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState(18);
  const [isDisabled, setIsDisabled] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const [uploadImg, setUploadImg] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!visible) return null;

  const handleUploadFinnish = (status, message) => {
    if (status) {
      setUploadMessage('');
      setUploadImg(message);
    } else {
      setUploadMessage(message);
      setTimeout(() => setUploadMessage(''));
    }
    setIsDisabled(false);
  };

  const handleOnSubmit = async (e) => {
    const result = await UserApis.addUser({ name, age, avatar: uploadImg });
    if (result.status) {
      setErrorMessage('');
      setName('');
      setAge(18);
      setUploadImg('');
      setSuccessMsg('新增成功！');
      setUsers([...users, result.data.user]);
      setTimeout(() => {
        setSuccessMsg('');
        setVisible(false);
      }, 2000);
    } else {
      setErrorMessage(result.message);
    }
  };

  return (
    <div
      onClick={onClose}
      className='fixed top-0 inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'
    >
      <div
        className='bg-white p-5 rounded'
        onClick={(e) => e.stopPropagation()}
      >
        <span className='font-bold'>Username</span>
        <input
          type='text'
          className='w-full border mb-2 border-black rounded-sm p-1'
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <span className='font-bold'>Age(Years)</span>
        <input
          type='number'
          className='w-full border mb-2 border-black rounded-sm p-1'
          onChange={(e) => setAge(e.target.value)}
          value={age}
        />
        <div className='flex justify-center'>
          <ImageUploader
            isDisabled={isDisabled}
            handleUploadFinnish={handleUploadFinnish}
            setIsDisabled={setIsDisabled}
            text='上傳圖片'
          />
        </div>
        {uploadMessage !== '' && (
          <div className='text-center text-red-400'>{uploadMessage}</div>
        )}
        {uploadImg !== '' && (
          <img
            src={uploadImg}
            alt=''
            className='border-2 border-black rounded-lg '
          />
        )}
        {errorMessage !== '' && (
          <div className='text-center mt-8 text-red-400'>{errorMessage}</div>
        )}
        {successMsg !== '' && (
          <div className='text-center mt-8 text-green-700'>{successMsg}</div>
        )}
        <button
          className='bg-purple-800 text-white rounded-sm px-3 py-1 mt-4'
          onClick={handleOnSubmit}
        >
          Add User
        </button>
      </div>
    </div>
  );
};

export default UserModal;
