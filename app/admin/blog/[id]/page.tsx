import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import EditPostForm from './EditPostForm';

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      category: true,
    },
  });

  if (!post) {
    notFound();
  }

  return <EditPostForm post={post} />;
}
