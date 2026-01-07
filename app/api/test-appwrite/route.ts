

import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/appwrite/server';

// Sett disse konstantene til din database og collection for logging
const LOG_DATABASE_ID = 'happysend';
const LOG_COLLECTION_ID = 'request_logs';

export async function GET(request: Request) {
	console.log("Starting Appwrite Verification...");
	try {
		const { databases } = createAdminClient();

		// Hent user-agent og IP
		const userAgent = request.headers.get('user-agent') || '';
		// IP-adresse kan ligge i x-forwarded-for eller remote
		const ip = request.headers.get('x-forwarded-for') || '';

		// Logg til Appwrite (asynkront, ikke vent på svar)
		databases.createDocument(
			LOG_DATABASE_ID,
			LOG_COLLECTION_ID,
			'unique()',
			{
				userAgent,
				ip,
				timestamp: new Date().toISOString(),
				route: '/api/test-appwrite',
			}
		).catch((err) => {
			console.warn('Kunne ikke logge request:', err?.message || err);
		});

		// Fortsett med vanlig funksjon
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
