import { useEffect } from "react";
import { useAuth } from "../../../store/auth/useAuth";
import ErrorCard from "../ErrorCard";

const ErrorOverlay = () => {
    const error = useAuth((s) => s.error);

    useEffect(() => {
        if (!error) return;

        const timer = setTimeout(() => {
            useAuth.setState({ error: null });
        }, 3000);

        return () => clearTimeout(timer);
    }, [error]);

    if (!error) return null;

    const containerClass = `
    fixed right-4 top-4 z-50 flex flex-col gap-2 
    transition-all duration-300 
    animate-slideIn
  `;

    // 👉 CASE 1 — your validation / Zod style errors
    if (
        typeof error === "object" &&
        error !== null &&
        "errors" in error &&
        error.errors?.fieldErrors
    ) {
        const fieldErrors = error.errors.fieldErrors;

        const messages = Object.values(fieldErrors).flat().filter(Boolean); // remove undefined/null

        return (
            <div className={containerClass}>
                {messages.map((msg, i) => (
                    <ErrorCard key={`${msg}-${i}`} error={msg} />
                ))}
            </div>
        );
    }

    // 👉 CASE 2 — normal string error
    if (typeof error === "string") {
        return (
            <div className={containerClass}>
                <ErrorCard error={error} />
            </div>
        );
    }

    // 👉 CASE 3 — SAFETY FALLBACK (prevents your crash)
    return (
        <div className={containerClass}>
            <ErrorCard error="Something went wrong" />
        </div>
    );
};

export default ErrorOverlay;