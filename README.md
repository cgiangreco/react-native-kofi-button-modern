# react-native-kofi-button-modern [![License: MIT](https://img.shields.io/badge/License-MIT-%23A30000.svg)](LICENSE)

A clean, customizable Ko-fi support button for React Native with the new rounded Ko-fi logo feel. Drop it into any app to let visitors support you on Ko-fi, styled to match Ko-fi's branding out of the box but tweakable to fit your design.

The button includes a dismissible close (X) button by default, which can be disabled.

## Installation

```bash
npm install react-native-kofi-button-modern
```

## Usage

```jsx
import KofiButton from "react-native-kofi-button-modern";

export default function App() {
  return (
    <>
      {/* your app */}
      <KofiButton kofiId="YOUR_KOFI_ID" />
    </>
  );
}
```

By default, the button renders as a floating pill near the bottom of the screen with an animated Ko-fi cup icon.

## Props

| Prop           | Type      | Default                 | Description                                                                |
| -------------- | --------- | ----------------------- | -------------------------------------------------------------------------- |
| `kofiId`       | `string`  | **required**            | Your Ko-fi ID (from `ko-fi.com/YOUR_ID`)                                   |
| `color`        | `string`  | `"#72a4f2"`             | Background color of the button                                             |
| `label`        | `string`  | `"Support me on Ko-fi"` | Button text                                                                |
| `useSeparator` | `boolean` | `false`                 | If true, shows a visual separator between the button text and close button |
| `dismissible`  | `boolean` | `true`                  | Whether to show the close (X) button and allow dismissing the component    |
| `dismissable`  | `boolean` | `undefined`             | Backward-compatible alias for `dismissible`                                |

## Examples

### Non-dismissible button

```jsx
<KofiButton kofiId="YOUR_KOFI_ID" dismissible={false} />
```

### Custom color and label

```jsx
<KofiButton
  kofiId="YOUR_KOFI_ID"
  color="#ff5e5b"
  label="Buy me a coffee"
/>
```

### With separator

```jsx
<KofiButton kofiId="YOUR_KOFI_ID" useSeparator />
```

## Development

```bash
git clone https://github.com/cgiangreco/react-native-kofi-button-modern
cd react-native-kofi-button-modern
npm install
```

## License

MIT
