'use server';

import prismaApi from '@/lib/prisma-api';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createAuditLog } from '@/lib/audit';
import { requireAdmin } from '@/lib/authorization';
import { BlogPostSchema } from '@/lib/validation';
import { z } from 'zod';

const prisma = prismaApi;

export async function createPost(formData: FormData) {
  const session = await requireAdmin();
  const input = BlogPostSchema.parse({
    title: formData.get('title'),
    slug: formData.get('slug'),
    excerpt: formData.get('excerpt'),
    content: formData.get('content'),
    published: formData.get('published') === 'true',
    thumbnail: formData.get('thumbnail') || '',
  });

  await prisma.post.create({
    data: {
      ...input,
      thumbnail: input.thumbnail || null,
      authorId: session.user.id,
      readingTime: Math.ceil(input.content.split(/\s+/).length / 200),
    },
  });

  await createAuditLog({
    level: 'info',
    action: 'BLOG_CREATE',
    message: `Article créé : ${input.title}`,
    userId: session.user.id,
  });

  revalidatePath('/admin/blog');
  revalidatePath('/blog');
  redirect('/admin/blog');
}

export async function updatePost(id: string, formData: FormData) {
  const session = await requireAdmin();
  const safeId = z.string().trim().min(1).max(128).parse(id);
  const input = BlogPostSchema.parse({
    title: formData.get('title'),
    slug: formData.get('slug'),
    excerpt: formData.get('excerpt'),
    content: formData.get('content'),
    published: formData.get('published') === 'true',
    thumbnail: formData.get('thumbnail') || '',
  });

  await prisma.post.update({
    where: { id: safeId },
    data: {
      ...input,
      thumbnail: input.thumbnail || null,
      readingTime: Math.ceil(input.content.split(/\s+/).length / 200),
    },
  });

  await createAuditLog({
    level: 'info',
    action: 'BLOG_UPDATE',
    message: `Article mis à jour : ${input.title}`,
    userId: session.user.id,
  });

  revalidatePath('/admin/blog');
  revalidatePath(`/admin/blog/${safeId}`);
  revalidatePath('/blog');
  revalidatePath(`/blog/${input.slug}`);
  redirect('/admin/blog');
}

export async function deletePost(id: string) {
  const session = await requireAdmin();
  const safeId = z.string().trim().min(1).max(128).parse(id);

  await prisma.post.delete({
    where: { id: safeId },
  });

  await createAuditLog({
    level: 'warn',
    action: 'BLOG_DELETE',
    message: `Article supprimé (ID: ${id})`,
    userId: session.user.id,
  });

  revalidatePath('/admin/blog');
  revalidatePath('/blog');
}
