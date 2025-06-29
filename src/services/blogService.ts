
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, orderBy, limit, startAfter, doc, getDoc, DocumentSnapshot, Timestamp } from 'firebase/firestore';
import type { Blog } from '@/data/blogs';

const blogsCollectionName = process.env.NEXT_PUBLIC_FIREBASE_BLOGS_COLLECTION || 'blogs';
const blogsCollection = collection(db, blogsCollectionName);

// Helper to convert Firestore doc to Blog object
const fromFirestore = (snapshot: DocumentSnapshot): Blog => {
    const data = snapshot.data();
    if (!data) {
        throw new Error("Document data is undefined.");
    }
    return {
        id: snapshot.id,
        title: data.title,
        slug: data.slug,
        image: data.image,
        dataAiHint: data.dataAiHint,
        description: data.description,
        created: (data.created as Timestamp).toDate(),
        metadesc: data.metadesc,
        keyword: data.keyword,
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
    return { blogs: [], lastVisible: null, hasMore: false };
  }
};


export const getBlogBySlug = async (slug: string): Promise<Blog | null> => {
    try {
        const q = query(blogsCollection, where("slug", "==", slug), limit(1));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return null;
        }
        
        const blogDoc = querySnapshot.docs[0];
        return fromFirestore(blogDoc);
    } catch (error) {
        console.error("Error fetching blog by slug: ", error);
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
        return querySnapshot.docs.map(doc => ({ 
          slug: doc.data().slug as string,
          created: (doc.data().created as Timestamp).toDate()
        }));
    } catch (error) {
        console.error("Error fetching all blogs for sitemap: ", error);
        return [];
    }
};
