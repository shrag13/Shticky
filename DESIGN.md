# Shticky Design System

This document outlines the complete visual design system for Shticky, a QR code monetization platform. Follow these guidelines to maintain visual consistency across all pages and future development.

## Brand Identity

### Core Design Principles

1. **Professional & Trustworthy**: Maintain a serious, enterprise-level appearance that builds user confidence
2. **Modern Glassmorphism**: Utilize liquid glass effects for a contemporary, premium feel
3. **High Contrast**: Ensure excellent readability with strong text contrast ratios
4. **Consistent Experience**: Apply uniform styling across user and admin interfaces while maintaining appropriate tone for each

### Tone & Voice

- **User-Facing Pages**: Welcoming, clear, and professional without excessive playfulness
- **Admin Interfaces**: Serious, enterprise-level appearance with functional focus
- **Messaging**: Simple, everyday language for non-technical users

## Color Palette

### Primary Brand Colors

```css
/* Beaver - Primary accent color */
--beaver: #A89182;
--beaver-hsl: hsl(28, 18%, 58%);

/* Antiflash White - Primary background */
--antiflash-white: #EFEFEE;
--antiflash-white-hsl: hsl(60, 3%, 94%);

/* Dark Green - Primary dark accent */
--dark-green: #1D2915;
--dark-green-hsl: hsl(98, 31%, 13%);

/* Ebony - Secondary dark accent */
--ebony: #686346;
--ebony-hsl: hsl(48, 19%, 34%);

/* Night - Darkest shade */
--night: #040D07;
--night-hsl: hsl(140, 43%, 3%);

/* Chamoisee - Secondary accent */
--chamoisee: #9A7B60;
--chamoisee-hsl: hsl(26, 24%, 49%);
```

### Usage Guidelines

- **Primary Backgrounds**: Use `antiflash-white` for main page backgrounds
- **Text on Light Backgrounds**: Use `dark-green` or `night` for strong contrast
- **Accents & Highlights**: Use `beaver` and `chamoisee` for buttons, links, and important elements
- **Dark Sections**: Use `ebony` or `dark-green` for footer, headers, or contrasting sections

### Text Contrast Requirements

**Critical**: Always use sufficient contrast for readability
- ✅ **Use**: `text-gray-800` or darker for body text
- ❌ **Avoid**: `text-gray-600` or lighter (insufficient contrast)
- Minimum contrast ratio: 4.5:1 for normal text, 3:1 for large text

## Typography System

### Font Families

```css
/* Primary Font Stack */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 
             'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 
             'Helvetica Neue', sans-serif;
```

### Type Scale

| Element | Size | Weight | Usage |
|---------|------|--------|-------|
| H1 | 3rem (48px) | 700 | Page titles, hero sections |
| H2 | 2.25rem (36px) | 600 | Section headers |
| H3 | 1.875rem (30px) | 600 | Subsection headers |
| H4 | 1.5rem (24px) | 600 | Card titles |
| Body Large | 1.125rem (18px) | 400 | Important body text |
| Body | 1rem (16px) | 400 | Standard body text |
| Small | 0.875rem (14px) | 400 | Captions, labels |

### Typography Guidelines

- Use consistent heading hierarchy (don't skip levels)
- Maintain comfortable line height (1.5-1.7 for body text)
- Keep line length between 50-75 characters for optimal readability

## Liquid Glass Theme

### Glassmorphism Effects

The signature visual style of Shticky uses glassmorphism to create depth and visual interest.

#### Standard Glass Card

```css
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
}
```

#### Hero Glass Panel

```css
.glass-hero {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
}
```

#### Subtle Glass Overlay

```css
.glass-overlay {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

### When to Use Glassmorphism

✅ **Use for**:
- Landing page hero sections
- Authentication pages (sign-in, application)
- Featured content cards
- Modal dialogs and overlays
- Premium feature highlights

❌ **Avoid for**:
- Admin panels (use solid backgrounds)
- Dense data tables
- Form inputs (use standard solid backgrounds)
- Small UI elements (buttons, badges)

## UI Components

### Buttons

#### Primary Button

```tsx
<Button className="bg-beaver hover:bg-chamoisee text-white font-medium 
                   px-6 py-2.5 rounded-lg transition-all duration-200 
                   shadow-md hover:shadow-lg">
  Primary Action
</Button>
```

#### Secondary Button

```tsx
<Button className="bg-white text-dark-green border-2 border-beaver 
                   hover:bg-antiflash-white font-medium px-6 py-2.5 
                   rounded-lg transition-all duration-200">
  Secondary Action
</Button>
```

#### Ghost Button

```tsx
<Button className="text-beaver hover:text-chamoisee hover:bg-white/10 
                   font-medium px-6 py-2.5 rounded-lg transition-all duration-200">
  Ghost Action
</Button>
```

### Cards

#### Standard Content Card

```tsx
<div className="bg-white rounded-xl shadow-md border border-gray-200 
                p-6 hover:shadow-lg transition-shadow duration-200">
  {/* Card content */}
</div>
```

#### Glass Effect Card

```tsx
<div className="bg-white/10 backdrop-blur-md border border-white/20 
                rounded-xl shadow-lg p-6">
  {/* Card content */}
</div>
```

#### Sticker Card (with wrinkled paper texture)

```tsx
<div className="relative rounded-xl overflow-hidden shadow-lg 
                hover:shadow-xl transition-all duration-300">
  {/* Background texture */}
  <img src={stickerTexture} className="absolute inset-0 w-full h-full 
                                        object-cover opacity-90" />
  
  {/* Dark overlay for text contrast */}
  <div className="absolute inset-0 bg-gradient-to-b 
                  from-black/40 via-black/50 to-black/60" />
  
  {/* Content with strong contrast */}
  <div className="relative z-10 p-6 text-white">
    <h3 className="text-2xl font-bold text-white drop-shadow-lg">
      Sticker Content
    </h3>
  </div>
</div>
```

### Form Inputs

#### Text Input

```tsx
<Input className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-300 
                  focus:border-beaver focus:ring-2 focus:ring-beaver/20 
                  transition-all duration-200 bg-white text-gray-800" />
```

#### Select Dropdown

```tsx
<Select>
  <SelectTrigger className="w-full px-4 py-2.5 rounded-lg border-2 
                            border-gray-300 focus:border-beaver 
                            focus:ring-2 focus:ring-beaver/20">
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    {/* Select items */}
  </SelectContent>
</Select>
```

### Navigation

#### Top Navigation Bar

- Fixed position at top
- White or glass background depending on page
- Logo on left, navigation links center, user actions right
- Responsive hamburger menu on mobile

#### Sidebar Navigation (Admin)

- Fixed left sidebar
- Solid background (no glass effects)
- Clear section grouping
- Active state highlighting
- Icon + text labels

### Status Indicators

#### Success State

```tsx
<div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
  <div className="flex items-center">
    <CheckCircle className="text-green-500 mr-3" />
    <p className="text-green-800">Success message</p>
  </div>
</div>
```

#### Warning State

```tsx
<div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
  <div className="flex items-center">
    <AlertTriangle className="text-yellow-600 mr-3" />
    <p className="text-yellow-800">Warning message</p>
  </div>
</div>
```

#### Error State

```tsx
<div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
  <div className="flex items-center">
    <XCircle className="text-red-500 mr-3" />
    <p className="text-red-800">Error message</p>
  </div>
</div>
```

#### Info/Notification Bar

```tsx
<div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4">
  <div className="flex items-center">
    <AlertCircle className="text-yellow-700 mr-3" />
    <p className="text-yellow-800 font-medium">Important information</p>
  </div>
</div>
```

## Layout System

### Container Widths

```css
/* Maximum content width */
.container-max {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Narrow content (forms, articles) */
.container-narrow {
  max-width: 640px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Wide content (dashboards) */
.container-wide {
  max-width: 1536px;
  margin: 0 auto;
  padding: 0 1.5rem;
}
```

### Spacing Scale

Use Tailwind's spacing scale consistently:

| Value | Pixels | Usage |
|-------|--------|-------|
| 1 | 4px | Tiny gaps |
| 2 | 8px | Small spacing |
| 4 | 16px | Default spacing |
| 6 | 24px | Medium spacing |
| 8 | 32px | Large spacing |
| 12 | 48px | Section spacing |
| 16 | 64px | Large section spacing |
| 24 | 96px | Page section spacing |

### Responsive Breakpoints

```css
/* Mobile first approach */
sm: 640px   /* Small devices */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large screens */
```

## Accessibility Guidelines

### Color Contrast

- Ensure WCAG AA compliance (4.5:1 for normal text)
- Test all color combinations with contrast checker
- Never rely on color alone to convey information

### Focus States

All interactive elements must have visible focus states:

```css
.focus-visible {
  outline: 2px solid var(--beaver);
  outline-offset: 2px;
}
```

### Keyboard Navigation

- All interactive elements must be keyboard accessible
- Maintain logical tab order
- Provide skip links for navigation
- Ensure modals trap focus appropriately

### Screen Readers

- Use semantic HTML elements
- Provide alt text for all images
- Use ARIA labels where semantic HTML is insufficient
- Ensure proper heading hierarchy

### Interactive Elements

All interactive elements require `data-testid` attributes:

```tsx
{/* Buttons */}
<button data-testid="button-submit">Submit</button>

{/* Inputs */}
<input data-testid="input-email" />

{/* Links */}
<a data-testid="link-dashboard">Dashboard</a>

{/* Dynamic lists */}
{items.map(item => (
  <div key={item.id} data-testid={`card-item-${item.id}`}>
    {item.name}
  </div>
))}
```

## Dark Mode

Currently, Shticky uses a light-only theme. If dark mode is implemented in the future:

1. Define dark mode color variables in CSS
2. Use `darkMode: ["class"]` in tailwind.config.ts
3. Apply dark variants to all components: `bg-white dark:bg-gray-900`
4. Maintain same contrast ratios in dark mode
5. Test glassmorphism effects against dark backgrounds

## Animation & Transitions

### Standard Transitions

```css
/* Default transition for interactive elements */
transition: all 200ms ease-in-out;

/* Hover effects */
transition: transform 200ms ease-in-out, box-shadow 200ms ease-in-out;

/* Page transitions */
transition: opacity 300ms ease-in-out;
```

### Hover Effects

- Cards: Increase shadow, subtle lift (transform: translateY(-2px))
- Buttons: Darken background, increase shadow
- Links: Color change, underline animation
- Images: Subtle zoom (transform: scale(1.05))

### Animation Principles

- Keep animations subtle and purposeful
- Duration: 150-300ms for most interactions
- Use ease-in-out for smooth, natural motion
- Respect user's motion preferences (prefers-reduced-motion)

## Page-Specific Guidelines

### Landing Page

- Hero section with liquid glass panel
- Large, compelling headline
- Clear value proposition
- Strong call-to-action buttons
- Visual hierarchy guiding to application
- Trust indicators (if available)

### Authentication Pages (Sign In, Apply)

- Centered layout with narrow container
- Glass effect background panel
- Clear form labels with good contrast
- Prominent submit button
- Helpful error messages
- Link to alternative action (sign in ↔ apply)

### Dashboard

- Solid white background (no glass effects)
- Clear data visualization
- Card-based layout for different sections
- Responsive grid system
- Quick action buttons
- Status indicators for important information

### Admin Panel

- Professional, enterprise appearance
- No glassmorphism effects
- Solid backgrounds throughout
- Dense data tables with clear hierarchy
- Filtering and search capabilities
- Action buttons clearly labeled
- Confirmation dialogs for destructive actions

## Assets & Media

### Sticker Textures

- Wrinkled paper texture with light/white background
- Apply dark gradient overlay for text readability
- Use `object-cover` to fill container
- Maintain aspect ratio

### Logo Usage

- Primary logo for navigation header
- Favicon matches logo for brand consistency
- Maintain clear space around logo
- Don't stretch or distort logo

### Icons

- Primary: Lucide React for UI icons
- Secondary: React Icons (Simple Icons) for company logos
- Consistent sizing within context
- Appropriate color contrast

## Implementation Checklist

When creating new pages or components:

- [ ] Use brand colors from palette
- [ ] Ensure text contrast meets requirements (gray-800 minimum)
- [ ] Apply appropriate glassmorphism if user-facing
- [ ] Use solid backgrounds for admin interfaces
- [ ] Add proper spacing using defined scale
- [ ] Include hover states for interactive elements
- [ ] Add `data-testid` attributes to interactive elements
- [ ] Test keyboard navigation
- [ ] Verify responsive behavior at all breakpoints
- [ ] Use semantic HTML elements
- [ ] Add appropriate ARIA labels
- [ ] Test with screen reader
- [ ] Ensure all images have alt text
- [ ] Maintain consistent typography hierarchy

## Future Considerations

### Potential Enhancements

- Micro-interactions for engagement
- Custom illustrations matching brand style
- Motion design system
- Component library documentation
- Design tokens for easier theming
- Dark mode implementation

### Maintenance

- Review design consistency quarterly
- Update color palette if brand evolves
- Gather user feedback on accessibility
- Monitor contrast ratios during updates
- Keep component documentation current

---

**Last Updated**: November 5, 2025  
**Version**: 1.0  
**Maintained By**: Development Team
