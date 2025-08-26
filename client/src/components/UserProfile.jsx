import { useAuth } from '../contexts/AuthContext';

const UserProfile = () => {
  const { user, signOut } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-sm mx-auto">
      <div className="flex items-center space-x-4">
        <img
          src={user.picture}
          alt={user.name}
          className="w-16 h-16 rounded-full border-2 border-gray-200"
        />
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-sm text-gray-500 capitalize">Role: {user.role}</p>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <button
          onClick={signOut}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md transition duration-200"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
