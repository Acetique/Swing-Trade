# Swing Consensus FR V8 — Site Web Hybride TradingView

Cette version reprend les trois graphiques swing de l’extension V8, le widget TradingView et le sélecteur de ticker/bourse, sans extension ni Python.

## Mise en ligne gratuite sur GitHub Pages

1. Ouvre github.com et crée un dépôt public, par exemple `swing-consensus-fr`.
2. Envoie les fichiers `index.html`, `dashboard.js`, `style.css` à la racine du dépôt. Tu peux aussi envoyer `README_INSTALLATION.md` et `_headers` (ce dernier est facultatif sur GitHub Pages).
3. Dans le dépôt, ouvre **Settings → Pages → Build and deployment**.
4. Choisis **Deploy from a branch**, branche **main**, dossier **/(root)**, puis **Save**.
5. Ton site sera accessible à `https://TON-NOM.github.io/swing-consensus-fr/` après publication.

## Important : accès aux données depuis un site Web

Contrairement à l’extension Chrome, un site GitHub Pages ne dispose pas d’autorisations `host_permissions`. Les serveurs Yahoo Finance et Google Actualités peuvent bloquer les requêtes cross-origin (CORS). Dans ce cas, le tableau de bord affichera « DONNÉES INDISPONIBLES » plutôt que d’inventer des signaux.

### Option : proxy Cloudflare Worker

1. Crée un compte Cloudflare et va dans **Workers & Pages**.
2. Crée un Worker, puis colle le contenu de `cloudflare-worker.js` dans l’éditeur du Worker et déploie-le.
3. Copie son URL, par exemple `https://nom-du-worker.compte.workers.dev`.
4. Sur le site Swing Consensus FR, en bas dans **Connexion aux données**, colle cette URL et clique sur **Enregistrer le proxy** puis **Actualiser maintenant**.

Ce proxy autorise uniquement les requêtes HTTPS vers les routes Yahoo Finance Chart et Google News RSS nécessaires. Il n’est pas une API officielle de Yahoo Finance et ne garantit pas leur disponibilité. Vérifie les conditions des fournisseurs et les limites de Cloudflare avant utilisation intensive. Le proxy est public par défaut; pour un usage privé, limite l'accès avec Cloudflare Access ou une liste d'origines autorisées.

## Fonctionnalités

- Sélection du ticker et de la bourse (TSX, TSXV, NASDAQ, NYSE, Crypto, etc.).
- Graphique TradingView intégré et lien vers TradingView.
- Trois graphiques de swing : haussier (ENTRÉE/CIBLE/STOP), baissier (ENTRÉE/CIBLE/STOP), invalidation (STOP LONG/STOP SHORT).
- Indicateurs techniques RSI, MACD, EMA, score 4H/Daily/Weekly, nouvelles indexées si accessibles.
- Les préférences sont enregistrées localement dans le navigateur; aucune connexion TradingView privée n’est importée.

**Limites :** le widget TradingView n'alimente pas les calculs, les signaux sont conditionnels et ne sont pas des recommandations personnalisées. Les données Yahoo Finance et flux RSS peuvent être indisponibles ou retardés. Aucun ordre n'est passé.
