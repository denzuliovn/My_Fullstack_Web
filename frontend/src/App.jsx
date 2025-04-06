import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { client } from "./graphql/client.js";
import { AuthProvider } from "./AuthContext/AuthContext";
import Services from "./components/Services";
import Service from "./components/Service";
import Nopage from "./pages/Nopage";
import DeleteService from "./components/DeleteService";
import ServiceEdit from "./components/ServiceEdit";
import CreateService from "./components/CreateService";
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
            <Route path="/" element={<Services />} />
            <Route path="/Services" element={<Services />} />
            <Route path="/Services/create" element={<CreateService />} /> {/* Sửa cú pháp: bỏ khoảng trắng trước CreateService */}
            <Route path="/Service/:id" element={<Service />} />
            <Route path="/Service/:id/delete" element={<DeleteService />} />
            <Route path="/Service/edit/:id" element={<ServiceEdit />} />
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