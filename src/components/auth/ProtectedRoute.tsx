import { Navigate } from "react-router-dom"

interface ProtectedRouteProps {
    children: React.ReactNode
}

export default function ProtectedRoute({children}: ProtectedRouteProps) {
    const token = sessionStorage.getItem("Authorization")

    if(token == null || token === "") return <Navigate to="/login" />

  return <>{children}</>
}