export const productsData = [
    {
      _id: '1',
      name: 'Steel Hammer',
      image: 'https://picsum.photos/200/200',
      brand: 'SteelTools',
      description: 'High-quality hammer for professional use',
      price: 249,
      mainSize: { value: 250, unit: 'mm' },
      variants: [
        { value: 150, unit: 'mm', price: 199 },
        { value: 200, unit: 'mm', price: 229 },
        { value: 300, unit: 'mm', price: 279 },
      ],
    },
    {
      _id: '2',
      name: 'Cordless Drill',
      image: 'https://picsum.photos/200/200',
      brand: 'PowerTech',
      description: 'Cordless drill with two-speed settings',
      price: 1499,
      mainSize: { value: 12, unit: 'V' },
      variants: [
        // { value: 10.8, unit: 'V', price: 1299 },
        // { value: 14.4, unit: 'V', price: 1699 },
      ],
    },
    {
      _id: '3',
      name: 'Interior Wall Paint',
      image: 'https://picsum.photos/200/200',
      brand: 'ColorMax',
      description: 'Premium wall paint with matte finish',
      price: 499,
      mainSize: { value: 5, unit: 'L' },
      variants: [
        { value: 1, unit: 'L', price: 129 },
        { value: 10, unit: 'L', price: 899 },
      ],
    },
    {
      _id: '4',
      name: 'Adjustable Wrench',
      image: 'https://picsum.photos/200/200',
      brand: 'FixIt',
      description: 'Adjustable wrench made of stainless steel',
      price: 179,
      mainSize: { value: 200, unit: 'mm' },
      variants: [
        { value: 150, unit: 'mm', price: 139 },
        { value: 250, unit: 'mm', price: 219 },
      ],
    },
    {
      _id: '5',
      name: 'Lubricant Oil',
      image: 'https://picsum.photos/200/200',
      brand: 'SmoothRun',
      description: 'Multi-purpose industrial lubricant oil',
      price: 349,
      mainSize: { value: 1, unit: 'L' },
      variants: [
        { value: 0.5, unit: 'L', price: 199 },
        { value: 2, unit: 'L', price: 649 },
      ],
    },
  ];
  

  export const ordersResponse = {
    success: true,
    code: 200,
    message: "Orders fetched successfully",
    data: [
      {
        orderId: "ORD123456",
        isCashPayment: true,
        noOfItems: 3,
        date: "2025-04-28",
        time: "14:30",
        amount: 249.99
      },
      {
        orderId: "ORD123457",
        isCashPayment: false,
        noOfItems: 5,
        date: "2025-04-27",
        time: "10:15",
        amount: 599.00
      },
      {
        orderId: "ORD123458",
        isCashPayment: true,
        noOfItems: 2,
        date: "2025-04-26",
        time: "18:45",
        amount: 149.50
      },
      {
        orderId: "ORD123459",
        isCashPayment: false,
        noOfItems: 1,
        date: "2025-04-25",
        time: "09:05",
        amount: 89.99
      }
    ]
  };
  