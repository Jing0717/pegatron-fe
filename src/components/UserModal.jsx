const UserModal = ({ visible, onClose }) => {
  if (!visible) return null;

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
        />
        <span className='font-bold'>Age(Years)</span>
        <input
          type='text'
          className='w-full border mb-2 border-black rounded-sm p-1'
        />
        <button className='bg-purple-800 text-white rounded-sm px-3 py-1'>
          Add User
        </button>
      </div>
    </div>
  );
};

export default UserModal;
