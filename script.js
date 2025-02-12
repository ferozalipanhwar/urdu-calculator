const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

// Mapping for Urdu/Sindhi numerals to standard Arabic numerals
const urduToEnglishMap = {
  '۰': '0',
  '۱': '1',
  '۲': '2',
  '۳': '3',
  '۴': '4',
  '۵': '5',
  '۶': '6',
  '۷': '7',
  '۸': '8',
  '۹': '9'
};

// Function to convert Urdu/Sindhi numerals to standard Arabic numerals
function convertToEnglishNumerals(urduString) {
  return urduString.replace(/[۰-۹]/g, (char) => urduToEnglishMap[char]);
}

// Function to convert standard Arabic numerals back to Urdu/Sindhi numerals
function convertToUrduNumerals(englishString) {
  return englishString.replace(/[0-9]/g, (char) =>
    Object.keys(urduToEnglishMap).find((key) => urduToEnglishMap[key] === char)
  );
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');

    if (value === 'C') {
      display.innerText = '۰'; // Reset display
    } else if (value === '=') {
      try {
        // Convert display content to standard Arabic numerals for calculation
        const convertedExpression = convertToEnglishNumerals(display.innerText);
        const result = eval(convertedExpression); // Perform calculation
        // Convert result back to Urdu/Sindhi numerals for display
        display.innerText = convertToUrduNumerals(result.toString());
      } catch {
        display.innerText = 'خطا'; // Error in Urdu
      }
    } else {
      display.innerText =
        display.innerText === '۰' ? value : display.innerText + value;
    }
  });
});
