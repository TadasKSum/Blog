import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";

// Import Components
import NavBar from "./components/NavBar";

// Import Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import FavoritesPage from "./pages/FavoritesPage";
import CreatePostPage from "./pages/CreatePostPage";
import UserPage from "./pages/UserPage";
import SinglePostPage from "./pages/SinglePostPage";
import UpdatePostPage from "./pages/UpdatePostPage";

function App() {
    return (
        <>
            <BrowserRouter>
                <NavBar/>
                <Routes>
                    <Route element={<HomePage/>} path="/" />
                    <Route element={<LoginPage/>} path="/login" />
                    <Route element={<RegisterPage/>} path="/register" />
                    <Route element={<FavoritesPage/>} path="/favorites" />
                    <Route element={<CreatePostPage/>} path="/create" />
                    <Route element={<UserPage/>} path="/user/:username"/>
                    <Route element={<SinglePostPage/>} path="/post/:username/:id" />
                    <Route element={<UpdatePostPage/>} path="/update/:id" />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
