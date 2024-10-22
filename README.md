# React Google Maps store NIKE Finder 🏥

Une application web moderne construite avec React et Google Maps API pour localiser et obtenir des informations sur les stores à proximité. L'application permet aux utilisateurs de trouver facilement les stores les plus proches et d'obtenir des directions vers celles-ci.

## 🌟 Fonctionnalités

- 📍 Géolocalisation automatique de l'utilisateur
- 🗺️ Carte Google Maps interactive avec style personnalisé
- 📱 Interface responsive et moderne
- 🏥 Affichage des cliniques avec marqueurs personnalisés
- 📏 Calcul automatique des distances
- 🚗 Navigation intégrée (Google Maps & Waze)
- 🎨 Design moderne avec shadcn/ui
- ℹ️ Fenêtres d'information détaillées pour chaque clinique

## 🛠️ Technologies Utilisées

- React.js
- Google Maps API
    - Maps JavaScript API
    - Distance Matrix API
    - Directions API
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Lucide React Icons

## 📋 Prérequis

- Node.js (version 14 ou supérieure)
- npm ou yarn
- Une clé API Google Maps valide
- Un navigateur moderne avec support de la géolocalisation

## 🚀 Installation

1. **Clonez le repository**
```bash
git clone https://github.com/Ikart-1/React-Google-Maps.git
cd React-Google-Maps
```

2. **Installez les dépendances**
```bash
npm install
# ou
yarn install
```

3. **Configuration de l'environnement**
- Créez un fichier `.env.local` à la racine du projet
- Ajoutez votre clé API Google Maps :
```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=votre_clé_api_google_maps
```



4. **Démarrez l'application**
```bash
npm run dev
# ou
yarn dev

```

## 🗺️ Configuration Google Maps

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créez un nouveau projet ou sélectionnez un projet existant
3. Activez les APIs suivantes :
    - Maps JavaScript API
    - Places API
    - Directions API
    - Distance Matrix API
4. Créez une clé API et restreignez-la pour plus de sécurité

## 📱 Utilisation

1. Autorisez la géolocalisation dans votre navigateur
2. Explorez les cliniques marquées sur la carte
3. Cliquez sur un marqueur pour voir les détails de la clinique
4. Utilisez les boutons "Maps" ou "Waze" pour la navigation
5. Consultez la liste des cliniques triées par distance

## 💡 Fonctionnalités Principales

### Géolocalisation
- Détection automatique de la position de l'utilisateur
- Calcul des distances en temps réel

### Carte Interactive
- Style de carte personnalisé
- Marqueurs personnalisés pour les cliniques
- Fenêtres d'information détaillées

### Navigation
- Intégration directe avec Google Maps
- Support de Waze
- Calcul d'itinéraire

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le projet
2. Créez votre branche (`git checkout -b feature/NouvelleFeature`)
3. Committez vos changements (`git commit -m 'Add: Nouvelle Feature'`)
4. Poussez vers la branche (`git push origin feature/NouvelleFeature`)
5. Ouvrez une Pull Request

## 📝 License

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👤 Auteur

- GitHub: [@Ikart-1](https://github.com/Ikart-1)

## ⭐ Support

Si vous aimez ce projet, donnez-lui une ⭐️!