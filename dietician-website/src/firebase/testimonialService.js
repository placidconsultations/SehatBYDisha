import { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { db } from './firebase.js';

const testimonialsCollection = collection(db, 'testimonials');
const transformationsCollection = collection(db, 'transformations');

// ============ TESTIMONIALS ============

// Add a new testimonial
export const addTestimonial = async (testimonialData) => {
  try {
    const docRef = await addDoc(testimonialsCollection, {
      ...testimonialData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return { id: docRef.id, ...testimonialData };
  } catch (error) {
    console.error('Error adding testimonial: ', error);
    throw error;
  }
};

// Get all testimonials
export const getTestimonials = async () => {
  try {
    const testimonialsRef = collection(db, 'testimonials');
    const q = query(testimonialsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting testimonials: ", error);
    throw error;
  }
};

// Get a single testimonial by ID
export const getTestimonialById = async (id) => {
  try {
    const docRef = doc(db, 'testimonials', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error('No such document!');
    }
  } catch (error) {
    console.error('Error getting testimonial: ', error);
    throw error;
  }
};

// Update a testimonial
export const updateTestimonial = async (id, updatedData) => {
  try {
    const testimonialRef = doc(db, 'testimonials', id);
    await updateDoc(testimonialRef, {
      ...updatedData,
      updatedAt: new Date().toISOString(),
    });
    return { id, ...updatedData };
  } catch (error) {
    console.error('Error updating testimonial: ', error);
    throw error;
  }
};

// Delete a testimonial
export const deleteTestimonial = async (id) => {
  try {
    await deleteDoc(doc(db, 'testimonials', id));
    return id;
  } catch (error) {
    console.error('Error deleting testimonial: ', error);
    throw error;
  }
};

// ============ TRANSFORMATIONS ============

// Add a new transformation
export const addTransformation = async (transformationData) => {
  try {
    const docRef = await addDoc(transformationsCollection, {
      ...transformationData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return { id: docRef.id, ...transformationData };
  } catch (error) {
    console.error('Error adding transformation: ', error);
    throw error;
  }
};

// Get all transformations
export const getTransformations = async () => {
  try {
    const transformationsRef = collection(db, 'transformations');
    const q = query(transformationsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting transformations: ", error);
    throw error;
  }
};

// Get a single transformation by ID
export const getTransformationById = async (id) => {
  try {
    const docRef = doc(db, 'transformations', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error('No such document!');
    }
  } catch (error) {
    console.error('Error getting transformation: ', error);
    throw error;
  }
};

// Update a transformation
export const updateTransformation = async (id, updatedData) => {
  try {
    const transformationRef = doc(db, 'transformations', id);
    await updateDoc(transformationRef, {
      ...updatedData,
      updatedAt: new Date().toISOString(),
    });
    return { id, ...updatedData };
  } catch (error) {
    console.error('Error updating transformation: ', error);
    throw error;
  }
};

// Delete a transformation
export const deleteTransformation = async (id) => {
  try {
    await deleteDoc(doc(db, 'transformations', id));
    return id;
  } catch (error) {
    console.error('Error deleting transformation: ', error);
    throw error;
  }
};

