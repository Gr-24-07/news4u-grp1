// app/api/articles/[id]/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/db'; // Ensure the prisma instance is correct

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const article = await prisma.article.findUnique({
      where: { id },
      include: {
        author: true, // Include related author data if needed
        category: true, // Include related category data if needed
      },
    });

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
