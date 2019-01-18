module.exports = function(language, pos) {
  let passPos = false;

  if (typeof pos === 'undefined') return false;

  switch(language) {
    case 'german':
      passPos = ['NN', 'ADJA', 'VAFIN', 'ADV', 'ITJ'].includes(pos);
      break;
    case 'french':
      passPos = (pos.includes('VER') || ['NOM', 'ADJ', 'INT'].includes(pos));
      break;
    case 'spanish':
      passPos = (pos.includes('NOUN') || pos.includes('VERB') || ['PROPN', 'ADJ', 'INT'].includes(pos));
      break;
    case 'korean':
      passPos = (pos.includes('NNG') || pos.includes('NNP') || pos.includes('NNB') || pos.includes('VV'));
      break;
    case 'italian':
      passPos = (pos.includes('VER') || ['NOM', 'ADJ', 'INT'].includes(pos));
      break;
    case 'russian':
      passPos = (
        pos.includes('Afc') ||
        pos.includes('Afp') ||
        pos.includes('Nc') ||
        pos.includes('Np') ||
        pos.includes('Vm')
      );
      break;
    case 'chinese':
      passPos = ['n', 'v', 'd', 'l'].includes(pos);
      break;
  }

  return passPos;
};
