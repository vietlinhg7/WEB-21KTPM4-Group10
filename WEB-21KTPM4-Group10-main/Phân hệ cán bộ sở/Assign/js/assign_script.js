
    var temporaryAssignments = [];
    var selected = false;
    var submitButton = document.getElementById('submitBtn');
    // Attach a click event listener to the button
    myButton.addEventListener('click', function() {
      // Check the condition when the button is clicked
      if (selected) {
        // Code to execute when the condition is true
        alert('Condition is true!');
      } else {
        // Code to execute when the condition is false
        alert('Condition is false!');
      }
    });
    document.addEventListener('DOMContentLoaded', function () {
      document.getElementById('districtSelect').addEventListener('change', updateWardList);
      document.getElementById('wardSelect').addEventListener('change', updateAssignment);
      document.getElementById('accountSelect').addEventListener('change', updateAssignment);
      document.getElementById('submitBtn').addEventListener('click', submitAssignments);
    });

    function updateWardList() {
      var selectedDistrict = document.getElementById('districtSelect').value;
      var wardSelect = document.getElementById('wardSelect');
      wardSelect.innerHTML = "";
      switch (selectedDistrict) {
        case "Quận 1":
          addOption(wardSelect, "Bến Nghé", "Bến Nghé");
          addOption(wardSelect, "Cô Giang", "Cô Giang");
          addOption(wardSelect, "Bến Thành", "Bến Thành");
          addOption(wardSelect, "Cầu Kho","Cầu Kho");
          addOption(wardSelect, "Đa Kao", "Đa Kao");
          break;
        case "Quận 2":
          addOption(wardSelect, "An Khánh", "An Khánh");
          addOption(wardSelect, "An Lợi Đông", "An Lợi Đông");
          addOption(wardSelect, "An Phú", "An Phú");
          addOption(wardSelect, "Bình An", "Bình An");
          addOption(wardSelect, "Bình Khánh", "Bình Khánh");
          break;
        case "Quận 5":
          addOption(wardSelect, "Phường 1", "Phường 1");
          addOption(wardSelect, "Phường 2", "Phường 2");
          addOption(wardSelect, "Phường 3", "Phường 3");
          addOption(wardSelect, "Phường 4", "Phường 4");
          addOption(wardSelect, "Phường 5", "Phường 5");
          break;
        case "Quận Bình Thạnh":
          addOption(wardSelect, "Phường 20", "Phường 20");
          addOption(wardSelect, "Phường 21", "Phường 21");
          addOption(wardSelect, "Phường 22", "Phường 22");
          addOption(wardSelect, "Phường 23", "Phường 23");
          addOption(wardSelect, "Phường 24", "Phường 24");
          break;
        default:
          break;
      }
    }

    function updateAssignment() {
      var selectedAccount = document.getElementById('accountSelect').value;
      var selectedDistrict = document.getElementById('districtSelect').value;
      var selectedWard = document.getElementById('wardSelect').value;
      temporaryAssignments.push({
        account: selectedAccount,
        district: selectedDistrict,
        ward: selectedWard
      });
      updateTemporaryAssignmentTable();
    }

    function updateTemporaryAssignmentTable() {
      // Lấy thẻ tbody của bảng hiển thị tạm thời
      var tableBody = document.getElementById('assignmentTableBody');

      // Xóa tất cả các hàng hiện có trong bảng
      tableBody.innerHTML = "";

      // Thêm từng phần tử từ mảng tạm thời vào bảng
      for (var i = 0; i < temporaryAssignments.length; i++) {
        var newRow = tableBody.insertRow(i);
        var accountCell = newRow.insertCell(0);
        var districtCell = newRow.insertCell(1);
        var wardCell = newRow.insertCell(2);

        accountCell.innerHTML = temporaryAssignments[i].account;
        districtCell.innerHTML = temporaryAssignments[i].district;
        wardCell.innerHTML = temporaryAssignments[i].ward;
      }
    }

    function addOption(selectElement, value, text) {
      // Tạo một phần tử option và thêm vào thẻ select
      var option = document.createElement("option");
      option.value = value;
      option.text = text;
      selectElement.add(option);
    }


    function submitAssignments() {
      // Lưu trữ dữ liệu từ mảng tạm thời vào một danh sách đã được lưu trữ
      // Làm gì đó với danh sách đã lưu trữ (ví dụ: gửi dữ liệu lên máy chủ)
      console.log(temporaryAssignments);
      alert("Dữ liệu đã được lưu trữ.");
    }