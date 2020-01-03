import merge from "lodash/merge"

import colors from "./colors"

const breakpoints = [
  ["phone_small", 320],
  ["phone", 376],
  ["phablet", 540],
  ["tablet", 735],
  ["desktop", 1070],
  ["desktop_medium", 1280],
  ["desktop_large", 1440],
]

const heading = {
  fontWeight: "bold",
}

const transitions = {
  button: "opacity 0.4s var(--ease-in-out-quad)",
}

export default merge({
  breakpoints,
  colors,
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fonts: {
    serif: "'Merriweather', Georgia, Serif",
    sansSerif:
      "'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'San Francisco', 'Helvetica Neue', 'Helvetica', 'Ubuntu', 'Roboto', 'Noto', 'Segoe UI', 'Arial', sans-serif",
    monospace: `"Operator Mono", Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace`,
  },
  styles: {
    h1: {
      ...heading,
      fontSize: 24,
    },
    h2: {
      ...heading,
      fontSize: 20,
    },
    h3: {
      ...heading,
      fontSize: 16,
    },
    h4: {
      ...heading,
      fontSize: 16,
    },
    h5: {
      ...heading,
      fontSize: 1,
    },
    h6: {
      ...heading,
      fontSize: 0,
    },
  },
  transitions,
})
