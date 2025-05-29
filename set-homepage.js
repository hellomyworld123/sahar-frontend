#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function updateHomepage() {
    try {
        // Lire package.json
        const packageJsonPath = path.join(process.cwd(), 'package.json');
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

        // Définir la nouvelle valeur de homepage
        const homepage = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '/';
        
        // Mettre à jour le champ homepage
        packageJson.homepage = homepage;

        // Écrire les modifications dans package.json
        fs.writeFileSync(
            packageJsonPath,
            JSON.stringify(packageJson, null, 2) + '\n',
            'utf8'
        );

        console.log(`✅ Homepage mise à jour vers: ${homepage}`);
        process.exit(0);
    } catch (error) {
        console.error('❌ Erreur lors de la mise à jour de homepage:', error.message);
        process.exit(1);
    }
}

// Exécuter la fonction
updateHomepage(); 