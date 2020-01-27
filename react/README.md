# À la découverte de React

## 📚 Introduction à React


### 🎬 WOOCLAP: À quoi vous fait penser React ?

Rendez-vous sur https://www.wooclap.com/.


### 🗒 Définition officielle

> "React est une librairie JavaScript pour créer des interfaces utilisateur."

> React can be used as a base in the development of single-page or mobile applications. However React is only concerned with rendering data to the DOM and so creating React applications usually requires the use of additional libraries for state management, routing, and interaction with an API. **Redux**, **React Router** and **axios** are respective examples of such libraries.
— https://en.wikipedia.org/wiki/React_(web_framework)

👉 Que peut-on déduire de cette définition ?


### 🗒 Hello World

Exemple minimal de code React :

```js
ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);
```

En supposant la balise suivante dans le HTML :

```html
<div id="root"></div>
```

Dans un navigateur, cette application React produira le HTML suivant :

```html
<div id="root">
  <h1>Hello World!</h1>
</div>
```

Voir : https://codepen.io/angularfrance/pen/eYmPLVp


### 🗒 Éléments

Les éléments sont les plus petits "blocs" qu'on trouve dans une appli React.

Un élément décrit ce qu'on voit à l'écran :

```js
const element = <h1>Hello, world</h1>;
```

⚠️ Ne pas confondre *élément* et *composant*.

#### Afficher un élément

Supposons la `<div>` suivante quelque part dans le HTML :

```html
<div id="root"></div>
```

On peut afficher un élément React dans cette `<div>` grâce à `ReactDOM.render()` :

```js
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));
```

Le texte "Hello, world" sera alors affiché sur la page.

#### Actualiser un élément

Les éléments React sont **immutables**.

Le seul moyen de mettre à jour l'interface est donc de créer de nouveaux éléments, ce qui est géré automatiquement par les **composants**.

Exemple - Afficher l'heure en recréant un élément toutes les secondes :

```js
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000);
```

#### Éléments et Shadow DOM

React utilise un Document Object Model (DOM) virtuel.

En interne, React se représente les éléments d'interface sous la forme d'une **structure de données maison**, stockée en mémoire. À chaque mise à jour de l'UI, React calcule les différences d'abord dans cette structure, avant de mettre à jour le DOM dans le navigateur.

Ainsi, le développeur n'a pas à se soucier de l'emplacement précis de l'interface qu'il faut mettre à jour. Grâce à ce "diff", React s'occupe de ne **rafraîchir que le(s) fragment(s) de DOM qui a (ont) changé**. Efficacité garantie ! ⚡️

Dans l'exemple ci-dessus, seul le noeud texte qui contient l'heure est mis à jour.


### 🗒 JSX

Les éléments React sont généralement écrits en JSX.

JSX, ou JavaScript XML, est une extension du langage JavaScript.

On pourrait dire que c'est une **syntaxe hybride entre JavaScript et HTML**.

JSX permet de décrire une IHM en utilisant une syntaxe très proche du HTML. La philosophie est de pouvoir définir au même endroit l'*apparence* et la *logique d'affichage*.

La plupart des composants React sont écrits avec JSX, mais ce n'est pas obigatoire (ils peuvent être écrits en JavaScript pur).

Exemple de code JSX :

```js
const element = <h1>Hello, world!</h1>;
```

#### JSX: Points importants

- Le JSX sert à décrire les "éléments" React qui composent l'interface.
- Un bout de JSX n'est PAS une string.
- Un bout de JSX est considéré comme une **expression JavaScript**.

#### JSX sert à représenter des objets

Le code écrit en JSX doit être **compilé** par un outil comme [Babel](https://babeljs.io/) pour pouvoir être interprété par les navigateurs. Ce traitement est généralement effectué dans une phase de build avant que l'application soit déployée.

La compilation produit des appels `React.createElement()`, qui génèrent une série d'**éléments React**.

Les deux exemples suivants sont donc identiques :

```js
// Syntaxe JSX
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```

```js
// Code "compilé" ou manuel (sans JSX)
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

On pourrait d'ailleurs utiliser la 2ème syntaxe directement.

💁‍♂️ L'outil en ligne https://babeljs.io/repl permet d'entrer du code JSX et de voir le code compilé produit par Babel.

#### JSX: Incruster des expressions avec `{ }`

On peut incruster une expression JavaScript dans du JSX grâce aux **accolades simples `{ }`**.

Exemple - Afficher une variable `name` dans du JSX :

```js
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

On peut mettre **n'importe quelle expression JavaScript** dans les accolades. Par exemple : `2 + 2`, `user.firstName`, ou `formatName(user)`

Exemple - Incruster le résultat d'un appel de fonction dans du JSX :

```js
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

Puisque le code JSX est lui-même une expression, on peut l'utiliser comme toute expression : dans un `if` ou un `for`, on peut l'assigner à une variable, le passer en argument, le retourner depuis une fonction.

Exemple - Renvoyer du JSX différent en fonction d'une condition :

```js
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
```

#### JSX: Attributs

Les éléments JSX supportent des attributs, très proches des attributs HTML.

Si un attribut contient une **chaîne littérale**, mettre la chaîne entre guillemets :

```js
const element = <div tabIndex="0"></div>;
```

Si un attribut contient une **expression JavaScript**, mettre l'expression entre accolades (sans guillemets) :

```js
const element = <img src={user.avatarUrl}></img>;
```

⚠️ On n'utilise JAMAIS les guillemets et les accolades en même temps. ⚠️


### 🗒 JSX - Pièges potentiels

#### Toute balise JSX doit être fermée

⛔️ NON :

```html
<img src="images/icon-delete.png">
```

✅ OUI :

```html
<!-- Option 1 -->
<img src="images/icon-delete.png"></img>

<!-- Option 1 -->
<img src="images/icon-delete.png" />
```

#### Le nom des attributs HTML doit être en camelCase

⛔️ NON :

```html
<p class="intro">...</p>
```

✅ OUI :

```html
<p className="intro">...</p>
```

Remarque : en fait, on utilise le nom des *propriétés DOM*.

#### Deux éléments JSX "frères" doivent toujours avoir une balise parente

⛔️ NON :

```html
<p>Premier paragraphe</p>
<p>Deuxième paragraphe</p>
```

✅ OUI :

```html
<div>
  <p>Premier paragraphe</p>
  <p>Deuxième paragraphe</p>
</div>
```

✅ OUI, avec le **fragment JSX** (balise vide permettant d'éviter d'introduire une `<div>` inutile) :

```html
<>
  <p>Premier paragraphe</p>
  <p>Deuxième paragraphe</p>
</>
```

#### Changer une classe CSS dynamiquement

⛔️ NON (interdit de combiner "" et {} dans un attribut JSX) :

```html
<li className="list-group-item {props.todo.done ? 'done' : ''}">...</li>
```

✅ OUI :

```html
<li className={'list-group-item ' + (props.todo.done ? 'done' : '')}>...</li>
```


### 🗒 Les "starters"

Voir https://github.com/facebook/create-react-app#popular-alternatives

- Online playgrounds : CodePen, CodeSandbox, or Glitch.
- Ajouter React via une balise `<script>` ([DOC](https://reactjs.org/docs/add-react-to-a-website.html))
- Framework pour générer un site statique (portfolio, blog) : https://www.gatsbyjs.org/
- Framework de server-side rendering : https://github.com/zeit/next.js/
- Create React App : https://github.com/facebook/create-react-app


#### Create React App

Site officiel : https://github.com/facebook/create-react-app

Create React App est un des starters React les plus populaires.

- Dépendances minimales.
- Rien à configurer. Idéal pour apprendre et commencer à coder rapidement.
- Inclus : React, JSX, ES6, serveur de développement, test runner...
- Possibilité de s'affranchir de la config standard en "ejectant".


### 💻 TP: Votre première application React

#### Installer l'application

- Dans VS Code, installez l'extension [Babel JavaScript](https://marketplace.visualstudio.com/items?itemName=mgmcdermott.vscode-language-babel). Elle fournit plein de fonctionnalités utiles pour React : syntax highlighting, IntelliSense...
- Récupérez le fichier [`react-todos-starter.zip`](assets/react-todos-starter.zip), décompressez-le, et ouvrez le dossier `react-todos-starter` obtenu dans VS Code.
  - Pour info, ce ZIP contient une application créée avec Create React App. En plus des fichiers standard, j'ai ajouté quelques librairies supplémentaires, comme `bootstrap` et `json-server`.
- Ouvrez un terminal VS Code :
  - Installez les dépendances du projet avec `npm install`.
  - Puis exécutez `npm start` et vérifiez que tout s'affiche correctement dans le navigateur.

#### Convertir le HTML du projet en JSX

Pour terminer, convertissez le code HTML statique de l'application en code JSX valide et déplacez-le dans le composant `<App />`.

- Emplacement actuel du code HTML : `public/index.html`
- Emplacement après conversion en JSX : `src/App.js`

Gardez bien en tête les "pièges JSX" listés ci-dessus.



## 📚 Composants, Props et État

### 🗒 Composants

Les composants permettent de diviser l'interface en **morceaux indépendants et réutilisables**.

<img src="assets/react_components.png" class="img-fluid" />

Un composant est similaire à une fonction JavaScript :

- Il accepte des données arbitraires en entrée (appelées "props)
- Il renvoie des éléments React décrivant l'interface.

#### Composants fonction vs. classe

La manière la plus simple de définir un composant est de créer une **fonction JavaScript** :

```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

Cette fonction est un composant React valide car elle accepte un seul argument "props" (pour "properties") et elle renvoie un élément React. On appelle ce type de composant un "composant fonction" ou "composant fonctionnel".

On peut aussi utiliser une classe ES6 pour définir un composant :

```js
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

Les 2 composants ci-dessus sont équivalents du point de vue de React.

La principale différence est que la fonction renvoie directement le code JSX, alors que la classe le renvoie via une méthode `render()`.

#### ⚠️ Les noms de composants doivent toujours commencer par une majuscule

Ainsi :

- `<div />` représente la balise HTML `<div>`.
- `<Welcome />` représente un composant et **nécessite que le symbole `Welcome` soit dans le scope**.


### 🗒 Afficher un composant et lui passer des "props"

Jusqu'à maintenant, nous avons vu beaucoup de code JSX ne contenant que des balises HTML :

```js
const element = <div />;
```

En fait, le JSX peut aussi contenir des composants définis par l'utilisateur :

```js
const element = <Welcome name="Sara" />;
```

Les attributs JSX (ici, `name="Sara"`) sont passés au composant sous la forme d'un **objet unique**, qu'on appelle "props".

Par exemple, le code affiche "Hello, Sara" sur la page :

```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

Si on passe plusieurs attributs au même composant :

```html
<Welcome name="Sara" age="38" />
```

Chaque attribut devient une propriété de l'objet `props` reçu par le composant :

```js
function Welcome(props) {
  return <p>Je m'appelle {props.name} et mon âge est {props.age}.</p>;
}
```

On peut d'ailleurs utiliser le *destructuring* pour passer un objet entier aux props d'un composant :

```js
obj = { name: 'Sara', age: 38 };
```

```html
<Welcome {...obj} />
```

Une prop peut contenir n'importe quel type de données. Les props sont ainsi très utilisées pour passer des **fonctions entières** aux composants enfants.

Cela permet de **conserver la gestion de l'état côté parent** : l'enfant se contente d'afficher des données qu'il reçoit en props et d'appeller des méthodes qu'il reçoit en props, mais il n'est pas "conscient" du contexte dans lequel il est utilisé, ni d'où vienne les données ou quelles actions il va déclencher...

```js
// Store est le composant parent
function Store() {

  const buyProduct = (product) => {
    // Traite l'achat d'un produit...
  };

  return (
    <div>
      // Product est le composant enfant
      <Product buy={buyProduct} />
    </div>
  );
)
```

#### Un composant peut contenir d'autres composants (composition)

```js
function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}
```

#### Les props sont en lecture-seule

Un composant ne doit JAMAIS modifier ses props (valable pour composant classe ou fonction).

Si un composant a besoin de mettre à jour son affichage au fil du temps, en réponse aux actions utilisateur, aux réponses serveur, ou tout autre événement, il doit utiliser le concept d'**état**, pour éviter d'enfreindre la règle d'immutabilité des props.

Nous verrons le concept d'état plus tard.


### 💻 TP: Vos premiers composants

Convertissez les 3 éléments principaux de l'interface en composants React **de type fonction** :

- Formulaire : `<TodoForm />`
- Liste des todos : `<TodoList />`
- Filtres : `<Filters />`

Une fois les composants créés, vous les afficherez dans le composant principal `<App />`.


### 🗒 Affichage conditionnel

Dans un composant, on peut utiliser un simple `if` pour renvoyer une expression JSX différente en fonction d'une condition :

```js
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}
```

On peut également **assigner l'élément conditionnel à une variable**, ce qui permet de sortir la condition du JSX :

```js
class LoginControl extends React.Component {
  // ...

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;

    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}
```

On peut aussi placer la condition "en ligne", directement dans le JSX :

- Avec l'**opérateur logique** `&&`. Exemple : `condition && expression`, où "expression" serait du JSX qui ne serait affiché que si "condition" est true.
- Avec un **opérateur ternaire** `condition ? true : false` :

<div></div>

```js
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
    </div>
  );
}
```

Si on ne veut pas du tout afficher un composant en fonction d'une certaine condition, on peut renvoyer `null` à la place des éléments à afficher :

```js
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}
```

### 🗒 Afficher des listes

En React, on utilise la méthode `map()` pour transformer un tableau de données en liste d'éléments affichables.

```js
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

Ici, `listItems` représente une collection d'éléments JSX, affichée grâce aux `{ }`.

#### Propriété "key"

Pour optimiser la détection de changement de React, il est recommandé de définir une clé (propriété `key`) sur chaque élément d'une liste.

Si l'on reprend l'exemple précédent, il faudrait plutôt écrire :

```js
<li key={number.toString()}>{number}</li>
```

Cela permet à React de recycler les éléments DOM déjà créés lorsqu'il a besoin de rafraîchir l'interface, plutôt que de créer de nouveaux éléments (opération coûteuse).

Points de vigilance lorsqu'on utilise une propriété `key` :

- Les clés doivent être uniques à l'intérieur d'une liste précise.
- Les clés doivent être stables (ne pas changer à chaque réponse serveur).
- Les clés doivent se trouver au même niveau que le `map()` (⚠️ si on utilise un composant enfant pour afficher un élément de liste, la clé ne doit pas se trouver à l'intérieur de ce composant).


### 💻 TP: Afficher les todos dynamiquement

👉 Pour cet exercice, vous utiliserez les données stockées dans la variable `TODO_LIST` dans `src/models/DATA.js`.

- Refactorisez la liste des todos pour l'afficher via 2 composants : parent `<TodoList />` et enfant `<TodoItem />`.
- Chargez les données dans le composant `<TodoList />` et utilisez une "prop" pour passer le bon todo à afficher à chaque `<TodoItem />`.


### 🗒 État de composant

Pour pouvoir mettre à jour son UI, un composant utilise l'*état*.

L'état est similaire aux props, mais il est **privé** et **totalement contrôlé par le composant**.

#### Exemple du composant "Clock"

Considérons le composant suivant :

```js
function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

**PROBLÈME :** Le timer (`setInterval`) et le rafraîchissement de la date (`new Date()`) devraient être des détails d'implémentation encapsulés dans le composant `<Clock />`.

Le composant `<Clock />` devrait être capable de se mettre à jour lui-même.

**SOLUTION :** Ajouter un *état* au composant `<Clock />`.

#### Convertir un composant fonction en composant classe

💁‍♂️ Historiquement dans React, le concept d'état n'existait que les composants-classes. On était donc obligé d'utiliser un composant-classe pour pouvoir utiliser l'état. Ça n'est plus vrai depuis React 16.8 et l'avénement des "hooks".

```js
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```


### 👉 Lister les caractéristiques d'un composant-classe

En observant le code ci-dessus, pouvez-vous lister toutes les caractéristiques syntaxiques d'un composant-classe ?


### 🗒 Utiliser l'état correctement

Trois points importants à respecter concernant l'état d'un composant.

#### 1) Ne jamais modifier l'état directement

⛔️ Non (ne déclenche pas de rafraîchissement) :

```js
this.state.comment = 'Hello';
```

✅ Oui - Utiliser `setState()` :

```js
this.setState({comment: 'Hello'});
```

NB. Le seul endroit où on peut assigner `this.state` est dans le constructeur.

#### 2) Ne pas utiliser `this.props` et `this.state` pour calculer le nouvel état

C'est lié au fait que `this.props` et `this.state` peuvent être mis à jour de manière asynchrone.

⛔️ Non (pourrait planter) :

```js
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

✅ Oui - Utiliser la variante de `setState()` qui accepte une fonction plutôt qu'un objet :

```js
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

#### 3) Les mises à jour de l'état sont mergées

Quand on appelle `setState()`, React fusionne l'objet fourni avec l'état actuel.

CONSÉQUENCE : On ne doit pas refournir l'intégralité de l'état à chaque fois, on peut fournir uniquement la propriété à mettre à jour (qui écrasera complètement l'ancienne propriété, aka "shallow merge").

#### NB. L'état est privé

L'état est local à un composant et encapsulé dans ce composant.

Les autres composants n'ont pas à savoir si un composant donné possède un état ou non.

Un composant peut passer son état à l'un des ses composants enfants via des "props", mais l'enfant ne sait pas d'où vient la donnée.


### 🗒 Méthodes cycle de vie (*lifecycle methods*)

**Méthodes aux noms prédéfinis** qu'on déclare dans un composant React et qui sont appelées **automatiquement** à des moments stratégiques de la vie du composant.

On pourrait considérer ces méthodes comme des espèces d' "événements système".

Exemples de *lifecycle methods* :

- `render` — OBLIGATOIRE et LA + IMPORTANTE. Appelée quand l'état du composant est mis à jour, et que cette màj impacte l'interface.
- `componentDidMount` — Appelée juste après que le composant a été inséré dans le DOM. Typiquement utilisée pour déclencher un chargement de données depuis une API.
- `componentWillUnmount` - Appelée juste avant que le composant soit détruit. Typiquement utilisée pour faire du nettoyage tel que annuler un setInterval ou un "eventListener" devenus inutiles.
- `shouldComponentUpdate` — Peut renvoyer `false` pour éviter un rafraîchissement inutile du composant.


### 🗒 Ajouter des méthodes "cycle de vie" à un composant-classe

Reprenons l'exemple du composant `<Clock />` évoqué précédemment.

Les méthodes "cycle de vie" nous seraient bien utiles ici :

- Pour mettre en place le timer quand `Clock` est affiché pour la première fois dans le DOM (aka "mounting") --&gt; `componentDidMount()`.
- Pour détruire le timer quand `Clock` est supprimé du DOM (aka "unmounting") --&gt; `componentWillUnmount()`.

On pourrait mettre à jour le composant avec le code suivant :

```js
class Clock extends React.Component {
  constructor(props) { ... }  // identique

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() { ... }  // identique
}
```

**💁‍♂️ Et les composants fonctions ?**

Pour utiliser les méthodes cycles de vie dans les composants fonction, il faut utiliser les hooks (apparus dans React 16.8), plus spécifiquement le "effect hook".

Voir la doc : https://reactjs.org/docs/hooks-effect.html


### 💻 TP: Marquer un todo comme "fait" + Supprimer un todo

Pour cet exercice, vous aurez besoin de mettre à jour la propriété contenant les todos, et cette mise à jour devra déclencher un rafraîchissement de l'interface.

👉 Puisque les props d'un composant sont immutables, on ne peut pas les utiliser pour stocker la propriété `todos` qui change.
👉 Non seulement la propriété `todos` doit être mise à jour, mais plusieurs composants doivent pouvoir la mettre à jour. Par exemple, l'action "ajouter un todo" vient du composant `<TodoForm />`, "supprimer un todo" vient du composant `<TodoItem />`...


- Refactorisez l'application de sorte que la propriété `todos` puisse être mise à jour et soit accessible à tous les composants qui le nécessitent.
- Faites en sorte qu'un clic sur un todo (dans `<TodoItem />`) passe le todo correspondant en "fait". Pensez bien à mettre à jour le modèle de données ainsi que la classe CSS (la classe "done" affichera le todo en "barré").
- Faites en sorte qu'un clic sur l'icône Poubelle d'un todo (dans `<TodoItem />`) supprime le todo correspondant, APRÈS confirmation de l'utisateur avec `window.confirm()`, et SANS passer le todo correspondant en "fait". Autrement dit, le clic sur la poubelle ne doit pas se propager en clic sur le todo.


### 💻 TP: Convertir un composant-classe en composant-fonction avec hook

Les hooks permettent d'utiliser des fonctionnalités telles que l'état dans les composants-fonctions.

Les composants-fonctions sont aujourd'hui la manière recommandée de créer des composants.

- Convertissez le composant `<App />` créé précédemment sous forme de classe en composant fonction.
- Utilisez le hook `useState` pour que l'état continue à fonctionner comme avant. Vous consulterez la doc suivante pour voir comment utiliser `useState` : https://reactjs.org/docs/hooks-state.html



## 📚 Événements et formulaires


### 🗒 Événements - Syntaxe

La gestion d'événements sur les éléments React est très similaire à la gestion des événements DOM.

Différences syntaxiques par rapport aux événements DOM :

- Les événements React sont nommés en **camelCase**, plutôt qu'en minuscule.
- En JSX on passe une fonction comme gestionnaire d'événement, plutôt qu'une string.

HTML :

```html
<button onclick="purchaseOrder()">
  Passer commande
</button>
```

React :

```js
<button onClick={purchaseOrder}>
  Passer commande
</button>
```

Inutile d'utiliser `addEventListener` en React. On définit les listeners directement sur les éléments concernés.


### 🗒 Attention à `this` dans les composants-classes

```js
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```

- Pouvez-vous expliquer pourquoi la ligne `this.handleClick = this.handleClick.bind(this);` est nécessaire ?
- Y aurait-il une syntaxe alternative qui fonctionnerait aussi ?


### 🗒 Formulaires

En HTML, les formulaires maintiennent leur propre état et le mettent à jour basé sur les actions utilisateur.

En React, l'état mutable est typiquement stocké dans la propriété `state` des composants, et mis à jour exclusivement via `setState()`.

L'idée est de "lier" ces 2 états pour faire en sorte que l'état React et l'état du formulaire changent simultanément. On parle alors de "composant contrôlé" (*controlled component*), i.e. un composant contenant un formulaire dont l'état est piloté par React.

Exemple de *controlled component* :

```js
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

#### Types de champs HTML

⚠️ En React, il y a quelques particularités sur la manière de gérer certains champs par rapport au HTML.

Par exemple, en React, le champ `textarea` possède un attribut "value" (alors qu'en HTML, la valeur d'un textarea est son noeud texte "enfant") :

```html
<textarea value={this.state.value} onChange={this.handleChange} />
```

En React, le champ `select` possède un attribut "value" (alors qu'en HTML; la valeur d'un select est définie par l'"option" sélectionnée) :

```html
<select value={this.state.value} onChange={this.handleChange}>
  ...
</select>
```


### 💻 TP: Ajouter un nouveau todo

Faites en sorte qu'il soit possible d'ajouter un nouveau todo à la liste, "non fait" par défaut, en saisissant le texte du todo dans le formulaire puis en tapant Entrée (composant `<TodoForm />`).



### 💻 TP: Filtrer par statut

Faites en sorte qu'il soit possible de filtrer les todos par statut, en cliquant sur les boutons du composant `<Filters />`.

Le filtre actif doit avoir la classe CSS `btn-primary` au lieu de `btn-secondary`.

Le filtre par défaut doit être "Tous".



## 📚 Étendre React

Les responsabilités de React sont limitées à la génération et la mise à jour de l'interface.

Après tout, React n'est qu'une simple librairie.

Bien d'autres fonctionnalités seront nécessaires pour créer une application web complète. Il faudra pour cela faire appel à d'autres librairies :

- Partage de données entre composants : [Redux](https://redux.js.org/)
- Routeur : [React Router](https://reacttraining.com/react-router/web/guides/quick-start)
- Requêtes HTTP : [Axios](https://github.com/axios/axios)
- Bibliothèque de composants réutilisables : [Material UI](https://material-ui.com/)
- Etc.


### 💻 TP: Étendre React : Material UI

OBJECTIF: Utiliser un design plus "sexy" pour certains éléments de notre application.

👉 Pour cet exercice, vous utiliserez la doc de [Material UI](https://material-ui.com/).

- Installez Material UI dans le projet en suivant la doc officielle.
- Testez que la librairie fonctionne en affichant un simple `<Button />`.
- Utilisez le composant "Alert" à la place du `window.confirm()` actuellement utilisé avant la suppression d'un todo ([DOC Dialogs](https://material-ui.com/components/dialogs/)).
- Utilisez le composant "Snackbar" pour confirmer la création ou la suppression d'un todo, en faisant apparaître une snackbar en bas à droite de l'écran, qui disparaît automatiquement après 3 secondes ([DOC Snackbars](https://material-ui.com/components/snackbars/)).


### 💻 TP: Étendre React : React Router

OBJECTIF: Créer plusieurs "pages" pour l'application.

👉 Pour cet exercice, vous utiliserez la doc de [React Router](https://reacttraining.com/react-router/web/guides/quick-start).

- Installez React Router dans le projet en suivant la doc officielle.
- Refactorisez le composant principal de l'application (`<App />`) en 3 composants :
  - `<App />` devient un simple conteneur qui affiche la charpente Bootstrap commune à toutes les pages (`div.container`...), le titre de l'application, et le composant correspondant à la route en cours.
  - `<PageLists />` affiche la liste de toutes les todo lists dans notre (hypothétique) base de données. Pour le moment, affichez dans ce composant une simple liste à puces avec 3 éléments : Liste 1, Liste 2, Liste 3.
  - `<PageList />` affiche le détail d'une todo list précise, c'est-à-dire tous les todos qu'elle contient. Ce composant reprend tout le code qu'on a créé et qui se trouvait auparavant dans `<App />`.
- Installez le routeur en suivant les instructions de la doc, et créez les routes suivantes :
  - Chemin "" (vide) affiche le composant `<PageLists />`.
  - Chemin "list/:listId" affiche le composant `<PageList />`.
- Faites en sorte que les noms de liste dans `<PageLists />` soit cliquables et mènent à la liste correspondante, avec le bon `listId` dans l'URL (par ex, "list/1", "list/2"...). Dans le template de `<PageList />`, vous afficherez le `listId` récupéré dans l'URL.


## 🤔 BRAINSTORMING: Qu'avez-vous pensé de React ?

Rendez-vous sur https://www.wooclap.com/ pour donner votre avis sur React.

- Avez-vous envie d'en apprendre plus ?
- Points positifs ?
- Points négatifs ?


-----


## ----- 📚 Annexes -----

### 🗒 Create React App - Mode d'emploi

Créer un projet ([DOC](https://create-react-app.dev/docs/getting-started/)) :

```cmd
npx create-react-app my-app  # NPX
npm init react-app my-app    # NPM
```

Commandes fréquentes ([DOC](https://create-react-app.dev/docs/available-scripts)) :

```cmd
npm start      # Lance l'appli en mode développement
npm test       # Exécute les test unitaires
npm run build  # Build l'appli pour la prod
```

Organisation du code ([DOC](https://create-react-app.dev/docs/folder-structure)) :

Répertoires importants :

- `/src` : Code source React
- `/public` : Fichier HTML

Les deux fichiers suivants doivent obligatoirement exister :

- `public/index.html` : Page principale.
- `src/index.js` : Point d'entrée JavaScript.

Les autres fichiers créés par défaut peuvent être effacés ou renommés.

Fichiers statiques, tels que images, PDF... ([DOC](https://create-react-app.dev/docs/adding-images-fonts-and-files)) :

- Avec Webpack, les fichiers statiques doivent être importés (avec `import`) dans un module JavaScript pour être inclus dans le bundle final.
- L'import d'un fichier statique fournit son chemin, qui peut être utilisé pour le référencer dans le code, par ex. dans l'attribut `src` d'une image ou l'attribut `href` pour un lien vers un PDF. (Pour les petits fichiers images ou SVG, l'import renvoie les données directement.)

Exemple :

```js
import React from 'react';
import logo from './logo.png'; // Tell Webpack this JS file uses this image

console.log(logo); // /logo.84287d09.png

function Header() {
  // Import result is the URL of your image
  return <img src={logo} alt="Logo" />;
}

export default Header;
```


### 🗒 Hooks React

Les hooks sont une nouveauté apparue dans React 16.8. Ils permettent d'utiliser l'état et d'autres fonctionnalités de React dans les composants-fonctions (**sans devoir créer de composants-classes**).

DOC: https://reactjs.org/docs/hooks-intro.html

Concrètement, les hooks sont des fonctions qui permettent au développeur de s'interfacer avec (*hook into*) l'état et le cycle de vie des composants fonctionnels.

React fournit quelques hooks systèmes :

- `useState` pour s'interfacer avec l'état d'un composant.
- `useEffect` pour s'interfacer avec les méthodes cycle de vie.

On peut aussi **créer ses propres hooks** pour réutiliser des comportements stateful à travers plusieurs composants.


### 🗒 Considérations architecturales

**Remonter l'état**

Lorsque plusieurs composants partagent les mêmes données dynamiques, on conseille de remonter l'état correspondant dans leur ancêtre commun le plus proche.

**Un mot sur Flux**

Pour supporter le concept de **flot de données unidirectionnel** de React, l'architecture Flux représente une alternative au populaire pattern MVC (modèle-vue-contrôleur). Flux utilise des *actions* qui sont dispatchées à un *store* central, et les changements dans le store sont ensuite retransmis à la vue. Dans React, cette "diffusion" des changements se fait via les propriétés de composants.

Ce pattern est parfois décrit par "les propriétés descendent, les actions remontent".

Flux peut être considéré comme une variante du pattern observer.

Il existe de nombreuses implémentations de Flux, la plus populaire étant [Redux](https://redux.js.org/).

