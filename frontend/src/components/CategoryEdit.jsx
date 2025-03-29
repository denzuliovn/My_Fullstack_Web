import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { CATEGORY_BY_ID, UPDATE_BY_ID } from "../graphql/categories.js";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const CategoryEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, loading, error } = useQuery(CATEGORY_BY_ID, {
    variables: { id },
  });

  const [updateCategory] = useMutation(UPDATE_BY_ID);

  const [category, setCategory] = useState({ name: "", price: "", description: "", image: "" });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (data?.category) {
      setCategory({
        name: data.category.name || "",
        price: data.category.price || "",
        description: data.category.description || "",
        image: data.category.image || "",
      });
      if (data.category.image) {
        setPreview(`https://urban-space-disco-r9gxgw544wwhr67-4000.app.github.dev/img/${data.category.image}`);
      }
    }
  }, [data]);

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
    return result.data.upload;
  };

  const handleUpdate = async () => {
    let imageName = category.image;
    if (file) {
      imageName = await handleUploadImage();
    }

    const input = { ...category, image: imageName };
    try {
      await updateCategory({ variables: { id, input } });
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error("Error updating category:", err);
    }
  };

  const handleCancel = () => {
    navigate(`/category/${id}`);
  };

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96 text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Edit Service</h2>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
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
          <Button type="button" onClick={handleUpdate}>
            OK
          </Button>
          <Button type="button" onClick={handleCancel} className="mt-2">
            Cancel
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CategoryEdit;