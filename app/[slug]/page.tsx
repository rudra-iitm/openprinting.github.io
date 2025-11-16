import fs from 'fs';
import path from 'path';
import { MarkdownRenderer } from '@/components/markdown-renderer';
import { notFound } from 'next/navigation';

// Generate static params for all markdown files
export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), 'contents/pages');
  
  // Check if directory exists
  if (!fs.existsSync(contentDir)) {
    return [];
  }
  
  const files = fs.readdirSync(contentDir);
  
  return files
    .filter(file => file.endsWith('.md'))
    .map(file => ({
      slug: file.replace('.md', '')
    }));
}

// Fetch markdown content for a specific slug
async function getMarkdownContent(slug: string) {
  const filePath = path.join(process.cwd(), 'contents/pages', `${slug}.md`);
  
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const fileContent = fs.readFileSync(filePath, 'utf8');
  return fileContent;
}

// Main page component
export default async function Page({ params }: { params: { slug: string } }) {
  const content = await getMarkdownContent(params.slug);
  
  // If no content found, show 404
  if (!content) {
    notFound();
  }
  
  return (
    <div className="min-h-screen py-8">
      <MarkdownRenderer content={content} />
    </div>
  );
}