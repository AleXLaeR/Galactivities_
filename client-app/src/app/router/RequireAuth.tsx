import { useMobXStore } from "app/stores/root.store";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = () => {
    const location = useLocation();
    const {userStore: { isLoggedIn }} = useMobXStore();

    return !isLoggedIn ? (
        <Navigate to='/' state={{from: location}} />
    ) : <Outlet />;
}

export default RequireAuth;