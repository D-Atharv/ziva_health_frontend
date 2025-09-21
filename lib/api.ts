export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    ...options,
    credentials: "include", // important: send cookies
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not set");
  }

  if (!res.ok) {
    let errMsg = "API request failed";
    try {
      const err = (await res.json()) as { error?: string };
      if (err.error) errMsg = err.error;
    } catch {}
    throw new Error(errMsg);
  }

  return res.json() as Promise<T>;
}
