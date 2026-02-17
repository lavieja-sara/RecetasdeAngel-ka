let map = L.map('map').setView([36.71999035840273, -4.438275396823883], 19);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([36.71999035840273, -4.438275396823883]).addTo(map)
    .bindPopup('Recetas de Angel&ka<br>¡Ven a visitarnos!')
    .openPopup();

    let options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

   
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(success, error, options);

       


    }else{
        alert("Tu navegador no soporta geolocalización");
    }
    
    
   
    function success(position){
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;

       

    
    let control = L.Routing.control({
    waypoints: [
        L.latLng(latitude, longitude),
        L.latLng(36.71999035840273, -4.438275396823883)
    ],
    language: 'es',
    }).addTo(map); 

        
    }