'use server';

import prismaApi from '@/lib/prisma-api';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createAuditLog } from '@/lib/audit';

const prisma = prismaApi;

export async function createPost(formData: FormData) {
  const session = (await auth.api.getSession({
    headers: await headers(),
  })) as any;

  if (!session || session.user.role !== 'admin') {
    throw new Error('Non autorisé');
  }

  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const excerpt = formData.get('excerpt') as string;
  const content = formData.get('content') as string;
  const published = formData.get('published') === 'true';

  const thumbnail = formData.get('thumbnail') as string;

  await (prisma as any).post.create({
    data: {
      title,
      slug,
      excerpt,
      content,
      published,
      thumbnail,
      authorId: session.user.id,
      readingTime: Math.ceil(content.split(' ').length / 200),
    },
  });

  await createAuditLog({
    level: 'info',
    action: 'BLOG_CREATE',
    message: `Article créé : ${title}`,
    userId: session.user.id,
  });

  revalidatePath('/admin/blog');
  revalidatePath('/blog');
  redirect('/admin/blog');
}

export async function updatePost(id: string, formData: FormData) {
  const session = (await auth.api.getSession({
    headers: await headers(),
  })) as any;

  if (!session || session.user.role !== 'admin') {
    throw new Error('Non autorisé');
  }

  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const excerpt = formData.get('excerpt') as string;
  const content = formData.get('content') as string;
  const published = formData.get('published') === 'true';
  const thumbnail = formData.get('thumbnail') as string;

  await (prisma as any).post.update({
    where: { id },
    data: {
      title,
      slug,
      excerpt,
      content,
      published,
      thumbnail,
      readingTime: Math.ceil(content.split(' ').length / 200),
    },
  });

  await createAuditLog({
    level: 'info',
    action: 'BLOG_UPDATE',
    message: `Article mis à jour : ${title}`,
    userId: session.user.id,
  });

  revalidatePath('/admin/blog');
  revalidatePath(`/admin/blog/${id}`);
  revalidatePath('/blog');
  revalidatePath(`/blog/${slug}`);
  redirect('/admin/blog');
}

export async function deletePost(id: string) {
  const session = (await auth.api.getSession({
    headers: await headers(),
  })) as any;

  if (!session || session.user.role !== 'admin') {
    throw new Error('Non autorisé');
  }

  await (prisma as any).post.delete({
    where: { id },
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
