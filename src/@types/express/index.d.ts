declare namespace Express {
  interface Request {
    user?: {
      id: string
    }
  }
}

// acrescentou o campo id no objeto Request.
// Para funcionar, altere o tsconfig:
/*
"typeRoots": [
  "@types",
  "./node_modules/@types"
],
*/
