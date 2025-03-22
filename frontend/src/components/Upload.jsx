import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
// import { gql } from "@apollo/client";

const Upload = () => {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);

  // Xử lý chọn ảnh
  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImage(URL.createObjectURL(selectedFile)); // Hiển thị ảnh xem trước
    }
  };

  // Xử lý upload ảnh
  const handleUploadImage = async () => {
    const data = {
      operations: JSON.stringify({
        query: `mutation ImageUpload($file: File!) {
              upload(file: $file)
        }`,
        variables: { file: null },
      }),
      map: JSON.stringify({
        0: ["variables.file"],
      }),
    };

    // Chuẩn bị nội dung của form
    const requestBody = new FormData();
    for (const name in data) {
      requestBody.append(name, data[name]);
    }
    requestBody.append("0", file);
    const request = {
      method: "POST",
      body: requestBody,
    };

    // Thực hiện upload vào endpoint
    const response = await fetch(
      "https://urban-space-disco-r9gxgw544wwhr67-4000.app.github.dev/",
      request
    );

    // Xử lí kết quả trả về
    const responseBody = await response.text();
    const result = JSON.parse(responseBody);
    console.log(result);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <Card className="w-full max-w-md p-4 flex flex-col items-center">
        <CardContent className="w-full flex flex-col items-center gap-4">
          <Label htmlFor="image-upload" className="block mb-2">
            Chọn ảnh:
          </Label>
          <Input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />

          {image && (
            <div className="mt-4 flex flex-col items-center gap-2">
              <img
                src={image}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg border"
              />
              <Button variant="outline" size="sm" onClick={handleUploadImage}>
                Upload
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Upload;
