// MÓDULO PRÓPRIO
const moment = require('moment');
const fs = require('fs');
let bancoDados = fs.readFileSync('./bancoDados.json');
bancoDados = JSON.parse(bancoDados);

const petshop = {
    atualizarBanco: () => {
        //convertendo objeto pra JSON endentado
        let petsAtualizado = JSON.stringify(bancoDados, null, 2);
        fs.writeFileSync('bancoDados.json', petsAtualizado, 'utf-8');
    },

    listarPets: () => {
        let textoListaPets = "PETSHOP \n";
        bancoDados.pets.forEach((pet) => {
        //concatenando textos
            textoListaPets+=(`${pet.nome}, ${pet.idade}, ${pet.tipo}, ${pet.raca} ${pet.vacinado ? 'vacinado' : 'Não foi vacinado'} \n`);
    
            pet.servicos.forEach((servico) => {
                textoListaPets += (`${servico.data} - ${servico.nome} \n`);
            })
        })

        return textoListaPets;
    },

    vacinarPet: (pet) => {
        pet.vacinado = true;
        atualizarBanco();
        console.log(`${pet.nome} foi vacinado com sucesso!`);
    },
    
    campanhaVacina: () => {
        console.log("Campanha de vacina 2020");
        console.log("vacinando...");
    
        let petVacinadosCampanha = 0;
    
        bancoDados.pets = bancoDados.pets.map((pet) => {
            if (!pet.vacinado) {
                vacinarPet(pet);
                petVacinadosCampanha++;
            }
    
        return pet;
        });
        
        console.log(`${petVacinadosCampanha} pets foram vacinados nessa campanha!`);
    },

    adicionarPet: (novoPet) => {
        bancoDados.pets.push(novoPet);
        petshop.atualizarBanco();
        let Adicionando = (`${novoPet.nome} foi adicionado com sucesso!`);
        return Adicionando;
    },
    
    darBanhoPet: (pet) => {
        pet.servicos.push({
            'nome':'banho',
            'data': moment().format('DD-MM-YYYY')
        });
        atualizarBanco();
        console.log(`${pet.nome} está de banho tomado!`);
    },
    
    tosarPet: (pet) => {
        pet.servicos.push({
            'nome':'tosa',
            'data': moment().format('DD-MM-YYYY')
        });
        console.log(`${pet.nome} está com cabelinho na régua :)`);
    },
    
    apararUnhasPet: (pet) => {
        pet.servicos.push({
            'nome':'corte de unhas',
            'data': moment().format('DD-MM-YYYY')
        });
        console.log(`${pet.nome} está de unhas aparadas!`);
    },
    
    atenderCliente: (pet, servico) => {
        console.log(`Olá, bem-vindo, ${pet.nome}`);
        servico ? servico(pet) : console.log("Só vim dar uma olhadinha");
        //servico(pet);
        console.log(`Tchau, até mais!`);
    },
    
    buscarPet: (nomePet) => {
    
        let petEncontrado = bancoDados.pets.find((pet) => {
            return pet.nome == nomePet;
        });
    
        return petEncontrado ? petEncontrado : `Nenhum pet encontrado com nome ${nomePet}`;
    },
    
    filtrarTipoPet: (tipoPet) => {
    
        let petsEncontrados = bancoDados.pets.filter((pet) => {
            return pet.tipo == tipoPet;
        });
    
        return petsEncontrados;
    },
    
    clientePremium: (pet) => {
        let {nome} = pet;
        let nServicos = pet.servicos.length;
    
        if (nServicos > 5) {
            console.log(`Olá, ${nome}! Você é um cliente especial e ganhou um descontão!`);
        } else {
            console.log(`Olá, ${nome}! Você ainda não tem descontos disponiveis!`);
        }
    },

    contatoTutor: (pet) => {
        let {nome, tutor, contato} = pet;
    
        return `Tutor: ${tutor}
    Contato: ${contato}
    Pet: ${nome}`;
    },
    
    filtrarTutor: (nomeTutor) => {
        let petsTutor = bancoDados.pets.filter((pet) => {
            return pet.tutor == nomeTutor;
        }) 
     
        console.log(`Pets do tutor ${nomeTutor}`);
        petsTutor.forEach((pet) => {
            console.log(`${pet.nome} - ${pet.tipo}`);
        })
    }       
}

module.exports = petshop; //para reutilizar javascript em outros lugares