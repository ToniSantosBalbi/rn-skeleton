# rn-skeleton

A highly customizable skeleton loading component for React Native with support for complex layouts, animations, and theming.

## Features

- 🎨 **Customizable layouts** - Define complex skeleton structures with nested components
- 🌙 **Dark mode support** - Automatic color adaptation based on device theme
- ✨ **Multiple animations** - Shiver, pulse, or no animation
- 🎯 **TypeScript support** - Fully typed components and props
- 📱 **React Native compatible** - Works with Expo and bare React Native projects
- 🚀 **Performance optimized** - Smooth animations with native driver support

## Installation

```bash
npm install rn-skeleton react-native-linear-gradient
```

### iOS Setup (if not using Expo)

```bash
cd ios && pod install
```

### Android Setup (if not using Expo)

For React Native 0.60+, auto-linking should handle the setup. For older versions, follow the [react-native-linear-gradient installation guide](https://github.com/react-native-linear-gradient/react-native-linear-gradient#installation).

## Usage

### Basic Usage

```tsx
import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { SkeletonContent } from 'rn-skeleton'

const MyComponent = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => setIsLoading(false), 2000)
  }, [])

  return (
    <SkeletonContent
      isLoading={isLoading}
      layout={[
        { key: 'title', width: '80%', height: 20, marginBottom: 10 },
        { key: 'subtitle', width: '60%', height: 16, marginBottom: 20 },
        { key: 'content', width: '100%', height: 100 }
      ]}
    >
      <View>
        <Text>My Title</Text>
        <Text>My Subtitle</Text>
        <Text>My Content...</Text>
      </View>
    </SkeletonContent>
  )
}
```

### Complex Layout Example

```tsx
import { SkeletonContent } from 'rn-skeleton'

const ComplexSkeletonExample = () => {
  const layout = [
    {
      key: 'header',
      width: '100%',
      height: 60,
      flexDirection: 'row' as const,
      children: [
        {
          key: 'avatar',
          width: 50,
          height: 50,
          borderRadius: 25,
          marginRight: 15
        },
        {
          key: 'userInfo',
          width: '70%',
          height: 50,
          flexDirection: 'column' as const,
          justifyContent: 'space-between' as const,
          children: [
            { key: 'name', width: '80%', height: 16 },
            { key: 'time', width: '50%', height: 12 }
          ]
        }
      ]
    },
    {
      key: 'content',
      width: '100%',
      height: 200,
      marginTop: 20,
      borderRadius: 8
    }
  ]

  return (
    <SkeletonContent
      isLoading={true}
      layout={layout}
      animationType='shiver'
      animationDirection='horizontalRight'
    />
  )
}
```

### Simple List Skeleton

```tsx
import { SkeletonLoadingComponent } from 'rn-skeleton'

const ListSkeleton = () => {
  return (
    <SkeletonLoadingComponent
      quantity={5}
      width='100%'
      height={60}
      marginBetween={10}
      paddingHorizontal={20}
      paddingVertical={10}
    />
  )
}
```

## API Reference

### SkeletonContent Props

| Prop                 | Type                            | Default             | Description                          |
| -------------------- | ------------------------------- | ------------------- | ------------------------------------ |
| `isLoading`          | `boolean`                       | `true`              | Whether to show skeleton or children |
| `layout`             | `SkeletonLayoutItem[]`          | `[]`                | Array of skeleton layout items       |
| `animationType`      | `'none' \| 'shiver' \| 'pulse'` | `'shiver'`          | Type of animation                    |
| `animationDirection` | `string`                        | `'horizontalRight'` | Direction of shiver animation        |
| `duration`           | `number`                        | `1200`              | Animation duration in milliseconds   |
| `containerStyle`     | `ViewStyle`                     | `undefined`         | Style for container view             |
| `boneColor`          | `string`                        | Auto (theme-based)  | Base skeleton color                  |
| `highlightColor`     | `string`                        | Auto (theme-based)  | Highlight color for animation        |
| `children`           | `React.ReactNode`               | `undefined`         | Content to show when not loading     |

### SkeletonLayoutItem

| Property         | Type                    | Description                    |
| ---------------- | ----------------------- | ------------------------------ |
| `key`            | `string`                | Unique identifier for the item |
| `width`          | `number \| string`      | Width of the skeleton item     |
| `height`         | `number \| string`      | Height of the skeleton item    |
| `marginLeft`     | `number?`               | Left margin                    |
| `marginRight`    | `number?`               | Right margin                   |
| `marginTop`      | `number?`               | Top margin                     |
| `marginBottom`   | `number?`               | Bottom margin                  |
| `borderRadius`   | `number?`               | Border radius (default: 4)     |
| `children`       | `SkeletonLayoutItem[]?` | Nested skeleton items          |
| `flexDirection`  | `'row' \| 'column'?`    | Flex direction for children    |
| `alignItems`     | `string?`               | Align items property           |
| `justifyContent` | `string?`               | Justify content property       |

### SkeletonLoadingComponent Props

| Prop                | Type               | Default  | Description              |
| ------------------- | ------------------ | -------- | ------------------------ |
| `quantity`          | `number`           | Required | Number of skeleton items |
| `width`             | `number \| string` | Required | Width of each item       |
| `height`            | `number \| string` | Required | Height of each item      |
| `marginBetween`     | `number`           | Required | Margin between items     |
| `paddingHorizontal` | `number?`          | `16`     | Horizontal padding       |
| `paddingVertical`   | `number?`          | `16`     | Vertical padding         |

## Animation Types

### Shiver

A shimmer effect that moves across the skeleton items.

```tsx
<SkeletonContent
  animationType='shiver'
  animationDirection='horizontalRight'
  // ... other props
/>
```

### Pulse

A pulsing opacity effect.

```tsx
<SkeletonContent
  animationType='pulse'
  // ... other props
/>
```

### None

No animation, static skeleton.

```tsx
<SkeletonContent
  animationType='none'
  // ... other props
/>
```

## Animation Directions (for Shiver)

- `horizontalLeft` - Left to right
- `horizontalRight` - Right to left
- `verticalTop` - Top to bottom
- `verticalDown` - Bottom to top
- `diagonalDownRight` - Diagonal top-left to bottom-right
- `diagonalTopLeft` - Diagonal bottom-right to top-left
- `diagonalTopRight` - Diagonal bottom-left to top-right
- `diagonalDownLeft` - Diagonal top-right to bottom-left

## Theming

The component automatically adapts to light/dark mode based on the device's color scheme. You can override the colors:

```tsx
<SkeletonContent
  boneColor='#E1E9EE'
  highlightColor='#F2F8FC'
  // ... other props
/>
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT © [Toni Santos Balbi](https://github.com/ToniSantosBalbi)

## Support

If you find this package useful, please consider giving it a ⭐ on [GitHub](https://github.com/ToniSantosBalbi/rn-skeleton)!
