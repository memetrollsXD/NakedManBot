# NakedManBot

A simple discord selfbot structure made in TypeScript.

## Setup
1. Clone the repository
2. `npm install`
3. Copy config.example.json to config.json and fill in the values
4. `npm start`

## Commands
There are no commands implemented, but you can easily make your own by checking out src/handlers/default.ts

```ts
export default class Command {
    public readonly name: string;
    public readonly args: string[];
    public readonly message: Message;

    public reply(message: string): void;
}
```
