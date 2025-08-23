# Hướng dẫn thiết lập EmailJS cho Contact Form

## Bước 1: Đăng ký EmailJS
1. Truy cập: https://www.emailjs.com/
2. Đăng ký tài khoản miễn phí
3. Xác thực email

## Bước 2: Thiết lập Email Service
1. Vào Dashboard → Email Services
2. Click "Add New Service"
3. Chọn "Gmail"
4. Đăng nhập Gmail: **gtsvongoccuong@gmail.com**
5. Cấp quyền cho EmailJS
6. Lưu lại **Service ID** (vd: service_gmail123)

## Bước 3: Tạo Email Template
1. Vào Dashboard → Email Templates
2. Click "Create New Template"
3. Sử dụng template sau:

```html
Subject: New Portfolio Contact from {{from_name}}

From: {{from_name}} ({{from_email}})
To: {{to_email}}

Message:
{{message}}

---
This email was sent from your portfolio contact form.
Reply-To: {{reply_to}}
```

4. Lưu lại **Template ID** (vd: template_contact123)

## Bước 4: Lấy Public Key
1. Vào Dashboard → Account → API Keys
2. Copy **Public Key** (vd: user_abc123xyz)

## Bước 5: Cập nhật cấu hình
Sửa file `src/lib/emailjs.ts`:

```typescript
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_gmail123', // Thay bằng Service ID của bạn
  TEMPLATE_ID: 'template_contact123', // Thay bằng Template ID của bạn
  PUBLIC_KEY: 'user_abc123xyz', // Thay bằng Public Key của bạn
  TO_EMAIL: 'gtsvongoccuong@gmail.com'
};
```

## Bước 6: Test
1. Reload website
2. Điền form contact
3. Submit → Email sẽ được gửi đến Gmail của bạn!

## Lưu ý:
- EmailJS free: 200 emails/tháng
- Nếu EmailJS fail → fallback mở Gmail với mailto
- Email sẽ đến hộp thư Gmail: gtsvongoccuong@gmail.com
