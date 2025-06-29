
export interface Blog {
  title: string;
  slug: string;
  image: string;
  dataAiHint?: string;
  description: string; // This will hold the full blog content in Markdown format
  created: Date;
  metadesc: string;
  keyword: string;
}

export const mockBlogs: Blog[] = [
  {
    title: '5 Tips to Optimize Your Next.js App for SEO',
    slug: 'optimize-nextjs-seo',
    image: 'https://placehold.co/800x400.png',
    dataAiHint: 'seo optimization',
    description: `
### Introduction
Search Engine Optimization (SEO) is crucial for any website's success. For applications built with Next.js, there are several powerful techniques you can leverage to boost your search engine rankings.

### 1. Utilize Server-Side Rendering (SSR)
Next.js excels at SSR, which means search engine crawlers can see the fully rendered HTML content of your page. This is a huge advantage over client-side rendered (CSR) apps. Ensure your critical content is rendered on the server.

### 2. Master the <Head> Component and Metadata
Use the \`next/head\` component or the new Metadata API in the App Router to set unique titles, meta descriptions, and other important tags for each page. Dynamic metadata is key.

### 3. Implement a Sitemap
A sitemap helps search engines discover all the pages on your site. You can generate a dynamic sitemap using a route handler in Next.js, as we have done in this project.

### 4. Optimize Images with next/image
The \`next/image\` component automatically optimizes images, provides lazy loading, and serves them in modern formats like WebP. This improves page speed, a critical SEO factor.

### 5. Focus on Core Web Vitals
Pay attention to Largest Contentful Paint (LCP), First Input Delay (FID), and Cumulative Layout Shift (CLS). Next.js provides tools and features that help improve these metrics out of the box.
    `,
    created: new Date('2024-05-15T09:00:00Z'),
    metadesc: 'Learn 5 essential tips to optimize your Next.js application for better SEO performance, from server-side rendering to image optimization.',
    keyword: 'NextJS, SEO, Optimization, Web Development, JavaScript',
  },
  {
    title: 'Getting Started with Tailwind CSS in React',
    slug: 'getting-started-tailwind-css-react',
    image: 'https://placehold.co/800x400.png',
    dataAiHint: 'css framework',
    description: `
### What is Tailwind CSS?
Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs without ever leaving your HTML. It's a different approach compared to frameworks like Bootstrap or Foundation.

### Setting up in a React Project
1.  **Installation:** Start by adding Tailwind CSS and its peer dependencies to your project: \`npm install -D tailwindcss postcss autoprefixer\`.
2.  **Configuration:** Generate your \`tailwind.config.js\` and \`postcss.config.js\` files using \`npx tailwindcss init -p\`.
3.  **Configure Paths:** In your \`tailwind.config.js\`, configure the \`content\` array to include the paths to all of your template files.
4.  **Import Directives:** Add the Tailwind directives to your main CSS file:
    \`\`\`css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    \`\`\`

### Conclusion
Tailwind CSS can dramatically speed up your development process once you get used to the utility-first workflow. It allows for rapid UI development and high customizability.
    `,
    created: new Date('2024-05-10T14:30:00Z'),
    metadesc: 'A beginner-friendly guide to setting up and using Tailwind CSS in your React projects for rapid and custom UI development.',
    keyword: 'Tailwind CSS, React, CSS, Frontend, Web Development',
  },
  {
    title: 'Why We Chose ShadCN for Our UI Components',
    slug: 'why-we-chose-shadcn-ui',
    image: 'https://placehold.co/800x400.png',
    dataAiHint: 'ui components',
    description: `
### The Modern Component Library
ShadCN UI is not a traditional component library. Instead of a package of pre-styled components, it gives you beautifully designed components that you can copy and paste into your app.

### Key Advantages
*   **Ownership:** You own the code. The components are part of your codebase, so you can modify them as much as you need.
*   **Accessibility:** Built on top of Radix UI, ShadCN components are accessible out of the box.
*   **Customization:** Styling is done with Tailwind CSS, making it incredibly easy to match the components to your brand's design system.
*   **Tree-shaking:** Since you only use the components you need, you don't have to worry about bundling unused code.

This project heavily utilizes ShadCN components for its UI, from buttons and cards to dialogs and forms. It allows for a consistent look and feel while maintaining full control over the code.
    `,
    created: new Date('2024-05-01T11:00:00Z'),
    metadesc: 'An exploration of the benefits of using ShadCN UI for building modern, accessible, and highly customizable user interfaces.',
    keyword: 'ShadCN, UI, Components, React, Tailwind CSS, Radix UI',
  },
];
