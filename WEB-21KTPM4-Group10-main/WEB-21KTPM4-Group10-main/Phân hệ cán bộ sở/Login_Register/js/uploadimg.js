function displayImage() {
  const fileInput = document.getElementById('fileInput');
  const uploadedImage = document.getElementById('uploaded-image');

  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      uploadedImage.src = e.target.result;
    };

    reader.readAsDataURL(file);
  }
}

function uploadImage() {
  const fileInput = document.getElementById('fileInput');
  const uploadedImage = document.getElementById('uploaded-image');

  const file = fileInput.files[0];
  if (file) {
    // Thực hiện xử lý đăng ảnh lên server ở đây (nếu cần)
    // Ví dụ: Bạn có thể sử dụng AJAX để gửi ảnh đến server
    alert('Image uploaded!'); // Thông báo đơn giản (có thể thay đổi thành xử lý thực tế)
  } else {
    alert('Please choose an image first.');
  }
}