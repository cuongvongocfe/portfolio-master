/**
 * EmailJS Configuration
 * 
 * Cấu hình cho việc gửi email từ contact form
 * Sử dụng EmailJS service để gửi trực tiếp vào Gmail
 */

// EmailJS Configuration
export const EMAILJS_CONFIG = {
  // Service ID từ EmailJS dashboard
  SERVICE_ID: 'gmail_service', // Bạn sẽ lấy từ EmailJS dashboard
  
  // Template ID từ EmailJS dashboard  
  TEMPLATE_ID: 'template_oz0w8ff', // Template ID bạn đã tạo
  
  // Public Key từ EmailJS dashboard
  PUBLIC_KEY: 'YOUR_EMAILJS_PUBLIC_KEY', // Bạn sẽ lấy từ EmailJS dashboard
  
  // Gmail nhận email
  TO_EMAIL: 'gtsvongoccuong@gmail.com'
};

/**
 * Hướng dẫn thiết lập EmailJS:
 * 
 * 1. Đăng ký tài khoản tại: https://www.emailjs.com/
 * 2. Tạo Email Service (chọn Gmail)
 * 3. Tạo Email Template với các biến:
 *    - {{from_name}} - Tên người gửi
 *    - {{from_email}} - Email người gửi  
 *    - {{message}} - Nội dung tin nhắn
 *    - {{to_email}} - Email nhận (gtsvongoccuong@gmail.com)
 * 4. Lấy Service ID, Template ID, và Public Key
 * 5. Thay thế các giá trị trong file này
 */
