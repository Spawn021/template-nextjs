interface IProps {
  color?: string
  width?: string
  height?: string
}

export default function CardIcon(props: IProps) {
  const { color = '#00AAF2', width = '24', height = '24' } = props
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 10.002H2M11 14.002H6M2 8.20195L2 15.802C2 16.9221 2 17.4821 2.21799 17.9099C2.40973 18.2863 2.71569 18.5922 3.09202 18.784C3.51984 19.002 4.07989 19.002 5.2 19.002L18.8 19.002C19.9201 19.002 20.4802 19.002 20.908 18.784C21.2843 18.5922 21.5903 18.2863 21.782 17.9099C22 17.4821 22 16.9221 22 15.802V8.20195C22 7.08185 22 6.5218 21.782 6.09397C21.5903 5.71765 21.2843 5.41169 20.908 5.21994C20.4802 5.00195 19.9201 5.00195 18.8 5.00195L5.2 5.00195C4.0799 5.00195 3.51984 5.00195 3.09202 5.21994C2.7157 5.41169 2.40973 5.71765 2.21799 6.09397C2 6.5218 2 7.08185 2 8.20195Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
