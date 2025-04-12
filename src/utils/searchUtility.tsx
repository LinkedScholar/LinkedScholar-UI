import { useRef, useState } from "react";
import { getBestMatchings, getNetwork } from "../services/ApiGatewayService";
import { toast } from "sonner";
import { handleApiError } from "../utils/errorHandler";

const REACT_APP_LOCAL_MODE = process.env.REACT_APP_LOCAL_MODE === "true";

export interface SearchResult {
    status: number;
    data: any;
    centerId: string;
}

export const useResearcherSearch = (authenticated: boolean) => {
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    let activeToastId: string | number | null = null;

    const fetchSuggestions = (input: string) => {
        if (input.length < 4) {
            setSuggestions([]);
            return;
        }

        if (debounceTimer.current) clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(async () => {
            try {
                const results = await getBestMatchings(authenticated, input);
                setSuggestions(results);
            } catch (err) {
                handleApiError(err);
            }
        }, 500);
    };

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
            toast.error("Enter a valid researcher name or profile URL.");
            return null;
        }

        setError("");
        setLoading(true);

        const delayTimer = setTimeout(() => {}, 1000);
        const profileData = extractProfileData(searchTerm);

        if (!profileData) {
            toast.error("Invalid researcher profile URL.");
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

            if (status === 204) {
                if (activeToastId) toast.dismiss(activeToastId);

                activeToastId = toast(
                    <div>
                        <strong>Heads up! 🔍</strong>
                        <div style={{ marginTop: "0.5rem" }}>
                            The person you searched does not have any connections.
                        </div>
                        <div style={{ marginTop: "0.75rem" }}>
                            <a
                                target="_blank"
                                rel="noreferrer"
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
                        className: "blue-toast",
                    }
                );
            }

            if (status === 206) {
                if (activeToastId) toast.dismiss(activeToastId);

                activeToastId = toast(
                    <div>
                        <strong>Heads up! 🔍</strong>
                        <div style={{ marginTop: "0.5rem" }}>
                            We couldn't find the exact person you were looking for. Here's the closest match.
                        </div>
                        <div style={{ marginTop: "0.75rem" }}>
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href="/contact"
                                style={{
                                    color: "var(--primary-color)",
                                    textDecoration: "underline",
                                    fontWeight: "bold",
                                }}
                            >
                                Not who you were looking for?
                            </a>
                        </div>
                    </div>,
                    {
                        position: "top-center",
                        className: "blue-toast",
                    }
                );
            }

            return { status, data: response.data, centerId };
        } catch (err) {
            clearTimeout(delayTimer);
            setLoading(false);
            handleApiError(err);
            throw err;
        }
    };

    return {
        search,
        error,
        loading,
        suggestions,
        fetchSuggestions,
        extractProfileData,
    };
};