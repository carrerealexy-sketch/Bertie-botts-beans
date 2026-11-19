# Nom du projet

Application web React avec une API simulée via [json-server](https://github.com/typicode/json-server).

## Sommaire

- [Stack technique](#stack-technique)
- [Prérequis](#prérequis)
- [Installer Node.js et npm](#installer-nodejs-et-npm)
  - [Windows](#windows)
  - [Linux](#linux)
- [Installation du projet](#installation-du-projet)
- [Lancer le projet](#lancer-le-projet)
- [Scripts disponibles](#scripts-disponibles)
- [Problèmes fréquents](#problèmes-fréquents)

---

## Stack technique

- ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) — Bibliothèque JavaScript pour la construction de l'interface utilisateur
- ![React-Bootstrap](https://img.shields.io/badge/React--Bootstrap-7952B3?style=flat&logo=bootstrap&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white) — Mise en forme et design de l'interface
- ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white) — Outil de build et environnement de développement
- ![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white) / ![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white) — Gestion de versions et collaboration
- ![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=flat&logo=vitest&logoColor=white) — Création des tests
- ![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=flat&logo=reacthookform&logoColor=white) — Validation de formulaires

## Prérequis

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/) (version **18 ou supérieure** recommandée) — npm est installé automatiquement avec Node.js

Pour vérifier si Node.js et npm sont déjà installés :

```bash
node -v
npm -v
```

Si les deux commandes affichent un numéro de version, passe directement à [Installation du projet](#installation-du-projet).

---

## Installer Node.js et npm

### Windows

**Option 1 : installeur officiel (le plus simple)**

1. Va sur [nodejs.org](https://nodejs.org/) et télécharge la version **LTS**.
2. Lance l'installeur `.msi` et suis les étapes (laisse les options par défaut).
3. Ferme puis rouvre ton terminal (PowerShell, CMD ou Git Bash).
4. Vérifie l'installation :

```powershell
node -v
npm -v
```

**Option 2 : avec winget**

```powershell
winget install OpenJS.NodeJS.LTS
```

**Option 3 : avec nvm-windows (pour gérer plusieurs versions de Node)**

1. Installe [nvm-windows](https://github.com/coreybutler/nvm-windows/releases).
2. Puis :

```powershell
nvm install lts
nvm use lts
```

### Linux

**Option 1 : avec nvm (recommandé, sans `sudo`)**

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
```

Ferme et rouvre ton terminal (ou `source ~/.bashrc`), puis :

```bash
nvm install --lts
nvm use --lts
```

**Option 2 : via le gestionnaire de paquets**

Debian / Ubuntu :

```bash
sudo apt update
sudo apt install nodejs npm
```

> ⚠️ Les versions des dépôts Debian/Ubuntu sont parfois anciennes. Si `node -v` affiche une version inférieure à 18, utilise nvm (option 1).

Fedora :

```bash
sudo dnf install nodejs npm
```

Arch Linux :

```bash
sudo pacman -S nodejs npm
```

Vérifie l'installation :

```bash
node -v
npm -v
```

---

## Installation du projet

1. Clone le dépôt :

```bash
git clone <url-du-depot>
cd <nom-du-dossier>
```

2. Installe les dépendances :

```bash
npm install
```

(`npm i` fonctionne aussi, c'est un raccourci.)

---

## Lancer le projet

Le projet a besoin de **deux processus** en parallèle : l'API simulée (json-server) et le site React. Ouvre **deux terminaux** à la racine du projet.

### Terminal 1 : l'API (json-server)

```bash
npx json-server db.json --port 3000
```

L'API est alors disponible sur [http://localhost:3000](http://localhost:3000).

> Remplace `db.json` par le nom de ton fichier de données si il est différent.

### Terminal 2 : le site React

```bash
npm run dev
```

Le terminal affiche l'adresse du site (généralement [http://localhost:5173](http://localhost:5173) avec Vite). Ouvre-la dans ton navigateur.

---

## Scripts disponibles

| Commande                              | Description                                               |
| ------------------------------------- | --------------------------------------------------------- |
| `npm install`                         | Installe les dépendances                                  |
| `npm run dev`                         | Lance le site en mode développement                       |
| `npm run build`                       | Génère la version de production dans `dist/`              |
| `npm run preview`                     | Prévisualise la version de production                     |
| `npx json-server db.json --port 3000` | Lance l'API simulée sur le port 3000                      |
| `npm test`                            | Lance les tests Vitest en mode interactif                 |
| `npm run test:run`                    | Lance une fois tous les tests Vitest                      |
| `npm run test:coverage`               | Lance les tests Vitest et génère le rapport de couverture |

---

## Problèmes fréquents

**`npm` n'est pas reconnu comme commande**
Node.js n'est pas installé ou le terminal n'a pas été redémarré après l'installation. Ferme et rouvre ton terminal.

**Le port 3000 est déjà utilisé**
Change le port de json-server (`--port 3001`) et mets à jour l'URL de l'API dans le code du projet.

**Erreur de permissions sur Linux avec `npm install -g`**
Évite `sudo npm`. Utilise nvm, qui installe Node.js dans ton dossier utilisateur.

**Erreurs bizarres après un changement de branche ou de version de Node**
Réinstalle proprement les dépendances :

```bash
rm -rf node_modules package-lock.json   # Linux
npm install
```

```powershell
Remove-Item -Recurse -Force node_modules, package-lock.json   # Windows PowerShell
npm install
```

## 🧑‍💻 Contributeurs

<a href="https://github.com/carrerealexy-sketch"><img src="https://github.com/carrerealexy-sketch.png" width="60" style="border-radius:50%" alt="carrerealexy-sketch" /></a>
<a href="https://github.com/jeyofdev"><img src="https://github.com/jeyofdev.png" width="60" style="border-radius:50%" alt="jeyofdev" /></a>
