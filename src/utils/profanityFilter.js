const bannedWords = [
  "chutiya",
  "madarchod",
  "behenchod",
  "randi",
  "gandu",
  "bhosdike",
  "haramkhor",
  "haramkhori",
  "lawda",
  "lawde",
  "lavde",
  "chodne",
  "chinnar",
  "chudai",
  "kutte",
  "harami",
  "saala",
  "chut",
  "lund",
  "maa",
  "behen",
  "chinal",
  "suar",
  "bakchodi",
  "chutmar",
  "lundmar",
  "chuswa",
  "chus",
  "chusna",
  "lundchus",
  "muth",
  "muthmar",
  "gand",
  "gaand",
  "gaandfat",
  "gaandmara",
  "loda",
  "lode",
  "chhut",
  "chhutmar",
  "kutti",
  "rakhail",
  "chusni",
  "bhadwe",
  "telichut",
  "tatti",
  "chutiyapa",
  "chakkal",
  "hijra",
  "napunsak",
  "khassi",
  "randiya",
  "chhedna",
  "chusne",
  "gapan",
  "lodebaaz",
  "landu",
  "munhmar",
  "chhedchhad",
  "halli",
  "choda",
  "chodayi",
  "randibaaz",
  "ghoosna",
  "chussu",
  "gandmasti",

  "fuck",
  "fucking",
  "fucked",
  "bitch",
  "asshole",
  "dick",
  "pussy",
  "cunt",
  "shit",
  "bastard",
  "whore",
  "slut",
  "douche",
  "retard",
  "prick",
  "motherfucker",
  "cocksucker",
  "faggot",
  "jackass",
  "dickhead",
  "ballsack",
  "nutsack",
  "scumbag",
  "shithead",
  "pisshead",
  "skank",
  "cuntface",
  "dickface",
  "fuckhead",
  "slutbag",
  "cumdump",
  "balllicker",
  "titfuck",
  "asslicker",
  "analslut",
  "dickrider",
  "dicksucker",
  "blowjobber",
  "rimjob",
  "wanker",
  "knobhead",
  "cumslut",
  "meatstick",
  "sexaddict",
  "horndog",
  "pantywaist",
  "shitface",
  "fuckboy",
  "fuckgirl",
  "degenerate",
  "burchatta",

  "chutya",
  "chutiyaa",
  "chutiye",
  "madar",
  "madarchd",
  "behnchod",
  "behnchd",
  "rndi",
  "gandoo",
  "bhosdi",
  "bhosdk",
  "lavda",
  "lavdo",
  "chudne",
  "lnd",
  "chuut",
  "chhut",
  "mutth",
  "gandfattu",
  "chuskiboy",
  "bsdk",
  "mc",
  "bc",
  "bcdk",
  "maderchod",
  "banchod",
  "gandfaadu",
  "lundbaz",
  "landbaaz",
  "randichod",
];

/**
 * Check if text contains any banned words
 * @param {string} text - Text to check
 * @returns {object} - { isClean: boolean, foundWord: string|null }
 */
export const checkProfanity = (text) => {
  if (!text || typeof text !== "string") {
    return { isClean: true, foundWord: null };
  }

  const cleanText = text.toLowerCase().trim();

  for (const word of bannedWords) {
    const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`\\b${escapedWord}\\b`, "i");
    if (regex.test(cleanText)) {
      return { isClean: false, foundWord: word };
    }
  }

  for (const word of bannedWords) {
    if (cleanText.includes(word.toLowerCase())) {
      return { isClean: false, foundWord: word };
    }
  }

  return { isClean: true, foundWord: null };
};

/**
 * Show alert for inappropriate content (fallback method)
 * @param {string} foundWord - The banned word that was found
 */
export const showProfanityAlert = (foundWord = null) => {
  const message =
    "Please don't use inappropriate language. Keep the discussion respectful! 🙏";
  alert(message);
};

/**
 * Show toast notification for inappropriate content (preferred method)
 * @param {string} foundWord - The banned word that was found
 * @param {function} addToast - Toast function to call (should add toast to queue)
 */
export const showProfanityToast = (foundWord = null, addToast) => {
  const message =
    "Please don't use inappropriate language. Keep the discussion respectful! 🙏";

  if (addToast && typeof addToast === "function") {
    addToast({
      id: Date.now(),
      message,
      type: "error",
      duration: 5000,
    });
  } else {
    showProfanityAlert(foundWord);
  }
};

/**
 * Validate content before posting
 * @param {string} content - Content to validate
 * @param {function} addToast - Function to add toast to queue
 * @returns {boolean} - true if content is clean, false if contains profanity
 */
export const validateContent = (content, addToast = null) => {
  const { isClean, foundWord } = checkProfanity(content);

  if (!isClean) {
    if (addToast && typeof addToast === "function") {
      showProfanityToast(foundWord, addToast);
    } else {
      showProfanityAlert(foundWord);
    }
    return false;
  }

  return true;
};

/**
 * Highlight profane words in text (bonus feature)
 * @param {string} text - Text to process
 * @returns {string} - HTML string with highlighted words
 */
export const highlightProfanity = (text) => {
  if (!text) return text;

  let highlightedText = text;

  for (const word of bannedWords) {
    const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escapedWord})`, "gi");
    highlightedText = highlightedText.replace(
      regex,
      '<mark style="background-color: #e74c3c; color: white; padding: 2px 4px; border-radius: 3px;">$1</mark>'
    );
  }

  return highlightedText;
};

/**
 * Clean text by replacing profane words with asterisks
 * @param {string} text - Text to clean
 * @returns {string} - Cleaned text with profanity replaced
 */
export const cleanProfanity = (text) => {
  if (!text) return text;

  let cleanedText = text;

  for (const word of bannedWords) {
    const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`\\b${escapedWord}\\b`, "gi");
    const replacement = "*".repeat(word.length);
    cleanedText = cleanedText.replace(regex, replacement);
  }

  return cleanedText;
};
