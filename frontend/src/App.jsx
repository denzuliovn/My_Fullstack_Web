import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Categories from "./components/Categories";
import Category from "./components/Category";
import Nopage from "./pages/Nopage";
import DeleteCategory from "./components/DeleteCategory";
import CategoryEdit from "./components/CategoryEdit";
import CreateCategory from "./components/CreateCategory";
import Upload from "./components/Upload";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Categories />} />
        <Route path="/Categories" element={<Categories />} />
        <Route path="/Categories/create" element={< CreateCategory />}/>
        <Route path="/Category/:id" element={<Category />} />
        <Route path="/Category/:id/delete" element={<DeleteCategory />} />
        <Route path="/Category/edit/:id" element={<CategoryEdit />} />
        <Route path="/upload" element={<Upload />}/>
        <Route path="*" element={<Nopage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
