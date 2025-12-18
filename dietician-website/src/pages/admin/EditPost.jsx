// src/pages/admin/EditPost.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RichTextEditor from '../../components/RichTextEditor';
import { getBlogById, updateBlog } from '../../firebase/blogService';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await getBlogById(id);
        setTitle(post.title || '');
        setAuthor(post.author || '');
        setExcerpt(post.excerpt || '');
        setContent(post.content || '');
        setImageUrl(post.imageUrl || '');
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to load post. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleContentChange = useCallback((newContent) => {
    setContent(newContent);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsUpdating(true);

    try {
      await updateBlog(id, {
        title,
        author: author || 'Admin',
        excerpt,
        content,
        imageUrl,
        updatedAt: new Date().toISOString(),
      });
      navigate(`/blogs/${id}`);
    } catch (err) {
      console.error('Error updating blog post:', err);
      setError('Failed to update blog post. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Edit Blog Post</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
            Author *
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            required
          />
        </div>

        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
            Excerpt
          </label>
          <textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
              Featured Image URL
            </label>
          </div>
          <div className="flex space-x-2">
            <input
              type="url"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Paste image URL here"
              className="flex-1 min-w-0 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {imageUrl && <button
              type="button"
              onClick={() => setImageUrl('')}
              className="px-3 py-2 bg-gray-100 hover:bg-red-500 hover:text-white text-gray-700 rounded-md border border-gray-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Remove Image
            </button>}
          </div>
          {imageUrl && (
            <div className="mt-3">
              <p className="text-sm text-gray-500 mb-1">Image Preview:</p>
              <div className="relative bg-gray-100 rounded-md overflow-hidden border border-gray-200">
                <img 
                  src={imageUrl} 
                  alt="Preview" 
                  className="max-h-60 w-full object-contain p-2"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/600x400?text=Image+not+found';
                    e.target.className = 'max-h-60 w-full object-cover p-2';
                  }}
                />
              </div>
              <p className="mt-1 text-xs text-gray-500 break-all">{imageUrl}</p>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content *
          </label>
          <RichTextEditor
            value={content}
            onChange={handleContentChange}
            placeholder="Write your blog post content here..."
          />
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isUpdating}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isUpdating ? 'Updating...' : 'Update Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;