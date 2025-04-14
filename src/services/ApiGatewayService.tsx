import axios from "axios";
import { handleApiError } from "../utils/errorHandler";

type ApiError = {
    code: number;
    message: string;
    details?: any;
};

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api";
const API_PUBLIC_BASE_URL = process.env.REACT_APP_API_PUBLIC_URL || "http://localhost:8080/public";

const apiRequest = async (
    url: string,
    method: "get" | "post" | "put" | "delete",
    data?: any,
    options?: any
) => {
    try {
        const response = await axios({
            url,
            method,
            data,
            withCredentials: true,
            validateStatus: () => true, // Handle all status codes
            ...options
        });

        // Handle success (2xx) and redirect (3xx) codes
        if (response.status >= 200 && response.status < 400) {
            return response;
        }

        // Handle error codes
        throw {
            isAxiosError: true,
            response: {
                status: response.status,
                data: response.data,
                headers: response.headers,
                config: response.config
            },
            config: response.config
        };
    } catch (error) {
        const apiError = handleApiError(error);
        throw apiError; // Re-throw to allow catch in calling functions
    }
};

export const getNetwork = async (
    logged: boolean,
    author_id: string,
    kind: string,
    recursivity: number = 1
): Promise<{ status: number; data: any }> => {
    try {
        const url = logged ? `${API_BASE_URL}/network` : `${API_PUBLIC_BASE_URL}/network`;
        const response = await apiRequest(url, "post", { author_id, source: kind, recursivity }, {
            headers: { "Content-Type": "application/json" }
        });

        return { status: response.status, data: response.data };
    } catch (error) {
        // TypeScript safe error handling
        const apiError = error as ApiError;
        return { status: apiError.code || 500, data: null };
    }
};

export const getBestMatchings = async (
    logged: boolean,
    partialName: string
): Promise<string[]> => {
    try {
        const url = logged ? `${API_BASE_URL}/best_matches` : `${API_PUBLIC_BASE_URL}/best_matches`;
        const response = await apiRequest(url, "post", { partial_name: partialName, kind: "author" }, {
            headers: { "Content-Type": "application/json" }
        });

        return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
        // Return empty array on error
        return [];
    }
};

export const getArticlesFromAuthor = async (
    logged: boolean,
    author_id: string,
): Promise<any> => {
    try {
        const url = logged ? `${API_BASE_URL}/articles_from_author` : `${API_PUBLIC_BASE_URL}/articles_from_author`;
        const response = await apiRequest(url, "post", { author_id }, {
            headers: { "Content-Type": "application/json" }
        });

        return response.data;
    } catch (error) {
        // Return null on error
        return null;
    }
};

export const getPath = async (
    logged: boolean,
    fromId: string,
    toId: string,
    kind: string = "author"
): Promise<{ data: any; status: number }> => {
    try {
        const url = logged ? `${API_BASE_URL}/path` : `${API_PUBLIC_BASE_URL}/path`;
        const response = await apiRequest(url, "post", {
            from_id: fromId,
            to_id: toId,
            kind: kind
        }, {
            headers: { "Content-Type": "application/json" }
        });

        return { data: response.data, status: response.status };
    } catch (error) {
        // TypeScript safe error handling
        const apiError = error as ApiError;
        return { data: null, status: apiError.code || 500 };
    }
};

export const getStatistics = async (): Promise<{
    affiliation_count: number;
    article_count: number;
    author_count: number;
}> => {
    try {
        const url = `${API_PUBLIC_BASE_URL}/statistics`;
        const response = await axios.get(url);
        return {
            affiliation_count: response.data.affiliation_count,
            article_count: response.data.article_count,
            author_count: response.data.author_count,
        };
    } catch (error) {
        console.error("Error fetching statistics:", error);
        throw error;
    }
};
