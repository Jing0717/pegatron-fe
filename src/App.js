import { useState } from 'react';
import UserModal from './components/UserModal';

function App() {
  const [showModal, setShowModal] = useState(false);

  const handleOnClose = () => setShowModal(false);
  return (
    <div className='container'>
      <button
        onClick={() => setShowModal(true)}
        className='bg-blue-600 text-white px-5 py-1 hover:scale-95 rounded transition'
      >
        Add
      </button>
      <UserModal visible={showModal} onClose={handleOnClose} />
    </div>
  );
}

export default App;
