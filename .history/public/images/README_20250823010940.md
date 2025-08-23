# Logo Images

## Hướng dẫn thêm logo GIF

1. **Đặt file GIF của bạn vào thư mục này**
   - Đặt tên file là `logo.gif`
   - Hoặc thay đổi đường dẫn trong `src/components/ui/Header.tsx`

2. **Kích thước khuyến nghị**
   - Kích thước: 40x40 pixels hoặc tỷ lệ vuông
   - Format: GIF animated
   - Dung lượng: < 500KB để tối ưu performance

3. **Lưu ý**
   - File GIF sẽ được hiển thị với animation gốc
   - Nếu không tìm thấy file, sẽ hiển thị fallback là chữ "C"
   - Logo sẽ có hover effect và shadow động

## Cách thay đổi logo khác

Nếu muốn dùng file khác tên `logo.gif`, hãy sửa trong file:
`src/components/ui/Header.tsx` dòng:
```tsx
src="/images/logo.gif"
```

Thay `logo.gif` thành tên file của bạn.
