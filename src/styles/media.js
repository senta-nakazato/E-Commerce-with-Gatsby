/*

https://hashimotosan.hatenablog.jp/entry/2019/05/28/164834

SmartPhone - 320〜559px
Tablet-  560〜959px
PC - more than 960px

Break Points
560px/960px

*/

// const screenSizes = {
//   xsm: "480px",
//   sm: " 760",
//   md: "992px",
//   lg: "1200px",
//   xlg: "1500px",
// }

const breakpoints = {
  phone_small: "320px",
  phone: "376px",
  phablet: "540",
  tablet: "735px",
  desktop: "1070px",
  desktop_medium: "1280px",
  desktop_large: "1440px",
}

const media = {
  phone_small: `@media screen and (max-width: ${breakpoints.phone_small})`,
  phone: `@media screen and (max-width: ${breakpoints.phone})`,
  phablet: `@media screen and (max-width: ${breakpoints.phablet})`,
  tablet: `@media screen and (max-width: ${breakpoints.tablet})`,
  desktop: `@media screen and (max-width: ${breakpoints.desktop})`,
  desktop_medium: `@media screen and (max-width: ${breakpoints.desktop_medium})`,
  desktop_large: `@media screen and (max-width: ${breakpoints.desktop_large})`,
  tablet_up: `@media screen and (min-width: ${breakpoints.tablet + 1})`,
  desktop_up: `@media screen and (min-width: ${breakpoints.desktop + 1})`,
}

export default media
