const elMain = document.getElementById('main');
const nameInp = document.getElementById('nameInput');
const emailInp = document.getElementById('emailInput');
const telInp = document.getElementById('telInput');
const elBtn = document.getElementById('addBtn');
const elSave = document.getElementById('save');

let arr = [
    { id: 1, name: 'Your name', email: '@gmail.com', tel: '+998911111111' },
    { id: 2, name: 'Your name', email: '@gmail.com', tel: '+998911111111' },
    { id: 3, name: 'Your name', email: '@gmail.com', tel: '+998911111111' }
]

function getUser() {
    let user = ''
    user += arr.map((v, i, arr) => `
    <div class='wrap'>
        <p class='wrap__fristValue'>${i + 1}</p>
        <p class='wrap__value'>${v.name}</p>
        <p class='wrap__value'>${v.email}</p>
        <p class='wrap__value'>${v.tel}</p>
        <button class="btn delBtn" onclick={delUser(${v.id})} >Delete</button>
        <button class="btn"  onclick='{editUser(${v.id})}'>Edit</button>
    </div>
    `).join('')
    elMain.innerHTML = user
}
getUser()

function editUser(id) {
    arr.map((v) => {
        if (v.id == id) {
            nameInp.value = v.name
            emailInp.value = v.email
            telInp.value = v.tel
            elSave.addEventListener('click', () => {
                v.name = nameInp.value
                v.email = emailInp.value
                v.tel = telInp.value
                nameInp.value = ''
                emailInp.value = ''
                telInp.value = ''
                getUser()
            })
        }
    })
}

function delUser(id) {
    arr = arr.filter((v) => v.id != id)
    getUser()
}

function addUser() {
    if (nameInp.value !== "" && emailInp.value !== "" && telInp.value !== "") {
        return new Promise((res, rej) => {
            arr = [...arr, { id: arr.length + 1, name: nameInp.value, email: emailInp.value, tel: telInp.value }]
            nameInp.value = ''
            emailInp.value = ''
            telInp.value = ''
            res()
        })
    }
}

elBtn.addEventListener('click', async () => {
    await addUser()
    getUser()
})