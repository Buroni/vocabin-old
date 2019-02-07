module.exports = function(language, pos) {
  let passPos = false;

  if (typeof pos === 'undefined') return false;

  switch(language) {
    case 'german':
      /*
       * Noun - NN, NE
       * Adjective - ADJA, ADJD
       * Verb - VV*, VA*, VM*
       * Adverb - ADV
       * Interjection - ITJ
       */
      passPos = (['NN', 'NE', 'ADJA', 'ADV', 'ITJ', 'ADJD'].includes(pos)
        || pos.includes('VV') || pos.includes('VA') || pos.includes('VM'));
      break;
    case 'french':
      /*
       * Noun - NOM, NAM
       * Adjective - ADJ
       * Verb - VER*
       * Adverb - ADV
       * Interjection - INT
       */
      passPos = (pos.includes('VER') || ['NOM', 'NAM', 'ADJ', 'INT', 'ADV'].includes(pos));
      break;
    case 'spanish':
      /*
       * Noun - NC, NP, NMEA, NMON
       * Adjective - ADJ
       * Verb - VE*, VH*, VL*, VM*, VS*
       * Adverb - ADV
       * Interjection - ITJN
       */
      passPos = (['NC', 'NP', 'ITJN', 'ADJ', 'ADV', 'NMEA', 'NMON'].includes(pos) ||
      pos.includes('VE') || pos.includes('VH') || pos.includes('VL') || pos.includes('VM')  || pos.includes('VS'));
      break;
    case 'korean':
      /*
       * Noun - NN*, NP
       * Adjective - VA
       * Verb - VV
       * Adverb - MA*
       * Interjection - IC
       */
      passPos = (['VA', 'VV', 'IC', 'NP'].includes(pos) || pos.includes('NN') || pos.includes('VC') || pos.includes('MA'));
      break;
    case 'italian':
      /*
       * Noun - NOM, NPR
       * Adjective - ADJ
       * Verb - VER*
       * Adverb - ADV
       * Interjection - INT
       */
      passPos = (pos.includes('VER') || ['NOM', 'NPR', 'ADJ', 'INT'].includes(pos));
      break;
    case 'russian':
      /*
       * Noun - Nc*, Np*
       * Adjective - Afc*, Afp*
       * Verb - Vm*
       * Adverb - R, Rc
       * Interjection - I
       */
      passPos = (
        pos.includes('Afc') ||
        pos.includes('Afp') ||
        pos.includes('Nc') ||
        pos.includes('Np') ||
        pos.includes('Vm') ||
        ['I', 'R', 'Rc'].includes(pos)
      );
      break;
    case 'chinese':
      /*
       * Noun - n, ng, nr, ns, nz
       * Adjective - a, ag, ad, an
       * Verb - v, vd, vg, vn
       * Adverb - d, dg
       * Interjection - e
       * Idiom - i
       */
      passPos = [
        'n', 'ng', 'nr', 'ns', 'nz',
        'a', 'ag', 'ad', 'an',
        'v', 'vd', 'vg', 'vn',
        'e', 'i'].includes(pos);
      break;
    case 'danish':
      /*
       * Noun - NC*, NP*
       * Adjective - AC*, AD*
       * Verb - V*
       * Adverb - D*
       * Interjection - I*
       */
      passPos = (
        pos.startsWith('N') ||
        pos.startsWith('A') ||
        pos.startsWith('V') ||
        pos.startsWith('D') ||
        pos.startsWith('I')
      );
      break;
    case 'portuguese-finegrained':
      /*
       * Noun - N*, P*
       * Adjective - TO*
       * Verb - V*
       * Adverb - R*
       * Interjection - I
       */
      passPos = (
        pos.startsWith('N') ||
        pos.startsWith('P') ||
        pos.startsWith('TO') ||
        pos.startsWith('V') ||
        pos.startsWith('R') ||
        pos.startsWith('I')
      );
      break;
    default:
      break;
  }

  return passPos;
};
