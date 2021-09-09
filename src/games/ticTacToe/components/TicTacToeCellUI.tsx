import React, { useCallback } from 'react';

export const TicTacToeCellUI: React.FC<{
  row: number;
  col: number;
  value: string | null;
  onClick?: (row: number, col: number) => void;
}> = ({
  row,
  col,
  value,
  onClick,
}) => {
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick(row, col);
    }
  }, [row, col, onClick]);
  return (
    <span onClick={handleClick}>
      {value}
    </span>
  );
};
