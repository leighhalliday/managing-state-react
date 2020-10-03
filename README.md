# Como Manejo State en React

When I'm building a React app, how do I manage state?

## State de la App

Mantener state lo mas profundo que puedes.

1. Local State `useState`
2. Levantar State
3. Global State (con Context)

Cuando llegues al punto de usar Global State, ya puedes usar MobX, Redux, Overmind, Zustand, Recoil, etc... todos usan context para saltar niveles y evitar pasar props... o simplemente usar useState.

## State del Servidor

React Query, SWR, Apollo Client, urql
