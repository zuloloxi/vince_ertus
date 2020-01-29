# Révisions HTML-CSS-JavaScript - Exercices


## TP1: Votre premier script

OBJECTIF : Créer un squelette d'application JS avec live-reload.

- Téléchargez le fichier [jstodos-starter.zip](jstodos-starter.zip), décompressez-le, et placez le dossier `jstodos-starter` obtenu à un endroit où vous faites vos développements.
- Ouvrez le répertoire `jstodos-starter` dans VS Code.
- Ouvrez le terminal de VS Code et initialisez un projet NPM (`npm init -y`). Puis installez les dépendances suivantes : `bootstrap`, `live-server` -- NB. Vous devez être **dans le répertoire du projet** pour taper ces commandes.
- Dans le fichier `package.json` qui a été créé par NPM, ajoutez un racourci pour lancer le live-server (voir syntaxe ci-dessous).
- Dans le fichier `index.html`, chargez `bootstrap.css` (situé dans le répertoire "node_modules" du projet) et les fichiers `css/styles.css` et `js/todo.js` déjà présents dans le projet.
- Vérifiez que tout s'affiche correctement dans le navigateur (http://127.0.0.1:8080/), avec le live-reload.
- Pour vérifier que votre JavaScript est bien chargé et exécuté, ajoutez le code suivant dans `js/todo.js`, qui vient écrire le texte "Hello world" à l'intérieur de la balise `<div id="app"></div>`, déjà présente dans le HTML.

```js
const myApp = document.querySelector('#app');
myApp.textContent = 'Hello world!';
```

Vous pouvez commenter ce code après avoir confirmé qu'il fonctionne.

---

Raccourci pour lancer le live-server (à ajouter dans `package.json`) :

```json
  "scripts": {
    "server": "live-server",
	// ...
  },
```

On peut ensuite taper la commande `npm run server` dans le répertoire du projet.


## TP2: Manipuler variables, tableaux et fonctions

- Créez une variable `todos` contenant un tableau avec les 3 chaînes de caractères suivantes : 'Faire les courses', 'Réviser JavaScript', 'Me coucher plus tôt'.
- Créez une fonction `addTodo()` qui prend en argument une string qui devra être ajoutée à la fin du tableau `todos`.
- Créez une fonction `deleteTodo()` qui prend un argument une string qui devra être supprimée du tableau `todos`.
- Créez une fonction `displayTodos()` qui affiche tous les todos dans la console en bouclant sur le tableau `todos` et en faisant un `console.log()` pour chaque élément.

⚠️ Ce code est à tester directement dans la console du navigateur (ouvrir cette console avec F12) :

- Affichez la liste des todos en appelant `displayTodos()`
- Ajoutez un todo en appelant `addTodo()`.
- Supprimez un todo en appelant `deleteTodo()`.


## TP3: Créer les modèles de l'application

OBJECTIF: Utiliser des classes pour modéliser les "modèles" de l'application, c'est à dire une "todo list" et un "todo".

- Réfléchissons ensemble : quelles propriétés et méthodes devons-nous définir sur les classes `TodoList` et `Todo` pour recréer les fonctionnalités équivalentes au TP précédent (addTodo et deleteTodo) ?
- Créez ces deux classes.
- Créez une instance de TodoList contenant quelques "Todo" bidon.


## TP4: Afficher les todos dynamiquement

OBJECTIF : Utiliser JavaScript pour afficher des todos "dynamiquement" dans notre HTML.

- En utilisant JavaScript et les API DOM qui vont bien, affichez via une fonction `displayTodos()` (appelée au démarrage de l'application) les todos bidon créés lors du TP précédent dans le fichier HTML.
- ⚠️ Cette fonction devra être conçue de manière à pouvoir être appelée plusieurs fois de suite (concrètement : à chaque fois que les todos changent dans l'application).

---

Boîte à outils :

- Créer un nouvel élément HTML : [`Document.createElement(tagName)`](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement)
- Définir la valeur d'un attribut sur un élément HTML : [`Element.setAttribute(name, value)`](https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute), ou [`Element.className`](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) pour les classes CSS.
- Insérer un élément dans le HTML : récupérer l'élément **parent** dans lequel l'insertion doit être faite avec par exemple [`document.querySelector()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector), puis insérer avec [`parent.appendChild(element)`](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild).


## TP5: Marquer un todo comme "fait"

OBJECTIF : Quand on clique sur un todo, ce dernier doit passer dans l'état "fait". Si on reclique sur le même todo, il repasse dans l'état "non fait".

- Pour signaler qu'un todo est fait, ajouter la classe CSS "done" sur l'élément `<li>` qui encadre le todo cliqué.
- Retirer la classe "done" si on reclique sur un todo déjà fait.

⚠️ Prenez garde à éviter une implémentation "naïve" :

- Quelles sont les limites de se contenter d'ajouter/retirer une classe CSS directement dans le HTML ?
- Quelle est la meilleure manière de faire ?

---

Boîte à outils :

- Récupérer une liste d'éléments qui matchent un sélecteur CSS : [`document.querySelectorAll(selector)`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll)
- Ajouter / retirer des classes CSS sur un élément : [`Element.classList`](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList) — `classList.add()`, `classList.remove()`...
- Récupérer la valeur d'un attribut HTML : [`Element.getAttribute(attributeName)`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute)
- Stocker des données arbitraires sur un élément HTML : [attribut `data-`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*) — Exemple : `<li data-id="10784">...</li>`


## TP6: Ajouter/Supprimer un todo

OBJECTIF : Permettre à l'utilisateur d'ajouter ses propres todos, ou de supprimer certains todos.

### Commençons par l'ajout d'un todo

- Au-dessus de la liste, s'assurer que vous avez bien un formulaire (balise `<form>...</form>`) contenant un unique champ texte.
- À la soumission du formulaire, si le champ est vide, afficher une alerte à l'utilisateur : "Vous devez saisir du texte" (`window.alert()`)
- Si le champ n'est pas vide, le texte saisi doit s'ajouter à la liste des todos (en bas) et il doit être effacé du champ.

NB. Le todo doit être ajouté au HTML **ET** aux données.

### Et pour la suppression d'un todo

- Si l'utilisateur clique sur l'icône "Poubelle", afficher une fenêtre de confirmation : "Êtes-vous sûr·e de vouloir effacer ?" (`window.confirm()`)
- Si oui, effacer le todo correspondant. Si non, ne rien faire.
- Attention aux petits pièges :
  - Le todo doit être effacé du HTML **ET** des données.
  - Le clic sur la poubelle ne doit pas déclencher le clic qui marque le todo comme "fait".

---

Boîte à outils :

- Afficher une modale de confirmation à l'utilisateur (OK / Annuler) : [Window.confirm()](https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm)
- Annuler l'action par défaut associée un événement DOM : [`Event.preventDefault()`](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault) - Exemples d'actions par défaut : changer de page quand on clique un lien, rafraîchir la page quand on soumet un formulaire...
- Empêcher un événement DOM de remonter aux balises situées au-dessus de la balise déclencheuse : [`Event.stopPropagation()`](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation)
- Ajouter un élément à un tableau : [`Array.prototype.push()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)
- Retirer un élément d'un tableau : [`Array.prototype.splice()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)


## TP7: Filtrer les todos par statut

OBJECTIF : Permettre à l'utilisateur de n'afficher que les todos faits, non faits, ou tous les todos.

- Ajouter une barre avec 3 boutons : Tous | Faits | Non faits
- Faire en sorte que le bouton "actif" apparaisse en bleu, en lui ajoutant automatiquement la classe `active` de Bootstrap.
- Faire en sorte que les todos soient automatiquement filtrés par le bouton actif. Exemple : on n'affiche que les todos faits si le bouton "Faits" est en surbrillance.
- Par défaut, c'est le bouton "Tous" qui doit être allumé.

Boîte à outils :

- Itérer sur les éléments d'un tableau : [`Array.prototype.forEach()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
- Filtrer les éléments d'un tableau : [`Array.prototype.filter()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)


## TP8: Sauvegarder les todos dans Local Storage

OBJECTIF : Actuellement, on perd toutes nos modifications si on rafraîchit la page. On veut utiliser Local Storage pour enregistrer nos modifs et les récupérer si on revient plus tard sur l'application.

- À l'initialisation de l'application, chargez les données de local storage si elles existent.
- À chaque modification de l'utilisateur, mettre à jour les données dans local storage.
- Vérifiez que vos modifications sont bien enregistrées même si vous fermez et rouvrez le navigateur.
- Comment gérer le fait que nous avons des instances de `Todo` dans le navigateur et des strings dans localStorage ?


-------


## TP9: Créer un événément custom

OBJECTIF : Traiter la suppression d'un todo depuis la liste, plutôt que depuis le todo.

- Et si on utilisait le "event bubbling" ?
- Si on barre un todo et qu'on rafraîchit la liste, la modif est-elle enregistrée dans localStorage ?

---

Boîte à outils :

**Événement custom ([MDN](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events))**

```js
var event = new Event('build');

// Listen for the event.
elem.addEventListener('build', function (e) { /* ... */ }, false);

// Dispatch the event.
elem.dispatchEvent(event);
```


## TP10: Ajouter des "routes"

OBJECTIF : Permettre à l'utilisateur de "naviguer" entre plusieurs pages de l'application.

- Créer le HTML permettant d'afficher la liste des "todo lists".
- Créer 2 liens que vous afficherez en haut de page, intitulés "Liste" et "Détail", qui activent chacun l'affichage d'une des 2 pages.

Fonctionnement :

- Chaque "page" doit correspondre à une URL unique.
- Si l'utilisateur change de page dans l'IHM, la barre d'URL doit se rafraîchir.
- Si la barre d'URL est modifiée, la page doit se rafraîchir.

NB. Attention à la structure retenue pour l'URL : `?page=`, `#page`

---

Boîte à outils :

- L'[History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) expose l'historique du navigateur (liste des URL consultées) à JavaScript. Cette API permet notamment de naviguer programmatiquement dans l'historique du navigateur. Exemple : `window.history.back();`
- [History.pushState()](https://developer.mozilla.org/en-US/docs/Web/API/History/pushState) permet d'ajouter des entrées à l'historique du navigateur.
- L'événement [Window: popstate](https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event) permet d'écouter les changements dans l'history du navigateur (déclenchée par les boutons du navigateur).

Plus ancien, mais plus simple :

- [Window: hashchange](https://developer.mozilla.org/en-US/docs/Web/API/Window/hashchange_event) - Evénement déclenché à chaque changement de hash.
- [Location.hash](https://developer.mozilla.org/en-US/docs/Web/API/Location) - Propriété en lecture/écriture contenant le hash courant.


## TP11: Les promesses

OBJECTIF : Comprendre les promesses et le problème qu'elles essaient de résoudre.

- Donner des exemples d'asynchronicité dans une appli web.
- Comprendre le "callback hell" - http://callbackhell.com/
- Etudier un exemple de promesse sur [Using Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) et notamment : principe général, chaînage, gestion d'erreur.
- Créer une promesse qui wrappe `setTimeout()` avec le fonctionnement suivant :
  - La promesse doit aboutir quand le timeout expire. Elle n'échoue jamais.
  - Ajouter un bouton temporaire "Charger" qui permet de déclencher cette promesse.
  - Faire en sorte qu'un spinner de chargement s'affiche tant que la promesse est "en cours d'exécution". Le spinner doit se cacher automatiquement une fois que la promesse est terminée.

---

Boîte à outils :

- Intro à la programmation asynchrone - https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing
- L'[objet Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) représente une opération asynchrone qui va aboutir ou échouer, et la valeur résultante.
- [Promise.finally()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally) permet d'exécuter du code une fois que la promesse est terminée ("settled"), qu'elle ait abouti ou échoué.
- [Promise.all()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) permet de combiner plusieurs promesses en une seule.
- [Spinners](https://getbootstrap.com/docs/4.4/components/spinners/) de Bootstrap CSS.


## TP12: Créer un service de modale

OBJECTIF : Remplacer l'horrible `alert()` du navigateur par une modale qui respecte la charte graphique du projet.

- Dans `index.html`, ajouter le HTML nécessaire pour afficher une modale Bootstrap. Vous ferez en sorte que cette modale puisse recevoir un titre et du texte dynamique, et puisse être affichée/cachée via JavaScript (`.modal { display: block; }`).
- Côté JavaScript, créer une fonction globale `showModal()` avec le fonctionnement suivant :
  - Prend en paramètre le titre et le texte à afficher dans la modale.
  - Renvoie une promesse qui réussit quand l'utilisateur clique sur "OK" et qui échoue quand l'utilisateur clique sur "Annuler".
- Dans le code, remplacer les appels à `alert()` par des appels à la fonction `showModal()`.

---

Boîte à outils :

- [Modal](https://getbootstrap.com/docs/4.4/components/modal/) de Bootstrap CSS.


## TP13: Utiliser un web service et des requêtes HTTP

- Installer JSON Server et un "script" permettant de le lancer dans `package.json`.
- Éditer le fichier `db.json` pour y mettre les données d'une todo list bidon. ATTENTION. Ajouter une propriété `id` sur la `TodoList`, dans le JSON et dans la classe.
- Créer une fonction globale `loadTodoList()` avec le fonctionnement suivant :
  - Charge une todo list depuis JSON Server grâce à une requête HTTP GET.
  - Renvoie une promesse contenant les données renvoyées par l'API **converties en instance de `TodoList`**.
- Au démarrage de l'application, utiliser la fonction `loadTodoList()` pour charger puis afficher la todo list avec l'id 1.
- Créer les fonctions qui permettent d'**enregistrer** et de **supprimer** une todo list.

---

Boîte à outils :

- [JSON Server](https://github.com/typicode/json-server) permet d'exposer un fichier `.json` derrière une API REST. Très pratique en phase de développement.
- [fetch()](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch) permet de faire des requêtes HTTP et de récupérer une promesse en retour.
- fetch() renvoie un objet [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response). Il fournit des propriétés qui permettent d'obtenir plus d'infos sur la réponse (`Response.headers`, `Response.status`...) et des méthodes qui permettent de la traiter plus facilement (`Response.json()`...).


## TP14: TypeScript

- Présentation générale de TypeScript
- Comprendre la compilation
- EXO: Refactoriser notre appli pour utiliser TypeScript (`tsconfig.json` + `tsc --watch`).
- Les types et les classes en TypeScript
- EXO: Refactoriser notre appli pour utiliser les types et les classes TypeScript.
- Les modules et `import` / `export`
- EXO: Configurer l'import / export (`tsconfig.json` + `require.js`) et refactoriser notre appli en plusieurs fichiers.
