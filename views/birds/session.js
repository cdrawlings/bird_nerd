
let elements = document.querySelectorAll('.spotted-birds');
let elementsU = document.querySelectorAll('.spotted-birdsU');
let minuses = document.querySelectorAll('.minuses');
let adds = document.querySelectorAll('.adds');
let code, name, count, title, modalCount, save, input;

console.log(minuses);

// Opens modal to add updated count
elements.forEach((element) => {
    element.addEventListener('mousedown', (e) => {
        code = element.firstElementChild.innerText;
        name = document.getElementById(code + "Name").innerText;
        count = document.getElementById(code + "Count");
        id = document.getElementById(code + "ID").innerText;
        modalCount = document.getElementById('modal-count');
        modal = document.getElementById(code + "Modal");

        modal.innerHTML = `
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="birdModalLabel">${name}</h5>

                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                <form action="/birds/update/{{session._id}}" method="POST" class="form-group">
                 <input type="hidden" name="_method" value="PUT">
                    <div class="modal-body" id="modal-count">
                          <label for="modal-input">Enter birds spotted</label> <input type="text" value="${count.innerText}" id="modal-input" name="count">
                          <label for="modal-input">Enter birds spotted</label> <input type="text" value="${code}" id="modal-code" name="code">
                          <label for="modal-input">ID</label> <input type="text" value="${id}" id="modal-id" name="birdId">
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="Submit" class="btn btn-primary" id="save-input">Save changes</button>
                    </div>
                </form>

                </div>
            </div>`

        // Opens modal to create a new spooted bird session

    });
});

// Opens modal to add bird to seen list
elementsU.forEach((element) => {
    element.addEventListener('mousedown', (e) => {
        code = element.firstElementChild.innerText;
        name = document.getElementById(code + "NameU").innerText;
        count = document.getElementById(code + "CountU").innerText;
        id = document.getElementById(code + "IDU").innerText;
        modalCount = document.getElementById('modal-count');
        modal = document.getElementById(code + "ModalU");

        console.log('Code: ', code);
        console.log('Name: ', name);
        console.log('Count: ', count);
        console.log('Id: ', id);



        modal.innerHTML = `
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="birdModalLabel">${name}</h5>

                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                <form action="/birds/create/{{session._id}}" method="POST" class="form-group">
                 <input type="hidden" name="_method" value="PUT">
                    <div class="modal-body" id="modal-count">
                          <label for="modal-input">Enter birds spotted</label> <input type="text" value="${count}" id="modal-input" name="count">
                          <label for="modal-input">Enter birds spotted</label> <input type="text" value="${code}" id="modal-code" name="code">
                          <label for="modal-input">ID</label> <input type="text" value="${id}" id="modal-id" name="birdId">
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="Submit" class="btn btn-primary" id="save-input">Save changes</button>
                    </div>
                </form>

                </div>
            </div>`

        // Opens modal to create a new spooted bird session

    });
});


// Subtracts One to the number of spotted birds
minuses.forEach((minus) => {
    minus.addEventListener('mousedown', (e) => {
        let subtract;

        subtract = minus.firstElementChild;
        code = subtract.innerText;
        count = document.getElementById(code + "Minus").value;

        console.log("Code", subtract)
        console.log("Code", code)
        console.log("Count 1", count)
        count--;
        console.log("Count 2", count)
        document.getElementById(code + "Minus").value = count
    });
});

// SAdds One to the number of spotted birds
adds.forEach((add) => {
    add.addEventListener('mousedown', (e) => {
        let addition;

        addition = add.firstElementChild;
        code = addition.innerText;
        count = document.getElementById(code + "Add").value;

        console.log("Code", addition)
        console.log("Code", code)
        console.log("Count 1", count)
        count++;
        console.log("Count 2", count)
        document.getElementById(code + "Add").value = count
    });
});