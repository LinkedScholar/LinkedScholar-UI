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
    recursivity: number = 0
): Promise<any> => {
    try {
        const url = logged ? `${API_BASE_URL}/network` : `${API_PUBLIC_BASE_URL}/network`;
        const formData = new URLSearchParams();
        formData.append("author_id", author_id);
        formData.append("source", source);
        formData.append("recursivity", recursivity.toString());
        const response = await axios.post(url, formData, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            withCredentials: true,
        });
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
        const formData = new URLSearchParams();
        formData.append("author_id", author_id);
        const response = await axios.post(url, formData, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            withCredentials: true,
        });
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
    author_id: string,
    source: string
): Promise<any> => {
    try {
        const url = logged ? `${API_BASE_URL}/path` : `${API_PUBLIC_BASE_URL}/path`;
        const formData = new URLSearchParams();
        formData.append("author_id", author_id);
        formData.append("source", source);
        const response = await axios.post(url, formData, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching path:", error);
        throw error;
    }
};
