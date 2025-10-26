import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Check if admin is logged in via admin login page
    const isAdmin = localStorage.getItem('isAdmin');
    const adminEmail = localStorage.getItem('adminEmail');
    
    // Must have both isAdmin flag AND adminEmail from admin login
    if (isAdmin === 'true' && adminEmail === 'Singh') {
      setIsAuthorized(true);
      setIsChecking(false);
    } else {
      // Clear any invalid admin session
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('adminEmail');
      // Redirect to admin login
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
