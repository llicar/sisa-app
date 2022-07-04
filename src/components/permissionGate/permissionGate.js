import React from 'react';
import jwt from "jsonwebtoken";

const useGetUserPermissions = () =>{
    const permissionsJwt = localStorage.getItem('@sisa-app/user_permissions')
    const permissionsDecrypted = jwt.verify(permissionsJwt,process.env.REACT_APP_JWT_SECRET)
    const listaPermissoes = permissionsDecrypted.split(/\s*,\s*/);

    return listaPermissoes
}

const PermissionGate =  ({children,permissions}) =>{

    const listaPermissoes = useGetUserPermissions();

    if(
        permissions.some(permission => 
            {
                return listaPermissoes.includes(permission)
            })
    ){
        return children
    }
    else {
        return null
    }
}

export default PermissionGate