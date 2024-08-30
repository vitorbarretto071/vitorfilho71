let id = 1
let data_to_add = []

const url = 'https://rickandmortyapi.com/api/character';

fetch(url)
.then(response => response.json())
.then(resultado =>{
   console.log(resultado)
    let api = resultado.results
    let container = document.getElementById("container")

    data_to_add = resultado.results
    // if(data_to_add.length != []){
    //addInfo()
    //}

    for(let i = 0; i < api.length; i++){
        //console.log(api)
        
        const createdElement = document.createElement("h3")
        const nameElement = document.createElement("h1")
        const statusElement = document.createElement("h2")       
        let image = document.createElement("img")
        let postButton = document.createElement("button")
        let deleteButton = document.createElement("button")
        let updateButton = document.createElement("button")
        postButton.type = "button"
        deleteButton.type = "button"
        updateButton.type = "button"

        createdElement.textContent = api[i].created
        statusElement.textContent = api[i].status
        nameElement.textContent = api[i].name
        image.src = api[i].image
        image.alt = api[i].image
        image.style.width = "250px"
        image.style.height = "250px"
        postButton.textContent = "Adicionar"
        postButton.addEventListener("click", async (e) => {
            e.preventDefault()
            addInfo(api[i])
        }) 
        postButton.classList.add(id)
        deleteButton.textContent = "Deletar"
        deleteButton.addEventListener("click", async(e) =>{
            e.preventDefault()
            deleteInfo(api[i].id)
        })
        updateButton.textContent = "Atualizar"
        updateButton.addEventListener("click", async(e) =>{
            e.preventDefault()
            updateInfo(api[i].id)
        } )

        container.appendChild(image)       
        container.appendChild(nameElement)
        container.appendChild(statusElement)
        container.appendChild(createdElement)
        container.appendChild(postButton)
        container.appendChild(deleteButton)
        container.appendChild(updateButton)

    }
})
.catch(error => console.error('Erro:', error));

    async function addInfo(data) { //adiciona dados
        const response = await fetch(`http://localhost:3000/create` ,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
        });
            console.log(response)
            return response.json()

        }

       
   
    
async function deleteInfo(id) { //deleta dados
    const response = await fetch(`http://localhost:3000/del/${id-1}`,{
        method: 'DELETE',
        
    });
    return response.json();

    }
    async function updateInfo(id) { //atualizadados
        console.log(id)
        const response = await fetch(`http://localhost:3000/update/${id}`,{
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(id),
            
            
        });
        return response.json();
    
        }
        // Função para buscar e renderizar dados da API local
async function fetchRenderiza() {
    try {
        const response = await fetch('http://localhost:3000/data'); // URL da API local
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

    } catch (error) {
        console.error('Erro ao buscar e renderizar dados da API local:', error);
    }
    }


// Chamar a função para buscar e renderizar dados da API local
fetchRenderiza();
