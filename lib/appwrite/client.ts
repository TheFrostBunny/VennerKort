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
