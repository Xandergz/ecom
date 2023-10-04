export interface MenuItems  {
        href: string;
        icon: React.JSX.Element;
        label: string;
    }

    export interface NewUserRequest{
        nombre: string; 
        correoelectronico: string; 
        contraseña: string;
    }