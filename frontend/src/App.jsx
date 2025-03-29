import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { client } from "./graphql/client.js";
import { AuthProvider } from "./AuthContext/AuthContext";
import Categories from "./components/Categories";
import Category from "./components/Category";
import Nopage from "./pages/Nopage";
import DeleteCategory from "./components/DeleteCategory";
import CategoryEdit from "./components/CategoryEdit";
import CreateCategory from "./components/CreateCategory";
import Upload from "./components/Upload";
import Login from "./components/Login"; 
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";



function App() {
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Categories />} />
            <Route path="/Categories" element={<Categories />} />
            <Route path="/Categories/create" element={<CreateCategory />} /> {/* Sửa cú pháp: bỏ khoảng trắng trước CreateCategory */}
            <Route path="/Category/:id" element={<Category />} />
            <Route path="/Category/:id/delete" element={<DeleteCategory />} />
            <Route path="/Category/edit/:id" element={<CategoryEdit />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="*" element={<Nopage />} />
          </Routes>
          <Footer />
        </Router>
      </ApolloProvider>
    </AuthProvider>
  );
}

export default App;