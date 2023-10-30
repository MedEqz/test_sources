// char expected by the function
const LEFT = "<";
const RIGHT = ">";
const SIMPLE = "-";
const DOUBLE = "=";
const HALF = "~";
const POINT = ".";

/**
 *
 * renvoi le score d'une arrow en fonction de son body
 * @param body
 * @param score
 * @returns arrow rules applied to score
 */
const bodyArrowRules = (body: string, score: number): number => {
  if (body === DOUBLE) {
    score = score * 2;
  }
  if (body === HALF) {
    score = score / 2;
  }
  return score;
};

/**
 *
 * @param currentScore
 * @param i
 * @param split
 * @returns { currentScore, i }
 */
const leftArrowSequence = (currentScore: number, i: number, split: string) => {
  let currentExponant = 1;
  let simpleArrow = false;
  let doubleArrow = false;
  let halfArrow = false;

  currentScore += 1;

  // a - if power arrow
  while (split[i + 1] === LEFT) {
    currentExponant += 1;
    currentScore += 1;
    i += 1;
  }

  // b - if simple arrow
  while (split[i + 1] === SIMPLE) {
    simpleArrow = true;
    currentScore += 1;
    i += 1;
  }

  // c - if double arrow
  if (!simpleArrow && split[i + 1] === DOUBLE) {
    doubleArrow = true;
    while (split[i + 1] === DOUBLE) {
      currentScore += 1;
      i += 1;
    }
  }

  // d - if half arrow
  if (!simpleArrow && !doubleArrow && split[i + 1] === HALF) {
    halfArrow = true;
    while (split[i + 1] === HALF) {
      currentScore += 1;
      i += 1;
    }
  }

  // e - if bi directionnal arrow
  if (split[i + 1] === RIGHT) {
    currentScore = 0;
    currentExponant = 1;
    i += 1;
    // permet d'aller au bout de l'arrow bi directionnelle
    while (split[i + 2] === RIGHT) {
      i += 1;
    }
  }

  // f - manage simple double & half
  if (simpleArrow) {
    simpleArrow = !simpleArrow;
  }
  if (doubleArrow) {
    doubleArrow = false;
    currentScore = bodyArrowRules(DOUBLE, currentScore);
  }
  if (halfArrow) {
    halfArrow = false;
    currentScore = bodyArrowRules(HALF, currentScore);
  }

  // g - manage power
  currentScore = Math.pow(currentScore, currentExponant);

  return { currentScore, i };
};

/**
 *
 * @param currentScore
 * @param i
 * @param split
 * @returns { currentScore, i }
 */
const rightArrowSequence = (currentScore: number, i: number, split: string) => {
  let currentExponant = 1;

  currentScore += 1;

  // a - if power arrow
  while (split[i + 1] === RIGHT) {
    currentExponant += 1;
    currentScore += 1;
    i += 1;
  }

  // b - manage power
  currentScore = Math.pow(currentScore, currentExponant);
  return { currentScore, i };
};

/**
 *
 * @param symbol
 * @param currentScore
 * @param split
 * @param i
 * @returns { currentScore, i }
 */
const genericSequences = (
  symbol: string,
  currentScore: number,
  split: string,
  i: number
) => {
  let sequence = true;
  let rightArrow = false;
  let powerRightArrow = false;
  let currentExponant = 1;

  currentScore += 1;

  // A - if simple sequence
  while (sequence) {
    if (!rightArrow && split[i + 1] === symbol) {
      currentScore += 1;
      i += 1;
    }

    // a if right arrow
    if (split[i + 1] === RIGHT) {
      rightArrow = true;
      currentScore += 1;
      i += 1;

      // and power arrow
      if (split[i + 1] === RIGHT) {
        powerRightArrow = true;
        currentScore += 1;
        currentExponant += 1;
        i += 1;

        // power arrow sequence
        while (powerRightArrow) {
          if (split[i + 1] === RIGHT) {
            currentExponant += 1;
            currentScore += 1;
            i += 1;
          } else {
            powerRightArrow = false;
            sequence = false;
            currentScore = Math.pow(currentScore, currentExponant);
          }
        }
      }
    }

    // b - if not a right arrow AND not double sequence
    if (!rightArrow && split[i + 1] !== symbol) {
      sequence = false;
      currentScore = 0;
    }

    // c - right arrow AND sequence end
    if (rightArrow && split[i + 1] !== RIGHT) {
      sequence = false;
      currentScore = bodyArrowRules(symbol, currentScore);
    }
  }
  return { currentScore, i };
};

/**
 * calcule le score d'une chaine de caractères
 * @param inputText
 * @returns inputScore
 */
export const arrowCount = (inputText: string): number => {
  // gestion d'erreur dans le cas où la chaine de caractères contient d'autres caractères que ceux prévus
  const regex = /^[.~=<>-]*$/;

  if (!regex.test(inputText)) {
    throw new Error(`caractère invalide dans l'input ${inputText}`);
  }

  let inputScore = 0;

  // we split the input with . into an array
  const splitedArrowInput = inputText.split(POINT);

  for (const split of splitedArrowInput) {
    for (var i = 0; i < split.length; i++) {
      const char = split[i];
      let currentScore = 0;

      switch (char) {
        case LEFT:
          const leftSequence = leftArrowSequence(currentScore, i, split);
          inputScore -= leftSequence.currentScore;
          i = leftSequence.i;
          break;
        case RIGHT:
          const rightSequence = rightArrowSequence(currentScore, i, split);
          inputScore += rightSequence.currentScore;
          i = rightSequence.i;
          break;
        case SIMPLE:
          const simple = genericSequences(char, currentScore, split, i);
          inputScore += simple.currentScore;
          i = simple.i;
          break;
        case DOUBLE:
          const double = genericSequences(char, currentScore, split, i);
          inputScore += double.currentScore;
          i = double.i;
          break;
        case HALF:
          const half = genericSequences(char, currentScore, split, i);
          inputScore += half.currentScore;
          i = half.i;
          break;
        default:
          throw new Error(`caractère invalide : ${char}`);
      }
    }
  }

  return inputScore;
};
