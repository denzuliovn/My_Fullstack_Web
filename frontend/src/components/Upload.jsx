import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const Upload = () => {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(""); // Thêm state để hiển thị thông báo

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImage(URL.createObjectURL(selectedFile));
    }
  };

  const handleUploadImage = async () => {
    setMessage(""); // Reset message trước khi upload
    const data = {
      operations: JSON.stringify({
        query: `mutation ImageUpload($file: File!) {
              upload(file: $file)
        }`,
        variables: { file: null},
      }),
      map: JSON.stringify({
        0: ["variables.file"],
      }),
    };
    
    const requestBody = new FormData();
    for (const name in data) {
      requestBody.append(name, data[name]);
    }
    requestBody.append("0", file);

    try {
      const response = await fetch(
        "https://urban-space-disco-r9gxgw544wwhr67-4000.app.github.dev/",
        { method: "POST", body: requestBody }
      );
      
      if (!response.ok) throw new Error("Upload failed");
      const result = await response.json();
      console.log(result);
      setMessage("✅ Thêm ảnh hoàn thành!"); // Cập nhật thông báo khi upload thành công
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("❌ Upload thất bại. Vui lòng thử lại!");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <Card className="w-full max-w-md p-4 flex flex-col items-center">
        <CardContent className="w-full flex flex-col items-center gap-4">
          <Label htmlFor="image-upload" className="block mb-2">Chọn ảnh:</Label>
          <Input id="image-upload" type="file" accept="image/*" onChange={handleFileChange} />

          {image && (
            <div className="mt-4 flex flex-col items-center gap-2">
              <img src={image} alt="Preview" className="w-32 h-32 object-cover rounded-lg border" />
              <Button variant="outline" size="sm" onClick={handleUploadImage}>Upload</Button>
            </div>
          )}
          
          {message && <p className="mt-2 text-sm font-semibold">{message}</p>} {/* Hiển thị thông báo */}
        </CardContent>
      </Card>
    </div>
  );
};

export default Upload;
