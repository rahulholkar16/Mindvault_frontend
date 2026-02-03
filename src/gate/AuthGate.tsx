import { useEffect, type ReactNode } from "react";
import { useAuth } from "../store/auth/useAuth";
import FullScreenLoader from "../components/FullScreenLoader";

const AuthGate = ({ children }: { children: ReactNode }) => {
    const initAuth = useAuth((s) => s.initAuth);
    const status = useAuth((s) => s.status);
    const refresh = useAuth(s => s.refresh);

    useEffect(() => {
      const boot = async () => {
        const ok = await initAuth();
        if (!ok) {
          await refresh();
          await initAuth();
        }
      };
      boot();
    }, []);

    if (status === "idle" || status === "loading") {
        return <FullScreenLoader/>;
    }

    return children;
};

export default AuthGate;
