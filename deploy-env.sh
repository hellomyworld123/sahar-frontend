#!/bin/bash

# Script de configuration des variables d'environnement et déploiement Vercel
# Ce script :
# 1. Liste les variables d'environnement existantes
# 2. Met à jour REACT_APP_API_URL
# 3. Déclenche un nouveau déploiement
# 4. Affiche l'URL de déploiement

# Arrêt en cas d'erreur
set -e

# Vérification de la présence du token Vercel
if [ -z "$VERCEL_TOKEN" ]; then
    echo "❌ ERREUR: VERCEL_TOKEN n'est pas défini"
    exit 1
fi

echo "🔍 Liste des variables d'environnement actuelles :"
vercel env ls --token=$VERCEL_TOKEN

echo "🔄 Mise à jour de REACT_APP_API_URL..."
# Suppression de la variable si elle existe
vercel env rm REACT_APP_API_URL preview -y --token=$VERCEL_TOKEN 2>/dev/null || true
# Ajout de la nouvelle variable
echo "https://sahar-backend.onrender.com" | vercel env add REACT_APP_API_URL preview --token=$VERCEL_TOKEN

echo "🚀 Déclenchement du déploiement..."
# Déploiement de la branche admin-preview
vercel deploy --prebuilt --token=$VERCEL_TOKEN

echo "🔗 Récupération de l'URL de déploiement..."
# Récupération de l'URL de déploiement
DEPLOY_URL=$(vercel ls --token=$VERCEL_TOKEN | grep admin-preview | awk '{print $2}')

echo "✅ Configuration terminée !"
echo "🌐 URL de déploiement : $DEPLOY_URL" 