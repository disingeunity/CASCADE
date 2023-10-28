const fs = require("fs")
const chalk = require("chalk")
const luamin = require("./utility/luamin")

// initialize the greeting because i said so
console.log("\r\n  sSSs   .S_SSSs      sSSs    sSSs   .S_SSSs     .S_sSSs      sSSs  \r\n d%%SP  .SS~SSSSS    d%%SP   d%%SP  .SS~SSSSS   .SS~YS%%b    d%%SP  \r\nd%S\'    S%S   SSSS  d%S\'    d%S\'    S%S   SSSS  S%S   `S%b  d%S\'    \r\nS%S     S%S    S%S  S%|     S%S     S%S    S%S  S%S    S%S  S%S     \r\nS&S     S%S SSSS%S  S&S     S&S     S%S SSSS%S  S%S    S&S  S&S     \r\nS&S     S&S  SSS%S  Y&Ss    S&S     S&S  SSS%S  S&S    S&S  S&S_Ss  \r\nS&S     S&S    S&S  `S&&S   S&S     S&S    S&S  S&S    S&S  S&S~SP  \r\nS&S     S&S    S&S    `S*S  S&S     S&S    S&S  S&S    S&S  S&S     \r\nS*b     S*S    S&S     l*S  S*b     S*S    S&S  S*S    d*S  S*b     \r\nS*S.    S*S    S*S    .S*P  S*S.    S*S    S*S  S*S   .S*S  S*S.    \r\n SSSbs  S*S    S*S  sSS*S    SSSbs  S*S    S*S  S*S_sdSSS    SSSbs  \r\n  YSSP  SSS    S*S  YSS\'      YSSP  SSS    S*S  SSS~YSSY      YSSP  \r\n               SP                          SP                       \r\n               Y                           Y                        ");
console.log("GNAA/Fission Softworks")


const inputFile = "./input.lua"
const outputFile = "output.luac"

let script = fs.readFileSync(inputFile, "utf8")
let parsed, bytecode

/// console.log(script)

/*script = script.replace(/[_\-a-zA-Z0-9]+ ?\+= ?[_\-a-zA-Z0-9]+/g, (match) => {
    let perameters = match.split("+=")
    let x = perameters[0], y = perameters[1]

    return ` ${x} = ${x} + ${y} ` // "ADDITION_ASSIGNMENT"
}).replace(/[_\-a-zA-Z0-9]+ ?\*= ?[_\-a-zA-Z0-9]+/g, (match) => {
    let perameters = match.split("*=")
    let x = perameters[0], y = perameters[1]

    return ` ${x} = ${x} * ${y} ` // "MULTIPLICATION_ASSIGNMENT"
}).replace(/[_\-a-zA-Z0-9]+ ?\-= ?[_\-a-zA-Z0-9]+/g, (match) => {
    let perameters = match.split("-=")
    let x = perameters[0], y = perameters[1]

    return ` ${x} = ${x} - ${y} ` // "SUBTRACTION_ASSIGNMENT"
})*/

// script = luamin.Beautify(script, {RenameVariables: true})

try {
    process.stdout.write(`[${chalk.blueBright("INFO")}] Generating Syntax Tree...`)
    parsed = luamin.Parse(script)//[0]
    console.log(` ${chalk.greenBright("Success")}`)
} catch {
    return console.log(` ${chalk.redBright("Syntax Error")}`)
}

try {
    process.stdout.write(`[${chalk.blueBright("INFO")}] Beautifying Syntax Tree...`)
    parsed = luamin.BeautifyAst(parsed, {RenameVariables: true, Format: true})
    console.log(` ${chalk.greenBright("Success")}`)
} catch (err) {
    console.log(err)
    console.log(` ${chalk.redBright("Failed")}`)

    return
}

// console.log(luamin.Print(parsed))

fs.readdirSync("./obfuscators").forEach(obfuscator => {
    const deobfuscator = require(`./obfuscators/${obfuscator}/deobfuscate`)

    if (deobfuscator.detect(script)) {
        console.log(`[${chalk.blueBright("INFO")}] Detected obfuscator: ${deobfuscator.name}`)
        bytecode = deobfuscator.deobfuscate(parsed)
        return
    }
})

if (bytecode != undefined) {
    fs.writeFileSync(outputFile, bytecode, "utf8")
} else {
    throw "Failed to detect obfuscator"
}