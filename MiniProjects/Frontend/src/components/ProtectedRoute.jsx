import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import api from "../api/axios"

function ProtectedRoute({
  children
}) {

  const [loading, setLoading] =
    useState(true)

  const [isAuth, setIsAuth] =
    useState(false)

  useEffect(() => {

    const checkUser =
      async () => {

        try {

          await api.get("/me")

          setIsAuth(true)

        } catch {

          setIsAuth(false)

        } finally {

          setLoading(false)

        }
      }

    checkUser()

  }, [])



  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading...
      </div>
    )
  }

  if (isAuth) {
    return children
  }

  return (
    <Navigate
      to="/login"
      replace
    />
  )
}

export default ProtectedRoute