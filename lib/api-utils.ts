import { NextResponse } from 'next/server';
import { PrismaClientInitializationError } from '@prisma/client/runtime/library';

export function handleDatabaseError(error: unknown) {
  console.error('Database error:', error);
  
  if (error instanceof PrismaClientInitializationError) {
    // En développement, on peut afficher plus de détails
    const message = process.env.NODE_ENV === 'development' 
      ? error.message 
      : 'Database connection error';
      
    return NextResponse.json(
      { error: message },
      { status: 503 }
    );
  }

  return NextResponse.json(
    { error: 'Internal server error' },
    { status: 500 }
  );
}

export function isDatabaseError(error: unknown): boolean {
  return error instanceof PrismaClientInitializationError;
}
