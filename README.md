# Space Explorer

Space Explorer is an interactive web application that allows users to explore NASA's Astronomy Picture of the Day (APOD), save favorite images, and test their space knowledge through quizzes. The application provides an educational and engaging way to learn about space and astronomy.

## Features

- **Daily Astronomy Picture**: View NASA's Astronomy Picture of the Day with detailed explanations
- **Historical Archive**: Browse through past APOD images by selecting specific dates
- **Favorites Collection**: Save and manage your favorite space images
- **Space Quiz**: Test your knowledge with space-related quiz questions
- **Responsive Design**: Enjoy a seamless experience across desktop and mobile devices

## Technology Stack

### Frontend
- React.js
- Vite
- Axios for API requests
- React Router for navigation

### Backend
- Node.js
- Express.js
- MongoDB for data storage
- NASA Open APIs integration

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)
- NASA API key ([get one here](https://api.nasa.gov/))

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/space-explorer.git
   cd space-explorer/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   NASA_API_KEY=your_nasa_api_key
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Open a new terminal window and navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Running Both Servers Simultaneously

### Using Separate Terminal Windows
1. Start backend in one terminal:
   ```bash
   cd backend && npm start
   ```

2. Start frontend in another terminal:
   ```bash
   cd frontend && npm run dev
   ```

### Using Concurrently (Optional)
1. Install concurrently in the project root:
   ```bash
   npm install --save-dev concurrently
   ```

2. Add a script to your frontend's package.json:
   ```json
   "scripts": {
     "dev": "vite",
     "backend": "cd ../backend && npm start",
     "dev:all": "concurrently \"npm run dev\" \"npm run backend\""
   }
   ```

3. Run both servers with a single command:
   ```bash
   npm run dev:all
   ```

## API Endpoints

### NASA APOD
- `GET /api/nasa/apod` - Get today's Astronomy Picture of the Day
- `GET /api/nasa/apod?date=YYYY-MM-DD` - Get APOD for a specific date

### Favorites
- `GET /api/favorites/:userId` - Get all favorites for a user
- `POST /api/favorites` - Add an image to favorites
- `DELETE /api/favorites/:id` - Remove an image from favorites

### Quiz
- `GET /api/quiz` - Get a set of quiz questions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- NASA for providing the APOD API
- Space enthusiasts everywhere for their passion and curiosity