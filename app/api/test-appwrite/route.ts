
import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/appwrite/server';

export async function GET() {
	console.log("Starting Appwrite Verification...");
	try {
		const { databases } = createAdminClient();

		// Lagring av user-agent og IP til Appwrite er deaktivert
		// const userAgent = request.headers.get('user-agent') || '';
		// const ip = request.headers.get('x-forwarded-for') || '';
		// databases.createDocument('happysend', 'request_logs', 'unique()', { userAgent, ip, timestamp: new Date().toISOString(), route: '/api/test-appwrite' });

		console.log("Listing documents from database 'happysend', collection 'cards'...");
		const result = await databases.listDocuments(
			'happysend',
			'cards',
			[]
		);

		return NextResponse.json({ 
			success: true, 
			message: "Successfully connected to Appwrite!",
			documentCount: result.total,
			documents: result.documents 
		});
	} catch (error: any) {
		console.error("Appwrite Verification Error:", error);
		return NextResponse.json({ 
			success: false, 
			error: error.message || "Unknown error",
			details: error
		}, { status: 500 });
	}
}
