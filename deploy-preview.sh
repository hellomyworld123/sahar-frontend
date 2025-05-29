#!/bin/bash

# Script de déploiement Vercel pour l'environnement de prévisualisation
# Ce script :
# 1. Crée et bascule sur la branche admin-preview
# 2. Pousse la branche vers origin
# 3. Configure la variable d'environnement REACT_APP_API_URL
# 4. Déploie sur Vercel
# 5. Affiche l'URL de prévisualisation

# Arrêt en cas d'erreur
set -e

# Vérification de la présence du token Vercel
if [ -z "$VERCEL_TOKEN" ]; then
    echo "❌ ERREUR: VERCEL_TOKEN n'est pas défini"
    exit 1
fi

echo "🚀 Démarrage du processus de déploiement..."

# 1. Création et basculement sur la branche admin-preview
echo "📦 Création/basculement sur la branche admin-preview..."
git checkout -b admin-preview 2>/dev/null || git checkout admin-preview

# 2. Push de la branche vers origin
echo "⬆️ Push de la branche vers origin..."
git push -u origin admin-preview

# 3. Configuration de la variable d'environnement
echo "🔧 Configuration des variables d'environnement..."
vercel env rm REACT_APP_API_URL preview -y 2>/dev/null || true
echo "https://sahar-backend.onrender.com" | vercel env add REACT_APP_API_URL preview

# 4. Déploiement sur Vercel
echo "🚀 Déploiement sur Vercel..."
vercel deploy --prebuilt --token=$VERCEL_TOKEN

# 5. Récupération et affichage de l'URL de prévisualisation
echo "🔗 Récupération de l'URL de prévisualisation..."
PREVIEW_URL=$(vercel ls --token=$VERCEL_TOKEN | grep admin-preview | awk '{print $2}')

echo "✅ Déploiement terminé avec succès!"
echo "🌐 URL de prévisualisation: $PREVIEW_URL" 