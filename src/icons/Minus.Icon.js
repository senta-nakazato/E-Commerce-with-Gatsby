import React from "react"

const MinusIcon = ({ fill = "#332e54" }) => {
  return (
    <svg width="24" height="24">
      <rect width="24" height="24" fill="none" rx="0" ry="0" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21 13H3C2.45 13 2 12.55 2 12C2 11.45 2.45 11 3 11H21C21.55 11 22 11.45 22 12C22 12.55 21.55 13 21 13Z"
        fill={fill}
      />
    </svg>
  )
}

export default MinusIcon
