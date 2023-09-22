/* eslint-disable react/button-has-type */
import React, { FC, ReactComponentElement, ReactNode } from 'react';
import styles from './UniversalButton.module.scss';

interface IUniversalButton extends React.ComponentPropsWithoutRef<'button'> {
  width?: string | number;
  height?: string | number;
  className?: string;
  buttonStyle?: 'filledGreen' | 'borderGreen' | 'borderBlack' | 'borderNone';
  icon?: ReactComponentElement<FC> | null;
  children: ReactNode;
}

const UniversalButton: React.FC<IUniversalButton> = ({
  width,
  height,
  type = 'submit',
  className = '', 
  buttonStyle = 'filledGreen',
  icon = null,
  children,
  ...rest
}) => {
  const buttonStyleClass = (style) => {
    switch (true) {
      case style === 'borderGreen':
        return styles.universalButton_border_green;

      case style === 'borderBlack':
        return styles.universalButton_border_black;

      case style === 'borderNone':
        return styles.universalButton_border_none;

      default:
        return styles.universalButton_filled_green;
    }
  };

  const widthValue = (width === 'max-content' || width === 'min-content') ? width : `${String(width)}px`;
  
  return (
    <button
      type={type}
      style={{ maxWidth: widthValue, height: `${String(height)}px` }}
      className={`${styles.universalButton} ${buttonStyleClass(buttonStyle)} ${className}`}
      {...rest}>

      {children}
      {icon}

    </button>
  );
};

UniversalButton.defaultProps = {
  width: 484,
  height: 48,
  className: '',
  buttonStyle: 'filledGreen',
  icon: null,
};

export default UniversalButton;
