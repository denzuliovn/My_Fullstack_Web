import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate, Link } from "react-router-dom";
import { CREATE_CATEGORY } from "../graphql/categories.js";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const CreateCategory = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState({ name: "", price: "", description: "", image: "" });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [createCategory, { loading, error }] = useMutation(CREATE_CATEGORY, {
    onCompleted: () => {
      navigate("/");
      window.location.reload();
    },
  });

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUploadImage = async () => {
    const requestBody = new FormData();
    requestBody.append(
      "operations",
      JSON.stringify({
        query: `mutation ImageUpload($file: File!) { upload(file: $file) }`,
        variables: { file: null },
      })
    );
    requestBody.append("map", JSON.stringify({ 0: ["variables.file"] }));
    requestBody.append("0", file);

    const response = await fetch("https://urban-space-disco-r9gxgw544wwhr67-4000.app.github.dev/", {
      method: "POST",
      body: requestBody,
    });
    const result = await response.json();
    return result.data.upload; // Trả về tên file đã upload
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!category.name.trim() || !category.price.trim() || !category.description.trim()) {
      alert("All fields are required!");
      return;
    }

    let imageName = "";
    if (file) {
      imageName = await handleUploadImage();
    }

    try {
      await createCategory({
        variables: { input: { ...category, image: imageName } },
      });
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 500);
    } catch (err) {
      console.error("Error creating category:", err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96 text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Create New Service</h2>
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <Label htmlFor="name" className="block text-gray-600 mb-1">Service Name:</Label>
            <Input
              type="text"
              id="name"
              value={category.name}
              onChange={(e) => setCategory({ ...category, name: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="price" className="block text-gray-600 mb-1">Price:</Label>
            <Input
              type="text"
              id="price"
              value={category.price}
              onChange={(e) => setCategory({ ...category, price: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="description" className="block text-gray-600 mb-1">Description:</Label>
            <textarea
              id="description"
              value={category.description}
              onChange={(e) => setCategory({ ...category, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <div>
            <Label htmlFor="image" className="block text-gray-600 mb-1">Image:</Label>
            <Input type="file" id="image" accept="image/*" onChange={handleFileChange} />
            {preview && <img src={preview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-lg" />}
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create"}
          </Button>
        </form>
        {error && <p className="text-red-500 mt-2">{error.message}</p>}
        <Link to={`/`}>
          <Button className="mt-4">Back</Button>
        </Link>
      </div>
    </div>
  );
};

export default CreateCategory;