import React from "react"

const ArrowIcon = ({ fill = "#332e54" }) => {
  return (
    <svg width="63" height="12" viewBox="0 0 63 12">
      <title id="down-arrow-title">Continue</title>
      <path
        fill={fill}
        fillRule="evenodd"
        d="M57.232 0L56.17 1.06l3.845 3.845H0v1.5h60.015L56.17 10.25l1.062 1.061 4.594-4.593h.001l1.061-1.06-.001-.002.001-.001-1.061-1.06h-.001z"
      ></path>
    </svg>
  )
}

export default ArrowIcon
