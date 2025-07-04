
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, DocumentSnapshot } from 'firebase/firestore';
import type { Template } from '@/data/templates';

const templatesCollectionName = process.env.NEXT_PUBLIC_FIREBASE_TEMPLATES_COLLECTION || 'templates';
const templatesCollection = collection(db, templatesCollectionName);

// Helper to convert Firestore doc to Template object
const fromFirestore = (snapshot: DocumentSnapshot): Template => {
    const data = snapshot.data();
    if (!data) {
        throw new Error(`Document data is undefined for doc id: ${snapshot.id}`);
    }

    return {
        id: snapshot.id,
        slug: data.slug || '',
        name: data.name || 'Untitled Template',
        description: data.description || 'No description available.',
        category: data.category || 'Website',
        tags: Array.isArray(data.tags) ? data.tags : [],
        image: data.image || 'https://placehold.co/600x400.png',
        dataAiHint: data.dataAiHint || 'website app',
        basic_price: typeof data.basic_price === 'number' ? data.basic_price : 0,
        features: Array.isArray(data.features) ? data.features : [],
        preview_link: data.preview_link || '#',
        gridSpanDesktop: typeof data.gridSpanDesktop === 'number' ? data.gridSpanDesktop : 1,
        gridSpanMobile: typeof data.gridSpanMobile === 'number' ? data.gridSpanMobile : 1,
    };
};

export const getTemplates = async (): Promise<Template[]> => {
  try {
    // You can add orderBy here if you have a field like 'createdAt' in your documents
    const q = query(templatesCollection); 
    const querySnapshot = await getDocs(q);
    
    const templates: Template[] = querySnapshot.docs.map(fromFirestore);
    return templates;
  } catch (error) {
    console.error("Error fetching templates: ", error);
    // In case of an error (e.g., missing index), return an empty array.
    // Check browser console for specific Firestore errors (e.g., permission denied, missing index).
    return [];
  }
};
