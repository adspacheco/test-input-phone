// Importações necessárias
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Definindo o esquema de validação com Zod
const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').min(2, 'Nome deve ter pelo menos 2 caracteres'),
});

export default function Form() {
  const [submittedName, setSubmittedName] = useState('');

  // Configurando o hook useForm com o resolver Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  // Função de submissão do formulário
  const onSubmit = (data) => {
    setSubmittedName(`Nome enviado: ${data.name}`);
  };

  return (
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="border p-6 rounded-lg shadow-md bg-white w-96">
        <h1 className="text-xl font-bold mb-4">Formulário com Validação</h1>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 text-sm font-medium">Nome:</label>
          <input
            id="name"
            {...register('name')}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <button 
          type="submit" 
          className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Enviar
        </button>
        {submittedName && (
        <p className="mt-4 text-green-500 text-lg">{submittedName}</p>
      )}
      </form>
      
  );
}
