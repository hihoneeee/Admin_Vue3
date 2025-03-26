export const productsItem = [
  {
    id: 1,
    name: "Ngày hôm nay",
    value: "",
  },
  {
    id: 2,
    name: "Ngày hôm trước",
    value: "",
  },
  {
    id: 3,
    name: "7 ngày trước",
    value: "",
  },
  {
    id: 3,
    name: "30 ngày trước",
    value: "",
  },
];

export const orderItem = [
  {
    id: 4544321,
    orderCode: "ORD-2024-0017",
    trackingNumber: "SHIP-US-87654321",
    address: {
      street: "Apt. 6/B, 192 Edsel Road",
      city: "Van Nuys",
      state: "California",
      country: "USA",
      zipCode: "96580",
      type: "Residential",
    },
    status: {
      current: "Delivery",
      history: [
        {
          state: "Order Placed",
          date: "2025-03-17 10:30:00",
          location: "Online Platform",
        },
        {
          state: "Payment Confirmed",
          date: "2025-03-17 11:15:00",
          location: "Payment Gateway",
        },
        {
          state: "Processing",
          date: "2025-03-17 13:45:00",
          location: "Warehouse",
        },
        {
          state: "Shipped",
          date: "2025-03-18 09:20:00",
          location: "Shipping Center",
        },
      ],
    },
    shipping: {
      method: "Fast delivery",
      carrier: "FedEx Express",
      estimatedDelivery: "2025-03-22",
      trackingUrl: "https://www.fedex.com/tracking?tracknumbers=87654321",
    },
    payment: {
      method: "Credit Card",
      cardType: "Mastercard",
      lastFourDigits: "5678",
      transactionId: "TXN-2024-0045678",
      billingAddress: {
        street: "321 Elm Street",
        city: "San Francisco",
        state: "California",
        country: "USA",
        zipCode: "94110",
      },
    },
    total: 1454.5,
    quantity: 2,
    created_at: "2025-03-17 15:43:58.628",
    dataUser: {
      userName: "Captain Haddock",
      email: "anyname@email.com",
      phone: "+12514463453",
      customerType: "Registered",
      memberSince: "2023-06-15",
    },
    dataProduct: [
      {
        id: "PROD-001",
        name: "Velvet Swoop Arm Accent Chair",
        seller: "California Style Co.",
        price: 109.0,
        size: "M",
        color: "Navy Blue",
        image:
          "https://clickbuy.com.vn/uploads/pro/iphone-13-pro-max-128gb-cu-dep-99-khong-zin-tang-may-lg-157742.png",
        sku: "CHAIR-NB-M-001",
        category: "Furniture",
        warranty: {
          type: "Standard",
          period: "1 Year",
          coverageDetails: "Manufacturer defects",
        },
      },
      {
        id: "PROD-002",
        name: "Modern Coffee Table",
        seller: "Modern Furniture Inc.",
        price: 89.0,
        size: "L",
        color: "Walnut",
        image:
          "https://clickbuy.com.vn/uploads/pro/iphone-13-pro-max-128gb-cu-dep-99-khong-zin-tang-may-lg-157742.png",
        sku: "TABLE-WAL-L-002",
        category: "Furniture",
        warranty: {
          type: "Extended",
          period: "2 Years",
          coverageDetails: "Comprehensive protection",
        },
      },
    ],
    notes: {
      customerNote: "Please leave at front door if no answer",
      staffNote: "Fragile items - handle with care",
    },
    discounts: [
      {
        type: "Seasonal Sale",
        amount: 20.5,
        code: "SUMMER2025",
      },
    ],
    returnPolicy: {
      allowReturn: true,
      period: "30 Days",
      conditions: "Item must be unused and in original packaging",
    },
  },
];
