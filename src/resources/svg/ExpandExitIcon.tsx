import React from 'react';
interface IProps {
  color?: string;
  width?: string;
  height?: string;
}

export default function ExpandExitIcon(props: IProps) {
  const { width = '20', height = '20', color = 'white' } = props;
  return (
    <svg width={width} height={height} viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M0.854004 15.3346H4.854V19.3346H7.52067V12.668H0.854004V15.3346ZM4.854 4.66797H0.854004V7.33463H7.52067V0.667969H4.854V4.66797ZM12.854 19.3346H15.5207V15.3346H19.5207V12.668H12.854V19.3346ZM15.5207 4.66797V0.667969H12.854V7.33463H19.5207V4.66797H15.5207Z'
        fill={color}
      />
    </svg>
  );
}
