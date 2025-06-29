
export interface Blog {
  id?: string; // Firestore document ID
  title: string;
  slug: string;
  image: string;
  description: string; // This will hold the full blog content in Markdown format
  created: Date;
  metadesc: string;
  keyword: string;
}
