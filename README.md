# api-steven

API con express y typescript para la clase de porogramacion en middleware

## como correr el proyecto

```
npm install
npm run dev
```

el servidor corre en http://localhost:3000

## la api key valida es: `secreto-demo`

---

## pruebas con curl

### (a) sin api key → 401

```
curl http://localhost:3000/health
```

respuesta:
```
{"error":"API key inválida o ausente"}
```

---

### (b) con api key valida → 200

```
curl -H "x-api-key: secreto-demo" http://localhost:3000/health
```

respuesta:
```
{"status":"ok","ts":"2026-06-11T02:15:43.021Z"}
```

---

### (c) ruta que no existe → 404

```
curl -H "x-api-key: secreto-demo" http://localhost:3000/otraRuta
```

respuesta:
```
{"error":"ruta no encontrada"}
```

### output del deber "TA-2.1 Pruebas unitarias básicas"
```
chininin@192 api-steven % npm test

> api-steven@1.0.0 test
> node --experimental-vm-modules node_modules/jest/bin/jest.js

ts-jest[config] (WARN) message TS151002: Using hybrid module kind (Node16/18/Next) is only supported in "isolatedModules: true". Please set "isolatedModules: true" in your tsconfig.json. To disable this message, you can set "diagnostics.ignoreCodes" to include 151002 in your ts-jest config. See more at https://kulshekhar.github.io/ts-jest/docs/getting-started/options/diagnostics
(node:49421) ExperimentalWarning: VM Modules is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
 PASS  src/middlewares/logger.test.ts
ts-jest[config] (WARN) message TS151002: Using hybrid module kind (Node16/18/Next) is only supported in "isolatedModules: true". Please set "isolatedModules: true" in your tsconfig.json. To disable this message, you can set "diagnostics.ignoreCodes" to include 151002 in your ts-jest config. See more at https://kulshekhar.github.io/ts-jest/docs/getting-started/options/diagnostics
 PASS  src/middlewares/auth.test.ts

Test Suites: 2 passed, 2 total
Tests:       5 passed, 5 total
Snapshots:   0 total
Time:        0.821 s, estimated 1 s
Ran all test suites.
chininin@192 api-steven % 
```

## Documentación del Endpoint

**Método HTTP:** `GET`
**Ruta:** `/health`

**Descripción:** Retorna el estado de salud del servidor y la marca de tiempo actual

**Datos de entrada:**
- **Headers:** Requiere obligatoriamente la cabecera `x-api-key` para autenticación

**Respuestas posibles:**
- **200 OK:** Petición exitosa. Devuelve un objeto JSON con el estado "ok" y un timestamp
- **401 Unauthorized:** Ocurre cuando la cabecera `x-api-key` es inválida o no se envía. Devuelve un objeto JSON con un mensaje de error

