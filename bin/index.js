#!/usr/bin/env node

const { readFileSync,existsSync } = require("fs");
const { Vite_Vant_Pinia,Taro_React_Redux } = require("../tmp/index.js");

/* eslint-disable import/extensions */

// eslint-disable-next-line import/no-extraneous-dependencies
const { Command } = require("commander");
const { clone,drawBigName } = require("../command/index.js");
const v = readFileSync(__dirname + "../../package.json");
const { version,name } = JSON.parse(v);
const chalk = require('chalk')
const ora = require('ora')

const program = new Command();
const inquirer = require("inquirer");

const spinner = ora(
  {
      prefixText :  (() => {'正在下载模板'})(),
      color:'blue',
  }
)
program.version(chalk.bgBlueBright(version));
program.command("v").action(async () => {
  drawBigName(version,name)
});

program
  .command("init")
  .description("clone")
  .action(async () => {
    drawBigName(version,name),
    inquirer
      .prompt([
        {
          type: "list",
          name: "path",
          message: "请选择模板",
          default: "vue",
          choices: [
            {
              name: "Vite_Vant_Pinia",
              value:
                `${Vite_Vant_Pinia}`,
            },
            { name: "Taro_React_Redux", value: `${Taro_React_Redux}` },
          ],
        },
        {
            type:"input",
            name:"localPath",
            message:'请为它取名并设置地址',
            default:'template'
        }
      ])
      .then((answers) => {
        if(!existsSync(answers.localPath)){
          spinner.start()
        clone(answers);
        spinner.stop('加载完成')
        }
        else{
          console.log(chalk.red('项目已存在，请重新取名'));
        }
       
      })
      .catch((error) => {
        console.log(error);
      });
  });

program.parse();
