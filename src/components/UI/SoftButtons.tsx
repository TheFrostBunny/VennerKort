import React from 'react';

// Definerer typene for button props
interface ButtonProps {
  className: string;
  label: string;
}

interface ButtonGroupProps {
  buttons: ButtonProps[];
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ buttons }) => {
  return (
    <div>
      {buttons.map((button, index) => (
        <button key={index} className={button.className}>
          {button.label}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;
