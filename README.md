# How I Manage State in React

When I'm building a React app, how do I manage state?

## App State

Keep state as low as possible.

1. Local State
2. Lift State
3. Global State (with contexts)

Once you are dealing with Global State, you're welcome to use MobX, Redux, Overmind, Zustand, Recoil, etc... or just stick with `useState`.

## External Data

React Query, SWR, Apollo Client, urql
