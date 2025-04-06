// frontend/src/components/ServiceEdit.jsx
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useParams, useNavigate, Link } from "react-router-dom";
import { CATEGORY_BY_ID, UPDATE_BY_ID, UPDATE_BY_MANAGER } from "../graphql/services.js";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useContext } from "react";
import { AuthContext } from "../AuthContext/AuthContext";

const ServiceEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const { data, loading, error } = useQuery(CATEGORY_BY_ID, {
    variables: { id },
  });

  const [service, setService] = useState({ name: "", price: "", description: "", image: "" });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const isAdmin = user?.role === "admin";
  const isManager = user?.role === "manager";

  const [updateService, { loading: updateLoading, error: updateError }] = useMutation(
    isAdmin ? UPDATE_BY_ID : UPDATE_BY_MANAGER,
    {
      onCompleted: () => {
        navigate(`/Service/${id}`);
      },
    }
  );

  useEffect(() => {
    if (data?.service) {
      setService({
        name: data.service.name,
        price: data.service.price,
        description: data.service.description,
        image: data.service.image,
      });
      if (data.service.image) {
        setPreview(`https://urban-space-disco-r9gxgw544wwhr67-4000.app.github.dev/img/${data.service.image}`);
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!service.name.trim() || (isAdmin && !service.price.trim()) || !service.description.trim()) {
      alert("Required fields cannot be empty!");
      return;
    }

    let imageName = service.image;
    if (isAdmin && file) {
      imageName = await handleUploadImage();
    }

    try {
      if (isAdmin) {
        await updateService({
          variables: {
            id,
            input: { ...service, image: imageName },
          },
        });
      } else {
        await updateService({
          variables: {
            id,
            input: { name: service.name, description: service.description },
          },
        });
      }
    } catch (err) {
      console.error("Error updating service:", err);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <pre className="text-red-500">{error.message}</pre>;

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96 text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Edit Service</h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <Label htmlFor="name" className="block text-gray-600 mb-1">Service Name:</Label>
            <Input
              type="text"
              id="name"
              value={service.name}
              onChange={(e) => setService({ ...service, name: e.target.value })}
            />
          </div>
          {isAdmin && (
            <div>
              <Label htmlFor="price" className="block text-gray-600 mb-1">Price:</Label>
              <Input
                type="text"
                id="price"
                value={service.price}
                onChange={(e) => setService({ ...service, price: e.target.value })}
              />
            </div>
          )}
          <div>
            <Label htmlFor="description" className="block text-gray-600 mb-1">Description:</Label>
            <textarea
              id="description"
              value={service.description}
              onChange={(e) => setService({ ...service, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          {isAdmin && (
            <div>
              <Label htmlFor="image" className="block text-gray-600 mb-1">Image:</Label>
              <Input type="file" id="image" accept="image/*" onChange={handleFileChange} />
            </div>
          )}
          {preview && <img src={preview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-lg" />}
          <Button type="submit" disabled={updateLoading}>
            {updateLoading ? "Updating..." : "Update"}
          </Button>
        </form>
        {updateError && <p className="text-red-500 mt-2">{updateError.message}</p>}
        <Link to={`/Service/${id}`}>
          <Button className="mt-4">Back</Button>
        </Link>
      </div>
    </div>
  );
};

export default ServiceEdit;