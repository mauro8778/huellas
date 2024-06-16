import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import ToggleUser from './ToggleUser';

const defaultAvatarUrl = '/avatar.webp';

interface User {
  id: string,
  name: string;
  email: string;
  image?: string;
  role: string; 
}

const AllUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>('https://huellasdesperanza.onrender.com/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="p-4 max-w-xl bg-white rounded-xl border shadow-xl h-[390px] overflow-y-auto custom-scrollbar sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold leading-none text-gray-600 dark:text-white">Usuarios</h3>
          <Link href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
            View all
          </Link>
        </div>
        <div className="flow-root">
          <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700 ml-4 cursor-pointer">
            {users.map((user) => (
              <li key={user.email} className="py-2 sm:py-3">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {user.image ? (
                      <Image className="w-8 h-8 rounded-full" src={user.image} alt={`${user.name} image`} width={48} height={48} />
                    ) : (
                      <Image className="w-8 h-8 rounded-full" src={defaultAvatarUrl} alt="Default Avatar" width={48} height={48} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-medium text-gray-900 truncate dark:text-white">
                      {user.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      {user.email}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                       {user.role }
                    </p>
                  </div>
                  <ToggleUser userId={user.id}/>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
