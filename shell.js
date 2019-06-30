var shell = require('shelljs');
var readline = require('readline')

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
isDeleteOrNew()
// 判断是删除分支还是新建分支
function isDeleteOrNew (){
  rl.question("is delete or new branch (d/n): ",function(res){
    if(res === 'd') {
      deleteBranch()
    }else if(res === 'n') {
      newBranch()
    }else {
      isDeleteOrNew();
    }
  });
}

function newBranch(){
  rl.question('input branch name for you want to create: ',function(res){
    shell.exec(`git checkout -b ${res}`);
    shell.exec(`git push origin ${res}`);
    shell.exec(`git branch -u origin/${res}`);
    rl.close()
  })
}
function deleteBranch(){
  rl.question("input branch name for you want to delete: ",function(res){
    rl.question('is delete remote branch?(y/n): ',function(bool){
      if(bool === 'y') {
        shell.exec(`git push origin --delete ${res}`);
        shell.exec('git checkout master');
        shell.exec(`git branch -d ${res}`);
      }else if(bool === 'n') {
        shell.exec('git checkout master');
        shell.exec(`git branch -d ${res}`);
      }
      rl.close();
    })
  });
}

// close事件监听
rl.on("close", function(){
 // 结束程序
  process.exit(0);
});
