import React from "react"

const ArrowLeftIcon = ({ fill = "#332e54" }) => {
  return (
    <svg width="24" height="24">
      <rect width="24" height="24" fill="none" rx="0" ry="0" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.1199 12.0025L16.0599 7.0625C16.6499 6.4725 16.6499 5.5225 16.0599 4.9425C15.4699 4.3525 14.5199 4.3525 13.9399 4.9425L7.93994 10.9425C7.34994 11.5325 7.34994 12.4825 7.93994 13.0625L13.9399 19.0625C14.2299 19.3525 14.6199 19.5025 14.9999 19.5025C15.3799 19.5025 15.7699 19.3525 16.0599 19.0625C16.6499 18.4725 16.6499 17.5225 16.0599 16.9425L11.1199 12.0025Z"
        fill={fill}
      />
    </svg>
  )
}

export default ArrowLeftIcon
