interface NotificationItem {
  from: string;
  content: string;
  createdAt: Date;
}

export const histories: NotificationItem[] = [
  {
    from: 'Tổng đài Thu Cúc',
    createdAt: new Date(),
    content: 'KHUYẾN MÃI CỰC LỚN vào tháng 7 Lorem ipsum dolor sit amet'
  },
  {
    from: 'Tổng đài Tin tức Thu Cúc',
    createdAt: new Date(),
    content: 'KHUYẾN MÃI CỰC LỚN vào tháng 7 Lorem ipsum dolor sit amet'
  },
  {
    from: 'Tổng đài Thu Cúc',
    createdAt: new Date(),
    content: 'Bạn có một cuộc gọi lỡ từ tổng đài chăm sóc khách hàng Thu Cúc'
  }
];
