export const up = async (db, client) => {
    await db.collection("services").insertMany([
      {
        name: "Buffet bữa sáng",
        price: 100000,
        description: "Bắt đầu từ 5:30 đến 9:30"
      },
      {
        name: "Buffet bữa trưa",
        price: 299000,
        description: "Bắt đầu từ 11:00 đến 13:00"
      },
      {
        name: "Buffet bữa tối",
        price: 349000,
        description: "Bắt đầu từ 17:30 đến 21:00"
      },
      {
        name: "Ăn sáng tại phòng",
        price: 79000,
        description: "Giá tính cho 1 người, chưa bao gồm tiền tip"
      },
      {
        name: "Ăn trưa tại phòng",
        price: 149000,
        description: "Giá tính cho 1 người, chưa bao gồm tiền tip"
      },
      {
        name: "Ăn tối tại phòng",
        price: 249000,
        description: "Giá tính cho 1 người, chưa bao gồm tiền tip"
      },
      {
        name: "Massage tại phòng",
        price: 400000,
        description: "Giá cho 1 nhân viên phục vụ, chưa bao gồm tiền tip"
      },
      {
        name: "Giặt ủi",
        price: 50000,
        description: "Giá cho 1 kg quần áo"
      },
      {
        name: "Két sắt giữ đồ",
        price: 50000,
        description: "Giá cho 1 ngày"
      },
      {
        name: "Đưa đón từ sân bay",
        price: 100000,
        description: "Cho 1 khách"
      }
    ]);
  };
  
  export const down = async (db, client) => {};