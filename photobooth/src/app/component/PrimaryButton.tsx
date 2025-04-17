'use client';

import React from 'react';

type Props = {
  label: string;
  onClick: () => void;
  color?: 'blue' | 'green' | 'red';
  disabled?: boolean;
};

export default function PrimaryButton({ label, onClick, color = 'blue' }: Props) {
  const base = 'w-full py-3 rounded-lg text-lg font-semibold transition';
  const colors = {
    blue: 'bg-blue-600 hover:bg-blue-700',
    green: 'bg-green-600 hover:bg-green-700',
    red: 'bg-red-600 hover:bg-red-700',
  };

  return (
    <button onClick={onClick} className={`${base} ${colors[color]}`}>
      {label}
    </button>
  );
}
