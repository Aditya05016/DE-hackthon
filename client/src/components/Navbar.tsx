import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Modal from './Modal';

const Navbar = () => {
  const { logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    logout();
    setShowLogoutModal(false);
  };

  return (
    <>
      <nav className="bg-purple-600 shadow-sm px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-purple-700 rounded flex items-center justify-center text-white font-bold">
            D
          </div>
          <h1 className="text-xl font-bold text-white">digitalflake</h1>
        </div>
        <button
          onClick={() => setShowLogoutModal(true)}
          className="w-10 h-10 rounded-full bg-purple-700 hover:bg-purple-800 flex items-center justify-center text-white"
        >
          👤
        </button>
      </nav>

      {/* Logout Confirmation Modal */}
      <Modal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title=""
      >
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <span className="text-red-500 text-3xl mr-2">⚠️</span>
            <h3 className="text-xl font-bold text-gray-800">Log Out</h3>
          </div>
          <p className="text-gray-600 mb-6">Are you sure you want to log out?</p>
          <div className="flex gap-3">
            <button
              onClick={() => setShowLogoutModal(false)}
              className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50"
            >
              Delete
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Navbar;


