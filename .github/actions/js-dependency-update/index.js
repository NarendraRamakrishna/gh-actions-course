import * as core from '@actions/core';

const exec = require('@actions/exec');

// Define any inputs your action might need
// You can read inputs using core.getInput if needed, for example:
// const baseBranch = core.getInput('base-branch') || 'main';
        
const validateBranchName = ({branchName}) => /^[a-zA-Z0-9_\-\.\/]+$/.test(branchName);
const validateDirectoryName = ({dirName}) => /^[a-zA-Z0-9_\-\.\/]+$/.test(dirName);


async function run() {
    core.info('I am a custom JS action checking for dependency updates');

    const baseBranch = core.getInput('base-branch') ;
    const targetBranch = core.getInput('target-branch');
    const ghToken = core.getInput('gh-token');
    const workingDir = core.getInput('working-directory');
    const debug = core.getBooleanInput('debug');

    core.setSecret(ghToken);
    if (!validateBranchName({branchName: baseBranch})) {
        core.error(`Invalid base branch name: ${baseBranch}`);}

    if (!validateDirectoryName({dirName: workingDir})) {
        core.error(`Invalid working directory name: ${workingDir}`);
    }

    core.info(`Base branch: ${baseBranch}`);
    core.info(`Target branch: ${targetBranch}`);
    core.info(`Working directory: ${workingDir}`);
    core.info(`Debug mode: ${debug}`);

    await exec.exec('npm update', [], {cwd: workingDir});

    const gitStatus = await exec.getExecOutput('git status -s package*.json', [],{}  );

    if (gitStatus.stdout.length > 0) {
        core.info('Changes detected in package.json or package-lock.json');}
    else {
        core.info('No changes detected in package.json or package-lock.json');
        
    }

}

    
run();