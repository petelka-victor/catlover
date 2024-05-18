import React from 'react';
import { Button as ButtonFlowbite, Spinner } from 'flowbite-react';

interface ButtonProps {
  onClick?: React.ComponentProps<'button'>['onClick'];
  color?: React.ComponentProps<typeof ButtonFlowbite>['color'];
  size?: React.ComponentProps<typeof ButtonFlowbite>['color'];
  isLoading?: boolean;
}

export const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  children,
  onClick,
  isLoading,
  color,
  size,
}) => {
  return (
    <ButtonFlowbite color={color} onClick={onClick} disabled={isLoading} size={size}>
      {isLoading ? (
        <>
          <div className="mr-3">
            <Spinner size="sm" light={true} />
          </div>
        </>
      ) : (
        children
      )}
    </ButtonFlowbite>
  );
};
