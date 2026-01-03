import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/appwrite/server';

export async function GET() {
    console.log("Starting Appwrite Verification...");
    try {
        const { databases } = createAdminClient();
        
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
