var map; 
var infor;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 10.7769, lng: 106.7009},
    zoom: 12
  });

  // Tạo ô tìm kiếm và liên kết với bản đồ
  var input = document.getElementById('pac-input');
  searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Xử lý sự kiện khi người dùng thay đổi nội dung ô tìm kiếm
  searchBox.addListener('places_changed', function () {
    var places = searchBox.getPlaces();

    if (places.length === 0) {
      return;
    }

    // Xử lý thông tin địa chỉ của địa điểm được chọn
    var place = places[0];
    console.log(place.formatted_address);
  });

  infor = new google.maps.InfoWindow();

  var marker; // giữ dấu ticker đỏ
  // Thêm sự kiện click vào bản đồ
  map.addListener('click', function(event) {
    if (marker) {
      marker.setMap(null);
    }
    // Gọi hàm reverse geocoding khi bản đồ được click
    reverseGeocode(event.latLng);

    
    var redIcon = {
      url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png', // Đường dẫn đến biểu tượng màu đỏ
      scaledSize: new google.maps.Size(32, 32), // Kích thước biểu tượng
      origin: new google.maps.Point(0, 0), // Điểm xuất phát của biểu tượng
      anchor: new google.maps.Point(16, 32) // Điểm neo của biểu tượng
    };
    // Đặt biểu tượng màu đỏ tại vị trí click
    marker = new google.maps.Marker({
      position: event.latLng,
      map: map,
      icon: redIcon
    });
  });

  var content1 = `
  <form style="display: flex; flex-direction: column; align-items: center;">
    <div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding: 10px;">
      <b>Cổng chào</b><br>
      Số 86 Đ.Lê Thánh Tôn, Bến Nghé, <br>
      Quận 1, thành phố Hồ Chí Minh<br>
      Kích thước: 2.5m x 1.5m<br>
      Số lượng: <b>1 trụ/bảng</b><br>
      Hình thức: <b>Cổ động chính trị</b><br>
      Phân loại: <b>Đất công</b><br>
    </div>
`;
  var content2 = `
  <form style="display: flex; flex-direction: column; align-items: center;">
    <div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding: 10px;">
      <b>Trụ/Cụm pano</b><br>
      135 Đ. Nguyễn Huệ, Bến Nghé, <br>
      Quận 1, thành phố Hồ Chí Minh<br><br>
      Kích thước: 2.5m x 1.5m<br>
      Số lượng: <b>1 trụ/bảng</b><br>
      Hình thức: <b>Cổ động chính trị</b><br>
      Phân loại: <b>Đất công</b><br>
      <b>Chi tiết</b><br>
    </div>
  `;

  var content3 = `
  <form style="display: flex; flex-direction: column; align-items: center;">
    <div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding: 10px;">
      <b>Trung tâm thương mại</b><br>
      06 Đ. Hồ Tùng Mậu, Phường Nguyễn Thái Bình,<br> 
      Quận 1, thành phố Hồ Chí Minh<br><br>
      Kích thước: 2.5m x 1.5m<br>
      Số lượng: <b>1 trụ/bảng</b><br>
      Hình thức: <b>Cổ động chính trị</b><br>
      Phân loại: <b>Trung tâm thương mại</b><br>
      <b>Chi tiết</b><br>
    </div>
  `;

  var content4 = `
  <form style="display: flex; flex-direction: column; align-items: center;">
    <div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding: 10px;">
      <b>Trụ màn hình điện tử LED</b><br>
      Hẻm 122 Tôn Đản Vĩnh Khánh phường 10, <br>
      Quận 4, thành phố Hồ Chí Minh<br><br>
      Kích thước: 2.5m x 1.5m<br>
      Số lượng: <b>1 trụ/bảng</b><br>
      Hình thức: <b>Quảng cáo thương mại</b><br>
      Phân loại: <b>Hành lang an toàn giao thông</b><br>
      <b>Chi tiết</b><br>
    </div>
  `;

  var data = `
  <div style="display: flex; flex-direction: column; max-width: 400px; margin: 0 auto;">

    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
      <div style="flex: 1;">
        <label for="info">Thông tin:</label>
        <input type="text" id="info" name="info">
      </div>
      <div style="flex: 1;">
        <label for="expiry-date">Ngày hết hạn:</label>
        <input type="text" id="expiry-date" name="expiry-date">
      </div>
    </div>

    <div style="margin-top: 10px;">
      <label for="image">Ảnh:</label>
      <input type="file" id="image" name="image">
      <img style="max-width: 100%; height: auto;" src="#" alt="Preview">
    </div>

  </div>
`;

  // Sử dụng hàm addAdvertisingLocation
  var advertisingData1 = { type: 'Cổ động chính trị', text1: 'Đất công', text2: 'Số 86 Đ.Lê Thánh Tôn, Bến Nghé,',text3: 'Quận 1, thành phố Hồ Chí Minh', infor: 'ĐÃ QUY HOẠCH' };
  addAdvertisingLocation(10.7769, 106.7009, advertisingData1, content1, content1, data);

  var advertisingData2 = { type: 'Cổ động chính trị', text1: 'Đất công', text2: '135 Đ. Nguyễn Huệ, Bến Nghé,',text3: 'Quận 1, thành phố Hồ Chí Minh', infor: 'ĐÃ QUY HOẠCH' };
  addAdvertisingLocation(10.7750, 106.702, advertisingData2, content2, content1, data);
 
  var advertisingData3 = { type: 'Cổ động chính trị', text1: 'Trung tâm thương mại', text2: '06 Đ. Hồ Tùng Mậu, Phường Nguyễn Thái Bình,',text3: 'Quận 1, thành phố Hồ Chí Minh', infor: 'CHƯA QUY HOẠCH' };
  addAdvertisingLocation1(10.77, 106.7055, advertisingData3, content3, content1, data);

  var advertisingData4 = { type: 'Quảng cáo thương mại', text1: 'Hành lang an toàn giao thông', text2: 'Hẻm 122 Tôn Đản Vĩnh Khánh phường 10,',text3: 'Quận 4, thành phố Hồ Chí Minh', infor: 'ĐÃ QUY HOẠCH' };
  addAdvertisingLocation(10.76, 106.705, advertisingData4, content4, content1, data);

  

}

function addAdvertisingLocation(latitude, longitude, advertisingData, content, content1, data) {
  // Tạo marker kiểu hình ảnh
  var marker = new google.maps.Marker({
    position: { lat: latitude, lng: longitude },
    map: map,
    icon: {
      url: 'images/icon1.png', // Đường dẫn đến hình ảnh điểm đặt quảng cáo
      scaledSize: new google.maps.Size(30, 30) // Kích thước hình ảnh
    },
    title: 'Điểm Đặt Quảng Cáo'
  });

  // Tạo thông tin chi tiết cho điểm đặt quảng cáo
  var infoWindow = new google.maps.InfoWindow();

  // Thêm sự kiện khi di chuột vào marker
  marker.addListener('mouseover', function() {
    var content = generateInfoContent(advertisingData); // Tạo nội dung thông tin
    var imageSrc = 'images/icon5.png'; // Đường dẫn đến hình ảnh của bạn
    var imageTag = '<img src="' + imageSrc + '" alt="Ảnh mô tả" style="max-width: 100%;">'; // Thẻ img với đường dẫn hình ảnh

    // Bổ sung thẻ img vào nội dung thông tin
    content += imageTag;

    // Thiết lập nội dung của cửa sổ thông tin
    infoWindow.setContent(content);
    infoWindow.maxWidth = 500;
    infoWindow.open(map, marker);
  });

  // Thêm sự kiện khi click vào marker
  marker.addListener('click', function() {
    // Thực hiện hành động khi click vào marker, ví dụ: hiển thị bảng thông tin khác
    showAdditionalInfo(marker, content, content1, data);
  });

  // Thêm sự kiện khi di chuột ra khỏi marker
  marker.addListener('mouseout', function() {
    infoWindow.close();
  });

}

function addAdvertisingLocation1(latitude, longitude, advertisingData, content, content1, data) {
  // Tạo marker kiểu hình ảnh
  var marker = new google.maps.Marker({
    position: { lat: latitude, lng: longitude },
    map: map,
    icon: {
      url: 'images/icon2.png', // Đường dẫn đến hình ảnh điểm đặt quảng cáo
      scaledSize: new google.maps.Size(30, 30) // Kích thước hình ảnh
    },
    title: 'Điểm Đặt Quảng Cáo'
  });

  // Tạo thông tin chi tiết cho điểm đặt quảng cáo
  var infoWindow = new google.maps.InfoWindow();

  // Thêm sự kiện khi di chuột vào marker
  marker.addListener('mouseover', function() {
    var content = generateInfoContent(advertisingData); // Tạo nội dung thông tin
    var imageSrc = 'images/icon5.png'; // Đường dẫn đến hình ảnh của bạn
    var imageTag = '<img src="' + imageSrc + '" alt="Ảnh mô tả" style="max-width: 100%;">'; // Thẻ img với đường dẫn hình ảnh

    // Bổ sung thẻ img vào nội dung thông tin
    content += imageTag;

    // Thiết lập nội dung của cửa sổ thông tin
    infoWindow.setContent(content);
    infoWindow.maxWidth = 500;
    infoWindow.open(map, marker);
  });


  // Thêm sự kiện khi click vào marker
  marker.addListener('click', function() {
    // Thực hiện hành động khi click vào marker, ví dụ: hiển thị bảng thông tin khác
    showAdditionalInfo(marker, content, content1, data);
    
  });

  // Thêm sự kiện khi di chuột ra khỏi marker
  marker.addListener('mouseout', function() {
    infoWindow.close();
  });

  
}

function generateInfoContent(advertisingData) {
  // Kiểm tra xem advertisingData có tồn tại không
  if (advertisingData) {
    // Tạo HTML cho nội dung thông tin
    var content = '<div>';
    content += '<p><b>' + advertisingData.type + '</b></p>';
    content += '<p>' + advertisingData.text1 + '</p>';
    content += '<p>' + advertisingData.text2 + '</p>';
    content += '<p>' + advertisingData.text3 + '</p>';
    content += '<p><b><em>' + advertisingData.infor + '</b></em></p>';
    content += '</div>';
    return content;
  } else {
    return 'Dữ liệu quảng cáo không hợp lệ';
  }
}

function showAdditionalInfo(marker, content, content1, data) {
  var additionalInfoWindow = new google.maps.InfoWindow({
    content: '<div style="text-align: center; font-size: 24px; font-weight: bold; margin-bottom: 10px;">Danh sách các bảng quảng cáo</div>' +
      '<form style="display: flex; flex-direction: column; align-items: center; max-width: 900px; font-size: 20px; padding: 0px 50px 0px 0px;">' +
      '<div class="a" style="max-width: 800px; font-size: 20px; border: 2px solid #ccc; border-radius: 5px; padding: 20px; margin: 10px auto; width: 100%;">' + content + '<div style="display: flex; justify-content: center; width: 100%;"><button onclick="showAdvertisementDetails(marker, data)" style="margin: 10px; padding: 10px; flex: 1; border: 2px solid #00f;"><i class="fas fa-info-circle" style="margin-right: 5px; color: #00f;"></i><b style="color: #00f;">CHI TIẾT</b></button><button onclick="redirectToReportPage()" style="margin: 10px; padding: 10px; flex: 1; border: 2px solid #f00;"><i class="fas fa-exclamation-triangle" style="margin-right: 5px; color: #f00;"></i><b style="color: #f00;">BÁO CÁO VI PHẠM</b></button></div> </div>' +
      '<div class="b" style="max-width: 800px; font-size: 20px; border: 2px solid #ccc; border-radius: 5px; padding: 20px; margin: 10px auto; width: 100%;">' + content1 + '<div style="display: flex; justify-content: center; width: 100%;"><button onclick="showAdvertisementDetails(marker, data)" style="margin: 10px; padding: 10px; flex: 1; border: 2px solid #00f;"><i class="fas fa-info-circle" style="margin-right: 5px; color: #00f;"></i><b style="color: #00f;">CHI TIẾT</b></button><button onclick="redirectToReportPage()" style="margin: 10px; padding: 10px; flex: 1; border: 2px solid #f00;"><i class="fas fa-exclamation-triangle" style="margin-right: 5px; color: #f00;"></i><b style="color: #f00;">BÁO CÁO VI PHẠM</b></button></div> </div>' +
      '</form>',
    maxWidth: 1000,
  });

  // Đặt vị trí của bảng thông tin bên trái của marker
  additionalInfoWindow.setPosition(marker.getPosition());

  // Di chuyển info window về bên trái
  additionalInfoWindow.setOptions({ pixelOffset: new google.maps.Size(-600, 100) });

  // Mở bảng thông tin
  additionalInfoWindow.open(map, marker);
}



function showAdvertisementDetails(marker, Data) {
  var addDetails = new google.maps.InfoWindow({
    content: Data,
    maxWidth: 1000,
  });

  // Đặt vị trí của bảng thông tin bên phải
  addDetails.setPosition(marker.getPosition());

  var addDetailsSize = addDetails.getContent();

  addDetails.setOptions({ pixelOffset: new google.maps.Size(600, 100) });

  // Mở bảng thông tin
  addDetails.open(map, marker);
}


function reverseGeocode(location) {
  var geocoder = new google.maps.Geocoder();

  geocoder.geocode({ 'location': location }, function(results, status) {
    if (status === 'OK') {
      if (results[0]) {
        
        // Lấy địa chỉ sơ bộ từ kết quả reverse geocoding
        var formattedAddress = results[0].formatted_address;

        // Lấy thông tin chi tiết của địa điểm sử dụng Places API
        getPlaceDetails(results[0].place_id, formattedAddress);
      } else {
        console.log('Không có kết quả reverse geocoding.');
      }
    } else {
      console.error('Lỗi khi thực hiện reverse geocoding: ' + status);
    }
  });
}

function getPlaceDetails(placeId, formattedAddress) {
  var service = new google.maps.places.PlacesService(map);

  service.getDetails({ placeId: placeId }, function(place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      // Lấy thông tin chi tiết của địa điểm và hiển thị trong InfoWindow
      show(place, formattedAddress);
    } else {
      console.error('Lỗi khi lấy chi tiết địa điểm: ' + status);
    }
  });
}

function show(place, formattedAddress) {
  // Đặt vị trí của InfoWindow tại vị trí được click
  infor.setPosition(place.geometry.location);

  // Tính toán pixelOffset để đặt InfoWindow bên phải và lên phía trên vị trí được click
  var pixelOffsetX = 100; // Điều chỉnh giá trị này để thay đổi khoảng cách về bên phải
  var pixelOffsetY = -50; // Điều chỉnh giá trị này để thay đổi khoảng cách lên phía trên

  // Đặt pixelOffset cho InfoWindow
  infor.setOptions({ pixelOffset: new google.maps.Size(pixelOffsetX, pixelOffsetY) });

  var content = '<form style="display: flex; flex-direction: column; align-items: left;">';

// Thêm icon và thông tin bảng quảng cáo
content += '<div class="advertisement-info" style="margin-bottom: auto; background-color: #c8e6c9; padding: 10px;">';
content += '<i class="fas fa-info-circle" style="color: blue; font-size: 24px; margin-right: 10px;"></i>';
content += '<b>Thông tin bảng quảng cáo:</b><br>';
content += '<div class="preserve-whitespace"> <b>          Chưa có dữ liệu!</b> </div>';
content += '<div class="preserve-whitespace">           Vui lòng chọn dữ liệu trên bản đồ để xem <br><br></div>';
content += '</div>'; // Kết thúc div advertisement-info

// Thêm icon và thông tin địa chỉ
content += '<div class="address-info" style="margin-bottom: auto; background-color: #bbdefb; padding: 10px;">';
content += '<i class="fas fa-check-circle" style="color: green; font-size: 24px; margin-right: 10px;"></i>';
content += '<b>Thông tin địa chỉ:</b><br><br>';
content += '<div class="preserve-whitespace">           ' + formattedAddress + '</div>';
content += '<div class="preserve-whitespace"> <b>          Tên quán: </b>' + place.name + '</div>';
content += '<div class="preserve-whitespace"> <b>          Đánh giá: </b>' + (place.rating || 'Chưa có đánh giá') + '</div>';
content += '<div class="preserve-whitespace"> <b>          Loại hình kinh doanh: </b>' + (place.types ? place.types.join(', ') : 'Không rõ') + '</div>';
content += '</div>'; // Kết thúc div address-info

// Thêm nút "BÁO CÁO VI PHẠM" và căn chỉnh nó sang phía dưới bên phải
content += '<button onclick="redirectToReportPage()" style="margin: 10px; padding: 10px; align-self: flex-end; border: 2px solid #f00;"><i class="fas fa-exclamation-triangle" style="margin-right: 5px; color: #f00;"></i><b style="color: #f00;">BÁO CÁO VI PHẠM</b></button>';

content += '</form>';


  // Đặt nội dung cho InfoWindow
  infor.setContent(content);

  // Mở InfoWindow trên bản đồ  
  infor.open(map);
}

function redirectToReportPage() {
  // Mở trang Report.html trong một tab/chế độ xem mới
  window.open('Report.html', '_blank');
}
