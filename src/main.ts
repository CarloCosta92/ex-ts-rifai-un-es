// In questo esercizio, utilizzerai async / await per creare la funzione getChefBirthday(id).Questa funzione accetta un id di una ricetta e deve:
// Recuperare la ricetta da https://dummyjson.com/recipes/{id}
// Estrarre la proprietà userId dalla ricetta
// Usare userId per ottenere le informazioni dello chef da https://dummyjson.com/users/{userId}
// Restituire la data di nascita dello chef
// Note del docente
// Scrivi la funzione getChefBirthday(id), che deve:
// Essere asincrona(async).
// Utilizzare await per chiamare le API.
// Restituire una Promise con la data di nascita dello chef.
// Gestire gli errori con try/catch
//     🎯 Bonus 1
// Attualmente, se la prima richiesta non trova una ricetta, la seconda richiesta potrebbe comunque essere eseguita causando errori a cascata.
// 🎯 Bonus 2
// Utilizza la libreria dayjs per formattare la data di nascita nel formato giorno / mese / anno.

import dayjs from "dayjs";
type Recipe = {
  id: number;
  name: string;
  userId: number;
};

type User = {
  id: number;
  birthDate: string;
};



async function getChefBirthday(id: number): Promise<string> {
  try {
    //chiamata 
    const recipeResponse = await fetch(`https://dummyjson.com/recipes/${id}`);
    // ok mi da un booleano per esistenza dell' oggetto con id
    if (!recipeResponse.ok) {
      throw new Error('Recipe not found');
    }
    //prendo il json
    const recipe: Recipe = await recipeResponse.json();
    const userId = recipe.userId;
    if (!userId) {
      throw new Error('userId not found in recipe');
    }
    //chiamata per user id  in base la ricetta
    const userResponse = await fetch(`https://dummyjson.com/users/${userId}`);
    if (!userResponse.ok) {
      throw new Error('User not found');
    }
    //prendo il json
    const user: User = await userResponse.json();
    if (!user.birthDate) {
      throw new Error('birthDate not found in user');
    }
    // ritorno la data di nascita formattata con dayjs
    return dayjs(user.birthDate).format("DD/MM/YYYY");
  } catch (error) {
    console.error(error);
    throw error;
  }
}

(async () => {
  try {
    const birthday = await getChefBirthday(1);
    console.log("Data di nascita dello chef:", birthday);
  } catch (error: any) {
    console.error("Errore:", error.message);
  }
})();
