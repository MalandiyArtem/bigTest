export class TreeService {
  getTree(hostFiles: string, projectFile: string) {
    const paths = hostFiles.split(',')
      .map((elem) => {
        const pathSplit = elem.split('\\');
        return pathSplit.splice(pathSplit.indexOf(projectFile)).join('/');
      });
    const result: any[] = [];

    paths.reduce((r, path) => {
      path.split('/').reduce((o, name) => {
        let temp = (o.children = o.children || []).find((q) => q.name === name);
        if (!temp) {
          o.children.push(temp = {
            name, path, showChildren: false, children: null,
          });
        }
        return temp;
      }, r);
      return r;
    }, { children: result });
    return result;
  }
}
