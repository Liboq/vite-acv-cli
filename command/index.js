const   download  = require('download-git-repo')
const {Vite_Vant_Pinia} = require('../tmp/index.js')

const clone = (answers)=> {
    console.log(answers);
    download(`direct:${(answers.path)}`,answers.localPath,{ clone: true },(err)=>{
        if(err){
            console.log(err);
        }else{
            console.log('加载完成');
        }
    })

}

module.exports = {
    clone
}