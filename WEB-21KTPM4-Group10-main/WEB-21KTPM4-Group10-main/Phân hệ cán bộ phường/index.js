function initAutocomplete() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 10.7625193, lng: 106.686815 },
    zoom: 19,
    mapTypeId: "roadmap",
  });
  // Create the search box and link it to the UI element.
  const input = document.getElementById("pac-input");
  const searchBox = new google.maps.places.SearchBox(input);

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  // Bias the SearchBox results towards current map's viewport.
  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });

  let markers = [];

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds();

    places.forEach((place) => {
      if (!place.geometry || !place.geometry.location) {
        console.log("Returned place contains no geometry");
        return;
      }

      const icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };

      // Create a marker for each place.
      markers.push(
        new google.maps.Marker({
          map,
          icon,
          title: place.name,
          position: place.geometry.location,
        }),
      );
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });

  let currentQCIcon = "images/QC.png";
  const QC = new google.maps.Marker({
    position: new google.maps.LatLng(10.7623944, 106.6872566),
    icon: {
      url: currentQCIcon,
      scaledSize: new google.maps.Size(30, 30) // width and height in pixels
    },
    map: map,
    
  });
  google.maps.event.addListener(QC, 'click', function() {
    // Code to execute when the QC marker is clicked
    var sidebar = document.getElementById("sidebar");
    var map = document.getElementById("map");
    var section2a = document.getElementById("section2a");
    var btn1a = document.querySelector('.btn1a');
    var btn1b = document.querySelector('.btn1b');
   
    if (currentQCIcon === "images/QC.png") {
      var newIcon = {
        url: "images/X.png", // Replace with your new icon URL
        scaledSize: new google.maps.Size(30, 30) // width and height in pixels
      };
      QC.setIcon(newIcon);
      currentQCIcon = "images/X.png";
      section2a.style.display = "block";
      map.style.width = "70%";
      sidebar.style.display = "block";
      btn1a.style.display = "block";
      if (currentBCIcon === "images/X.png") {
        var newIcon = {
          url: "images/BC.png", // Replace with your original icon URL
          scaledSize: new google.maps.Size(30, 30) // width and height in pixels
        };
        BC.setIcon(newIcon);
        currentBCIcon = "images/BC.png";
        var section2b = document.getElementById("section2b");
        section2b.style.display = "none";
        btn1b.style.display = "none";
      }
    } else if (currentQCIcon === "images/X.png") {
      var newIcon = {
        url: "images/QC.png", // Replace with your original icon URL
        scaledSize: new google.maps.Size(30, 30) // width and height in pixels
      };
      QC.setIcon(newIcon);
      currentQCIcon = "images/QC.png";
      map.style.width = "100%";
      sidebar.style.display = "none";
      section2a.style.display = "none";
      btn1a.style.display = "none";
    }
    console.log(map.style.width)
  });
   
  let currentBCIcon = "images/BC.png";
  const BC = new google.maps.Marker({
    position: new google.maps.LatLng(10.7619567, 106.6863498),
    icon: {
      url: currentBCIcon,
      scaledSize: new google.maps.Size(30, 30) // width and height in pixels
    },
    map: map,
  });
  google.maps.event.addListener(BC, 'click', function() {
    // Code to execute when the BC marker is clicked
    var sidebar = document.getElementById("sidebar");
    var map = document.getElementById("map");
    var section2b = document.getElementById("section2b");
    var btn1a = document.querySelector('.btn1a');
    var btn1b = document.querySelector('.btn1b');

    if (currentBCIcon === "images/BC.png") {
      var newIcon = {
        url: "images/X.png", // Replace with your new icon URL
        scaledSize: new google.maps.Size(30, 30) // width and height in pixels
      };
      BC.setIcon(newIcon);
      currentBCIcon = "images/X.png";
      section2b.style.display = "block";
      map.style.width = "70%";
      sidebar.style.display = "block";
      btn1b.style.display = "block";
      if (currentQCIcon === "images/X.png") {
        var newIcon = {
          url: "images/QC.png", // Replace with your original icon URL
          scaledSize: new google.maps.Size(30, 30) // width and height in pixels
        };
        QC.setIcon(newIcon);
        currentQCIcon = "images/QC.png";
        var section2a = document.getElementById("section2a");
        section2a.style.display = "none";
        btn1a.style.display = "none";
      }
    } else if (currentBCIcon === "images/X.png") {
      var newIcon = {
        url: "images/BC.png", // Replace with your original icon URL
        scaledSize: new google.maps.Size(30, 30) // width and height in pixels
      };
      BC.setIcon(newIcon);
      currentBCIcon = "images/BC.png";
      map.style.width = "100%";
      sidebar.style.display = "none";
      section2b.style.display = "none";
      btn1b.style.display = "none";
    }
    console.log(map.style.width)

  });
    // Get the buttons by their class names
  var btn2 = document.querySelector('.btn2');

  btn2.addEventListener('click', function() {
    var sidebar = document.getElementById("sidebar");
    var map = document.getElementById("map");
    var section2a = document.getElementById("section2a");
    var section2b = document.getElementById("section2b");
    var btn1a = document.querySelector('.btn1a');
    var btn1b = document.querySelector('.btn1b');
    // Code to execute when btn2 is clicked
    var newIcon = {
      url: "images/BC.png", // Replace with your original icon URL
      scaledSize: new google.maps.Size(30, 30) // width and height in pixels
    };
    BC.setIcon(newIcon);
    currentBCIcon = "images/BC.png";

    var newIcon = {
    url: "images/QC.png", // Replace with your original icon URL
    scaledSize: new google.maps.Size(30, 30) // width and height in pixels
    };
    QC.setIcon(newIcon);
    currentQCIcon = "images/QC.png";
    map.style.width = "100%";
    sidebar.style.display = "none";
    section2a.style.display = "none";
    section2b.style.display = "none";
    btn1a.style.display = "none";
    btn1b.style.display = "none";
  });
}

window.initAutocomplete = initAutocomplete;