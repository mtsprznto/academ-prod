export const getRoleName = (role: number | null): string => {
    switch (role) {
        case 0:
            return "ADMIN";
        case 1:
            return "Profesor";
        case 2:
            return "Miembro";
        default:
            return ""; 
    }
};