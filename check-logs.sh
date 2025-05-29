#!/bin/bash

# Script d'analyse des logs de déploiement Vercel
# Usage: ./check-logs.sh <deployment-url>
# Exemple: ./check-logs.sh sahar-frontend-git-admin-preview-hellomyworld123.vercel.app

# Arrêt en cas d'erreur
set -e

# Vérification de la présence du token Vercel
if [ -z "$VERCEL_TOKEN" ]; then
    echo "❌ ERREUR: VERCEL_TOKEN n'est pas défini"
    exit 1
fi

# Vérification de l'argument
if [ -z "$1" ]; then
    echo "❌ ERREUR: URL de déploiement manquante"
    echo "Usage: ./check-logs.sh <deployment-url>"
    exit 1
fi

DEPLOYMENT_URL=$1
ERROR_FOUND=false

echo "🔍 Analyse des logs pour $DEPLOYMENT_URL..."

# Récupération et analyse des logs
vercel logs $DEPLOYMENT_URL --token=$VERCEL_TOKEN | tail -n 100 | while read -r line; do
    if [[ $line == *"ERROR"* ]] || [[ $line == *"WARN"* ]]; then
        echo "$line"
        if [[ $line == *"ERROR"* ]]; then
            ERROR_FOUND=true
        fi
    fi
done

# Vérification du statut de sortie
if [ "$ERROR_FOUND" = true ]; then
    echo "❌ Des erreurs ont été détectées dans les logs"
    exit 1
else
    echo "✅ Aucune erreur n'a été détectée dans les logs"
    exit 0
fi 