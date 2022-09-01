#!/usr/bin/env node

const { readFileSync } = require("fs");

/* eslint-disable import/extensions */

// eslint-disable-next-line import/no-extraneous-dependencies
const { Command } = require("commander");
const { clone } = require("../command/index.js");
const v = readFileSync(__dirname + "../../package.json");
const { version } = JSON.parse(v);

const program = new Command();
const inquirer = require("inquirer");

program.version(version);
program.command("v").action(async () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "type",
        message: "项目类型",
        default: "vue",
        choices: [
          { name: "vue", value: "vue" },
          { name: "react", value: "react" },
          { name: "jq", value: "jq" },
        ],
      },
    ])
    .then((answers) => {
      console.log(answers);
    })
    .catch((error) => {
      console.log(error);
    });
});

program
  .command("init")
  .description("clone")
  .action(async () => {
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
                "https://github.com/Liboq/vue3-vant-mobile-template.git#master",
            },
            { name: "react", value: "react" },
            { name: "weixin", value: "weixin" },
          ],
        },
        {
            type:"input",
            name:"localPath",
            message:'请为它取名并设置地址',
            default:'src/vite-vant-tempalte'
        }
      ])
      .then((answers) => {
        console.log("正在加速下载...");
        clone(answers);
      })
      .catch((error) => {
        console.log(error);
      });
  });

program.parse();
