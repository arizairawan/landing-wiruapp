
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, orderBy, limit, startAfter, doc, getDoc, DocumentSnapshot, Timestamp } from 'firebase/firestore';
import type { Blog } from '@/data/blogs';

const blogsCollectionName = process.env.NEXT_PUBLIC_FIREBASE_BLOGS_COLLECTION || 'blogs';
const blogsCollection = collection(db, blogsCollectionName);

// Helper to convert Firestore doc to Blog object
const fromFirestore = (snapshot: DocumentSnapshot): Blog => {
    const data = snapshot.data();
    if (!data) {
        throw new Error(`Document data is undefined for doc id: ${snapshot.id}`);
    }

    // Robust date handling
    let createdDate: Date;
    if (data.created instanceof Timestamp) {
        createdDate = data.created.toDate();
    } else if (typeof data.created === 'string' || typeof data.created === 'number') {
        createdDate = new Date(data.created);
    } else {
        // Fallback to now if the field is missing or invalid, and log a warning
        console.warn(`Blog with id ${snapshot.id} has an invalid 'created' field. Using current date as fallback.`, data.created);
        createdDate = new Date();
    }

    return {
        id: snapshot.id,
        title: data.title || 'Untitled',
        slug: data.slug || '',
        image: data.image || 'https://placehold.co/600x400.png',
        description: data.description || '',
        created: createdDate,
        metadesc: data.metadesc || '',
        keyword: data.keyword || '',
    };
};


export const getBlogs = async (lastVisible: DocumentSnapshot | null = null) => {
  try {
    const q = lastVisible
      ? query(blogsCollection, orderBy('created', 'desc'), startAfter(lastVisible), limit(6))
      : query(blogsCollection, orderBy('created', 'desc'), limit(6));
    
    const documentSnapshots = await getDocs(q);
    
    const blogs: Blog[] = documentSnapshots.docs.map(fromFirestore);
    const newLastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

    return {
      blogs,
      lastVisible: newLastVisible,
      hasMore: blogs.length === 6,
    };
  } catch (error) {
    console.error("Error fetching blogs: ", error);
    // In case of an error (e.g., missing index), return an empty state.
    // The user should check their browser console for specific Firestore errors.
    return { blogs: [], lastVisible: null, hasMore: false };
  }
};


export const getBlogBySlug = async (slug: string): Promise<Blog | null> => {
    try {
        if (!slug) return null;
        const q = query(blogsCollection, where("slug", "==", slug), limit(1));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.log(`No blog found with slug: ${slug}`);
            return null;
        }
        
        const blogDoc = querySnapshot.docs[0];
        return fromFirestore(blogDoc);
    } catch (error) {
        console.error(`Error fetching blog by slug "${slug}": `, error);
        return null;
    }
};

export const getAllBlogSlugs = async (): Promise<{ slug: string }[]> => {
    try {
        const q = query(blogsCollection, orderBy('created', 'desc'));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ slug: doc.data().slug as string }));
    } catch (error) {
        console.error("Error fetching all blog slugs: ", error);
        return [];
    }
};

export const getAllBlogsForSitemap = async (): Promise<{ slug: string, created: Date }[]> => {
    try {
        const q = query(blogsCollection, orderBy('created', 'desc'));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => {
            const blog = fromFirestore(doc);
            return { 
                slug: blog.slug,
                created: blog.created
            }
        });
    } catch (error) {
        console.error("Error fetching all blogs for sitemap: ", error);
        return [];
    }
};
