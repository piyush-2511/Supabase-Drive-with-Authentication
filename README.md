# User Authentication and File Management with Supabase  

This project provides user authentication, token generation using JWT, session management via cookies, and file handling with Supabase. It includes login and registration functionality, allowing users to upload, download (signed URL), and delete files stored in their Supabase account.  

## Features  

- **User Authentication**: Secure login and registration using JWT.  
- **Session Management**: Cookies to handle user sessions.  
- **File Management**:  
  - Upload files to Supabase.  
  - Generate signed URLs for temporary file access.  
  - Delete files from the Supabase drive.  

## Prerequisites  

Ensure you have the following environment variables configured:  

- `MONGODB_URI`: MongoDB connection string.  
- `JWT_SECRET`: Secret key for JWT token generation.  
- `SUPABASE_URL`: URL of your Supabase project.  
- `SUPABASE_KEY`: Supabase API key.  

## Technologies Used  

- **Backend**: Node.js (or specify the framework, e.g., Express.js)  
- **Database**: MongoDB  
- **Authentication**: JSON Web Tokens (JWT)  
- **File Storage**: Supabase  

## Installation  

1. Clone the repository:  
   ```bash  
   git clone https://github.com/yourusername/your-repo-name.git  
   cd your-repo-name  
   ```  

2. Install dependencies:  
   ```bash  
   npm install  
   ```  

3. Configure environment variables:  
   Create a `.env` file in the root directory and include:  
   ```env  
   MONGODB_URI=your_mongodb_uri  
   JWT_SECRET=your_jwt_secret  
   SUPABASE_URL=your_supabase_url  
   SUPABASE_KEY=your_supabase_key  
   ```  

4. Run the application:  
   ```bash  
   npm start  
   ```  

## Usage  

- **Authentication**:  
  - Register: Send a `POST` request to `/register` with user details.  
  - Login: Send a `POST` request to `/login` with credentials.  

- **File Management**:  
  - Upload: Use `/upload` endpoint with file data.  
  - Download: Fetch a signed URL for a file using `/download`.  
  - Delete: Remove a file via `/delete`.  

## Contribution  

Contributions are welcome! Feel free to open issues or submit pull requests.    

## Acknowledgments  

- [Supabase](https://supabase.com/) for providing a powerful backend-as-a-service platform.  
- [MongoDB](https://www.mongodb.com/) for robust database solutions.  
- [JWT](https://jwt.io/) for secure token-based authentication.  
