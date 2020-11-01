allList = document.getElementById('full-list')

allList.addEventListener('mousedown', (e) => {
    elements = document.querySelectorAll('.sesh-bird');
    console.log("elements:", elements)

    elements.forEach((element) => {
        element.addEventListener('mousedown', (e) => {

            code = element.firstElementChild.innerText;
            id = document.getElementById('seshId').innerText;
            birdSession = document.getElementById(code + 'Id')
            modalBody = document.getElementById(code + 'ModalBody')
            form = modalBody.firstElementChild;

            console.log(id);
            console.log("Code:", code);
            console.log("Form:", form);
            console.log("Body:", modalBody);
            birdSession.value = id;
            form.action = `/birds/add_bird_session/${id}`
            console.log(birdSession)
            console.log("form 2: ", form);








        });
    });
});


