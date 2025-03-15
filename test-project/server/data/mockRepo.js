const mockData = {
  categories: [
    {
      id: 1,
      name: 'Buffet bữa sáng',
      price: 100000,
      description: 'Bắt đầu từ 5:30 đến 9:30',
    },
    {
      id: 2,
      name: 'Buffet bữa trưa',
      price: 299000,
      description: 'Bắt đầu từ 11:00 đến 13:00',
    },
    {
      id: 3,
      name: 'Buffet bữa tối',
      price: 349000,
      description: 'Bắt đầu từ 17:30 đến 21:00',
    },
    {
      id: 4,
      name: 'Ăn sáng tại phòng',
      price: 79000,
      description: 'Giá tính cho 1 người, chưa bao gồm tiền tip',
    },
    {
      id: 5,
      name: 'Ăn trưa tại phòng',
      price: 149000,
      description: 'Giá tính cho 1 người, chưa bao gồm tiền tip',
    },
    {
      id: 6,
      name: 'Ăn tối tại phòng',
      price: 249000,
      description: 'Giá tính cho 1 người, chưa bao gồm tiền tip',
    },
    {
      id: 7,
      name: 'Massage tại phòng',
      price: 400000,
      description: 'Giá cho 1 nhân viên phục vụ, chưa bao gồm tiền tip',
    },
    {
      id: 8,
      name: 'Giặt ủi',
      price: 50000,
      description: 'Giá cho 1 kg quần áo',
    },
    {
      id: 9,
      name: 'Két sắt giữ đồ',
      price: 50000,
      description: 'Giá cho 1 ngày',
    },
    {
      id: 10,
      name: 'Đưa đón từ sân bay',
      price: 100000,
      description: 'Cho 1 khách',
    },
  ],
}

const db = {
  categories: {
    getAll: () => mockData.categories,
    findById: (id) => mockData.categories.find((item) => item.id == id),
    deleteById: (id) => {
      const item = mockData.categories.find((item) => item.id == id)
      if (item) {
        _.remove(mockData.categories, (item) => item.id == id)
        return id
      }
      return null
    },
    create: (input) => {
      const id = mockData.categories.length + 1
      const item = {
        id: id,
        name: input.name,
      }
      mockData.categories.push(item)
      return item
    },
    updateById: (id, input) => {
      const index = mockData.categories.findIndex((item) => item.id == id)
      if (index >= 0) {
        Object.keys(input).map((key) => {
          const value = input[key]
          mockData.categories[index][key] = value
        })
        return mockData.categories[index]
      }
      return null
    },
  },
}

export { db }
