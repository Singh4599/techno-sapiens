import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Check if admin is logged in
    const isAdmin = localStorage.getItem('isAdmin');
    
    if (isAdmin === 'true') {
      setIsAuthorized(true);
      setIsChecking(false);
    } else {
      // Not logged in as admin - redirect to login
      navigate('/admin/login', { replace: true });
    }
  }, [navigate]);

  // Show nothing while checking
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-text-primary">Checking access...</div>
      </div>
    );
  }

  // If not authorized, show nothing (will redirect)
  if (!isAuthorized) {
    return null;
  }

  // Render children if authorized
  return <>{children}</>;
};

export default AdminProtectedRoute;
