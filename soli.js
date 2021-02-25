'use strict';

const fs = require('fs');

// tableau de correspondance des caractères décodés / codés
const correspondanceArray = [
	'A1', 'Z2', 'E3', 'R4', 'T5', 'Y6', 'U7', 'I8', 'O9', 'P0',
	'Q@', 'S#', 'D€', 'F_', 'G&', 'H-', 'J+', 'K(', 'L)', 'M/',
	'W*', 'X"', "C'", 'V:', 'B;', 'N!',
	'  ', '\n\n'
];
// vérifications de la cohérence du tableau
for (const correspondance of correspondanceArray) {
	if (correspondance.length !== 2) {
		throw new Error(`Correspondance length is not 2: at ${correspondance} (${correspondance.length})`);
	}
}

// vérification des paramètres passés au script
if (process.argv.length !== 4) {
	throw new Error(`Invalid arguments length: ${process.argv.length}`);
}
const option = process.argv[2];
const file = process.argv[3];

// on lit l'entrée à partir du fichier spécifié
const input = fs.readFileSync(file, 'utf8');
let output = '';

if (option === 'code') {
	// on passe sur chaque caractère du fichier pour le coder
	for (let index = 0; index < input.length; index++) {
		// on met le caractère en majuscules
		const char = input.charAt(index).toUpperCase();
		let handled = false;
		// on passe sur toutes les correspondances connues
		for (const correspondance of correspondanceArray) {
			// si le caractère correspond
			if (char === correspondance.charAt(0)) {
				output += correspondance.charAt(1);
				handled = true;
				break;
			}
		}
		// si la correspondance n'a pas été trouvée, on avertit
		if (handled === false) {
			console.error(`Unknown char: ${c}`);
			output += '?';
		}
	}
} else if (option === 'decode') {
	// on passe sur chaque caractère du fichier pour le décoder
	for (let index = 0; index < input.length; index++) {
		const char = input.charAt(index);
		let handled = false;
		// on passe sur toutes les correspondances connues
		for (const correspondance of correspondanceArray) {
			// si le caractère correspond
			if (char === correspondance.charAt(1)) {
				output += correspondance.charAt(0);
				handled = true;
				break;
			}
		}
		// si la correspondance n'a pas été trouvée, on lance une erreur
		if (handled === false) {
			throw new Error(`Unknown char: ${c}`);
		}
	}
} else {
	// si l'option (code / decode) est incorrecte
	throw new Error(`Unknown input option: ${option}`);
}

// on retourne la chaine de caractères de sortie
console.log(output);
