'use strict'

/* Write functions to: 
   Return the display of the string for a random person,
   Create a node and display the string that represents the person.
   Asynchronously handle the event.
   Add an event listener for the buttons.
*/

function personStringName(person){
   return (
      `${person.name.first} ${person.name.last}`
   );
}

function personStringContact(person){
   return (
      `📱${person.phone}  📧${person.email}`
   );
}

// append the person string to DOM tree
function appendPerson(person){
   // place the person string in p
   const stringContainer = document.createElement('div');
   stringContainer.setAttribute('class', 'result-container');

   //append the p items with person string to DOM
   const appnedPosition = document.getElementById('data');
   appnedPosition.appendChild(stringContainer);

   const personPhoto = document.createElement('img');
   personPhoto.src = person.picture.thumbnail;
   personPhoto.setAttribute('class', 'info-photo');

   const stringContainerLeft = document.createElement('div');
   stringContainerLeft.setAttribute('class', 'result-container-left');
   
   const stringName = document.createElement('p');
   stringName.textContent = personStringName(person);
   stringName.setAttribute('class', 'info-string');

   const stringContact = document.createElement('p');
   stringContact.textContent = personStringContact(person);
   stringContact.setAttribute('class', 'info-string');

   stringContainerLeft.appendChild(stringName);
   stringContainerLeft.appendChild(stringContact);

   stringContainer.appendChild(personPhoto);
   stringContainer.appendChild(stringContainerLeft);
 
}

async function getRandomData(e){
   e.preventDefault();
   const targetID = e.target.getAttribute('id');
   const url = targetID === 'call-browser' ? 'https://randomuser.me/api/' : '/random-person' 
   try{
      const res = await fetch(url);
      const data = await res.json();

      // if the promises are settled, call appendPerson()
      if(res.status === 200) {
         appendPerson(data.results[0]);
      }
   } catch (error) {
      console.log(error);
   }
}

document.addEventListener('DOMContentLoaded', () => {
   const viaBrowser = document.getElementById('call-browser');
   viaBrowser.addEventListener('click', getRandomData);

   const viaExpress = document.getElementById('call-express');
   viaExpress.addEventListener('click', getRandomData);
})