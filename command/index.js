const download = require("download-git-repo");
var figlet = require('figlet');
const ora = require("ora");
const chalk = require("chalk");
const lolcatjs = require('@darkobits/lolcatjs');

const clone = (answers) => {
  const spinner = ora(chalk.bgBlue("正在下载模板,请稍等..."));
  spinner.start();
  download(
    `direct:${answers.path}`,
    answers.localPath,
    { clone: true },
    (err) => {
      if (err) {
        spinner.stop()
        console.log(chalk.bgRedBright(err));
        console.log(chalk.bgGreenBright("模板加载失败"));
      } else {
        spinner.stop()
        console.log(chalk.bgGreenBright("模板加载完成"));
      }
    }
  );
};
const drawBigName = (version,name) =>{
   const textSync = lolcatjs.fromString(figlet.textSync(`${name}`,{
        font: 'Ghost',
        horizontalLayout: 'default',
        verticalLayout: 'default',
       }))
  console.log(chalk.yellowBright(`  current version: ${version} \n`))

}

module.exports = {
  clone,drawBigName
};
