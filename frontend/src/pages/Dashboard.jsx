import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Wrench } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove o token salvo e redireciona para a página de login
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header / Navbar */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg text-white">
            <Wrench className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-slate-800">Sistema Oficina</h1>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg transition text-sm font-medium"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </header>

      {/* Conteúdo do Painel */}
      <main className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Painel Principal</h2>
          <p className="text-slate-600">
            Você está autenticado no sistema da oficina mecânica.
          </p>
        </div>
      </main>
    </div>
  );
}