
# Data Collection Form

## Description
This is a simple web application for collecting user data (name, phone number, and an image) and saving it in a SQLite database. The application also provides an API endpoint to view the submitted data.

## How to Run

### Prerequisites
- Node.js installed on your machine.

### Setup Instructions
1. Clone the repository or extract the zip file.
2. Navigate to the project directory in the terminal.
3. Run `npm install` to install required dependencies.
4. Start the server using `node server.js`.
5. Open your browser and navigate to `http://localhost:3000`.

### Testing
1. Fill in the form with valid inputs (name, phone number, and an image).
2. Submit the form.
3. Check the `uploads/` directory for the uploaded image.
4. Navigate to `http://localhost:3000/data` to view submitted data in JSON format.

## File Structure
- `index.html`: The frontend form.
- `style.css`: Styling for the form.
- `server.js`: Backend server handling form submissions and data storage.
- `database.db`: SQLite database storing user data.
- `uploads/`: Directory for storing uploaded images.
    