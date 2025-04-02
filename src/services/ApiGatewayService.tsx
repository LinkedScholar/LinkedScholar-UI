import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api";
const API_PUBLIC_BASE_URL = process.env.REACT_APP_API_PUBLIC_URL || "http://localhost:8080/public";


export const getNetwork = async (
    logged: boolean,
    author_id: string,
    kind: string,
    recursivity: number = 1
): Promise<{ status: number; data: any }> => {
    try {
        const url = logged ? `${API_BASE_URL}/network` : `${API_PUBLIC_BASE_URL}/network`;
        const response = await axios.post(
            url,
            { author_id, source: kind, recursivity },
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
                validateStatus: (status) => status < 500,
            }
        );

        const status = response.status;

        return { status, data: response.data };
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
): Promise<any> => {
    try {
        const url = logged
            ? `${API_BASE_URL}/articles_from_author`
            : `${API_PUBLIC_BASE_URL}/articles_from_author`;
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
        console.error("Error fetching articles from author:", error);
        throw error;
    }
};

export const getPath = async (
    logged: boolean,
    fromId: string,
    toId: string,
    kind: string = "author"
): Promise<any> => {
    try {
        const url = logged ? `${API_BASE_URL}/path` : `${API_PUBLIC_BASE_URL}/path`;
        const payload = {
            from_id: fromId,
            to_id: toId,
            kind: kind,
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
