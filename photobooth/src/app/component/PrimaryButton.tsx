'use client';

import React from 'react';

type Props = {
  label: string;
  onClick: () => void;
  color?: 'blue' | 'green' | 'red' | 'rose' | 'fuchsia' | 'cyan' | 'pink' | 'indigo';
  disabled?: boolean;
};

export default function PrimaryButton({ label, onClick, color = 'blue' }: Props) {
  const base = 'w-full py-3 rounded-lg text-lg font-semibold transition';
  const colors = {
    blue: 'bg-blue-600 hover:bg-blue-700',
    green: 'bg-green-600 hover:bg-green-700',
    red: 'bg-red-600 hover:bg-red-700',
    rose: 'bg-rose-400 hover:bg-rose-500',
    fuchsia: 'bg-fuchsia-600 hover:bg-fuchsia-700',
    cyan: 'bg-cyan-300 hover:bg-cyan-400',
    pink: 'bg-pink-600 hover:bg-pink-700',
    indigo: 'bg-indigo-500 hover:bg-indigo-600'
  };

  return (
    <button onClick={onClick} className={`${base} ${colors[color]}`}>
      {label}
    </button>
  );
}
