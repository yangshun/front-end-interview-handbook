import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import prisma from '~/server/prisma';
import { fetchPostsFromPlatform } from '~/server/services/getPostsFromPlatform';

const REQUEST_DELAY_MS = 60_000;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function crawlProjects() {
  const projects = await prisma.project.findMany({ select: { slug: true } });

  const successes: Array<string> = [];
  const errors: Array<string> = [];

  for (let i = 0; i < projects.length; i++) {
    const project = projects[i];

    try {
      await fetchPostsFromPlatform(project.slug);
      successes.push(project.slug);
    } catch (err) {
      console.error(`❌ Error for ${project.slug}:`, err);
      errors.push(project.slug);
    }

    if (i < projects.length - 1) {
      // Wait for 60 seconds before processing the next project
      // This is to avoid hitting the Reddit API rate limit
      // and possibly getting our account suspended
      await delay(REQUEST_DELAY_MS); // 60 seconds
    }
  }

  return { errors, successes };
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }

  try {
    const result = await crawlProjects();

    return NextResponse.json({
      ...result,
      message: 'Cron fetch complete (with 60s intervals)',
    });
  } catch (err) {
    console.error('🚨 API error (cron):', err);

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
