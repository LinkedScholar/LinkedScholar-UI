import { toast } from "sonner";

type ApiError = {
    code: number;
    message: string;
    details?: any;
};

export const ErrorContext = {
    setIsRegistrationModalOpen: null as ((isOpen: boolean) => void) | null,
};

export const registerErrorHandlers = (
    setRegistrationModalOpen: (isOpen: boolean) => void,
) => {
    ErrorContext.setIsRegistrationModalOpen = setRegistrationModalOpen;
};

export const handleApiError = (error: any): ApiError => {
    let apiError: ApiError;

    // Axios error structure
    if (error.isAxiosError) {
        const status = error.response?.status;
        const data = error.response?.data;

        const errorMap: Record<number, ApiError> = {
            400: { code: 400, message: data?.message || "Bad request - Invalid parameters" },
            401: { code: 401, message: data?.message || "Unauthorized - Please login" },
            402: { code: 402, message: data?.message || "Payment required" },
            403: { code: 403, message: data?.message || "Forbidden - Insufficient permissions" },
            404: { code: 404, message: data?.message || "Resource not found" },
            405: { code: 405, message: data?.message || "Method not allowed" },
            406: { code: 406, message: data?.message || "Not acceptable" },
            407: { code: 407, message: data?.message || "Proxy authentication required" },
            408: { code: 408, message: data?.message || "Request timeout" },
            409: { code: 409, message: data?.message || "Conflict - Upgrade required" },
            410: { code: 410, message: data?.message || "Gone - Resource no longer available" },
            411: { code: 411, message: data?.message || "Length required" },
            412: { code: 412, message: data?.message || "Precondition failed" },
            413: { code: 413, message: data?.message || "Payload too large" },
            414: { code: 414, message: data?.message || "URI too long" },
            415: { code: 415, message: data?.message || "Unsupported media type" },
            416: { code: 416, message: data?.message || "Range not satisfiable" },
            417: { code: 417, message: data?.message || "Expectation failed" },
            418: { code: 418, message: data?.message || "I'm a teapot" },
            422: { code: 422, message: data?.message || "Unprocessable entity" },
            423: { code: 423, message: data?.message || "Locked" },
            424: { code: 424, message: data?.message || "Failed dependency" },
            425: { code: 425, message: data?.message || "Too early" },
            426: { code: 426, message: data?.message || "Upgrade required" },
            428: { code: 428, message: data?.message || "Precondition required" },
            429: { code: 429, message: data?.message || "Too many requests" },
            431: { code: 431, message: data?.message || "Request header fields too large" },
            451: { code: 451, message: data?.message || "Unavailable for legal reasons" },
            500: { code: 500, message: data?.message || "The service is unavailable, please try later" },
            501: { code: 501, message: data?.message || "Not implemented" },
            502: { code: 502, message: data?.message || "Bad gateway" },
            503: { code: 503, message: data?.message || "Service unavailable" },
            504: { code: 504, message: data?.message || "Gateway timeout" },
            505: { code: 505, message: data?.message || "HTTP version not supported" },
            506: { code: 506, message: data?.message || "Variant also negotiates" },
            507: { code: 507, message: data?.message || "Insufficient storage" },
            508: { code: 508, message: data?.message || "Loop detected" },
            510: { code: 510, message: data?.message || "Not extended" },
            511: { code: 511, message: data?.message || "Network authentication required" },
        };

        if (status && errorMap[status]) {
            apiError = { ...errorMap[status], details: data?.details };
        } else if (error.code === "ECONNABORTED") {
            apiError = { code: 408, message: "Request timeout - Server took too long to respond" };
        } else if (error.code === "ERR_NETWORK") {
            apiError = { code: 0, message: "There was a network error - Please check your connection" };
        } else {
            apiError = {
                code: -1,
                message: error.message || "Unknown error occurred",
                details: error
            };
        }
    } else if (error.code && error.message) {
        apiError = error;
    } else {
        apiError = {
            code: -1,
            message: error.message || "Unknown error occurred",
            details: error
        };
    }

    if (apiError.code === 429) {
        if (ErrorContext.setIsRegistrationModalOpen) {
            ErrorContext.setIsRegistrationModalOpen(true);
        }
        return apiError;
    } else {
        showErrorNotification(apiError);
    }

    return apiError;
};

export const showErrorNotification = (error: ApiError) => {
    if (error.code === 409) {
        toast.error(
            <div>
                <strong>Premium Feature</strong>
                <div style={{ marginTop: "0.5rem" }}>
                    {error.message || "This feature requires a premium subscription."}
                </div>
            </div>,
            { duration: 5000 }
        );
    } else if (error.code === 429) {
        toast.error(
            <div>
                <strong>Too Many Requests</strong>
                <div style={{ marginTop: "0.5rem" }}>
                    {error.message || "Please wait before making another request."}
                </div>
            </div>,
            { duration: 5000 }
        );
    } else {
        toast.error(
            <div>
                <div style={{  }}>{error.message}</div>
                {error.details && (
                    <div style={{ marginTop: "0.5rem", fontSize: "0.8rem" }}>
                        Technical details: {JSON.stringify(error.details)}
                    </div>
                )}
            </div>,
            { duration: 10000 }
        );
    }
};