import { useAuthStore } from '../store/auth';

export default (permission: string) => {
    const auth = useAuthStore();
    return (auth?.user as any)?.permissions?.includes(permission) ?? false;
};
