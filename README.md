# Mohammad Saeed - Portfolio

[![Deployment Status](https://img.shields.io/badge/deployment-live-brightgreen)](https://msaeedsaeedi.com)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://staging.imsaeedsaeedi.pages.dev)
[![Angular](https://img.shields.io/badge/Angular-20.3.0-red)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue)](https://www.typescriptlang.org)
[![Node.js](https://img.shields.io/badge/Node.js-24-green)](https://nodejs.org)

A modern, responsive portfolio website showcasing the professional profile, projects, skills, and experience of Mohammad Saeed - a full-stack developer specializing in SaaS platforms, dashboards, and cloud-native applications.

## 🚀 Live Demo

- **Production:** [https://msaeedsaeedi.com](https://msaeedsaeedi.com)
- **Staging:** [https://staging.imsaeedsaeedi.pages.dev](https://staging.imsaeedsaeedi.pages.dev)

## 🛠️ Technology Stack

### Frontend Framework
- **Angular** 20.3.0

### Development Tools
- **Angular CLI** 20.3.1
- **ESLint** 9.33.0 with Angular ESLint rules
- **Prettier** with custom configuration
- **Karma** & **Jasmine** for unit testing

### Runtime & Package Management
- **Node.js** 24 (required engine version)
- **pnpm** 10.15.1 (package manager)

### Deployment
- **Cloudflare Pages** for hosting and CDN
- **Automated builds** with environment-specific configurations

## 📋 Prerequisites

Before running this project locally, ensure you have the following installed:

- **Node.js** 24 or higher
- **pnpm** 10.15.1 or higher
- **Angular CLI** 20.3.1 or higher

## 🏃‍♂️ Getting Started

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/msaeedsaeedi/imsaeedsaeedi.git
   cd imsaeedsaeedi
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

### Development

1. **Start the development server:**
   ```bash
   pnpm start
   ```
   or
   ```bash
   ng serve
   ```

2. **Open your browser** and navigate to `http://localhost:4200/`

The application will automatically reload when you modify source files.

### Building

#### Development Build
```bash
pnpm run build
```

#### Production Build
```bash
ng build --configuration=production
```

#### Cloudflare Pages Build
```bash
pnpm run build:cloudflare
```

### Testing

#### Unit Tests
```bash
pnpm test
```

#### Linting
```bash
pnpm run lint
```

### Server-Side Rendering

To run the SSR server locally:

```bash
pnpm run build
pnpm run serve:ssr:msaeedsaeedi
```

## 🏗️ Project Architecture

This portfolio application follows Angular best practices and modern development patterns:

- **Standalone Components** - No NgModules, pure standalone architecture
- **Signal-based State Management** - Reactive state with Angular signals
- **Server-Side Rendering** - Enhanced SEO and performance
- **Responsive Design** - Mobile-first approach
- **Component-based Architecture** - Modular and reusable components

### Key Features

- **Interactive Sections:** Introduction, Professional Roles, Projects, Skills
- **Smooth Animations** and responsive design
- **SEO Optimized** with meta tags and structured data
- **Custom Scrollbar** and navigation components
- **Type-safe Development** with strict TypeScript configuration

## 🤝 Contributing

We welcome contributions to improve this portfolio project. Please follow these guidelines:

### Development Workflow

1. **Fork the repository** and create a new branch from `develop`
2. **Make your changes** following the coding standards below
3. **Test thoroughly** - ensure all tests pass
4. **Submit a pull request** with a clear description of changes

### Coding Standards

- **TypeScript:** Use strict type checking, avoid `any` type
- **Angular:** Follow Angular style guide and best practices
- **Components:** Keep components small and focused
- **Testing:** Write unit tests for new components and services
- **Linting:** Code must pass ESLint checks
- **Formatting:** Code must be formatted with Prettier

### Commit Convention

Follow conventional commit format:
```
type(scope): description

feat: add new skill section
fix: resolve mobile navigation issue
docs: update README
```

### Code Review Process

1. All pull requests require code review
2. Ensure CI checks pass (linting, testing, building)
3. Update documentation if necessary
4. Maintain backward compatibility
