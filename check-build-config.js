#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Fonction pour lire un fichier JSON
function readJsonFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(content);
    } catch (error) {
        return null;
    }
}

// Fonction principale de vérification
function checkBuildConfig() {
    const errors = [];
    const warnings = [];

    // 1. Vérifier package.json
    const packageJson = readJsonFile('package.json');
    if (!packageJson) {
        errors.push('❌ package.json non trouvé ou invalide');
        return { errors, warnings };
    }

    // Vérifier le script de build
    if (!packageJson.scripts || !packageJson.scripts.build) {
        errors.push('❌ Script "build" manquant dans package.json');
    } else {
        console.log('✅ Script "build" trouvé dans package.json');
    }

    // 2. Vérifier vercel.json
    const vercelJson = readJsonFile('vercel.json');
    if (!vercelJson) {
        warnings.push('⚠️ vercel.json non trouvé - utilisation des paramètres par défaut');
    } else {
        // Vérifier la configuration de build
        const buildConfig = vercelJson.builds?.[0] || vercelJson.build;
        if (!buildConfig) {
            warnings.push('⚠️ Configuration de build non trouvée dans vercel.json');
        } else {
            const outputDir = buildConfig.dest || buildConfig.outputDirectory;
            if (outputDir && outputDir !== 'build') {
                errors.push(`❌ Le répertoire de sortie dans vercel.json (${outputDir}) ne correspond pas à "build"`);
            } else if (outputDir) {
                console.log('✅ Configuration de build valide dans vercel.json');
            }
        }
    }

    // Afficher les résultats
    if (errors.length > 0) {
        console.error('\nErreurs trouvées :');
        errors.forEach(error => console.error(error));
        process.exit(1);
    }

    if (warnings.length > 0) {
        console.warn('\nAvertissements :');
        warnings.forEach(warning => console.warn(warning));
    }

    console.log('\n✅ OK: Configuration de build valide');
    process.exit(0);
}

// Exécuter la vérification
checkBuildConfig(); 