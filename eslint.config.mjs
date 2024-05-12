import globals from "globals";
import pluginJs from "@eslint/js";
import react from 'eslint-plugin-react';


export default [
  {
    languageOptions: 
    { 
      globals: globals.browser 
    }
  },
  pluginJs.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      react,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
     },
  },
];