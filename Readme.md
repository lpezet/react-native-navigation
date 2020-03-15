# Prerequisites

Node v8+

```bash
npm install -g expo-cli
```

Install VS Code.

Launch VS Code, open `Preferences > Settings` and enable `Format on Save` (search for "Format on Save", cause there's tons of options in there...).


# Setup

Start by creating a new project with `expo`:

```bash
expo init react-native-foundation
```

Choose `blank (TypeScript)`

Edit `tsconfig.json`, add the following:

```javascript
{
  "strict": true,                           /* Enable all strict type-checking options. */
  "noImplicitAny": true,                 /* Raise error on expressions and declarations with an implied 'any' type. */
  "strictNullChecks": true,              /* Enable strict null checks. */
  "strictFunctionTypes": true,           /* Enable strict checking of function types. */
  "strictPropertyInitialization": true,  /* Enable strict checking of property initialization in classes. */
  "noImplicitThis": true,                /* Raise error on 'this' expressions with an implied 'any' type. */
  "alwaysStrict": true,                  /* Parse in strict mode and emit "use strict" for each source file. */

  /* Additional Checks */
  "noUnusedLocals": true,                /* Report errors on unused locals. */
  "noUnusedParameters": true,            /* Report errors on unused parameters. */
  "noImplicitReturns": true,             /* Report error when not all code paths in function return a value. */
  "noFallthroughCasesInSwitch": true,    /* Report errors for fallthrough cases in switch statement. */
  "forceConsistentCasingInFileNames": true,
}
```

Install eslist config (based on William Candillon's strict rules):

```bash
yarn add eslint eslint-config-react-native-wcandillon --dev
```

Create `.eslintrc` file and paste the following:

```json
{ 
  "extends": "react-native-wcandillon"
} 
```

In `package.json`, add script entries for `lint` and `tsc` as follows:

```javascript
{
    ...
    "scripts": {
        ...
        "lint": "eslint --ext .ts,.tsx .",
        "tsc": "tsc"
    }
}
```

Install `ESLint` Visual Studio Code plugin:

    https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

Open extension settings and turn on `Enable ESLint as a formatter`.


# Resources


[1] https://github.com/wcandillon/eslint-config-react-native-wcandillon

[2] https://gist.github.com/wcandillon/cf5882e64695ee8f572c3251e258a90b

[3] https://www.youtube.com/watch?v=mqO9EGvt-kU