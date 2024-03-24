// Check for a valid token on page load
document.addEventListener('DOMContentLoaded', async () => {
    try {
      // Get the token from local storage
      const token = localStorage.getItem('token');
      if (token) {
        // Send a GET request to the server to check if the token is valid
        const response = await fetch('/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.ok) {
          // Token is valid
          const user = await response.json();
          // Redirect the user to a protected page
          window.location.href = '/protected';
        } else {
          // Token is invalid, clear the token from local storage and redirect the user to the login page
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
      }


    } catch (error) {
      console.error(error);
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  });

  // Handle logout
document.getElementById('logout-link').addEventListener('click', (e) => {
    e.preventDefault();
  
    // Clear the token from local storage
    localStorage.removeItem('token');
  
    // Redirect the user to the login page
    window.location.href = '/login';
  });