export class TreeService {
  getTree(hostFiles: string, projectFile: string) {
    return projectFile || hostFiles;
  }

  testMethodOfTreeService(inputValue: string) {
    return `This is the input value from testMethodOfTreeService: ${inputValue}`;
  }
}
