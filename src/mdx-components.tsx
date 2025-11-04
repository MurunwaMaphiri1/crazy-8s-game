import type { MDXComponents } from 'mdx/types';

const components = {
    h1: ({ children }) => (
        <h1 className="font-semibold text-[20px] mb-4 text-white">{children}</h1>
    ),
    p: ({ children }) => (
        <p className='mb-4'>{children}</p>
    )
} satisfies MDXComponents

export function useMDXComponents(): MDXComponents {
    return components;
}