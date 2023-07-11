const UserListItem = ({ user, handleUserDelete }) => {
  let { _id, age, name, avatar } = user;
  return (
    <div className='space-y-1'>
      <p className='border border-black rounded py-1 px-3 flex justify-between items-center'>
        {`${name} (${age} years old)`}{' '}
        <button
          className='text-red-400 font-bold text-2xl hover:scale-95'
          onClick={() => handleUserDelete(_id)}
        >
          x
        </button>
      </p>
      <img
        src={avatar}
        alt={name}
        className='w-24 h-24 object-cover rounded-xl'
      />
    </div>
  );
};

export default UserListItem;
