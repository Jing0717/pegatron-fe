import { useEffect, useState } from 'react';
import UserModal from './components/UserModal';
import CsvExportButton from './components/CsvExportButton';
import { UserApis } from './apis/apis';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);

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
        <div className='flex justify-end'>
          <CsvExportButton data={users} headers={headers} />
        </div>
        {users.map((person, index) => (
          <div key={index} className='space-y-1'>
            <p className='border border-black rounded p-1'>{`${person['name']} (${person['age']} years old)`}</p>
            <img
              src={person['avatar']}
              alt={person['name']}
              className='w-24 h-24 object-cover rounded-xl'
            />
          </div>
        ))}
      </div>
      <div className='flex justify-end'>
        <button
          onClick={() => setShowModal(true)}
          className='bg-blue-600 text-white px-5 py-1 hover:scale-95 rounded transition'
        >
          Add
        </button>
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
