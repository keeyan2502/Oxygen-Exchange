var realarray = JSON.parse(array)
function makeoption(object) {
    var op = document.createElement('option');
    op.className = 'op';
    op.innerHTML = object[0];
    op.value = object.toString();
    return op; 
}

function getlength(number) {
  return number.toString().length;
}

document.addEventListener("DOMContentLoaded", () => {
     console.log('hi');
     $.getJSON('https://life-api.coronasafe.network/data/oxygen.json', function(data) {
        var x = document.querySelector('#now');
        x.onclick = function() {
           const map = new google.maps.Map(document.getElementById("map"), {
              zoom: 10,
              center: { lat: 28.344456, lng: 77.308250},
           });
           new google.maps.Marker({
                map: map,
                position: { lat: 28.344456, lng: 77.308250},
           });
           var map123 = document.querySelector('#map');
           map123.scrollIntoView(false);
        }
        var source = [];
        console.log(data.data);
        var anotherarray = [];
        var counter = 0;
        for (var i=0;i < data.data.length; i++) {
            var item = data.data[i];
            var value = item.companyName;
            var label = item.companyName + ', ' + item.district;
            var person = item.name;
            var city = item.district;
            var phone = item.phone1;
            var verified = item.verificationStatus;
            var verifiedon = item.lastVerifiedOn;
            if (value == null || city == null || phone == null || getlength(phone) !== 10) {
                console.log('invalid');
            }
            else {
                counter += 1;
                source.push({
                    "value": value,
                    "label": label,
                    "person": person,
                    "city": city,
                    "phone": phone,
                    "verified": verified,
                    "verifiedon": verifiedon,
                    "class": 'No'
                });
            }
        }
        source.push(anotherarray);
        console.log(realarray);
        var mq = window.matchMedia( "(max-width: 768px)" );
        var map = document.createElement('div');
        var left = document.querySelector('.leftbot');
        var right = document.querySelector('.right');
        var cities = []
        map.id = 'map'
        if (mq.matches) {
              right.append(map);
        }
        else {
              left.append(map);
        }
        var labels = []
        for (var i=0;i< realarray.length; i++) {
              if (getlength(realarray[i][2].trim()) == 10) {
                 source.push({
                    "value": realarray[i][0].trim(),
                    "label": realarray[i][0].trim() + ', ' + realarray[i][3],
                    "person": realarray[i][1].trim(),
                    "city": realarray[i][3].trim(),
                    "phone": realarray[i][2].trim(),
                    "verified": 'No',
                    "verifiedon": null,
                    "class": 'No'
                 });
                 cities.push(realarray[i][3].trim());
                 labels.push(realarray[i][0].trim() + ', ' + realarray[i][3]);
              }
        }
        for (var i=0;i< source.length; i++) {
              item = source[i];
              cities.push(item.city);
        }

        var realcities = [];
        $.each(cities, function(i, el){
           if($.inArray(el, realcities) === -1) realcities.push(
              el
           );
        });
        
        for (var i=0;i< realcities.length; i++) {
           city = realcities[i];
           if (city == "" || city == undefined) {
              console.log('no');
           }
           else {
              source.push({
                    "value": city,
                    "label": "Region: " + city,
                    "person": null,
                    "city": city,
                    "phone": null,
                    "verified": null,
                    "verifiedon": null,
                    "class": 'Yes'
              });
           }
        }
        console.log(realcities);
        console.log(source);
        $('#newsearch').autocomplete({
              source: source.reverse(),
              minLength: 1,
              delay: 0,
              select: function(event, ui) { 
                 var field = document.createElement('input');
                 field.setAttribute('type', 'text');
                 document.body.appendChild(field);

                 setTimeout(function() {
                    field.focus();
                    setTimeout(function() {
                       field.setAttribute('style', 'display:none;');
                    }, 50);
                 }, 50);
                 setTimeout(function() { document.body.scrollTop = document.documentElement.scrollTop = 0;
                 }, 50);
                 var it = ui.item;
                 console.log(it);
                 $('#newsearch').blur();
                 selected(it, source);
                 return false;
              }
        }).focus(function () {
              $(this).autocomplete("search", "");
        }).data("ui-autocomplete")._renderItem = function( ul, item ) {

           return $("<li></li>")
           .addClass(item.class) //item based custom class to li here
           .append(item.label)
           .data("ui-autocomplete-item", item)
           .appendTo(ul); 
        }
        $('#newsearch').blur(function() { 
              $(this).val('');
        });
        initMap();
        var starterarr = []
        var city = 'Delhi';
        for (var i=0;i < source.length; i++) {
              var cityrepeat = source[i].city;
              if (item.phone == source[i].phone) {
                 console.log('duplicate');
              }
              else {
                 try {
                    if ((city.trim() == cityrepeat.trim()) || (cityrepeat.replace(' ','').includes(city.replace(' ','')))) {
                       starterarr.push(source[i]);
                    }
                 }
                 catch {
                    console.log(item);
                 }
              }
        }
        city = 'Gurgaon';
        for (var i=0;i < source.length; i++) {
              var cityrepeat = source[i].city;
              if (item.phone == source[i].phone) {
                 console.log('duplicate');
              }
              else {
                 try {
                    if ((city.trim() == cityrepeat.trim()) || (cityrepeat.replace(' ','').includes(city.replace(' ','')))) {
                       starterarr.push(source[i]);
                    }
                 }
                 catch {
                    console.log(item);
                 }
              }
        }
        console.log(starterarr);
        realstarterarr = source.slice(208,209);
        chunk2 = starterarr.slice(10,14);
        for (var i=0;i < chunk2.length; i++) {
           item = chunk2[i];
           realstarterarr.push(item);
        }
        chunk1 = starterarr.slice(76,80); //find verified valids
        for (var i=0;i < chunk1.length; i++) {
           item = chunk1[i];
           realstarterarr.push(item);
        }
        chunk3 = starterarr.slice(14,18);
        for (var i=0;i < chunk3.length; i++) {
           item = chunk3[i];
           realstarterarr.push(item);
        }
        chunk6 = starterarr.slice(80,83);
        for (var i=0;i < chunk6.length; i++) {
           item = chunk6[i];
           realstarterarr.push(item);
        }
        console.log(realstarterarr);
        makesimilars(realstarterarr, false, 'no');
        window.scrollTo(0, 0);
     });
})


function selected(item, source) {
    console.log('hi')
    var arrayofsimilars = []
    var city = item.city;
    arrayofsimilars.push(item);
    for (var i=0;i < source.length; i++) {
        var cityrepeat = source[i].city;
        if (item.phone == source[i].phone) {
            console.log('duplicate');
        }
        else {
            try {
                if ((city.trim() == cityrepeat.trim()) || (cityrepeat.replace(' ','').includes(city.replace(' ','')))) {
                    arrayofsimilars.push(source[i]);
                }
            }
            catch {
                console.log(item);
            }
        }
    }
    if (item.class = 'Yes') {
     makesimilars(arrayofsimilars, true, city);
    }
    else {
       makesimilars(arrayofsimilars, false, 'no');
    }
}

function commonsubstring(a,b) {
    var count = 0
    var highest = 0
    var index = Math.min(a.length, b.length);
    for (var i=0;i < index; i++) {
        if (a[i] == b[i]) {
            count += 1
        }
        else {
            count = 0
        }
        if (count > highest) {
            highest = count
        }
    }
    if (highest > 7) {
        return true;
    } 
    else {
        return false;
    }
}

function eventFire(el, etype){
    if (el.fireEvent) {
        el.fireEvent('on' + etype);
    } else {
        var evObj = document.createEvent('Events');
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
    }
}

function formatDate (input) {
    var datePart = input.match(/\d+/g),
    year = datePart[0].substring(2), // get only two digits
    month = datePart[1], day = datePart[2];

    return day+'/'+month+'/'+year;
}

function makesimilars(arr, istherecity, city) {
  console.log(arr);
  var div = document.querySelector('.rest');
  div.innerHTML = '';
  for (var i=0; i < arr.length; i++) {
     var it = arr[i];
     if (!(it.person == null)) {
        var big = document.createElement('div');
        big.className = 'row supplier';
        if (it.verified == 'Verified') {
            color = 'g'
        }
        else {
            color = 'y'
        }
        if (it.verified == 'No') {
            var mq = window.matchMedia( "(max-width: 768px)" );
            if (mq.matches) {
                big.innerHTML = `
                        <div class='row supplier'>
                            <h1 class='name'> ${it.value} </h1>
                            <p class='city'>City: ${it.city}</p>
                            <br>
                            <p class='person'>From: ${it.person}</p>
                            <br>
                            <p class='ver red'>Verification Status: <br> Verified last on 27/04/2023</p
                            <br>
                            <div class='number'>
                                <a href='tel:+91${it.phone}' class='restofnum'>+91${it.phone}</a>
                            </div>
                            <img class='mapimg' src='google_maps.png' id='${it.label}' class='geocoding'/>
                        </div>
                `
            }
            else {
                big.innerHTML = `
                        <div class='row supplier'>
                            <h1 class='name'> ${it.value} </h1>
                            <p class='city'>City: ${it.city}</p>
                            <br>
                            <p class='person'>From: ${it.person}</p>
                            <br>
                            <p class='ver red'>Verification Status: Verified last on 27/04/2023</p
                            <br>
                            <div class='number'>
                                <p class='special'>+91</p>
                                <p class='restofnum'>${it.phone}</p>
                            </div>
                            <img class='mapimg' src='google_maps.png' id='${it.label}' class='geocoding'/>
                        </div>
                `
            }
        }
        else {
            if (it.verifiedon == null) {
                var mq = window.matchMedia( "(max-width: 768px)" );
                if (mq.matches) {
                    big.innerHTML = `
                            <div class='row supplier'>
                                <h1 class='name'> ${it.value} </h1>
                                <p class='city'>City: ${it.city}</p>
                                <br>
                                <p class='person'>From: ${it.person}</p>
                                <br>
                                <p class='ver ${color}'>Verification Status: <br> ${it.verified} Date Unknown</p>
                                <div class='number'>
                                <a href='tel:+91${it.phone}' class='restofnum'>+91${it.phone}</a>
                                </div>
                                <img class='mapimg' src='google_maps.png' id='${it.label}' class='geocoding'/>
                            </div>
                `
                }
                else {
                    big.innerHTML = `
                            <div class='row supplier'>
                                <h1 class='name'> ${it.value} </h1>
                                <p class='city'>City: ${it.city}</p>
                                <br>
                                <p class='person'>From: ${it.person}</p>
                                <br>
                                <p class='ver ${color}'>Verification Status: ${it.verified} - Date Unknown</p>
                                <div class='number'>
                                    <p class='special'>+91</p>
                                    <p class='restofnum'>${it.phone}</p>
                                </div>
                                <img class='mapimg' src='google_maps.png' id='${it.label}' class='geocoding'/>
                            </div>
                `

                }
            }
            else {
                var mq = window.matchMedia( "(max-width: 768px)" );
                if (mq.matches) {
                    big.innerHTML = `
                            <div class='row supplier'>
                                <h1 class='name'> ${it.value} </h1>
                                <p class='city'>City: ${it.city}</p>
                                <br>
                                <p class='person spec'>From: ${it.person}</p>
                                <br>
                                <p class='ver ${color}'>Verification Status:
                                <br class='there'> ${it.verified} last on: ${formatDate(it.verifiedon.substring(0,10))}</p>
                                <div class='number'>
                                    <a href='tel:+91${it.phone}' class='restofnum'>+91${it.phone}</a>
                                </div>
                                <img class='mapimg' src='google_maps.png' id='${it.label}' class='geocoding'/>
                            </div>
                                `
                }
                else {
                    big.innerHTML = `
                            <div class='row supplier'>
                                <h1 class='name'> ${it.value} </h1>
                                <p class='city'>City: ${it.city}</p>
                                <br>
                                <p class='person spec'>From: ${it.person}</p>
                                <p class='ver ${color} x1'>Verification Status: ${it.verified} 
                                - Last on: ${formatDate(it.verifiedon.substring(0,10))}</p>
                                <br>
                                <div class='number'>
                                    <p class='special'>+91</p>
                                    <p class='restofnum'>${it.phone}</p>
                                </div>
                                <img class='mapimg' src='google_maps.png' id='${it.label}' class='geocoding'/>
                            </div>
                `
                }
            }
        }
        console.log(big);
        div.append(big);
     }
  }
  const map = new google.maps.Map(document.getElementById("map"), {
     zoom: 10,
     center: { lat: -34.397, lng: 150.644 },
  });
  const geocoder = new google.maps.Geocoder();
  document.querySelectorAll('.mapimg').forEach(item => {
     item.addEventListener('click', event => {
        console.log(item);
        console.log(item.id);
        val = item.id + ', India';
        geocodeAddress(val, geocoder, map);
        var map123 = document.querySelector('#map');
        map123.scrollIntoView(false);
     })
  })

  var img = document.querySelector('.rest').childNodes[0];
  console.log(img);
  var x = img.querySelector('.mapimg')
  console.log(x);
  eventFire(x, 'click');
  removecities();
}

function removecities() {
   var children = document.querySelector('.rest').childNodes;
   for (var i=0; i < children.length; i++) {
      child = children[i];
      y = child.querySelector('.restofnum').innerHTML;
      if (y == 'null' || y == '+91null') {
        child.style.display = 'none';
        console.log(child.querySelector('.restofnum'));
        console.log('done')
      }
   }
}

function initMap() {
    try {
        const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 8,
            center: { lat: 28.7041, lng: 77.1025 },
        });
        const geocoder = new google.maps.Geocoder();
        document.querySelectorAll('.mapimg').forEach(item => {
            item.addEventListener('click', event => {
                console.log(item);
                console.log(item.value);
                val = item.value + ', ' + item.id + ', India';
                geocodeAddress(val, geocoder, map);
                var map = document.querySelector('#map');
                 map.scrollIntoView(false);
            })
        })
    }
    catch {
        console.log('Starter');
    }
}

function geocodeAddress(val, geocoder, resultsMap) {
    const address = val
    console.log(address);
    geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK") {
            resultsMap.setCenter(results[0].geometry.location);

            var checker = results[0].formatted_address;

            if (checker == '1300 Walnut St #20, Boulder, CO 80304, USA') {
                alert('Sorry, locations are not available for this place')
                resultsMap.setCenter({ lat: 28.7041, lng: 77.1025 })
                return false;
            }

            new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location,
            });
        }
        else {
            alert('Sorry, locations are not available for this place');
        }
    });
}