import { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { db } from './firebase.js';

const blogCollection = collection(db, 'blogs');

// Add a new blog post
export const addBlog = async (blogData) => {
  try {
    const docRef = await addDoc(blogCollection, {
      ...blogData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return { id: docRef.id, ...blogData };
  } catch (error) {
    console.error('Error adding document: ', error);
    throw error;
  }
};

// Get all blog posts
export const getBlogs = async () => {
  try {
    const blogsRef = collection(db, 'blogs');
    const q = query(blogsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting documents: ", error);
    throw error;
  }
};

// Get a single blog post by ID
export const getBlogById = async (id) => {
  try {
    const docRef = doc(db, 'blogs', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error('No such document!');
    }
  } catch (error) {
    console.error('Error getting document: ', error);
    throw error;
  }
};

// Update a blog post
export const updateBlog = async (id, updatedData) => {
  try {
    const blogRef = doc(db, 'blogs', id);
    await updateDoc(blogRef, {
      ...updatedData,
      updatedAt: new Date().toISOString(),
    });
    return { id, ...updatedData };
  } catch (error) {
    console.error('Error updating document: ', error);
    throw error;
  }
};

// Delete a blog post
export const deleteBlog = async (id) => {
  try {
    await deleteDoc(doc(db, 'blogs', id));
    return id;
  } catch (error) {
    console.error('Error deleting document: ', error);
    throw error;
  }
};
