import { useEffect, useState } from 'react';
import { UserApis } from './apis/apis';
import UserModal from './components/UserModal';
import CsvExportButton from './components/CsvExportButton';
import UserListItem from './components/UserListItem';

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
    <div className='container py-8'>
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
          <UserListItem
            key={user['_id']}
            user={user}
            handleUserDelete={handleUserDelete}
          />
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
