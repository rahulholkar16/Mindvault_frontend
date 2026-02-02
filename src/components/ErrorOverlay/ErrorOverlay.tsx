import { useEffect } from "react";
import { useAuth } from "../../store/auth/useAuth";
import ErrorCard from "../ErrorCard/ErrorCard";

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

    if (typeof error === "object" && error?.errors?.fieldErrors) {
        return (
            <div className={containerClass}>
                {Object.values(error.errors.fieldErrors)
                    .flat()
                    .map((value, index) => (
                        <ErrorCard key={`${value}-${index}`} error={value} />
                    ))}
            </div>
        );
    }
    
    if (typeof error === "string")
        return (
            <div className={containerClass}>
                <ErrorCard error={error} />
            </div>
        );
};

export default ErrorOverlay;
