import { Client, Account, Databases, Storage, ID } from 'appwrite';

const client = new Client();

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;



if (endpoint && projectId) {
    client
        .setEndpoint(endpoint)
        .setProject(projectId);
} else {
    console.error("Appwrite endpoint or project ID is missing from environment variables. Please check your .env.local file.");
}

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export { client };

export const DATABASE_ID = '69597fc5002dab1d5242';
export const COLLECTION_ID_CARDS = 'cards';
export const COLLECTION_ID_USERS = 'users';

export async function createCard(data: any) {
    try {
        return await databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID_CARDS,
            ID.unique(),
            data
        );
    } catch (error) {
        console.error("Failed to create card", error);
        throw error;
    }
}

export async function getCard(id: string) {
    try {
        return await databases.getDocument(
            DATABASE_ID,
            COLLECTION_ID_CARDS,
            id
        );
    } catch (error) {
        console.error("Failed to get card", error);
        throw error;
    }
}

export async function uploadProfileImage(userId: string, file: File, bucketId: string) {
    try {
        // Delete old profile image if exists (using userId as file ID)
        try {
            await storage.deleteFile(bucketId, userId);
        } catch (deleteError: any) {
            // Ignore if no old file exists (404 error)
            if (deleteError.code !== 404) {
                console.warn("Error deleting old profile image", deleteError);
            }
        }

        // Upload new image
        const uploadedFile = await storage.createFile(
            bucketId,
            userId, // Use userId as file ID for easy lookup
            file
        );

        // Get file URL
        const fileUrl = `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${bucketId}/files/${uploadedFile.$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;
        
        return fileUrl;
    } catch (error) {
        console.error("Failed to upload profile image", error);
        throw error;
    }
}