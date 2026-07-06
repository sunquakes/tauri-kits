#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const { version } = require('../package.json')

const BANNER = `
╔══════════════════════════════════════════════════════════════════╗
║                        Tauri Kits CLI                           ║
║                     Create Tauri projects quickly               ║
╚══════════════════════════════════════════════════════════════════╝
`

async function main() {
  const command = process.argv[2]

  if (command === '-V' || command === '--version') {
    console.log(`tkits v${version}`)
    process.exit(0)
  }

  // Import chalk dynamically since it's ESM
  const chalk = await import('chalk').then(m => m.default)

  if (command === '-h' || command === '--help') {
    showHelp(chalk)
    process.exit(0)
  }

  if (command === 'init' || command === 'create' || !command) {
    await createProject(chalk)
    process.exit(0)
  }

  console.error(chalk.red(`Unknown command: ${command}`))
  showHelp(chalk)
  process.exit(1)
}

async function createProject(chalk) {
  console.log(chalk.cyan(BANNER))

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Project name:',
      default: 'tauri-app',
      validate: (input) => {
        if (!input || input.trim() === '') {
          return 'Please enter a project name'
        }
        if (fs.existsSync(path.join(process.cwd(), input))) {
          return 'Directory already exists'
        }
        return true
      }
    },
    {
      type: 'input',
      name: 'description',
      message: 'Project description:',
      default: 'A Tauri application'
    },
    {
      type: 'input',
      name: 'author',
      message: 'Author:',
      default: ''
    },
    {
      type: 'confirm',
      name: 'confirm',
      message: 'Ready to create the project?',
      default: true
    }
  ])

  if (!answers.confirm) {
    console.log(chalk.yellow('Operation cancelled.'))
    process.exit(0)
  }

  // 标准化项目名称（用于目录名和 package.json）
  const normalizedName = answers.projectName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  
  const projectDir = path.join(process.cwd(), normalizedName)

  try {
    console.log(chalk.green('\nCreating project...\n'))

    fs.mkdirSync(projectDir, { recursive: true })

    const templatePath = path.join(__dirname, '../')
    const excludes = ['node_modules', '.vscode', 'dist', '.git', 'bin', '.DS_Store', 'target', '*.log', '*.db']
    copyDirectory(templatePath, projectDir, excludes, chalk)

    updatePackageJson(projectDir, normalizedName, answers)

    console.log(chalk.green('\n✅ Project created successfully!'))
    console.log(chalk.blue('\n📁 Project location:'), chalk.white(projectDir))
    
    console.log(chalk.yellow('\n🚀 Next steps:'))
    console.log(`   cd ${answers.projectName}`)
    console.log('   pnpm install')
    console.log('   pnpm tauri dev')

  } catch (error) {
    console.error(chalk.red(`\n❌ Error creating project: ${error.message}`))
    if (fs.existsSync(projectDir)) {
      fs.rmSync(projectDir, { recursive: true, force: true })
    }
    process.exit(1)
  }
}

function copyDirectory(source, destination, excludes, chalk) {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true })
  }

  const files = fs.readdirSync(source)

  for (const file of files) {
    if (excludes.some(exclude => {
      if (exclude.includes('*')) {
        const pattern = new RegExp('^' + exclude.replace(/\*/g, '.*') + '$')
        return pattern.test(file)
      }
      return file === exclude
    })) {
      continue
    }

    const sourceFilePath = path.join(source, file)
    const destinationFilePath = path.join(destination, file)

    if (fs.statSync(sourceFilePath).isDirectory()) {
      copyDirectory(sourceFilePath, destinationFilePath, excludes, chalk)
    } else {
      fs.copyFileSync(sourceFilePath, destinationFilePath)
      console.log(chalk.grey(`   Created: ${path.relative(destination, destinationFilePath)}`))
    }
  }
}

function updatePackageJson(projectDir, normalizedName, answers) {
  const packageJsonPath = path.join(projectDir, 'package.json')
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))

  packageJson.name = normalizedName
  packageJson.description = answers.description || 'A Tauri application'
  
  if (answers.author) {
    packageJson.author = answers.author
  }

  delete packageJson.bin
  packageJson.private = true

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
}

function showHelp(chalk) {
  const helpText = `
Usage: tkits <command> [options]

${chalk.bold('Commands:')}
  init           Create a new Tauri project from template
  create         Same as init
  help           Show this help message

${chalk.bold('Options:')}
  -V, --version  Show version number
  -h, --help     Show this help message

${chalk.bold('Examples:')}
  tkits init          # Interactive project creation
  tkits create        # Same as init
  tkits --version     # Show version
  tkits --help        # Show help
  `
  console.log(chalk.cyan(helpText))
}

main().catch(error => {
  console.error(`Error: ${error.message}`)
  process.exit(1)
})