export type Accessory = {
    id: string;
    src: string;
    alt: string;
    position: string[];
    size: string;
};

export const accessoryOptions: Accessory[] = [
    {
        id: 'heart',
        src: '/heart.png',
        alt: 'Heart',
        position: [
          'top-[10px] left-[5px] rotate-12',
          'top-[60px] right-[5px] -rotate-12',
          'top-[160px] left-[5px] rotate-6',
          'top-[240px] right-[5px] -rotate-6',
          'top-[300px] left-[5px] rotate-12',
          'top-[360px] right-[5px] -rotate-6',
          'bottom-[0px] left-[5px] -rotate-15',
          'bottom-[0px] right-[5px] rotate-15',
        ],
        size: 'w-15 h-15',
      },
      {
        id: 'sunglasses',
        src: '/sunglasses.png',
        alt: 'Glasses',
        position: [
          'top-[70px] right-[80px] rotate-5',
          'top-[310px] right-[80px] -rotate-10',
          'bottom-[120px] right-[80px] rotate-5',
        ],
        size: 'w-20 h-12',
      },
      {
        id: 'gameboy',
        src: '/gameboy.png',
        alt: 'Gameboy',
        position: [
          'top-[-5px] right-[5px] rotate-12',
          'top-[180px] right-[5px] -rotate-12',
          'top-[390px] left-[5px] rotate-6',
          'top-[450px] right-[5px] -rotate-6',
          'top-[510px] left-[5px] -rotate-12',
        ],
        size: 'w-12 h-12',
      },
];

