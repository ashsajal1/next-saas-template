# Next SaaS Template

The **Next SaaS Template** is a comprehensive starter kit for building scalable SaaS applications with Next.js, featuring built-in authentication, database integration, responsive design, efficient state management, pre-configured API routes, and developer tools like ESLint, Prettier, and TypeScript support.

## Features
- **Next.js**: Framework for server-side rendering, static site generation, and seamless API routes.
- **TypeScript**: For static typing and improved developer experience.
- **Clerk Authentication**: Built-in user authentication with support for various providers.
- **Database Integration**: Both Prisma and Drizzle are included. Choose one based on your preference and remove the other.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Shadcn**: Component library for React.
- **PWA Support**: Built-in Progressive Web App capabilities.

## Getting Started

### Installation

Clone the repository and install dependencies using your preferred package manager (npm, pnpm, or yarn):

```bash
git clone https://github.com/ashsajal1/next-saas-template.git
cd next-saas-template
npm install
# or
pnpm install
# or
yarn install
```

### Configuration

1. **Authentication**: Set up Clerk for user authentication.
2. **Database**: Choose either Prisma or Drizzle for your database needs. You cannot use both simultaneously, so:
   - If using Prisma: Remove Drizzle by deleting `db` directory and `drizzle.config.ts`. Also remove Drizzle dependencies from `package.json`.
   - If using Drizzle: Remove Prisma by deleting `prisma` directory and `src/lib/prisma.ts`. Also remove Prisma dependencies from `package.json`.

To switch between Prisma and Drizzle:
- For Prisma: Follow the setup instructions in the `prisma` folder.
- For Drizzle: Follow the setup instructions in the `drizzle` folder.

### PWA Assets Generation

Generate PWA assets using the following command:

```bash
npm run generate-pwa-assets
# or
pnpm run generate-pwa-assets
# or
yarn generate-pwa-assets
```

Replace `public/next.svg` with the path to your own logo if needed.

### Adding Payment Method (Stripe)

We welcome contributions to add a payment method using Stripe. Please refer to the [Contributing](#contributing) section for more details.

## Contributing

We welcome contributions to enhance the functionality of this template. Here’s how you can contribute:

1. **Fork the repository**
2. **Create a new branch** for your feature or bug fix:
    ```bash
    git checkout -b feature-name
    ```
3. **Commit your changes**:
    ```bash
    git commit -m 'Add some feature'
    ```
4. **Push to the branch**:
    ```bash
    git push origin feature-name
    ```
5. **Create a pull request** to the `main` branch.

### Contribution Guidelines

- **Feature Requests**: If you have a feature request, please open an issue to discuss it before starting work.
- **Bug Reports**: Report bugs by opening an issue.
- **Code Style**: Follow the existing code style and conventions.
- **Testing**: Ensure your code is well-tested.

## License

This project is licensed under the MIT License.
