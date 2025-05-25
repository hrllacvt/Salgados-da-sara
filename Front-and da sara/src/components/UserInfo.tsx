import React from 'react';
import { User } from '../types';

interface UserInfoProps {
  user: User;
  onLogout: () => void;
}

const UserInfo: React.FC<UserInfoProps> = ({ user, onLogout }) => {
  return (
    <div className="max-w-lg mx-auto bg-gray-800 rounded-lg shadow-lg p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Informações do Cliente</h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-medium mb-3">Dados Pessoais</h3>
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="mb-2"><strong>Nome:</strong> {user.name}</p>
              <p className="mb-2"><strong>Telefone:</strong> {user.phone}</p>
              <p><strong>E-mail:</strong> {user.email}</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3">Endereço</h3>
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="mb-2"><strong>Endereço:</strong> {user.address}</p>
              {user.complement && (
                <p className="mb-2"><strong>Complemento:</strong> {user.complement}</p>
              )}
              <p className="mb-2"><strong>Bairro:</strong> {user.neighborhood}</p>
              <p><strong>Cidade:</strong> {user.city}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex gap-4 justify-center">
          <button
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
            onClick={onLogout}
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;