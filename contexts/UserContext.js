import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "@/lib/axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem("accessToken");
    console.log("Fetched token from localStorage:", token);
    if (!token) {
      setIsLoading(false);
      return null;
    }
    try {
      const response = await axios.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("User data received:", response.data);
      setUser(response.data);
      setIsLoading(false);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUser(null);
      setIsLoading(false);
      return null;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    setUser(null);
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <UserContext.Provider value={{ user, isLoading, fetchUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default UserContext;
