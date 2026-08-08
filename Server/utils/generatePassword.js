const LOWERCASE = "abcdefghijklmnpqrstuvwxyz";
const UPPERCASE = "ABCDEFGHIJKLMNPQRSTUVWXYZ";
const NUMBERS = "123456789";
const SYMBOLS = "@#$%&*!";

export const generatePassword = (
  length = 10
) => {
  const allChars =
    LOWERCASE +
    UPPERCASE +
    NUMBERS +
    SYMBOLS;

  let password = "";

  // Ensure at least one character from each category
  password += LOWERCASE[
    Math.floor(
      Math.random() * LOWERCASE.length
    )
  ];

  password += UPPERCASE[
    Math.floor(
      Math.random() * UPPERCASE.length
    )
  ];

  password += NUMBERS[
    Math.floor(
      Math.random() * NUMBERS.length
    )
  ];

  password += SYMBOLS[
    Math.floor(
      Math.random() * SYMBOLS.length
    )
  ];

  // Fill remaining length
  for (
    let i = password.length;
    i < length;
    i++
  ) {
    password += allChars[
      Math.floor(
        Math.random() * allChars.length
      )
    ];
  }

  // Shuffle characters
  return password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
};