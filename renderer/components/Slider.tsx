import React, { useState } from 'react';

const Slider = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const cards = [
    { id: 1, content: 'Card 1' },
    { id: 2, content: 'Card 2' },
    { id: 3, content: 'Card 3' },
    { id: 4, content: 'Card 4' },
  ];

  const moveLeft = () => {
    setCurrentCard((prevCard) =>
      prevCard === 0 ? cards.length - 1 : prevCard - 1,
    );
  };

  const moveRight = () => {
    setCurrentCard((prevCard) =>
      prevCard === cards.length - 1 ? 0 : prevCard + 1,
    );
  };

  return (
    <div className="flex items-center">
      <button
        onClick={moveLeft}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Left
      </button>
      <div className="flex space-x-4">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`w-32 h-32 border-2 border-gray-300 p-4 rounded ${
              index === currentCard ? 'opacity-100' : 'opacity-50'
            }`}
          >
            {card.content}
          </div>
        ))}
      </div>
      <button
        onClick={moveRight}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Right
      </button>
    </div>
  );
};

export default Slider;
