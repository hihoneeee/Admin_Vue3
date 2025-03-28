export const dataUsers = [
  {
    id: 1,
    userName: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0901234567",
    role: "Admin",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    userName: "Trần Thị B",
    email: "tranthib@example.com",
    phone: "0912345678",
    role: "User",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 3,
    userName: "Lê Văn C",
    email: "levanc@example.com",
    phone: "0923456789",
    role: "Manager",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: 4,
    userName: "Phạm Thị D",
    email: "phamthid@example.com",
    phone: "0934567890",
    role: "User",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: 5,
    userName: "Hoàng Văn E",
    email: "hoangvane@example.com",
    phone: "0945678901",
    role: "Admin",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    id: 6,
    userName: "Ngô Thị F",
    email: "ngothif@example.com",
    phone: "0956789012",
    role: "User",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    id: 7,
    userName: "Đặng Văn G",
    email: "dangvang@example.com",
    phone: "0967890123",
    role: "Manager",
    avatar: "https://randomuser.me/api/portraits/men/7.jpg",
  },
  {
    id: 8,
    userName: "Vũ Thị H",
    email: "vuthih@example.com",
    phone: "0978901234",
    role: "User",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
  },
  {
    id: 9,
    userName: "Bùi Văn I",
    email: "buivani@example.com",
    phone: "0989012345",
    role: "Admin",
    avatar: "https://randomuser.me/api/portraits/men/9.jpg",
  },
  {
    id: 10,
    userName: "Đỗ Thị K",
    email: "dothik@example.com",
    phone: "0990123456",
    role: "User",
    avatar: "https://randomuser.me/api/portraits/women/10.jpg",
  },
  {
    id: 11,
    userName: "Hồ Văn L",
    email: "hovanl@example.com",
    phone: "0901234567",
    role: "Manager",
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    id: 12,
    userName: "Lý Thị M",
    email: "lythim@example.com",
    phone: "0912345678",
    role: "User",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    id: 13,
    userName: "Phan Văn N",
    email: "phanvann@example.com",
    phone: "0923456789",
    role: "Admin",
    avatar: "https://randomuser.me/api/portraits/men/13.jpg",
  },
  {
    id: 14,
    userName: "Mai Thị P",
    email: "maithip@example.com",
    phone: "0934567890",
    role: "User",
    avatar: "https://randomuser.me/api/portraits/women/14.jpg",
  },
  {
    id: 15,
    userName: "Trịnh Văn Q",
    email: "trinhvanq@example.com",
    phone: "0945678901",
    role: "Manager",
    avatar: "https://randomuser.me/api/portraits/men/15.jpg",
  },
];

export const menuItems = [
  {
    id: 1,
    title: "Bảng điều khiển",
    name: "dash-board",
    icon: "mdi-view-dashboard-outline",
    to: "/admin/dash-board",
  },
  {
    id: 2,
    title: "Sản phẩm",
    name: "product",
    icon: "mdi-store-outline",
    children: [
      {
        title: "Danh sách",
        to: "/admin/product",
      },
      {
        title: "Tạo mới",
        to: "/admin/product/create",
      },
    ],
  },
  {
    id: 3,
    title: "Người dùng",
    name: "user",
    icon: "mdi-account-group-outline",
    children: [
      {
        title: "Danh sách",
        to: "/admin/user",
      },
      {
        title: "Tạo mới",
        to: "/admin/user/create",
      },
    ],
  },
  {
    id: 4,
    title: "Đơn hàng",
    name: "order",
    icon: "mdi-store-outline",
    to: "/admin/order",
  },
  {
    id: 5,
    title: "Lịch",
    name: "calendar",
    icon: "mdi-calendar-outline",
    to: "/admin/calendar",
  },
  {
    title: "Nhiệm vụ",
    name: "task",
    icon: "mdi-checkbox-outline",
    to: "/admin/task",
  },
];

export const tasksItem = [
  {
    id: 1,
    title: "Dashboard Design",
    status: "todo",
    priority: "Low",
    track: true,
    description: "Discussion for management dashboard ui design",
    assignees: [
      "https://randomuser.me/api/portraits/men/1.jpg",
      "https://randomuser.me/api/portraits/women/2.jpg",
    ],
    extraAssignees: 1,
    comments: 112,
    attachments: "1.2k",
  },
  {
    id: 2,
    title: "Landing page Design",
    status: "todo",
    priority: "Medium",
    risk: true,
    description: "Discussion for management dashboard ui design",
    assignees: [
      "https://randomuser.me/api/portraits/women/3.jpg",
      "https://randomuser.me/api/portraits/men/4.jpg",
    ],
    extraAssignees: 1,
    comments: 112,
    attachments: "1.2k",
  },
  {
    id: 3,
    title: "E-Shop Mobile App",
    status: "todo",
    priority: "High",
    description: "Discussion for management dashboard ui design",
    assignees: [
      "https://randomuser.me/api/portraits/men/5.jpg",
      "https://randomuser.me/api/portraits/women/6.jpg",
    ],
    extraAssignees: 1,
    comments: 112,
    attachments: "1.2k",
  },
  {
    id: 4,
    title: "Dashboard Design",
    status: "todo",
    priority: "Low",
    track: true,
    description: "Discussion for management dashboard ui design",
    assignees: [
      "https://randomuser.me/api/portraits/men/7.jpg",
      "https://randomuser.me/api/portraits/women/8.jpg",
    ],
    extraAssignees: 1,
    comments: 112,
    attachments: "1.2k",
  },
  {
    id: 5,
    title: "Dashboard Design",
    status: "in-progress",
    priority: "High",
    track: true,
    description: "Discussion for management dashboard ui design",
    assignees: [
      "https://randomuser.me/api/portraits/men/9.jpg",
      "https://randomuser.me/api/portraits/women/10.jpg",
    ],
    extraAssignees: 1,
    comments: 112,
    attachments: "1.2k",
  },
  {
    id: 6,
    title: "Landing page Design",
    status: "in-progress",
    priority: "Low",
    description: "Discussion for management dashboard ui design",
    assignees: [
      "https://randomuser.me/api/portraits/women/11.jpg",
      "https://randomuser.me/api/portraits/men/12.jpg",
    ],
    extraAssignees: 1,
    preview: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
    comments: 112,
    attachments: "1.2k",
  },
  {
    id: 7,
    title: "E-Shop Mobile App",
    status: "in-progress",
    priority: "Low",
    track: true,
    description: "Discussion for management dashboard ui design",
    assignees: [
      "https://randomuser.me/api/portraits/men/13.jpg",
      "https://randomuser.me/api/portraits/women/14.jpg",
    ],
    extraAssignees: 1,
    comments: 112,
    attachments: "1.2k",
  },
  {
    id: 8,
    title: "Dashboard Design",
    status: "in-review",
    priority: "Medium",
    description: "Discussion for management dashboard ui design",
    assignees: [
      "https://randomuser.me/api/portraits/men/15.jpg",
      "https://randomuser.me/api/portraits/women/16.jpg",
    ],
    extraAssignees: 1,
    preview: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
    comments: 112,
    attachments: "1.2k",
  },
  {
    id: 9,
    title: "E-Shop Mobile App",
    status: "in-review",
    priority: "Low",
    description: "Discussion for management dashboard ui design",
    assignees: [
      "https://randomuser.me/api/portraits/women/17.jpg",
      "https://randomuser.me/api/portraits/men/18.jpg",
    ],
    extraAssignees: 1,
    preview: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
    comments: 112,
    attachments: "1.2k",
  },
  {
    id: 10,
    title: "Dashboard Design",
    status: "done",
    priority: "High",
    track: true,
    description: "Discussion for management dashboard ui design",
    assignees: [
      "https://randomuser.me/api/portraits/men/19.jpg",
      "https://randomuser.me/api/portraits/women/20.jpg",
    ],
    extraAssignees: 1,
    preview: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
    comments: 112,
    attachments: "1.2k",
  },
];
