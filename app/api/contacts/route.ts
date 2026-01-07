import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/appwrite/server';

const LOG_DATABASE_ID = 'happysend';
const CONTACTS_COLLECTION_ID = 'contacts';

// POST: Save or update a contact for a user
export async function POST(request: Request) {
  try {
    const { databases } = createAdminClient();
    const body = await request.json();
    const { userId, name, address } = body;
    if (!userId || !name || !address) {
      return NextResponse.json({ success: false, error: 'Missing fields' }, { status: 400 });
    }
    // Save new contact (let Appwrite generate unique ID)
    const doc = await databases.createDocument(
      LOG_DATABASE_ID,
      CONTACTS_COLLECTION_ID,
      'unique()',
      { userId, name, address }
    );
    return NextResponse.json({ success: true, contact: doc });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Unknown error' }, { status: 500 });
  }
}

// GET: List all contacts for a user (userId as query param)
export async function GET(request: Request) {
  try {
    const { databases } = createAdminClient();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    if (!userId) {
      return NextResponse.json({ success: false, error: 'Missing userId' }, { status: 400 });
    }
    const result = await databases.listDocuments(
      LOG_DATABASE_ID,
      CONTACTS_COLLECTION_ID,
      [
        // Only fetch contacts for this user
        `userId=${userId}`
      ]
    );
    return NextResponse.json({ success: true, contacts: result.documents });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Unknown error' }, { status: 500 });
  }
}
