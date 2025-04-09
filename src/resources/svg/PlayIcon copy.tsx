interface IProps {
  color?: string;
  width?: string;
  height?: string;
}

export default function PlayIcon() {
  return (
    <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M3.33325 3.32764C3.33325 2.6802 3.33325 2.35648 3.46825 2.17803C3.58585 2.02257 3.7656 1.92637 3.96018 1.91475C4.18354 1.90142 4.45289 2.08099 4.9916 2.44012L12.002 7.1137C12.4471 7.41045 12.6697 7.55883 12.7472 7.74584C12.815 7.90935 12.815 8.0931 12.7472 8.2566C12.6697 8.44362 12.4471 8.59199 12.002 8.88874L4.9916 13.5623C4.45289 13.9215 4.18354 14.101 3.96018 14.0877C3.7656 14.0761 3.58585 13.9799 3.46825 13.8244C3.33325 13.646 3.33325 13.3222 3.33325 12.6748V3.32764Z'
        stroke='white'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
