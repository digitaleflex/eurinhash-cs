import prismaApi from '@/lib/prisma-api';
import { notFound } from 'next/navigation';
import EditPostForm from './EditPostForm';

const prisma = prismaApi;

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const post = await (prisma as any).post.findUnique({
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
