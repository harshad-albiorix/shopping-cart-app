
export function isAuthenticated() {
    if (typeof window !== 'undefined') {
        const token = document.cookie.split('; ').find(row => row.startsWith('token='));
        return !!token;
    }
    return false;
}