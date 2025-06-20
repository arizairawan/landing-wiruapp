import { type NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;
  
  // Mengecek apakah slug adalah 'sitemap.xml' untuk menghindari konflik jika ada
  // folder sitemap.xml di root public atau route handler lain.
  // Dalam kasus ini, karena sitemap.xml sudah memiliki route handler khusus,
  // kita tidak perlu khawatir akan bentrok langsung dengan file ini,
  // tapi ini adalah praktik yang baik jika slug bisa umum.
  if (slug === 'sitemap.xml') {
    // Biarkan Next.js menangani permintaan sitemap.xml seperti biasa
    // Jika ada file sitemap.xml/route.ts, itu akan diproses.
    // Jika tidak ada dan ada file fisik di public/sitemap.xml, itu akan disajikan.
    // Jika tidak ada, Next.js akan menghasilkan 404.
    // Namun, karena kita sudah punya src/app/sitemap.xml/route.ts,
    // seharusnya permintaan ke /sitemap.xml sudah ditangani olehnya.
    // Kita bisa mengembalikan null atau membiarkan Next.js lanjut.
    // Untuk kejelasan, jika kita tidak ingin route ini menangani sitemap.xml,
    // kita bisa secara eksplisit tidak melakukan redirect.
    // Namun, idealnya, route yang lebih spesifik (seperti sitemap.xml/route.ts)
    // akan diprioritaskan oleh Next.js.
    // Jadi, logika ini mungkin tidak diperlukan jika routing Next.js sudah benar.
    // Untuk contoh ini, kita biarkan saja.
  }

  const targetUrl = `https://wiruapp.web.app/${slug}`;

  // Menggunakan 307 (Temporary Redirect) untuk mempertahankan metode request (GET)
  // Jika ini adalah redirect permanen, Anda bisa menggunakan 301 (Moved Permanently)
  // atau 308 (Permanent Redirect) untuk mempertahankan metode request.
  return NextResponse.redirect(targetUrl, 307);
}
