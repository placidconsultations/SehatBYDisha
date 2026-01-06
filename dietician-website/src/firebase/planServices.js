import { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { db } from './firebase.js';

const plansCollection = collection(db, 'plans');
const servicesCollection = collection(db, 'services');

// ============ PLANS ============

// Add a new plan
export const addPlan = async (planData) => {
  try {
    const docRef = await addDoc(plansCollection, {
      ...planData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return { id: docRef.id, ...planData };
  } catch (error) {
    console.error('Error adding plan: ', error);
    throw error;
  }
};

// Get all plans
export const getPlans = async () => {
  try {
    const plansRef = collection(db, 'plans');
    const q = query(plansRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting plans: ", error);
    throw error;
  }
};

// Get a single plan by ID
export const getPlanById = async (id) => {
  try {
    const docRef = doc(db, 'plans', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error('No such plan found!');
    }
  } catch (error) {
    console.error('Error getting plan: ', error);
    throw error;
  }
};

// Update a plan
export const updatePlan = async (id, updatedData) => {
  try {
    const planRef = doc(db, 'plans', id);
    await updateDoc(planRef, {
      ...updatedData,
      updatedAt: new Date().toISOString(),
    });
    return { id, ...updatedData };
  } catch (error) {
    console.error('Error updating plan: ', error);
    throw error;
  }
};

// Delete a plan
export const deletePlan = async (id) => {
  try {
    await deleteDoc(doc(db, 'plans', id));
    return id;
  } catch (error) {
    console.error('Error deleting plan: ', error);
    throw error;
  }
};

// ============ SERVICES ============

// Add a new service
export const addService = async (serviceData) => {
  try {
    const docRef = await addDoc(servicesCollection, {
      ...serviceData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return { id: docRef.id, ...serviceData };
  } catch (error) {
    console.error('Error adding service: ', error);
    throw error;
  }
};

// Get all services
export const getServices = async () => {
  try {
    const servicesRef = collection(db, 'services');
    const q = query(servicesRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting services: ", error);
    throw error;
  }
};

// Get a single service by ID
export const getServiceById = async (id) => {
  try {
    const docRef = doc(db, 'services', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error('No such service found!');
    }
  } catch (error) {
    console.error('Error getting service: ', error);
    throw error;
  }
};

// Update a service
export const updateService = async (id, updatedData) => {
  try {
    const serviceRef = doc(db, 'services', id);
    await updateDoc(serviceRef, {
      ...updatedData,
      updatedAt: new Date().toISOString(),
    });
    return { id, ...updatedData };
  } catch (error) {
    console.error('Error updating service: ', error);
    throw error;
  }
};

// Delete a service
export const deleteService = async (id) => {
  try {
    await deleteDoc(doc(db, 'services', id));
    return id;
  } catch (error) {
    console.error('Error deleting service: ', error);
    throw error;
  }
};
