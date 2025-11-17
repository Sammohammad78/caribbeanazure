# @caribbean-azure/ui

Essential UI components library for Caribbean Azure, built on shadcn/ui principles with Tailwind CSS.

## Installation

This package is part of the Caribbean Azure monorepo. Install dependencies:

```bash
pnpm install
```

## Components

### Form Components

#### Button

A versatile button component with multiple variants and states.

```tsx
import { Button } from '@caribbean-azure/ui';

// Default button
<Button>Click me</Button>

// Variants
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// Loading state
<Button loading>Loading...</Button>
```

**Props:**
- `variant`: `default` | `outline` | `ghost` | `link`
- `size`: `sm` | `md` | `lg`
- `loading`: boolean
- `loadingIcon`: React.ReactNode (custom loading spinner)

#### Input

A text input component with error and disabled states.

```tsx
import { Input } from '@caribbean-azure/ui';

<Input placeholder="Enter text..." />
<Input error errorMessage="This field is required" />
<Input disabled />
```

**Props:**
- `error`: boolean
- `errorMessage`: string

#### Textarea

A textarea component for multi-line text input.

```tsx
import { Textarea } from '@caribbean-azure/ui';

<Textarea placeholder="Enter description..." />
<Textarea error errorMessage="Description is required" />
```

**Props:**
- `error`: boolean
- `errorMessage`: string

#### Label

A form label component with required indicator.

```tsx
import { Label } from '@caribbean-azure/ui';

<Label htmlFor="email">Email</Label>
<Label htmlFor="password" required>Password</Label>
<Label variant="muted">Optional field</Label>
```

**Props:**
- `variant`: `default` | `muted` | `error`
- `size`: `sm` | `md` | `lg`
- `required`: boolean

### Layout Components

#### Container

A responsive container component with max-width constraints.

```tsx
import { Container } from '@caribbean-azure/ui';

// Default (max-w-7xl)
<Container>Content</Container>

// Variants
<Container variant="narrow">Narrow content</Container>
<Container variant="wide">Wide content</Container>
<Container variant="full">Full width</Container>

// Custom gutter
<Container gutter="xl">Extra padding</Container>
```

**Props:**
- `variant`: `default` | `narrow` | `wide` | `full`
- `gutter`: `none` | `sm` | `md` | `lg` | `xl`
- `as`: `div` | `section` | `article` | `main`

#### Section

A section wrapper with vertical spacing and background variants.

```tsx
import { Section } from '@caribbean-azure/ui';

<Section spacing="lg" background="white">
  Content
</Section>

<Section spacing="md" background="brand">
  Brand section
</Section>
```

**Props:**
- `spacing`: `none` | `sm` | `md` | `lg` | `xl`
- `background`: `transparent` | `default` | `white` | `muted` | `brand` | `brand-light` | `dark`
- `as`: `section` | `div` | `article`

### Typography Components

#### Heading

Semantic heading component with responsive sizing.

```tsx
import { Heading } from '@caribbean-azure/ui';

<Heading as="h1">Page Title</Heading>
<Heading as="h2" weight="semibold">Section Title</Heading>
<Heading level="h3" weight="medium">Subsection</Heading>
```

**Props:**
- `as`: `h1` | `h2` | `h3` | `h4` | `h5` | `h6`
- `level`: `h1` | `h2` | `h3` | `h4` | `h5` | `h6` (for styling)
- `weight`: `light` | `normal` | `medium` | `semibold` | `bold` | `extrabold`

#### Text

A flexible text component with size and color variants.

```tsx
import { Text } from '@caribbean-azure/ui';

<Text>Default paragraph</Text>
<Text size="lg" color="muted">Large muted text</Text>
<Text as="span" color="brand" weight="semibold">Brand text</Text>
```

**Props:**
- `as`: `p` | `span` | `div` | `label`
- `size`: `xs` | `sm` | `base` | `lg` | `xl` | `2xl`
- `color`: `primary` | `secondary` | `muted` | `subtle` | `brand` | `success` | `error` | `warning` | `info`
- `weight`: `light` | `normal` | `medium` | `semibold` | `bold`
- `align`: `left` | `center` | `right` | `justify`

### Card Components

A set of composable card components.

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@caribbean-azure/ui';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

## Design System Integration

All components use:
- **Design Tokens**: CSS custom properties from `@caribbean-azure/design-tokens`
- **Utilities**: `cn()` function from `@caribbean-azure/utils` for className merging
- **Tailwind CSS**: For utility classes and responsive design

## Accessibility

All components include:
- Proper ARIA attributes
- Keyboard navigation support
- Focus management
- Screen reader support
- Semantic HTML

## TypeScript

All components are fully typed with TypeScript and support ref forwarding via `React.forwardRef`.

## Contributing

When adding new components:
1. Follow shadcn/ui patterns and conventions
2. Use design tokens from `@caribbean-azure/design-tokens`
3. Include proper TypeScript types
4. Add accessibility attributes
5. Support ref forwarding
6. Update this README

## License

MIT
