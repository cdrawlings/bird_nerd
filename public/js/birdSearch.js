loc = document.getElementById('b-location').innerText;
lat = document.getElementById('b-latitude').innerText;
lon = document.getElementById('b-longitude').innerText;

console.log("pre-Lat: ", lat)

lat = Math.round(lat*1e2)/1e2;
lon = Math.round(lon*1e2)/1e2;

//  GET BIRDS FroM eBIRD

console.log("Lat: ", lat)

let myHeaders = new Headers();
myHeaders.append("X-eBirdApiToken", "vsqqs32292mi");

let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

let birdView = document.getElementById('bird-list');

fetch(`https://api.ebird.org/v2/data/obs/geo/recent?lat=${lat}&lng=${lon}`, requestOptions)
    .then(response => response.json())
    .then(function(birds) {
        console.log(birds);

        // DISPLAY THE RETURNED LIST
        let output = '';

        birds.forEach((bird) => {
            output +=
                `<li class="sesh-bird">
   <div id="${bird.speciesCode}Code" class="hide">${bird.speciesCode}</div>
<div class="bird-name">
                         <a class="${bird.speciesCode}" href="https://ebird.org/species/${bird.speciesCode}/US">
                            ${bird.comName}</a> 
</div>
                         <button type="button" class="btn bird-btn-addlist" data-toggle="modal" data-target="#${bird.speciesCode}SeshModal">
                                Add bird
                         </button>
                         
                         
 
  
  
<!-- Modal -->
<div class="modal fade" id="${bird.speciesCode}SeshModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">${bird.comName}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
      </div>
              <div class="modal-body" id="${bird.speciesCode}ModalBody">
                    <form action="" method="POST" class="form-group">
                   
                    
                     <input class="hide" type="text" name="id" value="${bird.comName}">
                     
                     <input class="input-no-box hide" type="text" name="comName" value="${bird.comName}">
                     
                      <input class="hide" type="text" name="speciesCode" value="${bird.speciesCode}">
                       <label for=""><h5>Number of birds spotted</h5></label>
                    <input class="input-box" type="Number" name="count" value="0">
                    <div class="mt-3 right">
                    <button type="Submit" class="btn btn-primary">Add Bird</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
                   
                 </form>
              </div>
      
    </div>
  </div>
</div>
            
         
</li>
                 `
        });

        birdView.innerHTML = output;

        // FILTER THE LIST OF BIRDS REMOVING THE <li> OF THE BIRDS THAR DON'T MATCH THE FILTER

        let filterBird = document.getElementById('filterBird');
        let fullBird = document.getElementById('full-list');
        let fullSearchBird = document.getElementById('full-search-list');
        let closeSearchBird = document.getElementById('show-list');

        // Add event listener
        if (filterBird) {

            filterBird.addEventListener('keyup', filterNames);

            function filterNames() {
                // Get value of input
                let filterValue = document.getElementById('filterBird').value.toUpperCase();

                // Get names ul
                let ul = document.getElementById('bird-list');

                document.getElementById('bird-list').style.display = "block"

                // Get lis from ul
                let li = ul.querySelectorAll('li.sesh-bird');

                // Loop through collection-item lis
                for (let i = 0; i < li.length; i++) {
                    let a = li[i].getElementsByTagName('a')[0];
                    // If matched
                    if (a.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
                        li[i].style.display = '';
                    } else {
                        li[i].style.display = 'none';
                    }
                }
            }
        }

        if (fullBird) {

            fullBird.addEventListener('click', e => {

                document.getElementById('bird-list').style.display = "block"
            })
        }


    })
    .catch(error => console.log('error', error));