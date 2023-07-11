import { useEffect, useState } from 'react';
import { UserApis } from './apis/apis';
import UserModal from './components/UserModal';
import CsvExportButton from './components/CsvExportButton';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);

  const handleUserDelete = async (userId) => {
    const result = await UserApis.deleteUser({ id: userId });
    if (result.status) {
      setUsers(users.filter((user) => user['_id'] !== userId));
    } else {
      console.log('刪除失敗: ', result.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await UserApis.getUsers();
      setUsers(result.data);
    };
    fetchData();
  }, []);

  const headers = [
    { label: 'Name', key: 'name' },
    { label: 'Age', key: 'age' },
    { label: 'Avatar', key: 'avatar' },
  ];

  const handleOnClose = () => setShowModal(false);
  return (
    <div className='container pt-8'>
      <div className='space-y-4'>
        <div className='flex justify-between'>
          <CsvExportButton data={users} headers={headers} />
          <button
            onClick={() => setShowModal(true)}
            className='bg-blue-600 text-white px-5 py-1 hover:scale-95 rounded transition'
          >
            Add
          </button>
        </div>
        <div className='flex justify-end'></div>
        {users.map((user) => (
          <div key={user['_id']} className='space-y-1'>
            <p className='border border-black rounded py-1 px-3 flex justify-between items-center'>
              {`${user['name']} (${user['age']} years old)`}{' '}
              <span
                className='text-red-400 font-bold text-2xl'
                onClick={() => handleUserDelete(user['_id'])}
              >
                x
              </span>
            </p>
            <img
              src={user['avatar']}
              alt={user['name']}
              className='w-24 h-24 object-cover rounded-xl'
            />
          </div>
        ))}
      </div>
      <UserModal
        visible={showModal}
        onClose={handleOnClose}
        setVisible={setShowModal}
        users={users}
        setUsers={setUsers}
      />
    </div>
  );
}

export default App;
