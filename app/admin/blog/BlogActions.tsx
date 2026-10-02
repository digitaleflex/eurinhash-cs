'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { deletePost } from './actions';
import { useRouter } from 'next/navigation';

interface BlogActionsProps {
  post: {
    id: string;
    slug: string;
  };
}

export default function BlogActions({ post }: BlogActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      return;
    }

    setIsDeleting(true);
    try {
      await deletePost(post.id);
      // No need to redirect, revalidatePath will refresh the list
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      alert('Erreur lors de la suppression.');
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-center gap-2 mt-4 sm:mt-0 opacity-0 group-hover:opacity-100 transition-opacity">
      <Link href={`/admin/blog/${post.id}`}>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Edit className="h-4 w-4" />
        </Button>
      </Link>
      
      <Button 
        variant="ghost" 
        size="sm" 
        className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
        onClick={handleDelete}
        disabled={isDeleting}
      >
        <Trash2 className={`h-4 w-4 ${isDeleting ? 'animate-pulse' : ''}`} />
      </Button>

      <Link href={`/blog/${post.slug}`} target="_blank">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <ExternalLink className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}
