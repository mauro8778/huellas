'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import ToggleUser from './ToggleUser';
import ToggleDeleteUser from './ToggleDeleteUser';
import { decodeJwt } from '@/utils/decodeJwt';

const defaultAvatarUrl = '/avatar.webp';

interface User {
  id: string;
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
        const session = localStorage.getItem('userSession');
        if (session) {
          const { id_token } = JSON.parse(session);
          const decodedToken = decodeJwt(id_token);
          const roles = decodedToken ? decodedToken['https://huellasdesperanza.com/roles'] : [];

          const usersWithRoles = response.data.map(user => {
            const userRole = roles.includes('Admin') ? 'admin' : 'user';
            return { ...user, role: userRole };
          });
          setUsers(usersWithRoles);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleChange = (userId: string, newRole: string) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
  };

  const handleDelete = (userId: string) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="p-4 max-w-xl bg-white rounded-xl border-t-4 border-lime500 shadow-xl h-[390px] overflow-y-auto custom-scrollbar sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold leading-none text-gray-600 dark:text-white">Usuarios</h3>
          <span className="text-lg font-bold leading-none text-gray-600 dark:text-white border-b-4 border-lime500 ">Admin | Delete</span>
        </div>
        <div className="flow-root">
          <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700 ml-4 cursor-pointer">
            {users.map((user) => (
              <li key={user.email} className="py-2 sm:py-3">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Image
                      className="w-8 h-8 rounded-full"
                      src={user.image || defaultAvatarUrl}
                      alt={`${user.name} image`}
                      width={48}
                      height={48}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-medium text-gray-900 truncate dark:text-white">
                      {user.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      {user.email}
                    </p>
                  </div>
                  <ToggleUser userId={user.id} initialRole={user.role} onRoleChange={handleRoleChange} />
                  <ToggleDeleteUser userId={user.id} onDelete={handleDelete} />
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
