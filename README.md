# Cinder Roasters — boutique de café de spécialité

Application e-commerce React + Vite + Tailwind CSS : six cafés d'exemple, recherche, filtres par catégorie, fiche produit, panier (quantités, persistance `localStorage`) et checkout simulé.

## Lancer en local

```bash
npm install
npm run dev
```

## Sécurité — clés d'API

- **Ne jamais** écrire une clé d'API dans le code source ni la commiter sur GitHub.
- Ce projet est 100 % côté client : tout ce qui est dans le dépôt (ou dans le build `dist/`) est public.
- Toute variable préfixée `VITE_` est injectée **dans le bundle JavaScript** et visible par tout le monde.
- Les secrets vivent uniquement dans les **variables d'environnement Vercel** et sont consommés côté serveur (voir `api/qwen.js`).

## Déployer sur Vercel (via GitHub)

### 1. Publier sur GitHub

Créer un dépôt vide sur github.com, puis dans le dossier du projet :

```bash
git init
git add .
git commit -m "Cinder Roasters — boutique de café"
git branch -M main
git remote add origin https://github.com/VOTRE_UTILISATEUR/VOTRE_DEPOT.git
git push -u origin main
```

Le fichier `.gitignore` protège déjà `node_modules/`, `dist/` et tous les fichiers `.env`.

### 2. Importer sur Vercel

1. [vercel.com](https://vercel.com) → **Add New… → Project** → importer le dépôt GitHub.
2. Vercel détecte automatiquement le framework **Vite** :
   - Build command : `npm run build`
   - Output directory : `dist`
3. Cliquer **Deploy**. Chaque `git push` sur `main` redéploiera automatiquement.

### 3. Variables d'environnement (si vous appelez l'API Qwen)

Dans le projet Vercel : **Settings → Environment Variables**, ajouter (pour tous les environnements) :

| Nom | Valeur |
| --- | --- |
| `DASHSCOPE_API_KEY` | votre **nouvelle** clé `sk-…` |
| `DASHSCOPE_BASE_URL` | `https://votre-workspace…/compatible-mode/v1` |

Puis redéployer (Deployments → ⋯ → Redeploy) pour qu'elles soient prises en compte.

### 4. Appeler l'API depuis le front

Le proxy serverless `api/qwen.js` est accessible sur `/api/qwen` — la clé ne quitte jamais le serveur :

```js
const res = await fetch("/api/qwen", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    model: "qwen-plus",
    messages: [{ role: "user", content: "Bonjour !" }],
  }),
});
const data = await res.json();
```

En local, créez un fichier `.env.local` (ignoré par git) avec `DASHSCOPE_API_KEY=…` et relancez `npm run dev` (nécessite `vercel dev` ou un `fetch` direct vers l'URL de l'API pour tester le proxy hors Vercel).
