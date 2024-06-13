import React from 'react';
import Link from 'next/link';
import styles from './button.module.css';

interface ButtonProps {
  label: string;
  link: string;
}

const Button: React.FC<ButtonProps> = ({ label, link}) => {
  return (
    <Link href={link} className={styles.link}>
      <div className={styles.button}>
        {label}
      </div>
    </Link>
  );
};

export default Button;