// src/pages/admin/AddPost.jsx
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import RichTextEditor from '../../components/RichTextEditor';
import { addBlog } from '../../firebase/blogService';
import Background from '../../components/Background';

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleContentChange = useCallback((newContent) => {
    setContent(newContent);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsPublishing(true);

    try {
      await addBlog({
        title,
        excerpt,
        content,
        imageUrl,
        author: author || 'Admin',
      });
      navigate('/blogs');
    } catch (err) {
      console.error('Error adding blog post:', err);
      setError('Failed to add blog post. Please try again.');
    } finally {
      setIsPublishing(false);
    }
  };

  return(

  <Background>
    <div className="max-w-3xl mx-auto mt-6 sm:mt-12 bg-gradient-to-tr from-orange-50 via-orange-100 to-white px-4 py-6 sm:p-10 rounded-2xl shadow-2xl relative">
      <div className="absolute -top-5 left-0 w-full flex justify-center pointer-events-none select-none z-10">
        <span className="inline-block px-4 sm:px-8 py-2 bg-orange-600 text-white rounded-full shadow-lg text-base sm:text-lg font-bold tracking-wider uppercase">
          Add New Blog Post
        </span>
      </div>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 sm:space-y-8 mt-8"
        autoComplete="off"
        spellCheck="false"
      >
        <div>
          <label
            className="block text-gray-700 font-semibold mb-1 sm:mb-2 tracking-wide"
            htmlFor="title"
          >
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full border border-orange-200 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition text-sm"
            placeholder="Enter post title"
            required
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label
              className="block text-gray-700 font-semibold mb-1 sm:mb-2 tracking-wide"
              htmlFor="author"
            >
              Author
            </label>
            <input
              id="author"
              type="text"
              value={author}
              onChange={e => setAuthor(e.target.value)}
              className="w-full border border-orange-100 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 bg-white focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition text-sm"
              placeholder="Author name (optional, defaults to Admin)"
            />
          </div>
          <div className="flex-1">
            <label
              className="block text-gray-700 font-semibold mb-1 sm:mb-2 tracking-wide"
              htmlFor="imageUrl"
            >
              Image URL <span className="text-red-500">*</span>
            </label>
            <input
              id="imageUrl"
              type="text"
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
              className="w-full border border-orange-100 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 bg-white focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition text-sm"
              placeholder="https://your-image-link"
              required
            />
          </div>
        </div>
        {imageUrl && (
          <div className="flex flex-col items-center">
            <img
              src={imageUrl}
              alt="Blog header preview"
              className="mt-3 mb-1 max-h-40 w-full sm:w-auto object-contain rounded-xl shadow border border-orange-100 transition-all duration-150"
              onError={e => (e.target.style.display = 'none')}
            />
            <span className="text-xs text-gray-400">Image Preview</span>
          </div>
        )}
        <div>
          <label
            className="block text-gray-700 font-semibold mb-1 sm:mb-2 tracking-wide"
            htmlFor="excerpt"
          >
            Excerpt <span className="text-red-500">*</span>
          </label>
          <textarea
            id="excerpt"
            value={excerpt}
            onChange={e => setExcerpt(e.target.value)}
            className="w-full border border-orange-100 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 bg-white focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition text-sm"
            placeholder="Brief summary or excerpt... (visible on preview cards)"
            required
            rows={3}
          />
        </div>
        <div>
          <label
            className="block text-gray-700 font-semibold mb-1 sm:mb-2 tracking-wide"
            htmlFor="content"
          >
            Content <span className="text-red-500">*</span>
          </label>
          <div className="bg-white border border-orange-100 rounded-xl shadow-sm px-2 py-1.5 sm:px-2 sm:py-2 focus-within:ring-2 focus-within:ring-orange-200 transition">
            <RichTextEditor value={content} onChange={handleContentChange} placeholder={'Write Content Here...'} />
          </div>
        </div>

        {error && (
          <div className="rounded bg-red-100 border border-red-400 px-4 py-2 text-red-700 text-center font-medium shadow text-sm">
            {error}
          </div>
        )}

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-white border border-orange-200 text-orange-600 hover:bg-orange-50 focus:ring-2 focus:ring-orange-300 font-bold px-6 sm:px-8 py-2 sm:py-2.5 rounded-full shadow transition-all flex items-center justify-center text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPublishing}
            className="bg-orange-600 hover:bg-orange-700 focus:ring-2 focus:ring-orange-300 text-white font-bold px-6 sm:px-8 py-2 sm:py-2.5 rounded-full shadow-lg transition-all flex items-center justify-center disabled:opacity-60 disabled:pointer-events-none text-sm"
          >
            {isPublishing ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-40" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 01-4 4H4z" />
                </svg>
                Publishing...
              </span>
            ) : (
              <span>Publish Post</span>
            )}
          </button>
        </div>
      </form>
    </div>
  </Background>

  );
};

export default AddPost;