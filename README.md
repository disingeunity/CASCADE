# CASCADE
A general purpose, market-encompassing deobfuscator and devirtualization suite, capable of deserializing bytecode from two major obfuscator VMs - MS and IBW. Used for my future resume lmfao

### Q&A
Is my obfuscator service affected by CASCADE?
> Only two obfuscators are affected in CASCADE v1. CASCADE's second alternative, SURGE, deobfuscates 3 more security services in the current market.

Can I opt out of being cracked by the Association?
> no


### Installation
`npm i` - Install the prereqs
`node index.js` - runs the code, assuming input.lua is filled

OR


`./run.bat` - runs a batch file that does it automatically


### Decompiling the re-assembled `.luac` file
`.luac` is a compiled version of Lua, (bytecode variant). Decompile it using [this tool](https://luadec.metaworm.site/)
