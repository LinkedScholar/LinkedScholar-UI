import { useState } from "react";
import axios from "axios";
import { getNetwork } from "../services/ApiGatewayService";
import { toast } from "react-toastify";

const REACT_APP_LOCAL_MODE = process.env.REACT_APP_LOCAL_MODE === "true";

export interface SearchResult {
    status: number;
    data: any;
    centerId: string;
}

export interface SearchError extends Error {
    code?: number;
}

export const useResearcherSearch = (authenticated: boolean) => {
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    // Common utility to extract profile data from a URL or string.
    const extractProfileData = (url: string) => {
        if (url.match(/scholar\.google\.[a-z.]+/)) {
            const match = url.match(/[?&]user=([^&]+)/);
            if (match && match[1]) {
                return { author_id: match[1], source: "google" };
            }
        } else if (url.includes("researchgate.net/profile")) {
            const match = url.match(/profile\/([^/]+)/);
            if (match && match[1]) {
                return { author_id: match[1], source: "research_gate" };
            }
        } else {
            return { author_id: url, source: "dblp" };
        }
        return null;
    };

    const search = async (searchTerm: string): Promise<SearchResult | null> => {
        if (!searchTerm.trim()) {
            setError("Enter a valid researcher name or profile URL.");
            return null;
        }

        setError("");
        setLoading(true);

        // Set up a delay timer to potentially show a “building network” message.
        const delayTimer = setTimeout(() => {
        }, 1000);

        const profileData = extractProfileData(searchTerm);
        if (!profileData) {
            setError("Invalid researcher profile URL.");
            setLoading(false);
            clearTimeout(delayTimer);
            return null;
        }

        try {
            let response;
            if (REACT_APP_LOCAL_MODE) {
                const localResponse = await fetch("/data/localNetwork.json");
                if (!localResponse.ok) {
                    throw new Error("Failed to fetch local data");
                }
                response = { data: await localResponse.json(), status: 200 };
            } else {
                response = await getNetwork(
                    authenticated,
                    profileData.author_id,
                    profileData.source,
                    1
                );
            }

            clearTimeout(delayTimer);
            setLoading(false);

            const centerId = response.data.center_id || profileData.author_id;
            const status = response.status;

            // Show a toast if the status is 404.
            if (status === 404) {
                toast(
                    <div>
                        <strong>Researcher not found</strong>
                <div style={{ marginTop: "0.5rem" }}>
                We couldn't find the person you searched for, and no close matches were available.
                </div>
                <div style={{ marginTop: "0.75rem" }}>
                <a
                    href="/contact"
                style={{
                    color: "var(--primary-color)",
                        textDecoration: "underline",
                        fontWeight: "bold",
                }}
            >
                Think this is a mistake? Contact us →
              </a>
              </div>
              </div>,
                {
                    position: "top-center",
                        autoClose: 8000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    className: "blue-toast",
                }
            );
            }

            return { status, data: response.data, centerId };
        } catch (err: any) {
            clearTimeout(delayTimer);
            setLoading(false);
            if (axios.isAxiosError(err) && err.response) {
                if (err.response.status === 429 && !authenticated) {
                    const error429: SearchError = new Error("Too many requests");
                    error429.code = 429;
                    throw error429;
                }
                if (err.response.status === 409 && authenticated) {
                    const error409: SearchError = new Error("Pricing required");
                    error409.code = 409;
                    throw error409;
                }
            }
            setError("The service is unavailable. Please try later");
            throw err;
        }
    };

    return { search, error, loading, extractProfileData };
};
