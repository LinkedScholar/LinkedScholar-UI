import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api";
const API_PUBLIC_BASE_URL = process.env.REACT_APP_API_PUBLIC_URL || "http://localhost:8080/public";

export const getProfile = async (
    logged: boolean,
    author_id: string,
    source: string
): Promise<any> => {
    try {
        const url = logged ? `${API_BASE_URL}/profile` : `${API_PUBLIC_BASE_URL}/profile`;
        const response = await axios.post(
            url,
            { author_id, source },
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching profile:", error);
        throw error;
    }
};

export const getNetwork = async (
    logged: boolean,
    author_id: string,
    source: string,
    recursivity: number = 1
): Promise<any> => {
    try {
        const url = logged ? `${API_BASE_URL}/network` : `${API_PUBLIC_BASE_URL}/network`;
        // Send JSON instead of URLSearchParams because the backend expects JSON.
        const response = await axios.post(
            url,
            { author_id, source, recursivity },
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching network:", error);
        throw error;
    }
};

export const getBestMatchings = async (
    logged: boolean,
    author_id: string
): Promise<any> => {
    try {
        const url = logged ? `${API_BASE_URL}/best_matches` : `${API_PUBLIC_BASE_URL}/best_matches`;
        // Send JSON body instead of form data.
        const response = await axios.post(
            url,
            { author_id },
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching best matchings:", error);
        throw error;
    }
};

export const getArticlesFromAuthor = async (
    logged: boolean,
    author_id: string,
    source: string
): Promise<any> => {
    try {
        const url = logged
            ? `${API_BASE_URL}/articles_from_author`
            : `${API_PUBLIC_BASE_URL}/articles_from_author`;
        const response = await axios.post(
            url,
            { author_id, source },
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching articles from author:", error);
        throw error;
    }
};

export const getPath = async (
    logged: boolean,
    fromId: string,
    toId: string,
    source: string = "dblp"
): Promise<any> => {
    try {
        const url = logged ? `${API_BASE_URL}/path` : `${API_PUBLIC_BASE_URL}/path`;
        const payload = {
            from_id: fromId,
            to_id: toId,
            to_source: source,
        };
        const response = await axios.post(url, payload, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching path:", error);
        throw error;
    }
};
