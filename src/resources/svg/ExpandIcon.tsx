import React from 'react';

function ExpandIcon(props: any) {
  return (
    <svg
      width={props?.width || '21'}
      height={props?.height || '20'}
      viewBox='0 0 21 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M17.6875 11.6667V13.5C17.6875 14.9001 17.6875 15.6002 17.415 16.135C17.1753 16.6054 16.7929 16.9878 16.3225 17.2275C15.7877 17.5 15.0876 17.5 13.6875 17.5H11.8542M8.52083 2.5H6.6875C5.28737 2.5 4.5873 2.5 4.05252 2.77248C3.58212 3.01217 3.19967 3.39462 2.95998 3.86502C2.6875 4.3998 2.6875 5.09987 2.6875 6.5V8.33333M12.6875 7.5L17.6875 2.5M17.6875 2.5H12.6875M17.6875 2.5V7.5M7.6875 12.5L2.6875 17.5M2.6875 17.5H7.6875M2.6875 17.5L2.6875 12.5'
        stroke={props?.stroke || 'white'}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export default ExpandIcon;
