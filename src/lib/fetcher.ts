export const fetcher = async <T>(url: string, options?: RequestInit) => {
    const response = await fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options?.headers,
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
            errorData.message || "An error occurred while fetching data.",
        );
    }

    const data = await response.json();
    return data as Promise<T>;
};
