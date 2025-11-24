'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import Header from '@/components/custom/Header';
import Footer from '@/components/custom/Footer';
import PanelGateLogin from '@/app/(routes)/admin/panel/PanelGateLogin';

const ADMIN_ROLES = ["OWNER", "DEVELOPER", "ADMIN"];

export default function NewBlogPage() {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();

  const [isSecondaryAuthComplete, setIsSecondaryAuthComplete] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);

  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [content, setContent] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');
  const [tag, setTag] = useState('');
  const [author, setAuthor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifySession = async () => {
      if (!isLoaded || !isSignedIn) {
        setIsVerifying(false);
        return;
      }

      try {
        const res = await axios.get('/api/admin/auth/verify');
        if (res.data?.valid) {
          setIsSecondaryAuthComplete(true);
        }
      } catch {
      } finally {
        setIsVerifying(false);
      }
    };

    void verifySession();
  }, [isLoaded, isSignedIn]);

  useEffect(() => {
    if (user && !author) {
      setAuthor(user.fullName || user.username || user.emailAddresses?.[0]?.emailAddress || 'Admin');
    }
  }, [user, author]);

  const userHasAdminRole = ADMIN_ROLES.includes((user?.publicMetadata.role as string) || '');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim() || !shortDescription.trim() || !content.trim()) {
      setError('Title, short description, and content are required.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await axios.post('/api/admin/blogs', {
        title: title.trim(),
        shortDescription: shortDescription.trim(),
        content: content.trim(),
        backgroundImage: backgroundImage.trim(),
        tag: tag.trim(),
        author: author.trim(),
      });

      const blog = res.data;
      if (blog?._id) {
        router.push(`/blogs/${blog._id}`);
      } else {
        router.push('/blogs');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create blog');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoaded || isVerifying) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">Verifying session...</p>
        </div>
      </div>
    );
  }

  if (!isSignedIn || !userHasAdminRole) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="text-center">
          <h1 className="text-4xl text-red-500 font-semibold mb-2">Access Denied</h1>
          <p className="text-gray-400 text-lg">You must be an admin to create new blog posts.</p>
        </div>
      </div>
    );
  }

  if (!isSecondaryAuthComplete) {
    return <PanelGateLogin onLoginSuccess={() => setIsSecondaryAuthComplete(true)} />;
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">
      <Header currentPage="/blogs" />

      <main className="px-6 pt-32 pb-24 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-[Horizon] text-4xl md:text-5xl font-semibold mb-6 bg-gradient-to-r from-[#6b5499] via-[#9677c4] to-[#432e6e] bg-clip-text text-transparent">
            Create New Blog
          </h1>
          <p className="text-gray-300 mb-8">
            Publish a new article to the Scythe Client blog. Fill out the details below and submit to make it live.
          </p>

          {error && (
            <div className="mb-4 rounded-md border border-red-500/60 bg-red-500/10 px-4 py-2 text-sm text-red-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="How to Optimize Scythe Client for Maximum FPS"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Short Description (Preview)</label>
              <textarea
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-600 min-h-[80px]"
                placeholder="A one or two sentence summary that will appear on the blog listing page."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Main Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-600 min-h-[260px]"
                placeholder="Write your full article here. You can use plain text or basic Markdown-style formatting."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Background Image URL</label>
                <input
                  type="text"
                  value={backgroundImage}
                  onChange={(e) => setBackgroundImage(e.target.value)}
                  className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="/images/my-blog-bg.png or https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Tag</label>
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Guide, Announcement, Patch Notes, ..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Display name shown on the blog post"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => router.push('/blogs')}
                className="rounded-md border border-zinc-700 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-zinc-800/60"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-md bg-purple-700 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-purple-900/50 transition-colors hover:bg-purple-600 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Publishing...' : 'Publish Blog'}
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
